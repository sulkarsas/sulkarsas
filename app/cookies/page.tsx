import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CookiesPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-sulkar-green dark:bg-gray-900">
        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Política de Cookies</h1>
            <p className="text-lg text-white/90">
              Información sobre cómo SULKAR S.A.S. utiliza cookies y tecnologías similares en su sitio web.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-padding mx-auto max-w-4xl">
          <Button variant="outline" size="sm" className="mb-8" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (computadora, tableta o
              teléfono móvil) cuando visita un sitio web. Las cookies se utilizan ampliamente para hacer que los sitios
              web funcionen de manera más eficiente, así como para proporcionar información a los propietarios del
              sitio.
            </p>

            <h2>Cómo utilizamos las cookies</h2>
            <p>
              En SULKAR S.A.S. utilizamos cookies por varias razones, que se detallan a continuación.
              Desafortunadamente, en la mayoría de los casos no existen opciones estándar de la industria para
              deshabilitar las cookies sin afectar completamente la funcionalidad y características que agregan a este
              sitio. Se recomienda que deje todas las cookies si no está seguro de si las necesita o no, en caso de que
              se utilicen para proporcionar un servicio que usted utiliza.
            </p>

            <h2>Tipos de cookies que utilizamos</h2>
            <h3>Cookies esenciales</h3>
            <p>
              Estas cookies son necesarias para el funcionamiento básico de nuestro sitio web. Incluyen, por ejemplo,
              cookies que le permiten iniciar sesión en áreas seguras de nuestro sitio web o utilizar un carrito de
              compras. Estas cookies no pueden ser deshabilitadas.
            </p>

            <h3>Cookies de rendimiento</h3>
            <p>
              Estas cookies nos permiten contar las visitas y las fuentes de tráfico para que podamos medir y mejorar el
              rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más y menos populares y ver cómo los
              visitantes se mueven por el sitio. Toda la información que recopilan estas cookies es agregada y, por lo
              tanto, anónima.
            </p>

            <h3>Cookies de funcionalidad</h3>
            <p>
              Estas cookies permiten que el sitio web proporcione una funcionalidad y personalización mejoradas. Pueden
              ser establecidas por nosotros o por proveedores externos cuyos servicios hemos agregado a nuestras
              páginas. Si no permite estas cookies, es posible que algunos o todos estos servicios no funcionen
              correctamente.
            </p>

            <h3>Cookies de publicidad</h3>
            <p>
              Estas cookies pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios. Pueden
              ser utilizadas por esas empresas para construir un perfil de sus intereses y mostrarle anuncios relevantes
              en otros sitios. No almacenan directamente información personal, sino que se basan en la identificación
              única de su navegador y dispositivo de Internet.
            </p>

            <h2>Cookies de terceros</h2>
            <p>
              En algunos casos especiales, también utilizamos cookies proporcionadas por terceros de confianza. La
              siguiente sección detalla qué cookies de terceros puede encontrar a través de este sitio.
            </p>
            <ul>
              <li>
                Este sitio utiliza Google Analytics, una de las soluciones de análisis más extendidas y confiables en la
                web, para ayudarnos a entender cómo utiliza el sitio y las formas en que podemos mejorar su experiencia.
                Estas cookies pueden rastrear cosas como cuánto tiempo pasa en el sitio y las páginas que visita para
                que podamos continuar produciendo contenido atractivo.
              </li>
              <li>
                De vez en cuando probamos nuevas funciones y hacemos cambios sutiles en la forma en que se entrega el
                sitio. Cuando todavía estamos probando nuevas funciones, estas cookies pueden usarse para garantizar que
                reciba una experiencia consistente mientras está en el sitio, al tiempo que nos aseguramos de que
                entendemos qué optimizaciones aprecian más nuestros usuarios.
              </li>
              <li>
                A medida que vendemos productos, es importante que entendamos las estadísticas sobre cuántos visitantes
                de nuestro sitio realmente compran, y este es el tipo de datos que rastrearán estas cookies. Esto es
                importante para usted ya que significa que podemos hacer predicciones comerciales precisas que nos
                permitan monitorear nuestros costos de publicidad y productos para garantizar el mejor precio posible.
              </li>
            </ul>

            <h2>Cómo controlar las cookies</h2>
            <p>
              Puede controlar y/o eliminar las cookies según lo desee. Puede eliminar todas las cookies que ya están en
              su dispositivo y puede configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo,
              si hace esto, es posible que tenga que ajustar manualmente algunas preferencias cada vez que visite un
              sitio y algunos servicios y funcionalidades pueden no funcionar.
            </p>
            <p>
              La mayoría de los navegadores web permiten cierto control de la mayoría de las cookies a través de la
              configuración del navegador. Para obtener más información sobre las cookies, incluido cómo ver qué cookies
              se han establecido y cómo administrarlas y eliminarlas, visite{" "}
              <a
                href="https://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sulkar-green dark:text-sulkar-lightgreen hover:underline"
              >
                www.allaboutcookies.org
              </a>
              .
            </p>

            <h2>Más información</h2>
            <p>
              Esperamos que esto haya aclarado las cosas para usted. Como se mencionó anteriormente, si hay algo que no
              está seguro de si necesita o no, generalmente es más seguro dejar las cookies habilitadas en caso de que
              interactúen con una de las funciones que utiliza en nuestro sitio.
            </p>
            <p>
              Sin embargo, si todavía está buscando más información, puede contactarnos a través de uno de nuestros
              métodos de contacto preferidos:
            </p>
            <ul>
              <li>Por correo electrónico: contactosulkar@gmail.com</li>
              <li>Por teléfono: 317 362 3505</li>
              <li>Por correo postal: Calle 8 Sur #12-116, Guadalajara de Buga (V)</li>
            </ul>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">Última actualización: 3 de junio de 2025</p>
          </div>
        </div>
      </section>
    </div>
  )
}
