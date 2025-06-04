/**
 * Cliente API para comunicarse con el backend
 */

// Tipos
interface BlogPost {
  id?: string
  slug: string
  title: string
  date?: string
  author: string
  authorRole: string
  authorImage: string
  image: string
  featuredImage?: string
  additionalImages?: string[]
  tags: string[]
  category: string
  excerpt: string
  content: string
  relatedPosts?: string[]
  status?: "draft" | "published"
  publishedAt?: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

// Configuración base
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3001")

// Utilidades
const getAuthHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") return {}

  const token = localStorage.getItem("admin_token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Error desconocido" }))
    throw new Error(error.message || `Error ${response.status}`)
  }
  return response.json()
}

// Cliente API
export const api = {
  // Blogs públicos
  blogs: {
    getAll: async (): Promise<BlogPost[]> => {
      const response = await fetch(`${API_BASE}/api/blogs`)
      return handleResponse(response)
    },

    getBySlug: async (slug: string): Promise<BlogPost> => {
      const response = await fetch(`${API_BASE}/api/blogs/${slug}`)
      return handleResponse(response)
    },

    search: async (query: string): Promise<BlogPost[]> => {
      const response = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(query)}`)
      return handleResponse(response)
    },

    // Métodos administrativos (requieren autenticación)
    create: async (blog: Partial<BlogPost>): Promise<BlogPost> => {
      const response = await fetch(`${API_BASE}/api/admin/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(blog),
      })
      return handleResponse(response)
    },

    update: async (id: string, blog: Partial<BlogPost>): Promise<BlogPost> => {
      const response = await fetch(`${API_BASE}/api/admin/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(blog),
      })
      return handleResponse(response)
    },

    updateStatus: async (id: string, status: string): Promise<BlogPost> => {
      const response = await fetch(`${API_BASE}/api/admin/blogs/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ status }),
      })
      return handleResponse(response)
    },

    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${API_BASE}/api/admin/blogs/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })
      return handleResponse(response)
    },
  },

  // Autenticación
  auth: {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      const response = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
      return handleResponse(response)
    },

    verify: async (): Promise<{ valid: boolean; user?: any }> => {
      const response = await fetch(`${API_BASE}/api/admin/verify`, {
        headers: getAuthHeaders(),
      })
      return handleResponse(response)
    },
  },

  // Configuración del sitio
  settings: {
    get: async (): Promise<any> => {
      const response = await fetch(`${API_BASE}/api/settings`)
      return handleResponse(response)
    },

    update: async (settings: any): Promise<any> => {
      const response = await fetch(`${API_BASE}/api/admin/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(settings),
      })
      return handleResponse(response)
    },
  },
}

// Funciones auxiliares exportadas directamente para compatibilidad
export const getBlogs = async () => api.blogs.getAll()
export const getBlogBySlug = async (slug: string) => api.blogs.getBySlug(slug)
export const searchBlogs = async (query: string) => api.blogs.search(query)
