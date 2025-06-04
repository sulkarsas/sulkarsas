// lib/image-storage.ts - Servicio para gestionar imágenes en Supabase Storage
import { createClient } from "@supabase/supabase-js"

// Cliente de Supabase para el servidor con permisos de servicio
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

const BUCKET_NAME = "blog-images"

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export class ImageStorage {
  /**
   * Inicializa el bucket de imágenes si no existe
   */
  static async initializeBucket(): Promise<void> {
    try {
      // Verificar si el bucket existe
      const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets()
      
      if (listError) {
        console.error("Error al listar buckets:", listError)
        return
      }

      const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME)

      if (!bucketExists) {
        // Crear el bucket si no existe
        const { error: createError } = await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
          fileSizeLimit: 5242880, // 5MB
        })

        if (createError) {
          console.error("Error al crear bucket:", createError)
        } else {
          console.log("✅ Bucket de imágenes creado exitosamente")
        }
      }
    } catch (error) {
      console.error("Error al inicializar bucket:", error)
    }
  }

  /**
   * Sube una imagen al storage de Supabase
   */
  static async uploadImage(file: File, folder: string = "blog"): Promise<UploadResult> {
    try {
      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        return {
          success: false,
          error: "El archivo debe ser una imagen"
        }
      }

      // Validar tamaño (5MB máximo)
      if (file.size > 5242880) {
        return {
          success: false,
          error: "La imagen debe ser menor a 5MB"
        }
      }

      // Generar nombre único para el archivo
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const fileExtension = file.name.split('.').pop()
      const fileName = `${folder}/${timestamp}-${randomString}.${fileExtension}`

      // Subir archivo
      const { data, error } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error("Error al subir imagen:", error)
        return {
          success: false,
          error: `Error al subir imagen: ${error.message}`
        }
      }

      // Obtener URL pública
      const { data: publicUrlData } = supabaseAdmin.storage
        .from(BUCKET_NAME)
        .getPublicUrl(data.path)

      return {
        success: true,
        url: publicUrlData.publicUrl
      }

    } catch (error) {
      console.error("Error inesperado al subir imagen:", error)
      return {
        success: false,
        error: "Error inesperado al subir la imagen"
      }
    }
  }

  /**
   * Elimina una imagen del storage
   */
  static async deleteImage(url: string): Promise<boolean> {
    try {
      // Extraer el path de la URL
      const path = url.split(`${BUCKET_NAME}/`)[1]
      
      if (!path) {
        console.warn("No se pudo extraer el path de la URL:", url)
        return false
      }

      const { error } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .remove([path])

      if (error) {
        console.error("Error al eliminar imagen:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Error inesperado al eliminar imagen:", error)
      return false
    }
  }

  /**
   * Migra una imagen base64 a Supabase Storage
   */
  static async migrateBase64Image(base64Data: string, folder: string = "blog"): Promise<UploadResult> {
    try {
      // Convertir base64 a File
      const response = await fetch(base64Data)
      const blob = await response.blob()
      
      // Determinar tipo de archivo y extensión
      const mimeType = blob.type || 'image/jpeg'
      const extension = mimeType.split('/')[1] || 'jpg'
      
      const file = new File([blob], `migrated.${extension}`, { type: mimeType })
      
      return await this.uploadImage(file, folder)
    } catch (error) {
      console.error("Error al migrar imagen base64:", error)
      return {
        success: false,
        error: "Error al migrar la imagen"
      }
    }
  }

  /**
   * Obtiene la URL pública de una imagen
   */
  static getPublicUrl(path: string): string {
    const { data } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path)
    
    return data.publicUrl
  }
}
