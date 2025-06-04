import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { verifyAdminToken } from "@/lib/auth-utils"

// Crear cliente Supabase para el servidor
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// GET - Obtener todos los blogs (para administradores)
export async function GET(request: Request) {
  try {
    console.log("🔍 ADMIN API: Verificando autenticación...")

    // Verificar token de administrador
    const authResult = await verifyAdminToken(request)
    if (!authResult.valid) {
      console.log("❌ ADMIN API: Token inválido")
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    console.log("✅ ADMIN API: Token válido, obteniendo blogs...")

    // Obtener blogs
    const { data, error } = await supabaseAdmin.from("blogs").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("❌ ADMIN API: Error al obtener blogs:", error)
      return NextResponse.json({ message: "Error al obtener blogs", error: error.message }, { status: 500 })
    }

    console.log(`✅ ADMIN API: ${data?.length || 0} blogs encontrados`)
    return NextResponse.json(data || [])
  } catch (error) {
    console.error("❌ Error en GET /api/admin/blogs:", error)
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}

// POST - Crear un nuevo blog
export async function POST(request: Request) {
  try {
    console.log("📝 ADMIN API: Creando nuevo blog...")

    // Verificar token de administrador
    const authResult = await verifyAdminToken(request)
    if (!authResult.valid) {
      console.log("❌ ADMIN API: Token inválido para crear blog")
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    // Obtener datos del blog
    const blogData = await request.json()
    console.log("📝 ADMIN API: Datos recibidos:", {
      title: blogData.title,
      slug: blogData.slug,
      status: blogData.status,
      category: blogData.category,
    })

    // Validar datos mínimos
    if (!blogData.title || !blogData.content) {
      console.log("❌ ADMIN API: Faltan datos requeridos")
      return NextResponse.json({ message: "Título y contenido son requeridos" }, { status: 400 })
    }

    // Generar slug si no existe
    if (!blogData.slug) {
      blogData.slug = blogData.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 50)

      console.log("🔗 ADMIN API: Slug generado:", blogData.slug)
    }

    // Establecer fechas
    const now = new Date().toISOString()
    blogData.created_at = now
    blogData.updated_at = now

    // Si se está publicando, establecer fecha de publicación
    if (blogData.status === "published") {
      blogData.published_at = now
      console.log("📅 ADMIN API: Blog marcado para publicación")
    }

    // Insertar blog
    const { data, error } = await supabaseAdmin.from("blogs").insert(blogData).select().single()

    if (error) {
      console.error("❌ ADMIN API: Error al crear blog:", error)
      return NextResponse.json(
        {
          message: "Error al crear blog",
          error: error.message,
          details: error.details,
        },
        { status: 500 },
      )
    }

    console.log("✅ ADMIN API: Blog creado exitosamente:", data.id)
    return NextResponse.json(data)
  } catch (error) {
    console.error("❌ Error en POST /api/admin/blogs:", error)
    return NextResponse.json(
      {
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
