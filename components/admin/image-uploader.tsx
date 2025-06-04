"use client"

import type React from "react"
import { memo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Upload, Trash2, Loader2 } from "lucide-react"
import { useImageUpload } from "@/hooks/use-image-upload"

interface ImageUploaderProps {
  title: string
  description: string
  image?: string
  onUpload: (url: string) => void
  onRemove: () => void
  className?: string
  height?: string
  inputId: string
  folder?: string
}

export const ImageUploader = memo(function ImageUploader({
  title,
  description,
  image,
  onUpload,
  onRemove,
  className = "",
  height = "h-48",
  inputId,
  folder = "blog",
}: ImageUploaderProps) {
  const { uploadImage, isUploading, error, progress } = useImageUpload()

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const result = await uploadImage(file, folder)
        if (result.success && result.url) {
          onUpload(result.url)
        }
        // Clear the input
        e.target.value = ""
      }
    },
    [uploadImage, onUpload, folder],
  )

  const handleClick = useCallback(() => {
    if (!isUploading) {
      document.getElementById(inputId)?.click()
    }
  }, [inputId, isUploading])

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">{title}</h3>
            {image && (
              <Button variant="outline" size="sm" onClick={onRemove} aria-label="Eliminar imagen">
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>

          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
            {isUploading ? (
              <div className="text-center py-8">
                <Loader2 className="h-12 w-12 mx-auto text-sulkar-green animate-spin mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">Subiendo imagen...</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-sulkar-green h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">{progress}%</p>
              </div>
            ) : image ? (
              <div className="space-y-2">
                <img
                  src={image || "/placeholder.svg"}
                  alt={title}
                  className={`w-full ${height} object-cover rounded-lg`}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClick}
                  className="w-full"
                  aria-label={`Cambiar ${title.toLowerCase()}`}
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Cambiar Imagen
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
                <Button 
                  variant="outline" 
                  onClick={handleClick} 
                  aria-label={`Subir ${title.toLowerCase()}`}
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Imagen
                </Button>
              </div>
            )}

            {error && (
              <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <input
              id={inputId}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              aria-label={`Seleccionar archivo para ${title.toLowerCase()}`}
              disabled={isUploading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
})
