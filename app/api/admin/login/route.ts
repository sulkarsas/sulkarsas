import { NextResponse } from "next/server"
import { AuthService } from "@/lib/auth-service"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
  console.log("=== ENDPOINT LOGIN ALCANZADO ===")

  try {
    const body = await request.json()
    console.log("Credenciales recibidas:", { username: body.username, hasPassword: !!body.password })

    const { username, password } = body

    if (!username || !password) {
      console.log("ERROR: Faltan credenciales")
      return NextResponse.json({ message: "Usuario y contraseña son requeridos" }, { status: 400 })
    }

    // Verificar credenciales usando AuthService
    const isValid = await AuthService.verifyCredentials(username, password)

    if (isValid) {
      console.log("Credenciales válidas")

      // Obtener datos del administrador
      const adminData = await AuthService.getAdminByUsername(username)
      
      console.log("Admin data retrieved:", adminData)
      
      if (!adminData) {
        return NextResponse.json({ message: "Error al obtener datos del usuario" }, { status: 500 })
      }

      // Actualizar último login
      await AuthService.updateLastLogin(username)

      // Generar JWT token
      const token = jwt.sign(
        { 
          userId: adminData.id, 
          username: adminData.username,
          role: adminData.role 
        },
        process.env.JWT_SECRET || "sulkar-secret-key-change-in-production",
        { expiresIn: "24h" }
      )

      const responseData = {
        token,
        user: {
          id: adminData.id,
          username: adminData.username,
          email: adminData.email || '',
          name: adminData.full_name || adminData.username,
          role: adminData.role || 'admin',
        },
      }

      console.log("Response data prepared:", responseData)

      return NextResponse.json(responseData)
    }

    console.log("Credenciales inválidas")
    return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 })
  } catch (error) {
    console.error("ERROR en endpoint login:", error)
    return NextResponse.json(
      {
        message: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  console.log("GET request a /api/admin/login")
  return NextResponse.json({ message: "Endpoint funcionando" })
}
