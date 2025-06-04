"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export function AdminAuth() {
  const { login, logout, isAuthenticated, isLoading, error: authError, user } = useAdminAuth()
  const [email, setEmail] = useState("sulkarsas@gmail.com")
  const [password, setPassword] = useState("sulkar2024")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    console.log("Iniciando proceso de login con:", { email })

    const result = await login(email, password)
    console.log("Resultado del login:", result)

    if (!result.success) {
      setError(result.error || "Error al iniciar sesión")
    }
  }

  // Redirect to admin panel after successful login
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Panel de Administración</CardTitle>
          <CardDescription>Sesión iniciada como {user?.email}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={logout} variant="outline" className="w-full">
            Cerrar Sesión
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acceso Administrativo</CardTitle>
        <CardDescription>Ingresa tus credenciales para acceder al panel de administración</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sulkarsas@gmail.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="sulkar2024"
              required
            />
          </div>
          {(error || authError) && (
            <Alert variant="destructive">
              <AlertDescription>{error || authError}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
