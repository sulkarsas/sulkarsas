import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Share2, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogPostPage() {
  // En una implementación real, aquí se obtendría el post desde la base de datos
  const post = {
    title: "Tendencias en importación de frutas exóticas",
    date: "28 Marzo, 2023",
    author: "María Fernández",
    authorRole: "Directora de Operaciones",
    authorImage: "/team/maria.png",
    image: "/blog/warehouse-worker-orange.jpeg",
    tags: ["Importación", "Tendencias", "Mercado Internacional"],
    content: `
      <p>El mercado global de frutas exóticas está experimentando un crecimiento sin precedentes, impulsado por la creciente demanda de sabores nuevos y experiencias culinarias únicas. En SULKAR S.A.S., estamos observando de cerca estas tendencias para ofrecer a nuestros clientes los productos más solicitados y de mayor calidad.</p>
      
      <h2>Aumento en la demanda de frutas exóticas</h2>
      
      <p>En los últimos años, hemos presenciado un incremento significativo en la demanda de frutas exóticas en mercados tradicionalmente conservadores. Este fenómeno puede atribuirse a varios factores:</p>
      
      <ul>
        <li>Mayor exposición a culturas culinarias diversas a través de redes sociales y programas de cocina</li>
        <li>Creciente interés en dietas saludables y alimentos funcionales</li>
        <li>Búsqueda de experiencias gastronómicas únicas y memorables</li>
        <li>Aumento de comunidades multiculturales en grandes centros urbanos</li>
      </ul>
      
      <div class="my-8 relative h-80 rounded-xl overflow-hidden">
        <img src="/blog/strawberries-oranges.jpeg" alt="Frutas exóticas" class="object-cover w-full h-full" />
      </div>
      
      <h2>Frutas exóticas más populares en mercados internacionales</h2>
      
      <p>Nuestros estudios de mercado han identificado varias frutas colombianas que están ganando popularidad rápidamente en mercados internacionales:</p>
      
      <h3>1. Pitahaya (Fruta del dragón)</h3>
      
      <p>La pitahaya colombiana, conocida por su intenso color y sabor dulce, está experimentando un auge en mercados asiáticos y europeos. Su atractivo visual y propiedades antioxidantes la han convertido en un producto premium muy solicitado.</p>
      
      <h3>2. Gulupa</h3>
      
      <p>Esta variedad de maracuyá está ganando terreno en mercados gourmet, especialmente en Europa. Su sabor equilibrado entre dulce y ácido la hace perfecta para postres, cócteles y platos de alta cocina.</p>
      
      <div class="my-8 relative h-80 rounded-xl overflow-hidden">
        <img src="/blog/warehouse-worker-hand-truck.jpeg" alt="Logística de importación" class="object-cover w-full h-full" />
      </div>
      
      <h3>3. Granadilla</h3>
      
      <p>La granadilla colombiana está encontrando un nicho creciente en mercados de América del Norte y Europa. Su sabor dulce y refrescante, combinado con sus beneficios para la salud, la han posicionado como una fruta premium.</p>
      
      <h3>4. Uchuva (Physalis)</h3>
      
      <p>La uchuva colombiana, reconocida por su calidad superior, continúa expandiendo su presencia en mercados internacionales. Su versatilidad culinaria y valor nutricional la han convertido en un ingrediente codiciado por chefs de todo el mundo.</p>
      
      <h2>Desafíos y oportunidades en la importación</h2>
      
      <p>La importación de frutas exóticas presenta desafíos únicos, pero también oportunidades significativas:</p>
      
      <ul>
        <li>Regulaciones fitosanitarias cada vez más estrictas que requieren certificaciones específicas</li>
        <li>Necesidad de cadenas de frío eficientes para mantener la calidad del producto</li>
        <li>Oportunidades para desarrollar presentaciones innovadoras que extiendan la vida útil</li>
        <li>Creciente demanda de productos orgánicos y sostenibles</li>
      </ul>
      
      <div class="my-8 relative h-80 rounded-xl overflow-hidden">
        <img src="/blog/aerial-view-seaport.jpeg" alt="Puerto de importación" class="object-cover w-full h-full" />
      </div>
      
      <h2>El futuro de la importación de frutas exóticas</h2>
      
      <p>En SULKAR S.A.S. anticipamos que la demanda de frutas exóticas continuará creciendo en los próximos años. Las tendencias actuales sugieren:</p>
      
      <ul>
        <li>Mayor interés en variedades raras y poco conocidas</li>
        <li>Crecimiento en la demanda de productos procesados como pulpas y concentrados</li>
        <li>Aumento en la importancia de la trazabilidad y las prácticas sostenibles</li>
        <li>Desarrollo de empaques innovadores que reduzcan la huella ambiental</li>
      </ul>
      
      <p>Estamos comprometidos a mantenernos a la vanguardia de estas tendencias, ofreciendo a nuestros clientes los productos más frescos y de la más alta calidad, mientras trabajamos con nuestros proveedores para garantizar prácticas sostenibles y comercio justo.</p>
    `,
    relatedPosts: [
      {
        title: "Nuevos mercados para la pulpa de fruta colombiana",
        image: "/blog/strawberries-oranges.jpeg",
        date: "15 Abril, 2023",
        tags: ["Exportación", "Novedades"],
      },
      {
        title: "Beneficios de la pulpa de fruta congelada",
        image: "/blog/warehouse-worker-orange.jpeg",
        date: "10 Marzo, 2023",
        tags: ["Productos", "Novedades"],
      },
      {
        title: "Tendencias en el consumo de frutas exóticas",
        image: "/blog/strawberries-oranges.jpeg",
        date: "12 Febrero, 2023",
        tags: ["Mercado", "Tendencias"],
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
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
                dangerouslySetInnerHTML={{ __html: post.content }}
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
                    Especialista en logística y cadena de suministro, María ha sido fundamental en el desarrollo de los
                    procesos operativos y la expansión internacional de SULKAR.
                  </p>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Artículos relacionados</h3>
                  <div className="space-y-4">
                    {post.relatedPosts.map((relatedPost, index) => (
                      <Link
                        key={index}
                        href={`/blog/${relatedPost.title.toLowerCase().replace(/ /g, "-")}`}
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
                    Contáctanos hoy mismo para obtener más información sobre nuestros productos y servicios de
                    importación y exportación.
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
