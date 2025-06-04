"use client"

import { memo, useCallback, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { BlogPost } from "@/types/blog-post"
import {
  PlusCircle,
  Edit,
  Trash2,
  FileText,
  Calendar,
  Tag,
  User,
  Search,
  Filter,
  Copy,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface BlogListProps {
  posts: BlogPost[]
  onCreateNew: () => void
  onEdit: (post: BlogPost) => void
  onDelete: (id: string) => void
  onDuplicate?: (post: BlogPost) => void
  onPreview?: (post: BlogPost) => void
}

export const BlogList = memo(function BlogList({
  posts,
  onCreateNew,
  onEdit,
  onDelete,
  onDuplicate,
  onPreview,
}: BlogListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const handleDelete = useCallback(
    (id: string, title: string) => {
      if (window.confirm(`¿Estás seguro de que deseas eliminar "${title}"? Esta acción no se puede deshacer.`)) {
        onDelete(id)
      }
    },
    [onDelete],
  )

  // Filtrar posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || post.status === statusFilter

    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Obtener categorías únicas
  const categories = Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))

  const getStatusBadge = (status?: string) => {
    return status === "published" ? (
      <Badge className="bg-green-500 hover:bg-green-600">Publicado</Badge>
    ) : (
      <Badge variant="secondary">Borrador</Badge>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Sin fecha"
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Gestión de Blogs</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredPosts.length} de {posts.length} blogs
          </p>
        </div>
        <Button onClick={onCreateNew} className="bg-sulkar-green hover:bg-sulkar-green/90">
          <PlusCircle className="h-4 w-4 mr-2" />
          Crear Nuevo Blog
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="published">Publicados</SelectItem>
            <SelectItem value="draft">Borradores</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Tag className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lista de posts */}
      <div className="grid gap-4">
        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {posts.length === 0 ? "No hay blogs creados" : "No se encontraron blogs"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {posts.length === 0
                  ? "Comienza creando tu primer blog post"
                  : "Intenta ajustar los filtros de búsqueda"}
              </p>
              {posts.length === 0 && (
                <Button onClick={onCreateNew} className="bg-sulkar-green hover:bg-sulkar-green/90">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Crear Primer Blog
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold truncate">{post.title || "Sin título"}</h3>
                      {getStatusBadge(post.status)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {post.excerpt || "Sin extracto"}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                      {post.category && (
                        <span className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {post.category}
                        </span>
                      )}
                      {post.tags.length > 0 && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {post.tags.length} etiquetas
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => onEdit(post)}>
                      <Edit className="h-3 w-3" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onPreview && (
                          <DropdownMenuItem onClick={() => onPreview(post)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Vista previa
                          </DropdownMenuItem>
                        )}
                        {onDuplicate && (
                          <DropdownMenuItem onClick={() => onDuplicate(post)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => post.id && handleDelete(post.id, post.title)}
                          className="text-red-600 focus:text-red-600"
                          disabled={!post.id}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
})
