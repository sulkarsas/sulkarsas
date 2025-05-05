import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getContratacionPosts } from "@/components/blog/blog-posts"

export default function ContratacionBlogPage() {
  // Obtener los posts de contratación
  const posts = getContratacionPosts()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/collaborative-agreement.png"
            alt="Blogs sobre Contratación Pública"
            fill
            className="object-cover"
            priority
          />
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
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al blog
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Artículos sobre Contratación</h1>
            <p className="text-xl text-white/90">
              Información especializada sobre contratación pública, licitaciones y estrategias para el sector estatal.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Artículos Destacados</h2>

              <div className="space-y-8">
                {posts.map((post, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="relative h-60 md:h-full">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </div>
                      <div className="md:col-span-2 p-6">
                        <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold mb-3">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="hover:text-sulkar-green dark:hover:text-sulkar-lightgreen transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center text-sulkar-green dark:text-sulkar-lightgreen hover:underline"
                        >
                          Leer más <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button asChild>
                  <Link href="/blog">Volver a todos los blogs</Link>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* About Contratación */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Sobre Contratación Pública</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    La contratación pública es el proceso mediante el cual las entidades estatales adquieren bienes,
                    servicios u obras para el cumplimiento de sus funciones.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    En SULKAR S.A.S. ofrecemos asesoría especializada para participar exitosamente en procesos de
                    contratación estatal.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contratacion">Ver nuestros servicios</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Temas Relacionados</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Licitaciones", "Contratación", "Sector Público", "Estrategias", "Guía Legal", "Requisitos"].map(
                      (tag, index) => (
                        <Link
                          key={index}
                          href={`/blog?tag=${tag.toLowerCase()}`}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-sulkar-green/10 hover:text-sulkar-green dark:hover:bg-sulkar-green/20 dark:hover:text-sulkar-lightgreen transition-colors"
                        >
                          {tag}
                        </Link>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-sulkar-green text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">¿Necesita asesoría en contratación pública?</h3>
                  <p className="mb-4 text-white/90">
                    Nuestro equipo de expertos está listo para ayudarle a navegar el complejo mundo de la contratación
                    estatal.
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
    </div>
  )
}
