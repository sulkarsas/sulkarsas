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
                SULKAR S.A.S. es una empresa colombiana dedicada a la exportación e importación de productos de la más
                alta calidad. Nuestro compromiso es conectar mercados globales mediante soluciones logísticas
                integrales, sostenibles y confiables.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Creemos en los negocios con propósito, donde la confianza, la integridad y las relaciones duraderas son
                nuestra base. Conectamos mercados, culturas y personas, siempre con el corazón y la estrategia
                alineados.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Con una sólida infraestructura logística y un equipo de profesionales altamente capacitados, nos hemos
                posicionado como un aliado estratégico en el comercio internacional.
              </p>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/contract-review-meeting.png"
                alt="SULKAR S.A.S. - Comercio Internacional"
                fill
                className="object-cover"
              />
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
                  SULKAR SAS conecta mercados globales mediante la exportación e importación de productos de calidad,
                  ofreciendo soluciones logísticas integrales, sostenibles y confiables que satisfacen las necesidades
                  de nuestros clientes, fomentando el crecimiento económico y la competitividad en cada operación.
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
                  Ser una empresa líder en el comercio internacional, reconocida por nuestra excelencia operativa,
                  innovación en procesos logísticos y compromiso con la sostenibilidad y el medio ambiente,
                  consolidándonos como el aliado estratégico preferido para la exportación e importación en los mercados
                  globales.
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
              Nuestro Equipo Directivo
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Conoce a las personas que han hecho posible el éxito de SULKAR S.A.S.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sulma Cedeño",
                position: "CEO & Fundadora",
                bio: "Líder visionaria con amplia experiencia en comercio internacional, Sulma fundó SULKAR S.A.S. con el objetivo de conectar mercados globales y generar alianzas duraderas.",
                color: "from-emerald-500 to-green-700",
                icon: "crown",
              },
              {
                name: "Luz Karime Rubiano",
                position: "Directora Administrativa y Financiera",
                bio: "Especialista en finanzas y administración, Luz Karime es responsable de la gestión financiera y administrativa de SULKAR, garantizando la eficiencia operativa.",
                color: "from-teal-500 to-emerald-700",
                icon: "calculator",
              },
              {
                name: "Adonain Tapasco",
                position: "Director Comercial y Operativo",
                bio: "Con amplia experiencia en comercio internacional, Adonain lidera las estrategias comerciales y operativas, desarrollando nuevos mercados para nuestros productos y servicios.",
                color: "from-green-500 to-teal-700",
                icon: "briefcase",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg border-none">
                <div className="bg-white p-6 text-gray-900 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100/50 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-200/30 rounded-tr-full"></div>

                  {member.icon === "crown" && (
                    <svg className="h-8 w-8 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  )}
                  {member.icon === "calculator" && (
                    <svg className="h-8 w-8 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                  {member.icon === "briefcase" && (
                    <svg className="h-8 w-8 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  )}

                  <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                  <p className="text-gray-600 mb-2 font-medium">{member.position}</p>

                  <div className="w-12 h-1 bg-sulkar-green mb-4"></div>
                </div>
                <CardContent className="p-6 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Objetivos Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestros Objetivos</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Trabajamos con metas claras para ofrecer el mejor servicio y generar valor en cada operación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-card text-center p-6">
              <CardContent className="p-0">
                <div className="mb-6 mx-auto p-4 rounded-full bg-sulkar-green/10 w-20 h-20 flex items-center justify-center">
                  <svg
                    className="h-10 w-10 text-sulkar-green dark:text-sulkar-lightgreen"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Crecimiento del mercado</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Expandir nuestra presencia en al menos tres nuevos mercados internacionales en los próximos cinco
                  años, diversificando la cartera de productos exportados e importados.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center p-6">
              <CardContent className="p-0">
                <div className="mb-6 mx-auto p-4 rounded-full bg-sulkar-green/10 w-20 h-20 flex items-center justify-center">
                  <svg
                    className="h-10 w-10 text-sulkar-green dark:text-sulkar-lightgreen"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Eficiencia operativa</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Optimizar los procesos logísticos y aduaneros para reducir los tiempos de entrega en un 20% en los
                  próximos dos años, garantizando competitividad.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center p-6">
              <CardContent className="p-0">
                <div className="mb-6 mx-auto p-4 rounded-full bg-sulkar-green/10 w-20 h-20 flex items-center justify-center">
                  <svg
                    className="h-10 w-10 text-sulkar-green dark:text-sulkar-lightgreen"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Sostenibilidad</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Implementar prácticas sostenibles en la cadena de suministro, reduciendo la huella de carbono en un
                  15% en los próximos tres años.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center p-6">
              <CardContent className="p-0">
                <div className="mb-6 mx-auto p-4 rounded-full bg-sulkar-green/10 w-20 h-20 flex items-center justify-center">
                  <svg
                    className="h-10 w-10 text-sulkar-green dark:text-sulkar-lightgreen"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Satisfacción del cliente</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Alcanzar un índice de satisfacción del cliente superior al 90% mediante la mejora continua en la
                  calidad del servicio y la atención personalizada.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center p-6">
              <CardContent className="p-0">
                <div className="mb-6 mx-auto p-4 rounded-full bg-sulkar-green/10 w-20 h-20 flex items-center justify-center">
                  <svg
                    className="h-10 w-10 text-sulkar-green dark:text-sulkar-lightgreen"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Innovación</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Incorporar tecnologías avanzadas, como sistemas de rastreo en tiempo real y análisis de datos, para
                  mejorar la toma de decisiones y la trazabilidad de las operaciones.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center p-6">
              <CardContent className="p-0">
                <div className="mb-6 mx-auto p-4 rounded-full bg-sulkar-green/10 w-20 h-20 flex items-center justify-center">
                  <svg
                    className="h-10 w-10 text-sulkar-green dark:text-sulkar-lightgreen"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Cumplimiento normativo</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Garantizar el 100% de cumplimiento con las regulaciones aduaneras y comerciales en todos los países
                  donde operemos, minimizando riesgos legales y operativos.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Nuestra Filosofía</h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 italic">
                "Más que transacciones, generamos alianzas duraderas con visión y compromiso."
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
              Creemos en los negocios con propósito, donde la confianza, la integridad y las relaciones duraderas son
              nuestra base. Conectamos mercados, culturas y personas, siempre con el corazón y la estrategia alineados.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
