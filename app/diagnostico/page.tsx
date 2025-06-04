"use client"

import { useState, useEffect } from "react"
import { useAdminAuth } from "@/hooks/use-admin-auth"

export default function DiagnosticoPage() {
  const [logs, setLogs] = useState<string[]>([])
  const { isAuthenticated, isLoading, isInitialized, user, login } = useAdminAuth()
  
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, `${timestamp}: ${message}`])
  }

  useEffect(() => {
    addLog(`Estado inicial - Autenticado: ${isAuthenticated}, Cargando: ${isLoading}, Inicializado: ${isInitialized}`)
  }, [isAuthenticated, isLoading, isInitialized])

  const testLogin = async () => {
    addLog("🚀 Iniciando test de login...")
    const success = await login("admin", "sulkar2024")
    addLog(`📝 Resultado del login: ${success ? "ÉXITO" : "FALLO"}`)
  }

  const checkLocalStorage = () => {
    const token = localStorage.getItem("admin_token")
    const user = localStorage.getItem("admin_user")
    addLog(`💾 LocalStorage - Token: ${!!token}, Usuario: ${!!user}`)
    if (token) addLog(`🔑 Token length: ${token.length}`)
    if (user) addLog(`👤 Usuario: ${user}`)
  }

  const clearStorage = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
    addLog("🗑️ LocalStorage limpiado")
    window.location.reload()
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 Diagnóstico de Autenticación</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Estado Actual</h2>
            <div className="space-y-2 text-sm">
              <div>Autenticado: <span className={isAuthenticated ? "text-green-600" : "text-red-600"}>{isAuthenticated ? "SÍ" : "NO"}</span></div>
              <div>Cargando: <span className={isLoading ? "text-orange-600" : "text-gray-600"}>{isLoading ? "SÍ" : "NO"}</span></div>
              <div>Inicializado: <span className={isInitialized ? "text-green-600" : "text-red-600"}>{isInitialized ? "SÍ" : "NO"}</span></div>
              <div>Usuario: {user ? user.username : "Ninguno"}</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Acciones</h2>
            <div className="space-y-2">
              <button 
                onClick={testLogin}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                🔐 Test Login
              </button>
              <button 
                onClick={checkLocalStorage}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                💾 Verificar Storage
              </button>
              <button 
                onClick={clearStorage}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                🗑️ Limpiar Storage
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">📋 Logs en Tiempo Real</h2>
          <div className="bg-gray-100 p-4 rounded h-64 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="text-sm mb-1 font-mono">{log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
