"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function DebugAuthPage() {
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    const checkStorage = () => {
      const token = localStorage.getItem("admin_token")
      const storedUser = localStorage.getItem("admin_user")
      
      let userParseError = null
      let parsedUser = null
      
      if (storedUser) {
        try {
          parsedUser = JSON.parse(storedUser)
        } catch (e: any) {
          userParseError = e.message
        }
      }
      
      setDebugInfo({
        hasToken: !!token,
        tokenLength: token?.length || 0,
        hasStoredUser: !!storedUser,
        storedUserLength: storedUser?.length || 0,
        storedUserRaw: storedUser,
        userParseError,
        parsedUser,
        allLocalStorageKeys: Object.keys(localStorage)
      })
    }
    
    checkStorage()
  }, [])

  const clearStorage = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
    window.location.reload()
  }

  const testLogin = async () => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: "admin", password: "sulkar2024" }),
      })

      const data = await response.json()
      console.log("Login response:", data)
      
      if (data.token && data.user) {
        localStorage.setItem("admin_token", data.token)
        localStorage.setItem("admin_user", JSON.stringify(data.user))
        window.location.reload()
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Auth Debug Page</h1>
        
        <div className="space-y-4 mb-8">
          <Button onClick={testLogin} className="mr-4">Test Login</Button>
          <Button onClick={clearStorage} variant="destructive">Clear Storage</Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
