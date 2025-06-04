import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

// Verificar que estamos en el servidor
if (typeof window !== "undefined") {
  throw new Error("supabaseAdmin solo debe usarse en el servidor")
}

// Cliente administrativo de Supabase (solo servidor)
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

export default supabaseAdmin
