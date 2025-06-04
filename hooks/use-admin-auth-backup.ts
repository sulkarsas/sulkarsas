"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  role: string
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔍 Iniciando verificación de autenticación...")
      
      try {
        // Esperar un poco para asegurar que localStorage esté disponible
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const token = localStorage.getItem("admin_token")
        const storedUser = localStorage.getItem("admin_user")

        console.log("📦 Datos encontrados:", { 
          tieneToken: !!token, 
          tieneUsuario: !!storedUser,
          longitudToken: token?.length || 0,
          longitudUsuario: storedUser?.length || 0
        })

        if (!token || !storedUser) {
          console.log("❌ No hay credenciales guardadas")
          setIsAuthenticated(false)
          setUser(null)
          setIsLoading(false)
          setIsInitialized(true)
          return
        }

        // Validar datos de usuario almacenados
        let userData
        try {
          userData = JSON.parse(storedUser)
          console.log("✅ Datos de usuario válidos:", userData.username)
        } catch (parseError) {
          console.warn("🗑️ Datos de usuario corruptos, limpiando...")
          localStorage.removeItem("admin_token")
          localStorage.removeItem("admin_user")
          setIsAuthenticated(false)
          setUser(null)
          setIsLoading(false)
          setIsInitialized(true)
          return
        }

        // Verificar token con el servidor
        console.log("🌐 Verificando token con servidor...")
        try {
          const response = await fetch("/api/admin/verify", {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          })

          if (response.ok) {
            console.log("✅ Token válido, usuario autenticado")
            setUser(userData)
            setIsAuthenticated(true)
          } else {
            console.log("❌ Token inválido, limpiando datos")
            localStorage.removeItem("admin_token")
            localStorage.removeItem("admin_user")
            setIsAuthenticated(false)
            setUser(null)
          }
        } catch (verifyError) {
          console.error("🌐 Error de red verificando token:", verifyError)
          // En caso de error de red, usar los datos locales temporalmente
          console.log("📱 Usando autenticación local temporal")
          setUser(userData)
          setIsAuthenticated(true)
        }
      } catch (err) {
        console.error("💥 Error en verificación de autenticación:", err)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setIsLoading(false)
        setIsInitialized(true)
      }
    }

    checkAuth()
  }, [])
  // Función de login mejorada
  const login = async (username: string, password: string): Promise<boolean> => {
    console.log("🚀 Iniciando proceso de login...")
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
        console.log("✅ Login exitoso, guardando credenciales...")
        
        // Guardar en localStorage
        localStorage.setItem("admin_token", data.token)
        localStorage.setItem("admin_user", JSON.stringify(data.user))
        
        // Verificar que se guardó correctamente
        const tokenGuardado = localStorage.getItem("admin_token")
        const usuarioGuardado = localStorage.getItem("admin_user")
        
        console.log("💾 Verificación de guardado:", {
          tokenGuardado: !!tokenGuardado,
          usuarioGuardado: !!usuarioGuardado
        })
        
        // Actualizar estado
        setUser(data.user)
        setIsAuthenticated(true)
        
        console.log("🎉 Estado actualizado: Usuario autenticado")
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
    console.log("🚪 Logging out...")
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
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