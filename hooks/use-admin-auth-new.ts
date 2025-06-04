"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  username: string
  email: string
  name: string
  role: string
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Verificación inicial al cargar
  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔍 Verificando autenticación inicial...")
      
      const token = localStorage.getItem("admin_token")
      const userData = localStorage.getItem("admin_user")
      
      if (!token || !userData) {
        console.log("❌ No hay credenciales guardadas")
        setIsInitialized(true)
        return
      }

      try {
        const user = JSON.parse(userData)
        console.log("📱 Credenciales encontradas en localStorage")
        
        // Verificar con el servidor
        const response = await fetch("/api/admin/verify", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })

        if (response.ok) {
          console.log("✅ Token válido - Usuario autenticado")
          
          // Asegurar que el token esté en cookies para el middleware
          document.cookie = `admin_token=${token}; path=/; max-age=86400; secure; samesite=strict`
          
          setUser(user)
          setIsAuthenticated(true)
        } else {
          console.log("❌ Token inválido - Limpiando datos")
          localStorage.removeItem("admin_token")
          localStorage.removeItem("admin_user")
          document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
      } catch (error) {
        console.error("❌ Error verificando autenticación:", error)
        localStorage.removeItem("admin_token")
        localStorage.removeItem("admin_user")
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      } finally {
        setIsInitialized(true)
      }
    }

    checkAuth()
  }, [])

  // Función de login
  const login = async (username: string, password: string): Promise<boolean> => {
    console.log("🚀 Iniciando login...")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al iniciar sesión")
      }

      const data = await response.json()
      console.log("📨 Respuesta del servidor:", data)
      
      if (data.token && data.user) {
        console.log("✅ Login exitoso - Guardando credenciales...")
        
        // Guardar en localStorage
        localStorage.setItem("admin_token", data.token)
        localStorage.setItem("admin_user", JSON.stringify(data.user))
        
        // Guardar token en cookies para el middleware
        document.cookie = `admin_token=${data.token}; path=/; max-age=86400; secure; samesite=strict`
        
        // Actualizar estados
        setUser(data.user)
        setIsAuthenticated(true)
        
        console.log("🎉 Estados actualizados - Usuario autenticado")
        return true
      } else {
        throw new Error("Respuesta inválida del servidor")
      }
    } catch (err: any) {
      console.error("❌ Error en login:", err)
      setError(err.message || "Error desconocido")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Función de logout
  const logout = () => {
    console.log("🚪 Cerrando sesión...")
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
    
    // Limpiar cookie
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    
    setIsAuthenticated(false)
    setUser(null)
  }

  return {
    isAuthenticated,
    isLoading,
    isInitialized,
    user,
    error,
    login,
    logout,
  }
}
