import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Box, Truck, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - sin fondo propio, usa el fondo global */}
      <section className="relative py-20 md:py-32">
        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Importamos y exportamos frutas con calidad para todo el mundo
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-8">
              En SULKAR S.A.S. nos especializamos en la importación y exportación de pulpa de fruta y fruta congelada de
              la más alta calidad, llevando lo mejor de Colombia al mundo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/productos">Nuestros Productos</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
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
              Ofrecemos soluciones integrales para la importación y exportación de productos frutícolas de la más alta
              calidad.
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
                  Pulpa de Fruta
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 transition-all duration-300 group-hover:translate-x-1">
                  Procesamos y comercializamos pulpa de fruta de la más alta calidad, conservando todo el sabor y
                  nutrientes naturales.
                </p>
                <Link
                  href="/productos"
                  className="inline-flex items-center text-sulkar-green dark:text-sulkar-lightgreen hover:underline group-hover:font-medium transition-all duration-300"
                >
                  Ver productos{" "}
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
                  internacional.
                </p>
                <Link
                  href="/productos"
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
                  Importamos frutas y derivados de alta calidad, cumpliendo con todos los estándares internacionales.
                </p>
                <Link
                  href="/productos"
                  className="inline-flex items-center text-sulkar-green dark:text-sulkar-lightgreen hover:underline group-hover:font-medium transition-all duration-300"
                >
                  Ver servicios{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
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
                Somos una empresa colombiana dedicada a la importación y exportación de productos frutícolas de alta
                calidad. Nuestro compromiso es llevar lo mejor de Colombia al mundo y traer productos selectos a nuestro
                país, garantizando la frescura y calidad en cada envío.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Con años de experiencia en el mercado internacional, hemos establecido relaciones comerciales sólidas y
                confiables con clientes y proveedores en todo el mundo.
              </p>
              <Button asChild>
                <Link href="/nosotros">Conoce nuestra historia</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image src="/colombian-fruit-processing.png" alt="Instalaciones SULKAR" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="section-padding">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestros Productos</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Ofrecemos una amplia variedad de pulpas de fruta y frutas congeladas de la más alta calidad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Pulpa de Fresa",
                image: "/productos/pulpa-fresa.jpg",
                origin: "Valle del Cauca",
                slug: "pulpa-de-fresa",
              },
              { name: "Pulpa de Mango", image: "/productos/pulpa-mango.jpg", origin: "Tolima", slug: "pulpa-de-mango" },
              {
                name: "Pulpa de Maracuyá",
                image: "/productos/pulpa-maracuya.jpg",
                origin: "Huila",
                slug: "pulpa-de-maracuya",
              },
              { name: "Banano Congelado", image: "/productos/banano.jpg", origin: "Urabá", slug: "banano-congelado" },
              { name: "Mora Congelada", image: "/productos/mora.jpg", origin: "Cundinamarca", slug: "mora-congelada" },
              { name: "Piña Congelada", image: "/productos/pina.jpg", origin: "Santander", slug: "pina-congelada" },
            ].map((product, index) => (
              <Link href={`/productos/${product.slug}`} key={index} className="block group transition-all duration-300">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-sulkar-green/20 hover:-translate-y-1 border border-transparent hover:border-sulkar-green/20 dark:hover:border-sulkar-green/30 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-sulkar-green dark:group-hover:text-sulkar-lightgreen transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Origen: {product.origin}, Colombia</p>
                    <div className="inline-flex items-center text-sulkar-green dark:text-sulkar-lightgreen group-hover:underline">
                      Ver detalles{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/productos">Ver todos los productos</Link>
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
                ¿Interesado en nuestros productos?
              </h2>
              <p className="text-xl text-white/90 mb-8 drop-shadow-sm">
                Contáctanos hoy mismo para obtener más información sobre nuestros productos y servicios de importación y
                exportación.
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
                  <Link href="/productos">Ver productos</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
              <Image src="/productos/pulpa-mango.jpg" alt="Exportación SULKAR" fill className="object-cover" />
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
              mercado frutícola.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Nuevos mercados para la pulpa de fruta colombiana",
                image: "/productos/pulpa-maracuya.jpg",
                date: "15 Abril, 2023",
                tags: ["Exportación", "Novedades"],
                excerpt:
                  "Exploramos las oportunidades de exportación en nuevos mercados internacionales para la pulpa de fruta colombiana.",
                slug: "nuevos-mercados-para-la-pulpa-de-fruta-colombiana",
              },
              {
                title: "Tendencias en importación de frutas exóticas",
                image: "/productos/mora.jpg",
                date: "28 Marzo, 2023",
                tags: ["Importación", "Tendencias"],
                excerpt:
                  "Descubre las nuevas tendencias en la importación de frutas exóticas y cómo están cambiando los hábitos de consumo.",
                slug: "tendencias-en-importacion-de-frutas-exoticas",
              },
              {
                title: "Beneficios de la pulpa de fruta congelada",
                image: "/productos/pulpa-fresa.jpg",
                date: "10 Marzo, 2023",
                tags: ["Productos", "Novedades"],
                excerpt:
                  "Descubre los beneficios nutricionales y prácticos de la pulpa de fruta congelada para tu negocio y consumidores.",
                slug: "beneficios-de-la-pulpa-de-fruta-congelada",
              },
            ].map((post, index) => (
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
                        {post.tags.map((tag, tagIndex) => (
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
