"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminPanel } from "@/components/admin-panel"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock, Eye, EyeOff } from "lucide-react"

export default function AdminSimplePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loginLoading, setLoginLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("admin_token")
        const user = localStorage.getItem("admin_user")
        
        if (token && user) {
          console.log("✅ Token encontrado - Usuario autenticado")
          setIsAuthenticated(true)
        } else {
          console.log("❌ No hay credenciales guardadas")
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    // Dar un pequeño delay para evitar problemas de hidratación
    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setError("")

    try {
      console.log("🔑 Intentando iniciar sesión...")
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log("✅ Login exitoso - Guardando credenciales")
        localStorage.setItem("admin_token", data.token)
        localStorage.setItem("admin_user", JSON.stringify(data.user))
        setIsAuthenticated(true)
        setError("")
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Credenciales incorrectas. Intenta de nuevo.")
      }
    } catch (error) {
      console.error("❌ Error en login:", error)
      setError("Error de conexión. Verifica tu conexión a internet.")
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = () => {
    console.log("🚪 Cerrando sesión...")
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
    setIsAuthenticated(false)
    setUsername("")
    setPassword("")
    router.push("/")
  }

  // Loading inicial
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-sulkar-green" />
          <span>Cargando panel de administración...</span>
        </div>
      </div>
    )
  }

  // Mostrar panel de admin si está autenticado
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto py-8 px-4">
          {/* Header del panel */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                ✅ SOLUCIÓN FINAL - Panel de Gestión
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                🎉 Sistema funcionando - Gestiona el contenido del sitio web SULKAR
              </p>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <Lock className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
          
          {/* Panel principal */}
          <AdminPanel onClose={handleLogout} />
        </div>
      </div>
    )
  }

  // Mostrar formulario de login
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-sulkar-green/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-sulkar-green" />
          </div>
          <h1 className="text-2xl font-semibold">🎯 Panel Administrativo</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Solución directa y simple para gestionar blogs
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loginLoading}
                autoComplete="username"
                placeholder="Ingresa tu usuario"
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
                  required
                  disabled={loginLoading}
                  autoComplete="current-password"
                  className="pr-10"
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  disabled={loginLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-sulkar-green hover:bg-sulkar-green/90"
              disabled={loginLoading}
            >
              {loginLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando credenciales...
                </>
              ) : (
                "🚀 Acceder al Panel"
              )}
            </Button>
          </form>

          {/* Información de ayuda */}
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
              ✅ SOLUCIÓN COMPLETADA
            </h4>
            <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <p>Usuario: <code className="bg-green-100 dark:bg-green-800 px-1 rounded">admin</code></p>
              <p>Contraseña: <code className="bg-green-100 dark:bg-green-800 px-1 rounded">sulkar2024</code></p>
              <p className="mt-2 font-medium">🎯 Acceso directo sin redirecciones complejas</p>
            </div>
          </div>

          {/* Características del panel */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              🛠️ Funcionalidades disponibles
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• ✍️ Crear y editar posts de blog</li>
              <li>• 📸 Subir y gestionar imágenes</li>
              <li>• 👀 Vista previa en tiempo real</li>
              <li>• 🏷️ Gestión de categorías y etiquetas</li>
              <li>• 🚀 Sin problemas de redirección</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
