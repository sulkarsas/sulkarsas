import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { products } from "@/data/products"

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-sulkar-green/80 to-sulkar-green/40 dark:from-gray-900/90 dark:to-gray-900/70" />
        </div>

        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Nuestros Productos</h1>
            <p className="text-xl text-white/90">
              Descubre nuestra amplia variedad de pulpas de fruta y frutas congeladas de la más alta calidad.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Catálogo de Productos
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                Ofrecemos una amplia variedad de pulpas de fruta y frutas congeladas, conservando todo su sabor y
                nutrientes naturales.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="pulp">Pulpas de Fruta</SelectItem>
                  <SelectItem value="frozen">Frutas Congeladas</SelectItem>
                  <SelectItem value="derived">Derivados</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filtrar</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
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
                    <div className="mb-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-sulkar-green/10 text-sulkar-green dark:bg-sulkar-green/20 dark:text-sulkar-lightgreen">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-sulkar-green dark:group-hover:text-sulkar-lightgreen transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Origen: {product.origin}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                    <div className="inline-flex items-center text-sulkar-green dark:text-sulkar-lightgreen group-hover:underline">
                      Ver detalles{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Export Process */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nuestro Proceso de Exportación
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Garantizamos la calidad de nuestros productos en cada etapa del proceso de exportación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Selección",
                description:
                  "Seleccionamos cuidadosamente las mejores frutas de agricultores locales, garantizando su frescura y calidad.",
                icon: "fruit selection process",
              },
              {
                step: "2",
                title: "Procesamiento",
                description:
                  "Procesamos las frutas en nuestras instalaciones con tecnología de punta, siguiendo estrictos estándares de calidad e higiene.",
                icon: "fruit processing facility",
              },
              {
                step: "3",
                title: "Congelación",
                description:
                  "Utilizamos tecnología IQF (Individual Quick Freezing) para preservar el sabor, textura y propiedades nutricionales de nuestros productos.",
                icon: "IQF freezing technology",
              },
              {
                step: "4",
                title: "Exportación",
                description:
                  "Gestionamos toda la logística de exportación, asegurando que nuestros productos lleguen a su destino en perfectas condiciones.",
                icon: "export logistics container ship",
              },
            ].map((step, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-sulkar-green/10 flex items-center justify-center">
                    <div className="relative h-8 w-8">
                      <Image
                        src={`/productos/${index % 2 === 0 ? "mora.jpg" : "pulpa-mango.jpg"}`}
                        alt={step.title}
                        fill
                        className="object-contain rounded-full"
                      />
                    </div>
                  </div>
                  <div className="mb-2 flex items-center justify-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sulkar-green text-white text-sm font-bold">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-sulkar-green text-white">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Interesado en nuestros productos?</h2>
              <p className="text-xl text-white/90 mb-8">
                Contáctanos hoy mismo para obtener más información sobre nuestros productos y servicios de exportación.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contacto">Solicitar cotización</Link>
              </Button>
            </div>
            <div className="relative h-[300px] rounded-xl overflow-hidden">
              <Image src="/productos/pina.jpg" alt="Exportación SULKAR" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
