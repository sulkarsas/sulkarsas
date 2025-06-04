import supabaseAdmin from "@/lib/supabaseAdmin"
import BlogPostClient from "@/components/blog-post-client"
import BlogPostLoadingComponent from "./blog-post-loading"
import { Suspense } from "react"

// Función para obtener un blog por slug
async function getBlogBySlug(slug: string) {
  try {
    const { data, error } = await supabaseAdmin.from("blogs").select("*").eq("slug", slug).single()

    if (error) {
      console.error(`Error al obtener blog ${slug}:`, error)
      return null
    }

    return {
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
    }
  } catch (error) {
    console.error(`Error al obtener blog por slug ${slug}:`, error)
    return null
  }
}

// Función para obtener blogs relacionados
async function getRelatedBlogs(category: string, currentSlug: string, limit = 3) {
  try {
    const { data, error } = await supabaseAdmin
      .from("blogs")
      .select("*")
      .eq("status", "published")
      .eq("category", category)
      .neq("slug", currentSlug)
      .limit(limit)

    if (error) {
      console.error("Error al obtener blogs relacionados:", error)
      return []
    }

    return data.map((blog) => ({
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
  } catch (error) {
    console.error("Error al obtener blogs relacionados:", error)
    return []
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<BlogPostLoadingComponent />}>
      <BlogPostClient slug={params.slug} />
    </Suspense>
  )
}
