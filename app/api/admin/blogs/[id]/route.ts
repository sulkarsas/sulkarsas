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

// GET - Obtener un blog específico
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Verificar token de administrador
    const authResult = await verifyAdminToken(request)
    if (!authResult.valid) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    const id = params.id

    // Obtener blog
    const { data, error } = await supabaseAdmin.from("blogs").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error al obtener blog ${id}:`, error)
      return NextResponse.json({ message: "Blog no encontrado" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error en GET /api/admin/blogs/${params.id}:`, error)
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}

// PUT - Actualizar un blog
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Verificar token de administrador
    const authResult = await verifyAdminToken(request)
    if (!authResult.valid) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    const id = params.id
    const blogData = await request.json()

    // Actualizar fecha de modificación
    blogData.updated_at = new Date().toISOString()

    // Actualizar blog
    const { data, error } = await supabaseAdmin.from("blogs").update(blogData).eq("id", id).select().single()

    if (error) {
      console.error(`Error al actualizar blog ${id}:`, error)
      return NextResponse.json({ message: "Error al actualizar blog" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error en PUT /api/admin/blogs/${params.id}:`, error)
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}

// DELETE - Eliminar un blog
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Verificar token de administrador
    const authResult = await verifyAdminToken(request)
    if (!authResult.valid) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    const id = params.id

    // Eliminar blog
    const { error } = await supabaseAdmin.from("blogs").delete().eq("id", id)

    if (error) {
      console.error(`Error al eliminar blog ${id}:`, error)
      return NextResponse.json({ message: "Error al eliminar blog" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error en DELETE /api/admin/blogs/${params.id}:`, error)
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}

// PATCH - Actualizar estado de un blog
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    // Verificar token de administrador
    const authResult = await verifyAdminToken(request)
    if (!authResult.valid) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    const id = params.id
    const { status } = await request.json()

    if (!status) {
      return NextResponse.json({ message: "Estado es requerido" }, { status: 400 })
    }

    // Actualizar estado del blog
    const { data, error } = await supabaseAdmin
      .from("blogs")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error(`Error al actualizar estado del blog ${id}:`, error)
      return NextResponse.json({ message: "Error al actualizar estado del blog" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error en PATCH /api/admin/blogs/${params.id}:`, error)
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}
