"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { subscribeToMailchimp } from "../actions/mailchimp"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState<{ success: boolean; message: string } | null>(null)
  const [selectedAsunto, setSelectedAsunto] = useState<string>("")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Obtener los datos del formulario
      const formData = new FormData(e.currentTarget)

      // Asegurarse de que el asunto se incluya correctamente
      if (selectedAsunto) {
        formData.set("asunto", selectedAsunto)
      }

      console.log("Asunto seleccionado:", selectedAsunto)
      console.log("Mensaje:", formData.get("mensaje"))

      // Enviar a Mailchimp
      const result = await subscribeToMailchimp(formData)
      setResponse(result)

      // Si fue exitoso, también enviar a WhatsApp
      if (result.success) {
        // Collect form data for WhatsApp
        const nombre = formData.get("nombre")
        const apellido = formData.get("apellido")
        const email = formData.get("email")
        const telefono = formData.get("telefono")
        const mensaje = formData.get("mensaje")

        // Format message in organized structure
        const formattedMessage = `*Formulario de Contacto SULKAR S.A.S*

*Nombre:* ${nombre} ${apellido}
*Email:* ${email}
*Teléfono:* ${telefono || "No proporcionado"}
*Asunto:* ${selectedAsunto || "No especificado"}

*Mensaje:*
${mensaje}

Gracias por contactarnos. Un representante se pondrá en contacto con usted pronto.`

        // Send to WhatsApp
        const phone = "573163141622"
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(formattedMessage)}`, "_blank")

        // Resetear el formulario si fue exitoso
        if (formRef.current) {
          formRef.current.reset()
          setSelectedAsunto("")
        }
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      setResponse({
        success: false,
        message: "Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/collaborative-agreement.png"
            alt="SULKAR S.A.S. Contacto"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sulkar-green/80 to-sulkar-green/40 dark:from-gray-900/90 dark:to-gray-900/70" />
        </div>

        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Contáctanos</h1>
            <p className="text-xl text-white/90">
              Estamos aquí para responder tus preguntas y ayudarte con tus necesidades de exportación e importación. Más
              que transacciones, generamos alianzas duraderas.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Envíanos un mensaje</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible para
                establecer una alianza duradera.
              </p>

              {response && (
                <Alert
                  className={`mb-6 ${response.success ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900" : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900"}`}
                >
                  <AlertDescription
                    className={
                      response.success ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"
                    }
                  >
                    {response.message}
                  </AlertDescription>
                </Alert>
              )}

              <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" name="nombre" placeholder="Tu nombre" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input id="apellido" name="apellido" placeholder="Tu apellido" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" name="telefono" placeholder="+57 300 123 4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asunto-select">Asunto</Label>
                  <input type="hidden" name="asunto" value={selectedAsunto} />
                  <Select value={selectedAsunto} onValueChange={setSelectedAsunto}>
                    <SelectTrigger id="asunto-select">
                      <SelectValue placeholder="Selecciona un asunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exportacion">Información sobre exportación</SelectItem>
                      <SelectItem value="importacion">Información sobre importación</SelectItem>
                      <SelectItem value="productos">Información sobre productos</SelectItem>
                      <SelectItem value="cotizacion">Solicitud de cotización</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea id="mensaje" name="mensaje" placeholder="Escribe tu mensaje aquí..." rows={5} required />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Información de contacto</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Puedes contactarnos directamente a través de los siguientes medios:
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-sulkar-green/10 text-sulkar-green dark:bg-sulkar-green/20 dark:text-sulkar-lightgreen">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Dirección</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Calle 8 Sur #12-116
                      <br />
                      Guadalajara de Buga (V), Colombia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-sulkar-green/10 text-sulkar-green dark:bg-sulkar-green/20 dark:text-sulkar-lightgreen">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Teléfono</h3>
                    <p className="text-gray-600 dark:text-gray-400">316 3141622</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-sulkar-green/10 text-sulkar-green dark:bg-sulkar-green/20 dark:text-sulkar-lightgreen">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Correo electrónico</h3>
                    <p className="text-gray-600 dark:text-gray-400">contactosulkar@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
