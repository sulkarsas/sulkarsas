// lib/blog-service.ts
import { createClient } from "@supabase/supabase-js"
import type { BlogPost } from "@/types/blog"

// Cliente público para lectura
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export class BlogService {
  // Obtener todos los blogs publicados (usando cliente público)
  static async getAllPublishedBlogs(): Promise<BlogPost[]> {
    try {
      console.log("🔍 BlogService: Obteniendo blogs publicados...")

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })

      if (error) {
        console.error("❌ BlogService: Error fetching blogs:", error)
        throw error
      }

      console.log(`✅ BlogService: ${data?.length || 0} blogs encontrados`)
      return data ? data.map(this.mapDatabaseBlogToModel) : []
    } catch (error) {
      console.error("❌ Error en getAllPublishedBlogs:", error)
      throw error
    }
  }

  // Obtener blog por slug (usando cliente público)
  static async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
      console.log("🔍 BlogService: Obteniendo blog por slug:", slug)

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          console.log("📭 BlogService: Blog no encontrado")
          return null
        }
        console.error("❌ BlogService: Error fetching blog by slug:", error)
        throw error
      }

      console.log("✅ BlogService: Blog encontrado:", data.title)
      return this.mapDatabaseBlogToModel(data)
    } catch (error) {
      console.error("❌ Error en getBlogBySlug:", error)
      throw error
    }
  }

  // Buscar blogs (usando cliente público)
  static async searchBlogs(query: string): Promise<BlogPost[]> {
    try {
      console.log("🔍 BlogService: Buscando blogs con query:", query)

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", "published")
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
        .order("published_at", { ascending: false })

      if (error) {
        console.error("❌ BlogService: Error searching blogs:", error)
        throw error
      }

      console.log(`✅ BlogService: ${data?.length || 0} blogs encontrados en búsqueda`)
      return data ? data.map(this.mapDatabaseBlogToModel) : []
    } catch (error) {
      console.error("❌ Error en searchBlogs:", error)
      throw error
    }
  }

  // Mapear blog de la base de datos al modelo
  private static mapDatabaseBlogToModel(dbBlog: any): BlogPost {
    if (!dbBlog) return {} as BlogPost

    return {
      slug: dbBlog.slug || "",
      title: dbBlog.title || "",
      date: dbBlog.published_at
        ? new Date(dbBlog.published_at).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : new Date(dbBlog.created_at || Date.now()).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
      author: dbBlog.author || "Admin",
      authorRole: dbBlog.author_role || "Equipo SULKAR",
      authorImage: dbBlog.author_image || "/team/maria.png",
      image: dbBlog.image || "/global-commerce-alliance.webp",
      featuredImage: dbBlog.featured_image || null,
      additionalImages: dbBlog.additional_images || [],
      tags: dbBlog.tags || [],
      category: dbBlog.category || "General",
      excerpt: dbBlog.excerpt || "",
      content: dbBlog.content || "",
      relatedPosts: [],
    }
  }
}
