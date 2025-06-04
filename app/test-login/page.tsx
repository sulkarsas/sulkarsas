"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuthSimple } from "@/hooks/use-admin-auth-simple"

export default function TestLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const { login, isAuthenticated, isLoading } = useAdminAuthSimple()
  const router = useRouter()

  useEffect(() => {
    console.log("🔄 [TEST] Estado changed:", { isAuthenticated, isLoading })
    
    if (isAuthenticated && !isLoading) {
      console.log("✅ [TEST] Autenticado - Preparando redirección...")
      setMessage("✅ Login exitoso - Redirigiendo en 2 segundos...")
      
      setTimeout(() => {
        console.log("🎯 [TEST] Redirigiendo a /management...")
        router.push("/management")
      }, 2000)
    }
  }, [isAuthenticated, isLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("🔄 Iniciando sesión...")
    
    const success = await login(username, password)
    
    if (success) {
      setMessage("✅ Login exitoso!")
    } else {
      setMessage("❌ Credenciales incorrectas")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-green-500 text-2xl mb-4">✅</div>
          <h1 className="text-xl font-bold">¡Ya estás autenticado!</h1>
          <p className="text-gray-600 mt-2">Redirigiendo al dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">🧪 Test Login Simple</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="sulkar2024"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
        
        {message && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-center">{message}</p>
          </div>
        )}
        
        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>Credenciales de prueba:</p>
          <p>Usuario: admin</p>
          <p>Contraseña: sulkar2024</p>
        </div>
      </div>
    </div>
  )
}
