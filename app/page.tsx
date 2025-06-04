// app/page.tsx - Server Component (NO tiene "use client")
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Box, Truck, RefreshCw, Shield, Heart, Award, Leaf, Lightbulb, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@supabase/supabase-js"

// Función para obtener blogs desde el servidor
async function getRecentBlogs() {
  try {
    // Crear cliente Supabase solo en el servidor
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3)

    if (error) {
      console.error("Error al obtener blogs:", error)
      return []
    }

    return data.map((blog) => ({
      slug: blog.slug,
      title: blog.title,
      date: new Date(blog.published_at || blog.created_at || Date.now()).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: blog.author || "Admin",
      authorRole: blog.author_role || "Equipo SULKAR",
      authorImage: blog.author_image || "/team/maria.png",
      image: blog.image || "/global-commerce-alliance.webp",
      tags: blog.tags || [],
      category: blog.category || "General",
      excerpt: blog.excerpt || "",
    }))
  } catch (error) {
    console.error("Error al obtener blogs recientes:", error)
    return []
  }
}

export default async function Home() {
  // Obtener blogs directamente desde el servidor
  const recentBlogs = await getRecentBlogs()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - sin fondo propio, usa el fondo global */}
      <section className="relative py-20 md:py-32">
        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Creemos en los negocios con propósito
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-8">
              Donde la confianza, la integridad y las relaciones duraderas son nuestra base. Conectamos mercados,
              culturas y personas, siempre con el corazón y la estrategia alineados.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-sulkar-green hover:bg-sulkar-green/90 text-white border-sulkar-green"
                asChild
              >
                <Link href="/contacto">Contáctanos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Ofrecemos soluciones integrales para la exportación e importación de productos de la más alta calidad,
              conectando mercados globales con eficiencia y confiabilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-sulkar-green/20 hover:-translate-y-1 border-b-4 border-transparent hover:border-sulkar-green dark:hover:border-sulkar-lightgreen">
              <div className="absolute inset-0 bg-gradient-to-br from-sulkar-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-sulkar-green/10 group-hover:bg-sulkar-green/20 transition-all duration-500 group-hover:scale-150"></div>
              <CardContent className="p-6 relative z-10">
                <div className="mb-4 p-3 rounded-full bg-sulkar-green/10 w-fit group-hover:bg-sulkar-green/20 group-hover:scale-110 transition-all duration-300">
                  <Box className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-sulkar-green dark:group-hover:text-sulkar-lightgreen transition-colors duration-300">
                  Productos de Calidad
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 transition-all duration-300 group-hover:translate-x-1">
                  Seleccionamos y comercializamos productos de la más alta calidad, garantizando la satisfacción de
                  nuestros clientes en cada operación.
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center text-sulkar-green dark:text-sulkar-lightgreen hover:underline group-hover:font-medium transition-all duration-300"
                >
                  Contáctanos{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-card group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-sulkar-green/20 hover:-translate-y-1 border-b-4 border-transparent hover:border-sulkar-green dark:hover:border-sulkar-lightgreen">
              <div className="absolute inset-0 bg-gradient-to-tr from-sulkar-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -left-12 -bottom-12 w-24 h-24 rounded-full bg-sulkar-green/10 group-hover:bg-sulkar-green/20 transition-all duration-500 group-hover:scale-150"></div>
              <CardContent className="p-6 relative z-10">
                <div className="mb-4 p-3 rounded-full bg-sulkar-green/10 w-fit group-hover:bg-sulkar-green/20 group-hover:scale-110 transition-all duration-300">
                  <Truck className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-sulkar-green dark:group-hover:text-sulkar-lightgreen transition-colors duration-300">
                  Exportación
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 transition-all duration-300 group-hover:translate-x-1">
                  Gestionamos todo el proceso de exportación, desde la producción hasta la entrega en destino
                  internacional, con eficiencia y cumplimiento normativo.
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center text-sulkar-green dark:text-sulkar-lightgreen hover:underline group-hover:font-medium transition-all duration-300"
                >
                  Conoce más{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-card group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-sulkar-green/20 hover:-translate-y-1 border-b-4 border-transparent hover:border-sulkar-green dark:hover:border-sulkar-lightgreen">
              <div className="absolute inset-0 bg-gradient-to-bl from-sulkar-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -right-12 -bottom-12 w-24 h-24 rounded-full bg-sulkar-green/10 group-hover:bg-sulkar-green/20 transition-all duration-500 group-hover:scale-150"></div>
              <CardContent className="p-6 relative z-10">
                <div className="mb-4 p-3 rounded-full bg-sulkar-green/10 w-fit group-hover:bg-sulkar-green/20 group-hover:scale-110 transition-all duration-300">
                  <RefreshCw className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-sulkar-green dark:group-hover:text-sulkar-lightgreen transition-colors duration-300">
                  Importación
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 transition-all duration-300 group-hover:translate-x-1">
                  Importamos productos de alta calidad, cumpliendo con todos los estándares internacionales y
                  optimizando los procesos logísticos.
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center text-sulkar-green dark:text-sulkar-lightgreen hover:underline group-hover:font-medium transition-all duration-300"
                >
                  Ver servicios{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Sobre SULKAR S.A.S.</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Somos una empresa colombiana dedicada a la exportación e importación de productos de alta calidad.
                Nuestro compromiso es conectar mercados globales mediante soluciones logísticas integrales, sostenibles
                y confiables.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                <em>"Más que transacciones, generamos alianzas duraderas con visión y compromiso."</em>
              </p>
              <Button asChild>
                <Link href="/nosotros">Conoce nuestra historia</Link>
              </Button>
            </div>
            <Image
              src="/global-commerce-alliance.webp"
              alt="Alianzas comerciales globales SULKAR"
              width={600}
              height={400}
              className="w-full h-[400px] object-contain rounded-xl transition-transform duration-300 hover:scale-110"
              priority
            />
          </div>
        </div>
      </section>

      {/* Valores Empresariales */}
      <section className="section-padding">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestros Valores</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Estos principios fundamentales guían nuestras operaciones y relaciones comerciales, definiendo quiénes
              somos y cómo trabajamos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Confianza",
                icon: "Shield",
                description:
                  "Construimos relaciones basadas en la transparencia y el cumplimiento de nuestros compromisos, generando confianza en cada interacción.",
              },
              {
                name: "Integridad",
                icon: "Heart",
                description:
                  "Actuamos con honestidad y ética en todas nuestras operaciones, manteniendo los más altos estándares de conducta empresarial.",
              },
              {
                name: "Excelencia",
                icon: "Award",
                description:
                  "Buscamos constantemente la mejora continua y la excelencia en todos nuestros procesos y servicios.",
              },
              {
                name: "Sostenibilidad",
                icon: "Leaf",
                description:
                  "Nos comprometemos con prácticas comerciales sostenibles que respetan el medio ambiente y contribuyen al bienestar social.",
              },
              {
                name: "Innovación",
                icon: "Lightbulb",
                description:
                  "Fomentamos la creatividad y la innovación para encontrar soluciones efectivas a los desafíos del comercio internacional.",
              },
              {
                name: "Colaboración",
                icon: "Users",
                description:
                  "Trabajamos en estrecha colaboración con nuestros clientes y socios para crear valor compartido y relaciones duraderas.",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-sulkar-green/20 hover:-translate-y-1 border border-transparent hover:border-sulkar-green/20 dark:hover:border-sulkar-green/30 h-full"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-4 rounded-full bg-sulkar-green/10 w-fit">
                    {value.icon === "Shield" && (
                      <Shield className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen" />
                    )}
                    {value.icon === "Heart" && (
                      <Heart className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen" />
                    )}
                    {value.icon === "Award" && (
                      <Award className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen" />
                    )}
                    {value.icon === "Leaf" && (
                      <Leaf className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen" />
                    )}
                    {value.icon === "Lightbulb" && (
                      <Lightbulb className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen" />
                    )}
                    {value.icon === "Users" && (
                      <Users className="h-6 w-6 text-sulkar-green dark:text-sulkar-lightgreen" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-sulkar-green dark:group-hover:text-sulkar-lightgreen transition-colors duration-300">
                    {value.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/nosotros">Conoce más sobre nosotros</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Fondo con degradado y efectos */}
        <div className="absolute inset-0 bg-gradient-to-br from-sulkar-green via-emerald-600 to-sulkar-green/90 dark:from-sulkar-green/90 dark:via-emerald-800 dark:to-sulkar-green/80">
          {/* Elementos decorativos */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {/* Círculos decorativos */}
            <div className="absolute -left-[5%] top-[10%] w-[30%] h-[30%] rounded-full bg-white/5 blur-md"></div>
            <div className="absolute right-[10%] bottom-[5%] w-[25%] h-[25%] rounded-full bg-white/5 blur-md"></div>

            {/* Patrón de líneas */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[size:100px_100px]"></div>

            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_60%)]"></div>

            {/* Partículas flotantes */}
            <div className="absolute h-2 w-2 rounded-full bg-white/40 top-[20%] left-[30%] animate-pulse"></div>
            <div
              className="absolute h-3 w-3 rounded-full bg-white/30 top-[60%] left-[70%] animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute h-2 w-2 rounded-full bg-white/40 top-[80%] left-[20%] animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute h-3 w-3 rounded-full bg-white/30 top-[30%] left-[80%] animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
        </div>

        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-md">
                ¿Interesado en nuestros servicios?
              </h2>
              <p className="text-xl text-white/90 mb-8 drop-shadow-sm">
                Contáctanos hoy mismo para obtener más información sobre nuestros servicios de importación y
                exportación. Generamos alianzas duraderas con visión y compromiso.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                  asChild
                >
                  <Link href="/contacto">Contáctanos</Link>
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-transparent backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/contacto">¿Dónde encontrarnos?</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-KSCLKtwPorCbIuDHr7hkifiSVhkFIj.jpeg"
                alt="Reunión de negocios - Servicios profesionales SULKAR"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Últimas Noticias</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Mantente al día con las últimas noticias y artículos sobre importación, exportación y tendencias del
              mercado global.
            </p>
          </div>

          {recentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentBlogs.map((post, index) => (
                <Link href={`/blog/${post.slug}`} key={index} className="block group transition-all duration-300">
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-sulkar-green/20 hover:-translate-y-1 border border-transparent hover:border-sulkar-green/20 dark:hover:border-sulkar-green/30 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <div className="flex gap-2">
                          {post.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
                            <span
                              key={tagIndex}
                              className="text-xs px-2 py-1 rounded-full bg-sulkar-green/10 text-sulkar-green dark:bg-sulkar-green/20 dark:text-sulkar-lightgreen"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-sulkar-green dark:group-hover:text-sulkar-lightgreen transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                      <div className="inline-flex items-center text-sulkar-green dark:text-sulkar-lightgreen group-hover:underline">
                        Leer más{" "}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No hay artículos disponibles en este momento.</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Ver todas las noticias</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
