"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<string>("")

  const testAuth = async () => {
    const token = localStorage.getItem("admin_token")
    setResult(`Token encontrado: ${!!token}\nToken: ${token?.substring(0, 50)}...`)

    if (token) {
      try {
        const response = await fetch("/api/admin/verify", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await response.json()
        setResult(prev => prev + `\n\nVerificación: ${response.status}\nRespuesta: ${JSON.stringify(data, null, 2)}`)
      } catch (error) {
        setResult(prev => prev + `\nError en verificación: ${error}`)
      }
    }
  }

  const testUpload = async () => {
    if (!file) {
      setResult("Selecciona un archivo primero")
      return
    }

    setUploading(true)
    const token = localStorage.getItem("admin_token")

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "test")

      console.log("🔍 Debug - Token:", token?.substring(0, 20) + "...")
      console.log("🔍 Debug - Archivo:", file.name, file.size, file.type)

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      })

      const data = await response.json()
      
      setResult(`Status: ${response.status}\nRespuesta: ${JSON.stringify(data, null, 2)}`)
      
    } catch (error) {
      setResult(`Error: ${error}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>🧪 Test de Upload de Imágenes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button onClick={testAuth} className="mr-4">
              Test Autenticación
            </Button>
          </div>
          
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mb-4"
            />
            <Button 
              onClick={testUpload} 
              disabled={!file || uploading}
              className="bg-green-600 hover:bg-green-700"
            >
              {uploading ? "Subiendo..." : "Test Upload"}
            </Button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Resultado:</h3>
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
