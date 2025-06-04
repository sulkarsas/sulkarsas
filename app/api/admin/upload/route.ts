// app/api/admin/upload/route.ts - API endpoint para subir imágenes
import { NextRequest, NextResponse } from "next/server"
import { ImageStorage } from "@/lib/image-storage"
import { verifyAdminToken } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    console.log("📁 UPLOAD API: Iniciando subida de imagen...")

    // Verificar autenticación de administrador
    const authResult = await verifyAdminToken(request)
    if (!authResult.valid) {
      console.log("❌ UPLOAD API: Token inválido")
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    // Obtener el archivo del formulario
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "blog"

    if (!file) {
      console.log("❌ UPLOAD API: No se proporcionó archivo")
      return NextResponse.json({ message: "No se proporcionó archivo" }, { status: 400 })
    }

    console.log("📁 UPLOAD API: Archivo recibido:", {
      name: file.name,
      size: file.size,
      type: file.type,
      folder
    })

    // Inicializar bucket si no existe
    await ImageStorage.initializeBucket()

    // Subir imagen
    const result = await ImageStorage.uploadImage(file, folder)

    if (!result.success) {
      console.error("❌ UPLOAD API: Error al subir imagen:", result.error)
      return NextResponse.json({ message: result.error }, { status: 500 })
    }

    console.log("✅ UPLOAD API: Imagen subida exitosamente:", result.url)
    return NextResponse.json({ 
      success: true, 
      url: result.url,
      message: "Imagen subida exitosamente"
    })

  } catch (error) {
    console.error("❌ UPLOAD API: Error inesperado:", error)
    return NextResponse.json(
      { 
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : "Error desconocido"
      }, 
      { status: 500 }
    )
  }
}

// Endpoint para eliminar imágenes
export async function DELETE(request: NextRequest) {
  try {
    console.log("🗑️ DELETE API: Iniciando eliminación de imagen...")

    // Verificar autenticación de administrador
    const authResult = await verifyAdminToken(request)
    if (!authResult.valid) {
      console.log("❌ DELETE API: Token inválido")
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    const { url } = await request.json()

    if (!url) {
      console.log("❌ DELETE API: No se proporcionó URL")
      return NextResponse.json({ message: "No se proporcionó URL de imagen" }, { status: 400 })
    }

    console.log("🗑️ DELETE API: Eliminando imagen:", url)

    // Eliminar imagen
    const success = await ImageStorage.deleteImage(url)

    if (!success) {
      console.error("❌ DELETE API: Error al eliminar imagen")
      return NextResponse.json({ message: "Error al eliminar imagen" }, { status: 500 })
    }

    console.log("✅ DELETE API: Imagen eliminada exitosamente")
    return NextResponse.json({ 
      success: true,
      message: "Imagen eliminada exitosamente"
    })

  } catch (error) {
    console.error("❌ DELETE API: Error inesperado:", error)
    return NextResponse.json(
      { 
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : "Error desconocido"
      }, 
      { status: 500 }
    )
  }
}
