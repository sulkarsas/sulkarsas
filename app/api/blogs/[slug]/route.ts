// app/api/blogs/[slug]/route.ts - API Route para obtener un blog por slug
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

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    const { data, error } = await supabase.from("blogs").select("*").eq("slug", slug).single()

    if (error) {
      console.error(`Error al obtener blog ${slug}:`, error)
      return NextResponse.json({ error: "Blog no encontrado" }, { status: 404 })
    }

    // Obtener blogs relacionados
    const { data: relatedData, error: relatedError } = await supabase
      .from("blogs")
      .select("*")
      .eq("status", "published")
      .eq("category", data.category || "General")
      .neq("slug", slug)
      .limit(3)

    const relatedBlogs = relatedError
      ? []
      : relatedData.map((blog) => ({
          slug: blog.slug,
          title: blog.title,
          date: new Date(blog.published_at || blog.created_at || Date.now()).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          image: blog.image || "/global-commerce-alliance.webp",
          excerpt: blog.excerpt || "",
        }))

    const formattedBlog = {
      slug: data.slug,
      title: data.title,
      date: new Date(data.published_at || data.created_at || Date.now()).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: data.author || "Admin",
      authorRole: data.author_role || "Equipo SULKAR",
      authorImage: data.author_image || "/team/maria.png",
      image: data.image || "/global-commerce-alliance.webp",
      featuredImage: data.featured_image || null,
      tags: data.tags || [],
      category: data.category || "General",
      excerpt: data.excerpt || "",
      content: data.content || "",
      relatedBlogs,
    }

    return NextResponse.json(formattedBlog)
  } catch (error) {
    console.error(`Error al obtener blog:`, error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
