"use client"

import { useState, useEffect } from "react"
import { useAdminAuth } from "@/hooks/use-admin-auth"

export default function DebugAuthPage() {
  const [debugInfo, setDebugInfo] = useState<any>({})
  const { isAuthenticated, isLoading, isInitialized, user, login } = useAdminAuth()

  useEffect(() => {
    const interval = setInterval(() => {
      const cookies = document.cookie
      const localStorage_token = localStorage.getItem("admin_token")
      const localStorage_user = localStorage.getItem("admin_user")
      
      setDebugInfo({
        timestamp: new Date().toLocaleTimeString(),
        cookies,
        localStorage_token,
        localStorage_user,
        isAuthenticated,
        isLoading,
        isInitialized,
        user,
        hostname: window.location.hostname
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isAuthenticated, isLoading, isInitialized, user])

  const handleTestLogin = async () => {
    console.log("🧪 Test login iniciado")
    const result = await login("admin", "sulkar2024")
    console.log("🧪 Resultado del test login:", result)
  }

  const handleTestCookie = () => {
    const testToken = "test-token-" + Date.now()
    const isLocalhost = window.location.hostname === 'localhost'
    const cookieOptions = isLocalhost 
      ? `test_token=${testToken}; path=/; max-age=86400; samesite=strict`
      : `test_token=${testToken}; path=/; max-age=86400; secure; samesite=strict`
    
    document.cookie = cookieOptions
    console.log("🧪 Cookie de prueba configurada:", cookieOptions)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🔍 Debug de Autenticación</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <button 
          onClick={handleTestLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          🧪 Test Login
        </button>
        <button 
          onClick={handleTestCookie}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          🍪 Test Cookie
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="text-lg font-semibold mb-2">Estado en Tiempo Real:</h2>
        <pre className="text-sm overflow-x-auto">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>

      <div className="bg-yellow-50 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Instrucciones:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Haz clic en "Test Login" para probar el login</li>
          <li>Observa los logs en la consola del navegador</li>
          <li>Verifica que las cookies se configurenen correctamente</li>
          <li>Después del login exitoso, deberías ser redirigido automáticamente</li>
        </ol>
      </div>
    </div>
  )
}
