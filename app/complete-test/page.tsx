"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import Cookies from "js-cookie"

export default function CompleteTestPage() {
  const [logs, setLogs] = useState<string[]>([])
  const [isTestInProgress, setIsTestInProgress] = useState(false)
  const { login, isAuthenticated, isLoading, user } = useAdminAuth()
  const router = useRouter()

  const addLog = (message: string) => {
    console.log(message)
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const runCompleteTest = async () => {
    setIsTestInProgress(true)
    setLogs([])
    
    try {
      addLog("🚀 Iniciando test completo de autenticación...")
      
      // Step 1: Clear any existing data
      addLog("🧹 Limpiando datos existentes...")
      localStorage.removeItem("admin_token")
      localStorage.removeItem("admin_user")
      Cookies.remove("admin_token", { path: "/" })
      
      // Step 2: Verify we start clean
      const initialToken = Cookies.get("admin_token")
      addLog(`🔍 Estado inicial - Cookie: ${initialToken ? "EXISTE" : "VACÍA"}`)
      
      // Step 3: Perform login
      addLog("📝 Ejecutando login...")
      const loginSuccess = await login("admin", "sulkar2024")
      
      if (loginSuccess) {
        addLog("✅ Login exitoso!")
        
        // Step 4: Check tokens were saved
        const localStorageToken = localStorage.getItem("admin_token")
        const cookieToken = Cookies.get("admin_token")
        
        addLog(`💾 LocalStorage: ${localStorageToken ? "GUARDADO" : "VACÍO"}`)
        addLog(`🍪 Cookie: ${cookieToken ? "GUARDADA" : "VACÍA"}`)
        
        if (cookieToken) {
          addLog(`🔍 Cookie value: ${cookieToken.substring(0, 20)}...`)
        }
        
        // Step 5: Test server-side cookie reading
        addLog("🖥️ Probando lectura de cookies del servidor...")
        try {
          const debugResponse = await fetch("/api/debug/cookies")
          const debugData = await debugResponse.json()
          
          addLog(`📊 Server cookie analysis:`)
          addLog(`   - Has admin token: ${debugData.hasAdminToken}`)
          addLog(`   - Token length: ${debugData.adminTokenLength}`)
          addLog(`   - All cookies: ${debugData.allCookieNames.join(", ")}`)
          
        } catch (error) {
          addLog(`❌ Error checking server cookies: ${error}`)
        }
        
        // Step 6: Test middleware access
        addLog("🛡️ Probando acceso al middleware...")
        try {
          const response = await fetch("/management", {
            method: "GET",
            redirect: "manual"
          })
          
          addLog(`📡 Respuesta del middleware: ${response.status} ${response.statusText}`)
          addLog(`🌐 URL final: ${response.url}`)
          
          if (response.status === 200) {
            addLog("🎉 ¡ÉXITO! El middleware permite el acceso")
          } else if (response.status === 307 || response.status === 302) {
            addLog("❌ El middleware redirige - No encuentra la cookie")
          }
          
        } catch (error) {
          addLog(`❌ Error en petición al middleware: ${error}`)
        }
        
      } else {
        addLog("❌ Login falló")
      }
      
    } catch (error) {
      addLog(`❌ Error durante el test: ${error}`)    } finally {
      setIsTestInProgress(false)
    }
  }

  const testServerCookies = async () => {
    addLog("🖥️ Probando lectura de cookies del servidor...")
    try {
      const response = await fetch("/api/debug/cookies")
      const data = await response.json()
      
      addLog("📊 Resultado del servidor:")
      addLog(`   - Has admin token: ${data.hasAdminToken}`)
      addLog(`   - Token length: ${data.adminTokenLength}`)
      addLog(`   - Cookie names: ${data.allCookieNames.join(", ")}`)
      addLog(`   - Cookie header: ${data.cookieString.substring(0, 50)}...`)
      
    } catch (error) {
      addLog(`❌ Error: ${error}`)
    }
  }

  const testDirectAccess = async () => {
    addLog("🔗 Probando acceso directo a /management...")
    try {
      const response = await fetch("/management")
      addLog(`📡 Respuesta: ${response.status} - ${response.url}`)
    } catch (error) {
      addLog(`❌ Error: ${error}`)
    }
  }

  const goToManagement = () => {
    addLog("➡️ Navegando a /management...")
    router.push("/management")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Test Completo de Autenticación</h1>
        
        {/* Current Status */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Estado Actual</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Autenticado:</strong> {isAuthenticated ? "✅ Sí" : "❌ No"}
            </div>
            <div>
              <strong>Cargando:</strong> {isLoading ? "⏳ Sí" : "✅ No"}
            </div>
            <div>
              <strong>Usuario:</strong> {user?.username || "N/A"}
            </div>
            <div>
              <strong>Cookie:</strong> {Cookies.get("admin_token") ? "✅ Presente" : "❌ Ausente"}
            </div>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Controles de Test</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={runCompleteTest}
              disabled={isTestInProgress}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isTestInProgress ? "🔄 Ejecutando..." : "🚀 Ejecutar Test Completo"}
            </button>            <button
              onClick={testServerCookies}
              className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
            >
              🖥️ Test Server Cookies
            </button>
            <button
              onClick={testDirectAccess}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              🔗 Test Acceso Directo
            </button>
            <button
              onClick={goToManagement}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              ➡️ Ir a Management
            </button>
          </div>
        </div>

        {/* Logs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Logs del Test</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-gray-500">Ejecuta un test para ver los logs...</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
