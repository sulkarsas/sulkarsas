import { createClient } from "@supabase/supabase-js"

// Cliente simple para evitar múltiples instancias
let supabaseInstance: any = null

export function getSupabaseClient() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  }
  return supabaseInstance
}
