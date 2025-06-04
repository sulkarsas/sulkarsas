interface WebBlogData {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  authorRole: string
  authorImage: string
  image: string
  date: string
  relatedPosts: any[]
}

export class BlogManager {
  private static blogs: WebBlogData[] = []

  static createBlog(blogData: WebBlogData): void {
    try {
      // Validar datos requeridos
      if (!blogData.title || !blogData.content) {
        throw new Error("Título y contenido son requeridos")
      }

      // Verificar si ya existe un blog con el mismo slug
      const existingIndex = this.blogs.findIndex((blog) => blog.slug === blogData.slug)

      if (existingIndex >= 0) {
        // Actualizar blog existente
        this.blogs[existingIndex] = blogData
        console.log(`Blog actualizado: ${blogData.title}`)
      } else {
        // Crear nuevo blog
        this.blogs.push(blogData)
        console.log(`Nuevo blog creado: ${blogData.title}`)
      }

      // Guardar en localStorage para persistencia
      if (typeof window !== "undefined") {
        localStorage.setItem("sulkar_web_blogs", JSON.stringify(this.blogs))
      }
    } catch (error) {
      console.error("Error al crear/actualizar blog:", error)
      throw error
    }
  }

  static getAllBlogs(): WebBlogData[] {
    // Cargar desde localStorage si está disponible
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sulkar_web_blogs")
      if (saved) {
        try {
          this.blogs = JSON.parse(saved)
        } catch (error) {
          console.error("Error al cargar blogs desde localStorage:", error)
        }
      }
    }
    return this.blogs
  }

  static getBlogBySlug(slug: string): WebBlogData | undefined {
    return this.getAllBlogs().find((blog) => blog.slug === slug)
  }

  static deleteBlog(slug: string): boolean {
    try {
      const initialLength = this.blogs.length
      this.blogs = this.blogs.filter((blog) => blog.slug !== slug)

      if (this.blogs.length < initialLength) {
        // Actualizar localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("sulkar_web_blogs", JSON.stringify(this.blogs))
        }
        console.log(`Blog eliminado: ${slug}`)
        return true
      }
      return false
    } catch (error) {
      console.error("Error al eliminar blog:", error)
      return false
    }
  }

  static getBlogsByCategory(category: string): WebBlogData[] {
    return this.getAllBlogs().filter((blog) => blog.category === category)
  }

  static searchBlogs(query: string): WebBlogData[] {
    const searchTerm = query.toLowerCase()
    return this.getAllBlogs().filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.excerpt.toLowerCase().includes(searchTerm) ||
        blog.content.toLowerCase().includes(searchTerm) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    )
  }
}
