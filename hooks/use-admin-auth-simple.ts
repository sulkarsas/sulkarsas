"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  username: string
  email: string
  name: string
  role: string
}

export function useAdminAuthSimple() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    console.log("🔍 [SIMPLE] Verificando autenticación inicial...")
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("admin_token")
      const userData = localStorage.getItem("admin_user")
      
      console.log("📱 [SIMPLE] Datos en localStorage:", { 
        tieneToken: !!token, 
        tieneUsuario: !!userData 
      })
      
      if (!token || !userData) {
        console.log("❌ [SIMPLE] No hay credenciales guardadas")
        setIsLoading(false)
        return
      }

      const user = JSON.parse(userData)
      console.log("👤 [SIMPLE] Usuario encontrado:", user.username)
        // Asegurar que el token esté en cookies
      console.log("🍪 [SIMPLE] Cookies actuales:", document.cookie)
      
      // Configuración más simple de cookies
      document.cookie = `admin_token=${token}; path=/`
      console.log("🍪 [SIMPLE] Cookie configurada simple:", `admin_token=${token}; path=/`)
      
      setUser(user)
      setIsAuthenticated(true)
      console.log("✅ [SIMPLE] Usuario autenticado exitosamente")
      
    } catch (error) {
      console.error("❌ [SIMPLE] Error en checkAuth:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log("🚀 [SIMPLE] Iniciando login...")
    
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        console.log("❌ [SIMPLE] Login fallido - respuesta no OK")
        return false
      }

      const data = await response.json()
      console.log("📨 [SIMPLE] Respuesta del servidor:", data)
      
      if (data.token && data.user) {
        console.log("✅ [SIMPLE] Login exitoso - Guardando credenciales...")
        
        // Guardar en localStorage
        localStorage.setItem("admin_token", data.token)
        localStorage.setItem("admin_user", JSON.stringify(data.user))
          // Guardar en cookies con configuración simple
        document.cookie = `admin_token=${data.token}; path=/`
        console.log("🍪 [SIMPLE] Cookie de login configurada simple:", `admin_token=${data.token}; path=/`)
        
        // Actualizar estados
        setUser(data.user)
        setIsAuthenticated(true)
        
        console.log("🎉 [SIMPLE] Estados actualizados - Usuario autenticado")
        return true
      }
      
      return false
    } catch (error) {
      console.error("❌ [SIMPLE] Error en login:", error)
      return false
    }
  }
  const logout = () => {
    console.log("🚪 [SIMPLE] Cerrando sesión...")
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    setIsAuthenticated(false)
    setUser(null)
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  }
}
