import jwt from "jsonwebtoken"
import { createClient } from "@supabase/supabase-js"

// Clave secreta para JWT
const JWT_SECRET = process.env.JWT_SECRET || "sulkar-secret-key-change-in-production"

// Crear cliente Supabase para el servidor
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

interface AuthResult {
  valid: boolean
  message?: string
  status?: number
  user?: any
}

export async function verifyAdminToken(request: Request): Promise<AuthResult> {
  try {
    // Obtener token de autorización
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        valid: false,
        message: "Token no proporcionado",
        status: 401,
      }
    }

    const token = authHeader.split(" ")[1]

    // Verificar token
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        userId: string
        username: string
        role: string
      }

      // Verificar que el usuario sigue existiendo y es administrador
      const { data: adminData, error: adminError } = await supabaseAdmin
        .from("admin_users")
        .select("*")
        .eq("id", decoded.userId)
        .eq("is_active", true)
        .single()

      if (adminError || !adminData) {
        return {
          valid: false,
          message: "Usuario no encontrado",
          status: 401,
        }
      }

      if (adminData.role !== "admin") {
        return {
          valid: false,
          message: "No tienes permisos de administrador",
          status: 403,
        }
      }

      // Token válido
      return {
        valid: true,
        user: {
          id: adminData.id,
          email: adminData.email,
          name: adminData.full_name || adminData.username || "Administrador",
          role: adminData.role,
        },
      }
    } catch (error) {
      console.error("Error al verificar token:", error)
      return {
        valid: false,
        message: "Token inválido o expirado",
        status: 401,
      }
    }
  } catch (error) {
    console.error("Error en verificación de token:", error)
    return {
      valid: false,
      message: "Error interno del servidor",
      status: 500,
    }
  }
}
