import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductBySlug, getRelatedProducts } from "@/data/products"
import { ArrowRight, Globe, ShieldCheck, BadgeCheck, Truck, Clock, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = product.relatedProducts ? getRelatedProducts(product.relatedProducts) : []

  // Función para renderizar el icono correcto según el nombre
  const renderCertificationIcon = (iconName: string) => {
    switch (iconName) {
      case "shield-check":
        return <ShieldCheck className="h-5 w-5" />
      case "badge-check":
        return <BadgeCheck className="h-5 w-5" />
      case "globe":
        return <Globe className="h-5 w-5" />
      default:
        return <BadgeCheck className="h-5 w-5" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-sulkar-green/80 to-sulkar-green/40 dark:from-gray-900/90 dark:to-gray-900/70" />
        </div>

        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <Button
              variant="outline"
              size="sm"
              className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20"
              asChild
            >
              <Link href="/productos">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a productos
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{product.name}</h1>
            <p className="text-xl text-white/90 mb-4">{product.description}</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                {product.category}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                Origen: {product.origin}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="descripcion" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                  <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
                  <TabsTrigger value="nutricional">Info. Nutricional</TabsTrigger>
                  <TabsTrigger value="exportacion">Rutas de Exportación</TabsTrigger>
                </TabsList>

                <TabsContent value="descripcion" className="space-y-6">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h2>Descripción del Producto</h2>
                    <p>{product.longDescription}</p>

                    <h3>Certificaciones</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mt-6">
                      {product.certifications?.map((cert, index) => (
                        <Card key={index} className="bg-sulkar-green/5 dark:bg-sulkar-green/10 border-sulkar-green/20">
                          <CardContent className="p-4 flex items-start gap-3">
                            <div className="p-2 rounded-full bg-sulkar-green/10 text-sulkar-green dark:text-sulkar-lightgreen">
                              {renderCertificationIcon(cert.icon)}
                            </div>
                            <div>
                              <h4 className="font-bold text-base">{cert.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{cert.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="especificaciones" className="space-y-6">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h2>Especificaciones del Producto</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-4">Presentaciones Disponibles</h3>
                          <ul className="space-y-2">
                            {product.availableSizes?.map((size, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-sulkar-green"></div>
                                <span>{size}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-4">Empaque</h3>
                          <ul className="space-y-2">
                            {product.packaging?.map((pack, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-sulkar-green"></div>
                                <span>{pack}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <h3>Almacenamiento y Vida Útil</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-full bg-sulkar-green/10 text-sulkar-green dark:text-sulkar-lightgreen">
                              <Clock className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-base">Vida Útil</h4>
                              <p>{product.shelfLife}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-full bg-sulkar-green/10 text-sulkar-green dark:text-sulkar-lightgreen">
                              <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-base">Instrucciones de Almacenamiento</h4>
                              <p>{product.storageInstructions}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="nutricional" className="space-y-6">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h2>Información Nutricional</h2>

                    {product.nutritionalInfo ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mb-8">
                          <Card>
                            <CardContent className="p-4 text-center">
                              <h4 className="font-bold text-lg text-sulkar-green dark:text-sulkar-lightgreen mb-2">
                                Calorías
                              </h4>
                              <p className="text-2xl font-bold">{product.nutritionalInfo.calories}</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <h4 className="font-bold text-lg text-sulkar-green dark:text-sulkar-lightgreen mb-2">
                                Proteínas
                              </h4>
                              <p className="text-2xl font-bold">{product.nutritionalInfo.protein}</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <h4 className="font-bold text-lg text-sulkar-green dark:text-sulkar-lightgreen mb-2">
                                Carbohidratos
                              </h4>
                              <p className="text-2xl font-bold">{product.nutritionalInfo.carbs}</p>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
                          <Card>
                            <CardContent className="p-4 text-center">
                              <h4 className="font-bold text-lg text-sulkar-green dark:text-sulkar-lightgreen mb-2">
                                Grasas
                              </h4>
                              <p className="text-2xl font-bold">{product.nutritionalInfo.fat}</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <h4 className="font-bold text-lg text-sulkar-green dark:text-sulkar-lightgreen mb-2">
                                Fibra
                              </h4>
                              <p className="text-2xl font-bold">{product.nutritionalInfo.fiber}</p>
                            </CardContent>
                          </Card>
                        </div>

                        <h3>Vitaminas y Minerales</h3>
                        <div className="flex flex-wrap gap-2 not-prose">
                          {product.nutritionalInfo.vitamins.map((vitamin, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-sulkar-green/10 text-sulkar-green dark:bg-sulkar-green/20 dark:text-sulkar-lightgreen border-sulkar-green/20"
                            >
                              {vitamin}
                            </Badge>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p>Información nutricional no disponible para este producto.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="exportacion" className="space-y-6">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h2>Rutas de Exportación</h2>
                    <p>
                      En SULKAR S.A.S. contamos con una amplia experiencia en la exportación de nuestros productos a
                      diferentes destinos alrededor del mundo. A continuación, presentamos las principales rutas de
                      exportación para {product.name}:
                    </p>

                    <div className="not-prose">
                      {product.exportRoutes?.map((route, index) => (
                        <Card key={index} className="mb-4">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-full bg-sulkar-green/10 text-sulkar-green dark:text-sulkar-lightgreen">
                                  <Globe className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-lg">{route.destination}</h4>
                                  <p className="text-gray-600 dark:text-gray-400">
                                    Método de transporte: {route.transportMethod}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-sulkar-green dark:text-sulkar-lightgreen" />
                                  <span className="text-sm">{route.estimatedTime}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-sulkar-green dark:text-sulkar-lightgreen" />
                                  <span className="text-sm">Frecuencia: {route.frequency}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="bg-sulkar-green/10 p-6 rounded-lg not-prose">
                      <h3 className="text-xl font-bold mb-4">¿Necesitas información sobre otras rutas?</h3>
                      <p className="mb-4">
                        Podemos adaptar nuestras rutas de exportación según tus necesidades específicas. Contáctanos
                        para obtener más información sobre envíos a tu ubicación.
                      </p>
                      <Button asChild>
                        <Link href="/contacto">Solicitar información</Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Price */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Precio Referencial</h3>
                  {product.price ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-sulkar-green dark:text-sulkar-lightgreen">
                        {product.price.min} - {product.price.max} {product.price.currency}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">/ kg</span>
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">Precio bajo consulta</p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    *Los precios pueden variar según volumen, destino y condiciones de mercado.
                  </p>
                  <div className="mt-6 space-y-3">
                    <Button className="w-full" asChild>
                      <Link href="/contacto">Solicitar cotización</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contacto">Consultar disponibilidad</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Información de Envío</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-sulkar-green/10 text-sulkar-green dark:text-sulkar-lightgreen">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold">Envíos Internacionales</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Realizamos envíos a múltiples destinos internacionales. Consulta las rutas disponibles.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-sulkar-green/10 text-sulkar-green dark:text-sulkar-lightgreen">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold">Tiempos de Entrega</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Los tiempos varían según el destino. Consulta la pestaña de Rutas de Exportación para más
                          detalles.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Productos Relacionados</h3>
                    <div className="space-y-4">
                      {relatedProducts.map((relatedProduct, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="relative h-16 w-16 shrink-0 rounded-md overflow-hidden">
                            <Image
                              src={relatedProduct.image || "/placeholder.svg"}
                              alt={relatedProduct.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium line-clamp-2 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen">
                              <Link href={`/productos/${relatedProduct.slug}`}>{relatedProduct.name}</Link>
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{relatedProduct.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* CTA */}
              <Card className="bg-sulkar-green text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">¿Necesitas más información?</h3>
                  <p className="mb-4 text-white/90">
                    Nuestro equipo está listo para responder todas tus preguntas sobre este producto y ayudarte con tu
                    pedido.
                  </p>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href="/contacto">Contáctanos</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* More Products Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Más Productos</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Descubre nuestra amplia variedad de productos de alta calidad
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((product, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                  <Link
                    href={`/productos/${product.slug}`}
                    className="inline-flex items-center text-sulkar-green dark:text-sulkar-lightgreen hover:underline"
                  >
                    Ver detalles <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/productos">Ver todos los productos</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
