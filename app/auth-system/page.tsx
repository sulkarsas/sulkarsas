"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock, Eye, EyeOff } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"

export default function AuthPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login, isAuthenticated, isLoading: authLoading, isInitialized } = useAdminAuth()
  const router = useRouter()
  // Manejar redirección cuando se autentica
  useEffect(() => {
    console.log("🔄 Verificando estado para redirección:", { 
      isAuthenticated, 
      authLoading, 
      isInitialized 
    })
    
    if (isInitialized && isAuthenticated && !authLoading) {
      console.log("🎯 Condiciones cumplidas - Redirigiendo a /management...")
      
      // Pequeño delay para asegurar que las cookies se hayan guardado
      setTimeout(() => {
        console.log("🍪 Verificando cookies antes de redirigir:", document.cookie)
        router.push("/management")
      }, 500)
    }
  }, [isAuthenticated, authLoading, isInitialized, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("📝 Enviando formulario de login...")
      const success = await login(username, password)
      
      if (success) {
        console.log("✅ Login exitoso - Esperando redirección...")
        // El useEffect se encargará de la redirección
      } else {
        setError("Credenciales incorrectas")
      }
    } catch (error) {
      console.error("❌ Error en login:", error)
      setError("Error de conexión")
    } finally {
      setIsLoading(false)
    }
  }

  // Mostrar loading mientras no esté inicializado o mientras carga
  if (!isInitialized || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-sulkar-green" />
          <span>Verificando autenticación...</span>
        </div>
      </div>
    )
  }

  // Mostrar loading si está autenticado (mientras redirige)
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-sulkar-green" />
          <span>Redirigiendo al panel de administración...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-sulkar-green/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-sulkar-green" />
          </div>
          <h1 className="text-2xl font-semibold">Sistema de Gestión</h1>
          <p className="text-gray-600 dark:text-gray-400">Acceso autorizado únicamente</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  disabled={isLoading}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-sulkar-green hover:bg-sulkar-green/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verificando...
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
