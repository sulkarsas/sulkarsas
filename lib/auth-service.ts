// lib/auth-service.ts
// ESTE ARCHIVO ES SOLO PARA EL SERVIDOR (API ROUTES)
import supabaseAdmin from "@/lib/supabaseAdmin"
import bcrypt from "bcryptjs"

export class AuthService {
  /**
   * Verifica las credenciales de un administrador
   * SOLO USAR EN EL SERVIDOR
   */
  static async verifyCredentials(username: string, password: string): Promise<boolean> {
    try {
      // Buscar el usuario en la base de datos
      const { data: admin, error } = await supabaseAdmin
        .from("admin_users")
        .select("id, username, password_hash")
        .eq("username", username)
        .eq("is_active", true)
        .single()

      if (error || !admin) {
        console.error("Usuario no encontrado:", error)
        return false
      }

      // Verificar la contraseña usando bcrypt directamente
      const bcrypt = await import("bcryptjs")
      const isValid = await bcrypt.compare(password, admin.password_hash)

      return isValid
    } catch (error) {
      console.error("Error verificando credenciales:", error)
      return false
    }
  }

  /**
   * Actualiza el último login de un administrador
   * SOLO USAR EN EL SERVIDOR
   */
  static async updateLastLogin(username: string): Promise<void> {
    try {
      await supabaseAdmin.from("admin_users").update({ last_login: new Date().toISOString() }).eq("username", username)
    } catch (error) {
      console.error("Error actualizando último login:", error)
    }
  }

  /**
   * Obtiene los datos completos de un administrador
   * SOLO USAR EN EL SERVIDOR
   */
  static async getAdminByUsername(username: string) {
    try {
      const { data, error } = await supabaseAdmin
        .from("admin_users")
        .select("id, username, email, role, full_name")
        .eq("username", username)
        .eq("is_active", true)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error obteniendo admin:", error)
      return null
    }
  }

  /**
   * Crea un hash seguro para una contraseña
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
  }

  /**
   * Crea un nuevo administrador (útil para setup inicial)
   * SOLO USAR EN EL SERVIDOR
   */
  static async createAdmin(username: string, password: string, email?: string, role: "admin" | "editor" | "viewer" = "admin") {
    try {
      const passwordHash = await this.hashPassword(password)

      const { data, error } = await supabaseAdmin
        .from("admin_users")
        .insert({
          username,
          password_hash: passwordHash,
          email,
          role: role as "admin" | "editor" | "viewer",
          is_active: true,
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error creando admin:", error)
      return null
    }
  }
}
