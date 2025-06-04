"use client"

import { memo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/types/blog-post"
import { ImageUploader } from "./image-uploader"
import { ImageIcon, Save, Loader2, Trash2 } from "lucide-react"

interface ImageManagerProps {
  post: BlogPost | null
  isSaving: boolean
  onPostChange: (post: BlogPost) => void
  onSaveAndPublish: () => Promise<void>
  onGoBack: () => void
  onDistributeImages: () => void
}

export const ImageManager = memo(function ImageManager({
  post,
  isSaving,
  onPostChange,
  onSaveAndPublish,
  onGoBack,
  onDistributeImages,
}: ImageManagerProps) {
  const handleFeaturedImageUpload = useCallback(
    (url: string) => {
      if (!post) return
      onPostChange({ ...post, featuredImage: url })
    },
    [post, onPostChange],
  )

  const handleAdditionalImageUpload = useCallback(
    (url: string, index: number) => {
      if (!post) return
      const updatedImages = [...(post.additionalImages || [])]
      updatedImages[index] = url
      onPostChange({ ...post, additionalImages: updatedImages })
    },
    [post, onPostChange],
  )

  const handleRemoveFeaturedImage = useCallback(() => {
    if (!post) return
    onPostChange({ ...post, featuredImage: "" })
  }, [post, onPostChange])

  const handleRemoveAdditionalImage = useCallback(
    (index: number) => {
      if (!post) return
      const updatedImages = [...(post.additionalImages || [])]
      updatedImages.splice(index, 1)
      onPostChange({ ...post, additionalImages: updatedImages })
    },
    [post, onPostChange],
  )

  if (!post) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No hay blog seleccionado</h3>
          <p className="text-gray-600 dark:text-gray-400">Selecciona un blog para gestionar sus imágenes</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestión de Imágenes</h2>
        <Button onClick={onDistributeImages} variant="outline" disabled={isSaving}>
          <ImageIcon className="h-4 w-4 mr-2" />
          Distribuir Imágenes Automáticamente
        </Button>
      </div>

      {/* Imagen de Portada */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">🖼️ Imagen de Portada</h3>
              {post.featuredImage && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveFeaturedImage}
                  disabled={isSaving}
                  aria-label="Eliminar imagen de portada"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>

            <div className="border-2 border-dashed border-sulkar-green/30 dark:border-sulkar-lightgreen/30 rounded-lg p-4 bg-sulkar-green/5 dark:bg-sulkar-lightgreen/5">
              <ImageUploader
                title="Imagen de Portada"
                description="Esta imagen aparecerá como fondo en la sección hero del blog"
                image={post.featuredImage}
                onUpload={handleFeaturedImageUpload}
                onRemove={handleRemoveFeaturedImage}
                height="h-64"
                inputId="featured-image"
              />
            </div>

            <p className="text-xs text-sulkar-green/80 dark:text-sulkar-lightgreen/80 bg-sulkar-green/10 dark:bg-sulkar-lightgreen/10 p-2 rounded">
              💡 Esta imagen se mostrará como fondo en la portada del blog. Recomendado: 1920x1080px
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[0, 1].map((imageIndex) => (
          <ImageUploader
            key={imageIndex}
            title={`Imagen ${imageIndex + 1}`}
            description={imageIndex === 0 ? "Imagen principal del blog" : "Imagen secundaria del blog"}
            image={post.additionalImages?.[imageIndex]}
            onUpload={(file) => handleAdditionalImageUpload(file, imageIndex)}
            onRemove={() => handleRemoveAdditionalImage(imageIndex)}
            inputId={`image-${imageIndex}`}
          />
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={onGoBack} disabled={isSaving}>
          Volver al Editor
        </Button>
        <Button onClick={onSaveAndPublish} disabled={isSaving} className="bg-sulkar-green hover:bg-sulkar-green/90">
          {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Guardar y Publicar Blog
        </Button>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Consejos para las imágenes:</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• La primera imagen aparecerá después del primer párrafo</li>
          <li>• La segunda imagen se colocará automáticamente en el medio del contenido</li>
          <li>• Usa imágenes de alta calidad (recomendado: 1200x800px)</li>
          <li>• Formatos soportados: JPG, PNG, WebP</li>
        </ul>
      </div>
    </div>
  )
})
