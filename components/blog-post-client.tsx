"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getBlogBySlug } from "@/lib/api"
import { notFound, useRouter } from "next/navigation"

export default function BlogPostClient({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadBlog() {
      setLoading(true)
      try {
        const data = await getBlogBySlug(slug)
        if (!data) {
          return notFound()
        }
        setBlog(data)
      } catch (error) {
        console.error(`Error loading blog ${slug}:`, error)
        router.push("/blog")
      } finally {
        setLoading(false)
      }
    }

    loadBlog()
  }, [slug, router])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-sulkar-green/80 to-sulkar-green/40 dark:from-gray-900/90 dark:to-gray-900/70" />
          </div>
          <div className="container-padding relative z-10 mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Cargando...</h1>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (!blog) {
    return notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={blog.featuredImage || blog.image || "/blog/aerial-view-seaport.jpeg"}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sulkar-green/80 to-sulkar-green/40 dark:from-gray-900/90 dark:to-gray-900/70" />
        </div>

        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al blog
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{blog.author}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {blog.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-white border-white/30 hover:bg-white/10">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>

              {/* Author Bio */}
              <div className="mt-12 flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden">
                  <Image src={blog.authorImage || "/placeholder.svg"} alt={blog.author} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{blog.author}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{blog.authorRole}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Experto en comercio internacional y exportación de productos agrícolas con más de 10 años de
                    experiencia en el sector.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Categoría</h3>
                <Link
                  href={`/blog?category=${blog.category}`}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-sulkar-green/10 text-sulkar-green dark:bg-sulkar-green/20 dark:text-sulkar-lightgreen hover:bg-sulkar-green/20 dark:hover:bg-sulkar-green/30 transition-colors"
                >
                  {blog.category}
                </Link>
              </div>

              {/* Related Posts */}
              {blog.relatedBlogs && blog.relatedBlogs.length > 0 && (
                <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">Artículos Relacionados</h3>
                  <div className="space-y-4">
                    {blog.relatedBlogs.map((post: any, index: number) => (
                      <div key={index} className="flex gap-3">
                        <div className="relative h-16 w-16 shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-2 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Compartir</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
