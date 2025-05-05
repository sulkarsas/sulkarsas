import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
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
              Estamos aquí para responder tus preguntas y ayudarte con tus necesidades de exportación y contratación
              pública.
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
                Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input id="apellido" placeholder="Tu apellido" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" placeholder="+57 300 123 4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asunto">Asunto</Label>
                  <Select>
                    <SelectTrigger id="asunto">
                      <SelectValue placeholder="Selecciona un asunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exportacion">Información sobre exportación</SelectItem>
                      <SelectItem value="productos">Información sobre productos</SelectItem>
                      <SelectItem value="contratacion">Contratación pública</SelectItem>
                      <SelectItem value="cotizacion">Solicitud de cotización</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea id="mensaje" placeholder="Escribe tu mensaje aquí..." rows={5} />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Enviar mensaje
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
                      Calle Principal #123
                      <br />
                      Bogotá, Colombia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-sulkar-green/10 text-sulkar-green dark:bg-sulkar-green/20 dark:text-sulkar-lightgreen">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Teléfono</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      +57 (1) 123-4567
                      <br />
                      +57 300 123 4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-sulkar-green/10 text-sulkar-green dark:bg-sulkar-green/20 dark:text-sulkar-lightgreen">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Correo electrónico</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      info@sulkar.com
                      <br />
                      ventas@sulkar.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.39280650613!2d-74.24789682500001!3d4.648620999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2zQm9nb3TDoQ!5e0!3m2!1ses!2sco!4v1650000000000!5m2!1ses!2sco"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Preguntas Frecuentes</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Respuestas a las preguntas más comunes sobre nuestros productos y servicios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "¿Cuáles son los tiempos de entrega para exportaciones?",
                answer:
                  "Los tiempos de entrega varían según el destino y el volumen de la exportación. Generalmente, nuestros envíos a países de América Latina tardan entre 7 y 15 días, mientras que los envíos a Europa y Asia pueden tardar entre 20 y 30 días.",
              },
              {
                question: "¿Qué certificaciones tienen sus productos?",
                answer:
                  "Nuestros productos cuentan con certificaciones internacionales como ISO 9001, HACCP, y certificaciones específicas según el país de destino. Además, cumplimos con todos los requisitos fitosanitarios exigidos por las autoridades competentes.",
              },
              {
                question: "¿Ofrecen muestras de sus productos?",
                answer:
                  "Sí, ofrecemos muestras de nuestros productos para clientes potenciales. Para solicitar muestras, por favor contacta a nuestro departamento comercial a través del formulario de contacto o directamente por correo electrónico.",
              },
              {
                question: "¿Cuál es el pedido mínimo para exportación?",
                answer:
                  "El pedido mínimo para exportación varía según el producto y el destino. Generalmente, trabajamos con contenedores completos, pero también podemos atender pedidos más pequeños según disponibilidad y logística.",
              },
            ].map((faq, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
