import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Share2, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/components/blog/blog-posts"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Obtener el post por su slug
  const post = getBlogPostBySlug(params.slug)

  // Si no existe el post, mostrar 404
  if (!post) {
    notFound()
  }

  // Obtener posts relacionados
  const relatedPosts = getRelatedBlogPosts(post.relatedPosts)

  // Función para reemplazar las imágenes en el contenido con la imagen de portada
  const processedContent = post.content.replace(
    /<div class="my-8 relative h-80 rounded-xl overflow-hidden">[\s\S]*?<img src="[^"]*" alt="[^"]*" class="object-cover w-full h-full" \/>[\s\S]*?<\/div>/g,
    `<div class="my-8 relative h-80 rounded-xl overflow-hidden">
      <img src="${post.image}" alt="${post.title}" class="object-cover w-full h-full" />
    </div>`,
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {params.slug === "beneficios-de-la-pulpa-de-fruta-congelada" ? (
            <>
              <Image src="/productos/pulpa-fresa.jpg" alt={post.title} fill className="object-cover" priority />
              <div className="absolute inset-0 flex">
                <div className="w-1/2 h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-sulkar-green/70 to-transparent" />
                </div>
                <div className="w-1/2 h-full relative">
                  <Image
                    src="/productos/pulpa-mango.jpg"
                    alt="Pulpa de mango"
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-sulkar-green/70 to-transparent" />
                </div>
              </div>
            </>
          ) : (
            <>
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-r from-sulkar-green/80 to-sulkar-green/40 dark:from-gray-900/90 dark:to-gray-900/70" />
            </>
          )}
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <div
                className="prose prose-lg dark:prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="font-bold">{post.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.authorRole}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Author */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Sobre el autor</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{post.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{post.authorRole}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {post.author === "Carlos Rodríguez"
                      ? "Con más de 20 años de experiencia en el sector agrícola y de exportación, Carlos fundó SULKAR S.A.S. con la visión de llevar los mejores productos colombianos al mundo."
                      : post.author === "María Fernández"
                        ? "Especialista en logística y cadena de suministro, María ha sido fundamental en el desarrollo de los procesos operativos y la expansión internacional de SULKAR."
                        : "Con amplia experiencia en comercio internacional, Andrés lidera las estrategias comerciales y el desarrollo de nuevos mercados para nuestros productos."}
                  </p>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Artículos relacionados</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost, index) => (
                      <Link
                        key={index}
                        href={`/blog/${relatedPost.slug}`}
                        className="flex gap-3 group transition-all duration-300 hover:bg-sulkar-green/5 dark:hover:bg-sulkar-green/10 p-2 rounded-lg"
                      >
                        <div className="relative h-16 w-16 shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={relatedPost.image || "/placeholder.svg"}
                            alt={relatedPost.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-2 group-hover:text-sulkar-green dark:group-hover:text-sulkar-lightgreen transition-colors duration-300">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{relatedPost.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Etiquetas</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/blog?tag=${tag.toLowerCase()}`}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-sulkar-green/10 hover:text-sulkar-green dark:hover:bg-sulkar-green/20 dark:hover:text-sulkar-lightgreen transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-sulkar-green text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">¿Interesado en nuestros productos?</h3>
                  <p className="mb-4 text-white/90">
                    Contáctanos hoy mismo para obtener más información sobre nuestros productos y servicios.
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
