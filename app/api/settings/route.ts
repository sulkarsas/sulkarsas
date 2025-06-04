import { NextResponse } from "next/server"
import { SiteSettingsService } from "@/lib/site-settings-service"
import supabaseAdmin from "@/lib/supabaseAdmin"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"

export async function GET() {
  try {
    // Obtener todas las configuraciones (usando el servicio que usa el cliente público)
    const settings = await SiteSettingsService.getAllSettings()

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error in GET /api/settings:", error)
    return NextResponse.json({ error: "Error fetching settings" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validar datos
    if (!body.key || body.value === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Actualizar configuración usando el cliente admin (operación protegida)
    const { error } = await supabaseAdmin
      .from("site_settings")
      .update({
        value: body.value,
        updated_at: new Date().toISOString(),
        updated_by: session.user?.id || null,
      })
      .eq("key", body.key)

    if (error) {
      console.error(`Error updating setting ${body.key}:`, error)
      return NextResponse.json({ error: "Error updating setting" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in PUT /api/settings:", error)
    return NextResponse.json({ error: "Error updating setting" }, { status: 500 })
  }
}
