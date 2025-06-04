"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import type { BlogPost } from "@/types/blog-post"
import { api } from "@/lib/api"

// Función para generar slug profesional
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remover acentos
    .replace(/[^\w\s-]/g, "") // Remover caracteres especiales
    .replace(/[\s_-]+/g, "-") // Reemplazar espacios con guiones
    .replace(/^-+|-+$/g, "") // Remover guiones al inicio y final
    .substring(0, 50) // Limitar longitud
}

// Mapear datos de Supabase al formato del panel
function mapSupabaseBlogToAdminPost(dbBlog: any): BlogPost {
  return {
    id: dbBlog.id,
    title: dbBlog.title || "",
    slug: dbBlog.slug || "",
    excerpt: dbBlog.excerpt || "",
    content: dbBlog.content || "",
    category: dbBlog.category || "",
    tags: dbBlog.tags || [],
    author: dbBlog.author || "Admin",
    date: dbBlog.created_at ? new Date(dbBlog.created_at).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) : new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    authorRole: dbBlog.author_role || "Equipo SULKAR",
    authorImage: dbBlog.author_image || "/team/maria.png",
    image: dbBlog.image || "/global-commerce-alliance.webp",
    publishedAt: dbBlog.published_at || dbBlog.created_at,
    status: dbBlog.status || "draft",
    featuredImage: dbBlog.featured_image || dbBlog.image || "",
    additionalImages: dbBlog.additional_images || [],
    relatedPosts: dbBlog.related_posts || [],
  }
}

// Mapear datos del panel al formato de Supabase
function mapAdminPostToSupabaseBlog(post: BlogPost) {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    tags: post.tags,
    author: post.author,
    author_role: "Equipo SULKAR",
    author_image: "/team/maria.png",
    image: post.featuredImage || "/global-commerce-alliance.webp",
    featured_image: post.featuredImage,
    additional_images: post.additionalImages,
    status: post.status,
    published_at: post.status === "published" ? new Date().toISOString() : null,
  }
}

export function useBlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cargar blogs desde Supabase al montar
  useEffect(() => {
    const loadPosts = async () => {
      console.log("🔄 useBlogManager: Cargando posts...")
      setIsLoading(true)
      setError(null)

      try {
        const data = await api.blogs.getAll()
        console.log("✅ useBlogManager: Posts cargados:", data?.length || 0)

        if (data) {
          const mappedPosts = data.map(mapSupabaseBlogToAdminPost)
          setPosts(mappedPosts)
        }
      } catch (error) {
        console.error("❌ useBlogManager: Error al cargar posts:", error)
        setError("Error al cargar los blogs desde la base de datos")
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])

  const savePost = useCallback(
    async (post: BlogPost, publish = false): Promise<{ success: boolean; message: string }> => {
      console.log("💾 useBlogManager: Guardando post...", {
        title: post.title,
        publish,
        hasId: !!post.id,
      })

      setIsSaving(true)
      setError(null)

      try {
        // Validaciones básicas
        if (!post.title.trim()) {
          throw new Error("El título es requerido")
        }
        if (!post.content.trim()) {
          throw new Error("El contenido es requerido")
        }
        if (!post.excerpt.trim()) {
          throw new Error("El extracto es requerido")
        }
        if (!post.category) {
          throw new Error("La categoría es requerida")
        }

        const slug = post.slug || generateSlug(post.title)
        const updatedPost = {
          ...post,
          slug,
          status: publish ? ("published" as const) : post.status,
        }

        console.log("📝 useBlogManager: Datos preparados:", {
          slug,
          status: updatedPost.status,
          category: updatedPost.category,
        })

        // Preparar datos para Supabase
        const supabaseData = mapAdminPostToSupabaseBlog(updatedPost)

        let savedBlog
        if (post.id) {
          console.log("🔄 useBlogManager: Actualizando blog existente...")
          savedBlog = await api.blogs.update(post.id, supabaseData)
        } else {
          console.log("➕ useBlogManager: Creando nuevo blog...")
          savedBlog = await api.blogs.create(supabaseData)
        }

        if (savedBlog) {
          console.log("✅ useBlogManager: Blog guardado exitosamente:", savedBlog.id)

          const mappedPost = mapSupabaseBlogToAdminPost(savedBlog)

          // Actualizar estado local
          setPosts((prevPosts) => {
            const existingIndex = prevPosts.findIndex((p) => p.id === mappedPost.id)
            if (existingIndex >= 0) {
              const newPosts = [...prevPosts]
              newPosts[existingIndex] = mappedPost
              return newPosts
            } else {
              return [...prevPosts, mappedPost]
            }
          })

          const message = publish
            ? "¡Blog publicado exitosamente en el sitio web!"
            : "Blog guardado como borrador correctamente"

          return { success: true, message }
        } else {
          throw new Error("No se recibió respuesta del servidor")
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido al guardar"
        console.error("❌ useBlogManager: Error al guardar:", errorMessage)
        setError(errorMessage)
        return { success: false, message: errorMessage }
      } finally {
        setIsSaving(false)
      }
    },
    [],
  )

  const createNewPost = useCallback((): BlogPost => {
    console.log("➕ useBlogManager: Creando nuevo post...")
    return {
      id: "", // Se generará en Supabase
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      tags: [],
      author: "Admin",
      date: new Date().toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      authorRole: "Equipo SULKAR",
      authorImage: "/team/maria.png",
      image: "/global-commerce-alliance.webp",
      publishedAt: new Date().toISOString(),
      status: "draft",
      featuredImage: "",
      additionalImages: [],
      relatedPosts: [],
    }
  }, [])

  const deletePost = useCallback(async (id: string): Promise<boolean> => {
    try {
      console.log("🗑️ useBlogManager: Eliminando post:", id)
      setError(null)
      await api.blogs.delete(id)

      // Actualizar estado local
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id))
      console.log("✅ useBlogManager: Post eliminado exitosamente")
      return true
    } catch (error) {
      console.error("❌ useBlogManager: Error al eliminar post:", error)
      setError("Error al eliminar el blog")
      return false
    }
  }, [])

  // Valores computados con useMemo
  const publishedPosts = useMemo(() => posts.filter((post) => post.status === "published"), [posts])
  const draftPosts = useMemo(() => posts.filter((post) => post.status === "draft"), [posts])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Función para duplicar post
  const duplicatePost = useCallback((originalPost: BlogPost): BlogPost => {
    const newPost = createNewPost()
    return {
      ...newPost,
      title: `${originalPost.title} (Copia)`,
      excerpt: originalPost.excerpt,
      content: originalPost.content,
      category: originalPost.category,
      tags: [...originalPost.tags],
      featuredImage: originalPost.featuredImage,
      additionalImages: originalPost.additionalImages ? [...originalPost.additionalImages] : [],
    }
  }, [createNewPost])

  return {
    // Estado
    posts,
    publishedPosts,
    draftPosts,
    isLoading,
    isSaving,
    error,

    // Acciones
    createNewPost,
    savePost,
    deletePost,
    duplicatePost,
    clearError,

    // Utilidades
    generateSlug,
  }
}
