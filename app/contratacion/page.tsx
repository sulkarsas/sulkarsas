"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, FileText, HelpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ContratacionPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null)

  // Datos detallados de los servicios
  const serviciosDetallados = [
    {
      title: "Asesoría en Licitaciones",
      description:
        "Brindamos asesoría especializada para participar en procesos de licitación pública, desde la preparación de documentos hasta la presentación de ofertas.",
      icon: "document",
      detailedInfo: {
        description:
          "Nuestra asesoría en licitaciones públicas es un servicio integral diseñado para maximizar sus posibilidades de éxito en procesos de contratación estatal.",
        benefits: [
          "Análisis detallado de pliegos de condiciones",
          "Preparación de documentos habilitantes",
          "Estructuración de propuestas técnicas y económicas",
          "Acompañamiento en audiencias y visitas técnicas",
          "Respuesta a observaciones y subsanaciones",
          "Seguimiento del proceso hasta la adjudicación",
        ],
        process: [
          "Evaluación inicial de la oportunidad",
          "Verificación de requisitos habilitantes",
          "Preparación de la propuesta",
          "Presentación de la oferta",
          "Seguimiento del proceso de evaluación",
          "Acompañamiento en la adjudicación y firma del contrato",
        ],
        caseStudy:
          "En 2022, ayudamos a una empresa del sector alimentario a ganar una licitación de $2.5 millones de dólares para el suministro de productos a entidades educativas, superando a competidores con mayor trayectoria en el mercado.",
      },
    },
    {
      title: "Venta de Bienes",
      description:
        "Suministramos bienes de alta calidad a entidades estatales, cumpliendo con todos los requisitos legales y técnicos establecidos.",
      icon: "products",
      detailedInfo: {
        description:
          "Ofrecemos un amplio catálogo de bienes para entidades estatales, garantizando calidad, cumplimiento normativo y precios competitivos.",
        benefits: [
          "Amplio catálogo de productos de diversas categorías",
          "Garantía de calidad y cumplimiento de especificaciones técnicas",
          "Precios competitivos y transparentes",
          "Entregas puntuales y logística eficiente",
          "Servicio postventa y soporte técnico",
          "Trazabilidad completa de los productos",
        ],
        process: [
          "Identificación de necesidades del cliente",
          "Presentación de catálogo y especificaciones",
          "Cotización personalizada",
          "Proceso de compra y formalización",
          "Entrega y verificación de productos",
          "Servicio postventa y garantía",
        ],
        caseStudy:
          "Suministramos equipos de cómputo a una entidad gubernamental por valor de $1.2 millones de dólares, cumpliendo con todos los requisitos técnicos y entregando los productos en un tiempo récord de 15 días.",
      },
    },
    {
      title: "Gestión de Contratos",
      description:
        "Gestionamos todo el ciclo de vida de los contratos públicos, desde la adjudicación hasta la ejecución y liquidación.",
      icon: "contract",
      detailedInfo: {
        description:
          "Nuestro servicio de gestión de contratos abarca todo el ciclo de vida contractual, asegurando el cumplimiento de obligaciones y la maximización de resultados.",
        benefits: [
          "Administración eficiente de contratos estatales",
          "Seguimiento de hitos y entregables",
          "Control de riesgos contractuales",
          "Gestión de modificaciones y adiciones",
          "Preparación de informes de ejecución",
          "Acompañamiento en la liquidación del contrato",
        ],
        process: [
          "Análisis inicial del contrato adjudicado",
          "Elaboración de plan de ejecución",
          "Implementación de sistema de seguimiento",
          "Gestión de entregables y facturación",
          "Manejo de modificaciones contractuales",
          "Preparación para liquidación",
        ],
        caseStudy:
          "Gestionamos un contrato de mantenimiento de infraestructura por $3.8 millones de dólares durante 3 años, logrando un 100% de cumplimiento en los indicadores de desempeño y obteniendo dos prórrogas consecutivas.",
      },
    },
    {
      title: "Consultoría Legal",
      description:
        "Ofrecemos asesoría legal especializada en contratación estatal, garantizando el cumplimiento de la normativa vigente.",
      icon: "legal",
      detailedInfo: {
        description:
          "Nuestro equipo de abogados especializados en derecho administrativo y contratación estatal brinda asesoría jurídica integral para todos los aspectos legales de la contratación pública.",
        benefits: [
          "Asesoría jurídica especializada en contratación estatal",
          "Revisión y elaboración de documentos legales",
          "Representación en procesos administrativos",
          "Prevención y gestión de controversias contractuales",
          "Actualización constante sobre cambios normativos",
          "Estrategias legales para optimizar la participación en procesos",
        ],
        process: [
          "Diagnóstico jurídico inicial",
          "Definición de estrategia legal",
          "Implementación de recomendaciones",
          "Seguimiento y control de aspectos legales",
          "Representación ante entidades",
          "Resolución de controversias",
        ],
        caseStudy:
          "Asesoramos legalmente a un consorcio en un proceso de contratación de obra pública por $15 millones de dólares, resolviendo exitosamente una impugnación presentada por un competidor y asegurando la adjudicación del contrato.",
      },
    },
    {
      title: "Representación",
      description:
        "Representamos a empresas nacionales e internacionales en procesos de contratación pública en Colombia.",
      icon: "representation",
      detailedInfo: {
        description:
          "Actuamos como representantes legales y comerciales de empresas extranjeras y nacionales que desean participar en el mercado de contratación pública colombiano.",
        benefits: [
          "Representación legal y comercial completa",
          "Conocimiento profundo del mercado local",
          "Gestión de relaciones con entidades estatales",
          "Manejo de documentación y requisitos locales",
          "Reducción de barreras de entrada al mercado",
          "Optimización de recursos para empresas extranjeras",
        ],
        process: [
          "Evaluación de capacidades y experiencia de la empresa",
          "Registro y habilitación ante entidades colombianas",
          "Identificación de oportunidades de contratación",
          "Representación en procesos específicos",
          "Gestión de alianzas estratégicas locales",
          "Administración de contratos adjudicados",
        ],
        caseStudy:
          "Representamos a una empresa europea de tecnología en su entrada al mercado colombiano, logrando la adjudicación de contratos por más de $5 millones de dólares en su primer año de operación en el país.",
      },
    },
    {
      title: "Capacitación",
      description:
        "Brindamos capacitación a empresas sobre los procesos de contratación pública y las mejores prácticas para participar en ellos.",
      icon: "training",
      detailedInfo: {
        description:
          "Nuestros programas de capacitación están diseñados para transferir conocimiento especializado sobre contratación pública a equipos comerciales, técnicos y directivos.",
        benefits: [
          "Programas personalizados según necesidades específicas",
          "Formación práctica con casos reales",
          "Actualización sobre cambios normativos",
          "Desarrollo de habilidades para preparación de ofertas",
          "Certificaciones de asistencia y aprovechamiento",
          "Material didáctico completo y actualizado",
        ],
        process: [
          "Diagnóstico de necesidades de capacitación",
          "Diseño de programa personalizado",
          "Implementación de sesiones teórico-prácticas",
          "Evaluación de conocimientos adquiridos",
          "Seguimiento y refuerzo",
          "Asesoría post-capacitación",
        ],
        caseStudy:
          "Capacitamos al equipo comercial de una empresa de suministros médicos, logrando que incrementaran su tasa de éxito en licitaciones del 15% al 42% en menos de seis meses.",
      },
    },
  ]

  // Función para abrir el modal
  const openModal = (index: number) => {
    setSelectedService(index)
  }

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedService(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/collaborative-agreement.png"
            alt="SULKAR S.A.S. Contratación Pública"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sulkar-green/80 to-sulkar-green/40 dark:from-gray-900/90 dark:to-gray-900/70" />
        </div>

        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Contratación Pública</h1>
            <p className="text-xl text-white/90">
              Servicios especializados en contratación pública y venta de bienes para entidades estatales.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Ofrecemos soluciones integrales para la contratación pública y venta de bienes a entidades estatales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviciosDetallados.map((service, index) => (
              <Card
                key={index}
                className="glass-card cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-sulkar-green/20 hover:-translate-y-1"
                onClick={() => openModal(index)}
              >
                <CardContent className="p-6">
                  <div className="mb-4 p-3 rounded-full bg-sulkar-green/10 w-fit">
                    <FileText className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                  <div className="inline-flex items-center text-sulkar-green dark:text-sulkar-lightgreen">
                    Ver más información <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Modal de información detallada */}
          {selectedService !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="text-2xl font-bold">{serviciosDetallados[selectedService].title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeModal}
                    className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Cerrar</span>
                  </Button>
                </div>

                <div className="p-6">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-lg">{serviciosDetallados[selectedService].detailedInfo.description}</p>

                    <h4 className="text-xl font-bold mt-6 mb-4">Beneficios</h4>
                    <ul>
                      {serviciosDetallados[selectedService].detailedInfo.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-sulkar-green dark:text-sulkar-lightgreen shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="text-xl font-bold mt-6 mb-4">Nuestro Proceso</h4>
                    <ol className="space-y-2">
                      {serviciosDetallados[selectedService].detailedInfo.process.map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sulkar-green text-white text-sm font-bold shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>

                    <h4 className="text-xl font-bold mt-6 mb-4">Caso de Éxito</h4>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p>{serviciosDetallados[selectedService].detailedInfo.caseStudy}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button onClick={closeModal}>Cerrar</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Nuestro Proceso</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                En SULKAR S.A.S. seguimos un proceso estructurado para garantizar el éxito en los procesos de
                contratación pública.
              </p>

              <div className="space-y-4">
                {[
                  "Análisis de oportunidades de contratación pública",
                  "Evaluación de requisitos y viabilidad",
                  "Preparación y presentación de ofertas",
                  "Seguimiento del proceso de adjudicación",
                  "Ejecución y gestión del contrato",
                  "Evaluación y mejora continua",
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen shrink-0 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-300">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button asChild>
                  <Link href="/contacto">Solicitar asesoría</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/contract-review-meeting.png"
                alt="Proceso de Contratación SULKAR"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Preguntas Frecuentes</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Respuestas a las preguntas más comunes sobre contratación pública.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "¿Qué es la contratación pública?",
                  answer:
                    "La contratación pública es el proceso mediante el cual las entidades estatales adquieren bienes, servicios u obras para el cumplimiento de sus funciones. Este proceso está regulado por la Ley 80 de 1993, la Ley 1150 de 2007 y sus decretos reglamentarios en Colombia.",
                },
                {
                  question: "¿Qué tipos de procesos de contratación pública existen?",
                  answer:
                    "En Colombia, los principales tipos de procesos de contratación pública son: Licitación Pública, Selección Abreviada, Concurso de Méritos, Contratación Directa y Mínima Cuantía. Cada uno tiene requisitos y procedimientos específicos según la naturaleza y cuantía del contrato.",
                },
                {
                  question:
                    "¿Qué requisitos debe cumplir una empresa para participar en procesos de contratación pública?",
                  answer:
                    "Los requisitos generales incluyen: estar inscrito en el Registro Único de Proponentes (RUP), no estar incurso en inhabilidades o incompatibilidades, contar con capacidad jurídica, financiera y organizacional, y cumplir con los requisitos técnicos específicos de cada proceso.",
                },
                {
                  question: "¿Cómo puede SULKAR S.A.S. ayudarme en un proceso de contratación pública?",
                  answer:
                    "SULKAR S.A.S. ofrece asesoría integral en todas las etapas del proceso, desde la identificación de oportunidades hasta la ejecución del contrato. Nuestro equipo de expertos le brindará el soporte necesario para maximizar sus posibilidades de éxito.",
                },
                {
                  question: "¿Qué documentos se requieren para participar en una licitación pública?",
                  answer:
                    "Los documentos típicamente requeridos incluyen: certificado de existencia y representación legal, RUP, garantía de seriedad de la oferta, propuesta técnica y económica, y documentos que acrediten la experiencia y capacidad del proponente, entre otros específicos según el pliego de condiciones.",
                },
                {
                  question: "¿Cuánto tiempo toma un proceso de contratación pública?",
                  answer:
                    "La duración varía según el tipo de proceso y su complejidad. Una licitación pública puede tomar entre 2 y 3 meses desde la publicación del aviso de convocatoria hasta la adjudicación. Procesos más simples como la mínima cuantía pueden resolverse en pocas semanas.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-sulkar-green dark:text-sulkar-lightgreen shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8">
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-sulkar-green text-white">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Necesita asesoría en contratación pública?</h2>
            <p className="text-xl text-white/90 mb-8">
              Nuestro equipo de expertos está listo para ayudarle a navegar el complejo mundo de la contratación
              estatal.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contacto">Solicitar asesoría</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/blog">Volver a todos los blogs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
