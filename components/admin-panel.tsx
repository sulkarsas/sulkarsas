"use client"

import { useState, useCallback, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/types/blog-post"
import { useBlogManager } from "@/hooks/use-blog-manager"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { BlogList } from "@/components/admin/blog-list"
import { BlogEditor } from "@/components/admin/blog-editor"
import { ImageManager } from "@/components/admin/image-manager"
import { ToastContainer } from "@/components/admin/toast-container"
import { FileText, Edit, ImageIcon, LogOut, X } from "lucide-react"

interface AdminPanelProps {
  onClose: () => void
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("list")
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  const { logout } = useAdminAuth()
  const router = useRouter()
  const { toasts, success, error, removeToast } = useToast()

  const {
    posts,
    isSaving,
    error: blogError,
    createNewPost,
    savePost,
    deletePost,
    duplicatePost,
    clearError,
  } = useBlogManager()

  // Mostrar errores del blog manager
  useEffect(() => {
    if (blogError) {
      error("Error", blogError)
      clearError()
    }
  }, [blogError, error, clearError])

  const handleLogout = useCallback(() => {
    logout()
    router.push("/")
  }, [logout, router])

  const handleCreateNew = useCallback(() => {
    const newPost = createNewPost()
    setEditingPost(newPost)
    setActiveTab("editor")
  }, [createNewPost])

  const handleEditPost = useCallback((post: BlogPost) => {
    setEditingPost(post)
    setActiveTab("editor")
  }, [])

  const handleDuplicatePost = useCallback(
    (post: BlogPost) => {
      const duplicated = duplicatePost(post)
      setEditingPost(duplicated)
      setActiveTab("editor")
      success("Blog duplicado", "El blog ha sido duplicado correctamente")
    },
    [duplicatePost, success],
  )

  const handlePostChange = useCallback((post: BlogPost) => {
    setEditingPost(post)
  }, [])

  const handleSavePost = useCallback(
    async (publish = false) => {
      if (!editingPost) return { success: false, message: "No hay post para guardar" }

      const result = await savePost(editingPost, publish)

      if (result.success) {
        success("Guardado exitoso", result.message)
        setEditingPost(null)
        setActiveTab("list")
      } else {
        error("Error al guardar", result.message)
      }

      return result
    },
    [editingPost, savePost, success, error],
  )

  const handleDeletePost = useCallback(
    async (id: string) => {
      const deleted = await deletePost(id)
      if (deleted) {
        success("Blog eliminado", "El blog ha sido eliminado correctamente")
        // Si estamos editando el post eliminado, limpiar el estado
        if (editingPost?.id === id) {
          setEditingPost(null)
          setActiveTab("list")
        }
      } else {
        error("Error", "No se pudo eliminar el blog")
      }
    },
    [deletePost, success, error, editingPost],
  )

  const handleCancelEdit = useCallback(() => {
    setEditingPost(null)
    setActiveTab("list")
  }, [])

  const handleNextToImages = useCallback(() => {
    setActiveTab("images")
  }, [])

  const handleBackToEditor = useCallback(() => {
    setActiveTab("editor")
  }, [])

  const handleDistributeImages = useCallback(() => {
    if (!editingPost || !editingPost.additionalImages?.length) {
      error("Sin imágenes", "No hay imágenes para distribuir")
      return
    }

    let content = editingPost.content
    const images = editingPost.additionalImages.filter((img) => img)

    if (images.length > 0) {
      const firstParagraphEnd = content.indexOf("\n\n")
      if (firstParagraphEnd !== -1) {
        const imageMarkdown = `\n\n![Imagen del blog](${images[0]})\n\n`
        content = content.slice(0, firstParagraphEnd) + imageMarkdown + content.slice(firstParagraphEnd)
      }
    }

    if (images.length > 1) {
      const contentLength = content.length
      const middlePosition = Math.floor(contentLength / 2)
      const nearestParagraphEnd = content.indexOf("\n\n", middlePosition)
      if (nearestParagraphEnd !== -1) {
        const imageMarkdown = `\n\n![Segunda imagen del blog](${images[1]})\n\n`
        content = content.slice(0, nearestParagraphEnd) + imageMarkdown + content.slice(nearestParagraphEnd)
      }
    }

    setEditingPost({ ...editingPost, content })
    success("Imágenes distribuidas", "Las imágenes se han distribuido automáticamente en el contenido")
  }, [editingPost, success, error])

  return (
    <>
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Panel de Administración</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gestiona el contenido de tu sitio web • {posts.length} blogs totales
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">
              <FileText className="h-4 w-4 mr-2" />
              Lista de Blogs
            </TabsTrigger>
            <TabsTrigger value="editor">
              <Edit className="h-4 w-4 mr-2" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="images">
              <ImageIcon className="h-4 w-4 mr-2" />
              Imágenes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <BlogList
              posts={posts}
              onCreateNew={handleCreateNew}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
              onDuplicate={handleDuplicatePost}
            />
          </TabsContent>

          <TabsContent value="editor" className="space-y-4">
            <BlogEditor
              post={editingPost}
              isSaving={isSaving}
              onPostChange={handlePostChange}
              onSave={handleSavePost}
              onCancel={handleCancelEdit}
              onCreateNew={handleCreateNew}
              onNextStep={handleNextToImages}
            />
          </TabsContent>

          <TabsContent value="images" className="space-y-4">
            <ImageManager
              post={editingPost}
              isSaving={isSaving}
              onPostChange={handlePostChange}
              onSaveAndPublish={async () => {
                await handleSavePost(true)
              }}
              onGoBack={handleBackToEditor}
              onDistributeImages={handleDistributeImages}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Sistema de notificaciones */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  )
}
