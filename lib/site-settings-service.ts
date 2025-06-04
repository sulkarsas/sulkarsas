import supabase from "@/lib/supabaseClient" // Usar el cliente público

export interface SiteSettings {
  [key: string]: any
}

export class SiteSettingsService {
  // Obtener todas las configuraciones del sitio
  static async getAllSettings(): Promise<SiteSettings> {
    const { data, error } = await supabase.from("site_settings").select("key, value")

    if (error) {
      console.error("Error fetching site settings:", error)
      throw error
    }

    // Convertir array de configuraciones a objeto
    return data.reduce((acc, item) => {
      acc[item.key] = item.value
      return acc
    }, {} as SiteSettings)
  }

  // Obtener una configuración específica
  static async getSetting(key: string): Promise<any> {
    const { data, error } = await supabase.from("site_settings").select("value").eq("key", key).single()

    if (error) {
      if (error.code === "PGRST116") {
        // No se encontró la configuración
        return null
      }
      console.error(`Error fetching setting ${key}:`, error)
      throw error
    }

    return data.value
  }
}
