// hooks/use-image-upload.ts - Hook para gestionar subidas de imágenes
import { useState, useCallback } from "react"

interface UploadState {
  isUploading: boolean
  error: string | null
  progress: number
}

interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export function useImageUpload() {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    error: null,
    progress: 0
  })

  const uploadImage = useCallback(async (file: File, folder: string = "blog"): Promise<UploadResult> => {
    setUploadState({
      isUploading: true,
      error: null,
      progress: 0
    })

    try {
      // Obtener token de autenticación
      const token = localStorage.getItem("admin_token")
      if (!token) {
        throw new Error("No se encontró token de autenticación")
      }

      // Crear FormData
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)

      // Simular progreso
      setUploadState(prev => ({ ...prev, progress: 25 }))

      // Realizar upload
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      })

      setUploadState(prev => ({ ...prev, progress: 75 }))

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Error al subir imagen")
      }

      setUploadState({
        isUploading: false,
        error: null,
        progress: 100
      })

      return {
        success: true,
        url: result.url
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      
      setUploadState({
        isUploading: false,
        error: errorMessage,
        progress: 0
      })

      return {
        success: false,
        error: errorMessage
      }
    }
  }, [])

  const deleteImage = useCallback(async (url: string): Promise<boolean> => {
    try {
      // Obtener token de autenticación
      const token = localStorage.getItem("admin_token")
      if (!token) {
        throw new Error("No se encontró token de autenticación")
      }

      const response = await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Error al eliminar imagen")
      }

      return true

    } catch (error) {
      console.error("Error al eliminar imagen:", error)
      return false
    }
  }, [])

  const resetState = useCallback(() => {
    setUploadState({
      isUploading: false,
      error: null,
      progress: 0
    })
  }, [])

  return {
    uploadImage,
    deleteImage,
    resetState,
    isUploading: uploadState.isUploading,
    error: uploadState.error,
    progress: uploadState.progress
  }
}
