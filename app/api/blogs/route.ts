import { NextResponse } from "next/server"
import { BlogService } from "@/lib/blog-service"

// GET - Obtener todos los blogs publicados (público)
export async function GET() {
  try {
    console.log("🔍 API: Obteniendo blogs publicados...")

    const blogs = await BlogService.getAllPublishedBlogs()

    console.log(`✅ API: ${blogs.length} blogs encontrados`)

    return NextResponse.json(blogs)
  } catch (error) {
    console.error("❌ Error en GET /api/blogs:", error)
    return NextResponse.json(
      { message: "Error al obtener blogs", error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 },
    )
  }
}
