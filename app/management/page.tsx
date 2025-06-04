"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminPanel } from "@/components/admin-panel"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, Loader2 } from "lucide-react"

export default function ManagementPage() {
  const [isClient, setIsClient] = useState(false)
  const { isAuthenticated, isLoading, isInitialized } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    console.log("🔄 Estado en management:", { 
      isClient, 
      isAuthenticated, 
      isLoading, 
      isInitialized 
    })
  }, [isClient, isAuthenticated, isLoading, isInitialized])

  // Mostrar loading mientras no esté inicializado o mientras carga
  if (!isClient || !isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-sulkar-green" />
          <span>Cargando sistema de gestión...</span>
        </div>
      </div>
    )
  }

  // Si no está autenticado, el middleware se encargará de la redirección
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Lock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Acceso Restringido</h2>
            <p className="text-gray-600 dark:text-gray-400">Esta área requiere credenciales especiales.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <AdminPanel onClose={() => router.push("/")} />
      </div>
    </div>
  )
}
