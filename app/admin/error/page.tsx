"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>("Ha ocurrido un error durante la autenticación")

  useEffect(() => {
    // Obtener el error de los parámetros de búsqueda
    const error = searchParams.get("error")

    // Mapear códigos de error a mensajes amigables
    if (error) {
      switch (error) {
        case "CredentialsSignin":
          setErrorMessage("Las credenciales proporcionadas son incorrectas")
          break
        case "SessionRequired":
          setErrorMessage("Debes iniciar sesión para acceder a esta página")
          break
        case "AccessDenied":
          setErrorMessage("No tienes permiso para acceder a esta página")
          break
        case "CallbackRouteError":
          setErrorMessage("Error en la ruta de callback")
          break
        case "OAuthSignInError":
          setErrorMessage("Error al iniciar sesión con proveedor externo")
          break
        case "OAuthCallbackError":
          setErrorMessage("Error en la respuesta del proveedor de autenticación")
          break
        case "OAuthAccountNotLinked":
          setErrorMessage("Esta cuenta ya está vinculada a otro usuario")
          break
        case "EmailCreateError":
          setErrorMessage("Error al crear la cuenta con este email")
          break
        case "EmailSignInError":
          setErrorMessage("Error al iniciar sesión con este email")
          break
        case "CredentialsSignUp":
          setErrorMessage("Error al registrar la cuenta")
          break
        case "Default":
        default:
          setErrorMessage("Ha ocurrido un error desconocido durante la autenticación")
          break
      }
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Error de Autenticación</CardTitle>
          <CardDescription className="text-center">No se pudo completar el proceso de autenticación</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
          <p className="text-sm text-gray-500 mt-2">
            Si el problema persiste, por favor contacta al administrador del sistema.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">Volver al Inicio</Link>
          </Button>
          <Button asChild>
            <Link href="/admin">Intentar de Nuevo</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
