"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Search, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { blogPosts } from "@/components/blog/blog-posts"

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const totalPages = 3 // En un caso real, esto vendría de tus datos

  // Función para filtrar posts
  const filteredPosts = blogPosts.filter((post) => {
    // Filtrar por búsqueda
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtrar por categoría
    const matchesCategory = selectedCategory === null || post.category === selectedCategory

    // Filtrar por etiqueta
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag)

    return matchesSearch && matchesCategory && matchesTag
  })

  // Función para manejar la búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Resetear a la primera página al buscar
  }

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category)
    setCurrentPage(1) // Resetear a la primera página al cambiar categoría
  }

  // Función para manejar el cambio de etiqueta
  const handleTagChange = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag)
    setCurrentPage(1) // Resetear a la primera página al cambiar etiqueta
  }

  // Función para manejar el cambio de página
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Categorías disponibles con conteo dinámico
  const categoryCounts = blogPosts.reduce(
    (acc, post) => {
      if (post.category) {
        acc[post.category] = (acc[post.category] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const categories = Object.keys(categoryCounts).map((name) => ({
    name,
    count: categoryCounts[name],
  }))

  // Etiquetas disponibles
  const tags = [
    "Exportación",
    "Contratación",
    "Pulpa de Fruta",
    "Mercado Internacional",
    "Logística",
    "Frutas Exóticas",
    "Colombia",
    "Agricultura",
    "Tendencias",
    "Licitaciones",
    "Calidad",
    "Certificaciones",
    "Sostenibilidad",
    "Nutrición",
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/blog/aerial-view-seaport.jpeg"
            alt="SULKAR S.A.S. Blog - Puerto de exportación"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sulkar-green/80 to-sulkar-green/40 dark:from-gray-900/90 dark:to-gray-900/70" />
        </div>

        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Blog</h1>
            <p className="text-xl text-white/90">
              Noticias, artículos y recursos sobre exportación, pulpa de fruta y contratación pública.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Artículos Recientes</h2>
                <Select defaultValue="recent">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Más recientes</SelectItem>
                    <SelectItem value="popular">Más populares</SelectItem>
                    <SelectItem value="oldest">Más antiguos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-8">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative h-60 md:h-full">
                          <Image
                            src={
                              post.slug === "beneficios-de-la-pulpa-de-fruta-congelada"
                                ? "/productos/pulpa-fresa.jpg"
                                : post.image ||
                                  `/blog/${post.category.toLowerCase().replace(/\s+/g, "-")}.jpeg` ||
                                  "/blog/strawberries-oranges.jpeg"
                            }
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                          {post.slug === "beneficios-de-la-pulpa-de-fruta-congelada" && (
                            <div className="absolute inset-0 flex">
                              <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-60 overflow-hidden">
                                <Image
                                  src="/productos/pulpa-mango.jpg"
                                  alt="Pulpa de mango"
                                  fill
                                  className="object-cover scale-125 origin-left"
                                />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                          )}
                          {post.slug !== "beneficios-de-la-pulpa-de-fruta-congelada" && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                          )}
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
                              <Badge
                                key={tagIndex}
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleTagChange(tag)
                                }}
                              >
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
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-bold mb-2">No se encontraron artículos</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      No hay artículos que coincidan con tu búsqueda. Intenta con otros términos o filtros.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory(null)
                        setSelectedTag(null)
                      }}
                    >
                      Ver todos los artículos
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-12 flex justify-center">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    <span className="sr-only">Página anterior</span>
                  </Button>

                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className={
                        currentPage === index + 1
                          ? "bg-sulkar-green text-white hover:bg-sulkar-green/90 dark:bg-sulkar-lightgreen dark:hover:bg-sulkar-lightgreen/90"
                          : ""
                      }
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Página siguiente</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Search */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Buscar</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      placeholder="Buscar artículos..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                  {searchQuery && (
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Mostrando resultados para: <span className="font-medium">{searchQuery}</span>
                      <Button variant="ghost" size="sm" className="ml-2 h-6 px-2" onClick={() => setSearchQuery("")}>
                        Limpiar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Categorías</h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategoryChange(category.name)}
                        className={`flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen w-full text-left ${
                          selectedCategory === category.name
                            ? "text-sulkar-green dark:text-sulkar-lightgreen font-medium"
                            : ""
                        }`}
                      >
                        <span>{category.name}</span>
                        <Badge variant="secondary">{category.count}</Badge>
                      </button>
                    ))}
                  </div>
                  {selectedCategory && (
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedCategory(null)}>
                        Ver todas las categorías
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Artículos Populares</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post, index) => (
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
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Etiquetas</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => handleTagChange(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTag === tag
                            ? "bg-sulkar-green text-white dark:bg-sulkar-lightgreen"
                            : "bg-gray-100 dark:bg-gray-800 hover:bg-sulkar-green/10 hover:text-sulkar-green dark:hover:bg-sulkar-green/20 dark:hover:text-sulkar-lightgreen"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  {selectedTag && (
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedTag(null)}>
                        Ver todas las etiquetas
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-sulkar-green text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Suscríbete a nuestro boletín</h3>
                  <p className="mb-4 text-white/90">
                    Recibe las últimas noticias y artículos sobre exportación y contratación pública.
                  </p>
                  <div className="space-y-3">
                    <Input
                      placeholder="Tu correo electrónico"
                      className="bg-white/10 border-white/20 placeholder:text-white/60 text-white"
                    />
                    <Button variant="secondary" className="w-full">
                      Suscribirse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
