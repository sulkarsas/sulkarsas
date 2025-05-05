import Image from "next/image"
import { Building2, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bustling-fruit-export-office.png"
            alt="SULKAR S.A.S. Nosotros"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0">
            {/* Base gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-sulkar-green/90 via-sulkar-green/70 to-transparent dark:from-gray-900/95 dark:via-gray-900/80 dark:to-gray-900/60"></div>

            {/* Modern geometric elements */}
            <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
              {/* Large circle */}
              <div className="absolute -left-[10%] -top-[30%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent dark:from-emerald-700/20"></div>

              {/* Diagonal lines */}
              <div className="absolute left-[20%] top-0 w-[1px] h-full bg-white/10 transform rotate-[20deg]"></div>
              <div className="absolute left-[25%] top-0 w-[1px] h-full bg-white/5 transform rotate-[20deg]"></div>
              <div className="absolute left-[30%] top-0 w-[1px] h-full bg-white/10 transform rotate-[20deg]"></div>

              {/* Accent shape */}
              <div className="absolute right-[10%] bottom-[20%] w-[20%] h-[30%] rounded-tl-[100px] bg-sulkar-lightgreen/10 dark:bg-sulkar-lightgreen/5 backdrop-blur-sm"></div>
            </div>

            {/* Creative geometric pattern */}
            <div className="absolute inset-0">
              {/* Floating circles */}
              <div className="absolute w-16 h-16 rounded-full bg-white/10 blur-xl top-[20%] left-[15%] animate-pulse"></div>
              <div
                className="absolute w-24 h-24 rounded-full bg-emerald-500/10 blur-xl top-[60%] left-[75%] animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute w-20 h-20 rounded-full bg-sulkar-lightgreen/10 blur-xl top-[30%] left-[60%] animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>

              {/* Animated gradient mesh */}
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,rgba(76,175,80,0.4)_0%,transparent_50%),radial-gradient(circle_at_70%_70%,rgba(46,125,50,0.4)_0%,transparent_50%),radial-gradient(circle_at_40%_90%,rgba(129,199,132,0.4)_0%,transparent_40%)]"></div>

              {/* Dot pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_9px,rgba(255,255,255,0.5)_10px),repeating-linear-gradient(90deg,transparent,transparent_9px,rgba(255,255,255,0.5)_10px)]"></div>
            </div>

            {/* Enhanced vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
          </div>
        </div>

        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Nuestra Historia</h1>
            <p className="text-xl text-white/90">
              Conoce más sobre SULKAR S.A.S., nuestra misión, visión y el equipo detrás de nuestro éxito.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white dark:bg-gray-950 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Floating leaves/shapes */}
          <div className="leaf leaf-1 bg-sulkar-green/30 dark:bg-sulkar-green/20"></div>
          <div className="leaf leaf-2 bg-emerald-500/20 dark:bg-emerald-600/15"></div>
          <div className="leaf leaf-3 bg-sulkar-lightgreen/20 dark:bg-sulkar-lightgreen/10"></div>
          <div className="leaf leaf-4 bg-green-300/15 dark:bg-green-400/10"></div>
          <div className="leaf leaf-5 bg-teal-400/15 dark:bg-teal-500/10"></div>

          {/* Subtle gradient waves */}
          <div className="absolute inset-0 bg-gradient-wave opacity-30 dark:opacity-20"></div>
        </div>
        <div className="container-padding mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Quiénes Somos</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                SULKAR S.A.S. es una empresa colombiana fundada en 2010, dedicada a la exportación de pulpa de fruta,
                fruta congelada y derivados de la más alta calidad. También ofrecemos servicios de contratación pública
                y venta de bienes.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Nuestro compromiso es llevar lo mejor de Colombia al mundo, garantizando la frescura, calidad y sabor
                auténtico de nuestros productos. Trabajamos directamente con agricultores locales para asegurar la
                sostenibilidad y el comercio justo.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Con una sólida infraestructura logística y un equipo de profesionales altamente capacitados, nos hemos
                posicionado como líderes en el mercado de exportación de productos agrícolas colombianos.
              </p>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden">
              <Image src="/colombian-fruit-processing.png" alt="Instalaciones SULKAR" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="mb-6 p-3 rounded-full bg-sulkar-green/10 w-fit">
                  <Target className="h-8 w-8 text-sulkar-green dark:text-sulkar-lightgreen" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Exportar productos agrícolas colombianos de la más alta calidad, promoviendo el desarrollo sostenible
                  de las comunidades productoras y satisfaciendo las necesidades de nuestros clientes internacionales
                  con excelencia y compromiso.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="mb-6 p-3 rounded-full bg-sulkar-green/10 w-fit">
                  <Building2 className="h-8 w-8 text-sulkar-green dark:text-sulkar-lightgreen" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Ser reconocidos globalmente como la empresa líder en exportación de pulpa de fruta y productos
                  agrícolas colombianos, destacándonos por nuestra calidad, innovación y compromiso con la
                  sostenibilidad y el desarrollo social.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nuestro Equipo Fundador
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Conoce a las personas que han hecho posible el éxito de SULKAR S.A.S.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Rodríguez",
                position: "CEO & Fundador",
                image: "/team/carlos.png",
                bio: "Con más de 20 años de experiencia en el sector agrícola y de exportación, Carlos fundó SULKAR S.A.S. con la visión de llevar los mejores productos colombianos al mundo.",
              },
              {
                name: "María Fernández",
                position: "Directora de Operaciones",
                image: "/team/maria.png",
                bio: "Especialista en logística y cadena de suministro, María ha sido fundamental en el desarrollo de los procesos operativos y la expansión internacional de SULKAR.",
              },
              {
                name: "Andrés Martínez",
                position: "Director Comercial",
                image: "/team/andres.png",
                bio: "Con amplia experiencia en comercio internacional, Andrés lidera las estrategias comerciales y el desarrollo de nuevos mercados para nuestros productos.",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-64">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sulkar-green dark:text-sulkar-lightgreen mb-4">{member.position}</p>
                  <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones y Estándares Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Certificaciones y Estándares
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Cumplimos con los más altos estándares internacionales de calidad y seguridad alimentaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card text-center p-6">
              <CardContent className="p-0">
                <div className="mb-6 mx-auto p-4 rounded-full bg-sulkar-green/10 w-20 h-20 flex items-center justify-center">
                  <Image
                    src="/generic-quality-management-seal.png"
                    alt="ISO 9001"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">ISO 9001:2015</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Certificación internacional que garantiza nuestro sistema de gestión de calidad en todos nuestros
                  procesos.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center p-6">
              <CardContent className="p-0">
                <div className="mb-6 mx-auto p-4 rounded-full bg-sulkar-green/10 w-20 h-20 flex items-center justify-center">
                  <Image
                    src="/haccp-certified-symbol.png"
                    alt="HACCP"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">HACCP</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Sistema de Análisis de Peligros y Puntos Críticos de Control que garantiza la seguridad alimentaria de
                  nuestros productos.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center p-6">
              <CardContent className="p-0">
                <div className="mb-6 mx-auto p-4 rounded-full bg-sulkar-green/10 w-20 h-20 flex items-center justify-center">
                  <Image
                    src="/generic-agricultural-certification-mark.png"
                    alt="Global G.A.P."
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Global G.A.P.</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Certificación que asegura buenas prácticas agrícolas en toda nuestra cadena de suministro.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Compromiso con la Excelencia</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  En SULKAR S.A.S. nos comprometemos a mantener los más altos estándares de calidad en todos nuestros
                  productos y procesos. Nuestro equipo de control de calidad realiza rigurosas pruebas en cada etapa de
                  producción.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Trabajamos con laboratorios acreditados internacionalmente para garantizar que nuestros productos
                  cumplan con todas las normativas de seguridad alimentaria y los requisitos específicos de cada mercado
                  internacional.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-sulkar-green/10 p-3 rounded-full">
                    <svg
                      className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Control de Temperatura</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monitoreo constante de la cadena de frío</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-sulkar-green/10 p-3 rounded-full">
                    <svg
                      className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Trazabilidad Completa</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Seguimiento desde el cultivo hasta el cliente
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-sulkar-green/10 p-3 rounded-full">
                    <svg
                      className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Análisis Microbiológicos</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pruebas regulares para garantizar inocuidad
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-sulkar-green/10 p-3 rounded-full">
                    <svg
                      className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Auditorías Externas</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Verificación independiente de nuestros procesos
                    </p>
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
