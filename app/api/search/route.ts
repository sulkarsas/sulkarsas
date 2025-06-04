// app/api/search/route.ts - API Route para buscar blogs
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

// Verificar que estamos en el servidor
if (typeof window !== "undefined") {
  throw new Error("Este módulo solo debe usarse en el servidor")
}

// Cliente de Supabase para el servidor
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json([])
    }

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("status", "published")
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
      .order("published_at", { ascending: false })

    if (error) {
      console.error("Error al buscar blogs:", error)
      return NextResponse.json([], { status: 500 })
    }

    const formattedBlogs = data.map((blog) => ({
      slug: blog.slug,
      title: blog.title,
      date: new Date(blog.published_at || blog.created_at || Date.now()).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: blog.author || "Admin",
      authorRole: blog.author_role || "Equipo SULKAR",
      authorImage: blog.author_image || "/team/maria.png",
      image: blog.image || "/global-commerce-alliance.webp",
      tags: blog.tags || [],
      category: blog.category || "General",
      excerpt: blog.excerpt || "",
    }))

    return NextResponse.json(formattedBlogs)
  } catch (error) {
    console.error("Error al buscar blogs:", error)
    return NextResponse.json([], { status: 500 })
  }
}
