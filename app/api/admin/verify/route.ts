import { NextResponse } from "next/server"
import { verifyAdminToken } from "@/lib/auth-utils"

export async function GET(request: Request) {
  try {
    // Verificar el token usando la utilidad de autenticación
    const authResult = await verifyAdminToken(request)
    
    if (authResult.valid && authResult.user) {
      return NextResponse.json({
        valid: true,
        user: authResult.user,
      })
    }

    return NextResponse.json({ 
      valid: false, 
      message: authResult.message || "Token inválido" 
    }, { status: 401 })
  } catch (error) {
    console.error("Error verificando token:", error)
    return NextResponse.json({ 
      valid: false, 
      message: "Error interno del servidor" 
    }, { status: 500 })
  }
}
