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

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔍 Checking authentication status...")
      
      try {
        const token = localStorage.getItem("admin_token")
        const storedUser = localStorage.getItem("admin_user")

        if (!token || !storedUser) {
          console.log("❌ No stored credentials found")
          setIsAuthenticated(false)
          setUser(null)
          setIsLoading(false)
          return
        }

        // Validate stored user data
        let userData
        try {
          userData = JSON.parse(storedUser)
          console.log("✅ Valid user data found:", userData.username)
        } catch (parseError) {
          console.warn("🗑️ Corrupted user data, clearing storage")
          localStorage.removeItem("admin_token")
          localStorage.removeItem("admin_user")
          setIsAuthenticated(false)
          setUser(null)
          setIsLoading(false)
          return
        }

        // Verify token with server
        try {
          const response = await fetch("/api/admin/verify", {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          })

          if (response.ok) {
            console.log("✅ Token verified, user authenticated")
            setUser(userData)
            setIsAuthenticated(true)
          } else {
            console.log("❌ Token invalid, clearing storage")
            localStorage.removeItem("admin_token")
            localStorage.removeItem("admin_user")
            setIsAuthenticated(false)
            setUser(null)
          }
        } catch (verifyError) {
          console.error("🌐 Network error verifying token:", verifyError)
          setIsAuthenticated(false)
          setUser(null)
        }
      } catch (err) {
        console.error("💥 Error in auth check:", err)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Función de login
  const login = async (username: string, password: string): Promise<boolean> => {
    console.log("🚀 Starting login process...")
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
      
      if (data.token && data.user) {
        console.log("✅ Login successful, storing credentials")
        localStorage.setItem("admin_token", data.token)
        localStorage.setItem("admin_user", JSON.stringify(data.user))
        setUser(data.user)
        setIsAuthenticated(true)
        return true
      } else {
        throw new Error("Respuesta inválida del servidor")
      }
    } catch (err: any) {
      console.error("❌ Login error:", err)
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
    user,
    error,
    login,
    logout,
  }
}
