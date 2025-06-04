import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

// Cliente único de Supabase para el lado del cliente
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
)

export default supabase
