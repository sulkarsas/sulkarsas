import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-sulkar-green dark:bg-gray-900">
        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Términos y Condiciones</h1>
            <p className="text-lg text-white/90">
              Condiciones generales que rigen el uso de nuestro sitio web y servicios.
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
            <h2>1. Introducción</h2>
            <p>
              Estos Términos y Condiciones ("Términos") rigen su acceso y uso del sitio web de SULKAR S.A.S. (en
              adelante "nosotros", "nuestro" o "la Empresa"), incluyendo cualquier contenido, funcionalidad y servicios
              ofrecidos en o a través de nuestro sitio web.
            </p>
            <p>
              Al acceder o utilizar nuestro sitio web, usted acepta estar sujeto a estos Términos. Si no está de acuerdo
              con alguna parte de estos términos, no tendrá derecho a acceder al sitio web.
            </p>

            <h2>2. Uso del sitio</h2>
            <p>
              Al utilizar nuestro sitio web, usted garantiza que tiene al menos 18 años de edad y que posee la capacidad
              legal para celebrar un contrato vinculante con la Empresa.
            </p>
            <p>El uso de nuestro sitio web está sujeto a las siguientes condiciones:</p>
            <ul>
              <li>
                No utilizará nuestro sitio web de manera ilegal o de una manera que pueda dañar, deshabilitar,
                sobrecargar o deteriorar el sitio.
              </li>
              <li>
                No obtendrá ni intentará obtener materiales o información a través de medios no disponibles
                intencionalmente a través del sitio.
              </li>
              <li>
                No utilizará robots, arañas u otros dispositivos automáticos para acceder al sitio con fines no
                autorizados.
              </li>
              <li>
                No introducirá virus, troyanos, gusanos, bombas lógicas u otro material malicioso o tecnológicamente
                dañino.
              </li>
            </ul>

            <h2>3. Propiedad intelectual</h2>
            <p>
              El sitio web y todo su contenido, características y funcionalidad (incluyendo pero no limitado a toda la
              información, software, texto, imágenes, marcas y diseños) son propiedad de SULKAR S.A.S. o de sus
              licenciantes y están protegidos por leyes de propiedad intelectual colombianas e internacionales.
            </p>
            <p>
              Usted no puede reproducir, distribuir, modificar, crear obras derivadas, exhibir públicamente, realizar
              públicamente, republicar, descargar, almacenar o transmitir cualquier material de nuestro sitio web,
              excepto según lo permitido expresamente por estos Términos.
            </p>

            <h2>4. Productos y servicios</h2>
            <p>
              Todos los productos y servicios mostrados en nuestro sitio web están sujetos a disponibilidad. Las
              descripciones de los productos y servicios son precisas al mejor de nuestro conocimiento, pero no
              garantizamos que sean completas, confiables, actuales o libres de errores.
            </p>
            <p>
              Los precios de nuestros productos y servicios están sujetos a cambios sin previo aviso. Nos reservamos el
              derecho de modificar o descontinuar cualquier producto o servicio sin previo aviso.
            </p>

            <h2>5. Pedidos y contratos</h2>
            <p>
              La información presentada en nuestro sitio web no constituye una oferta vinculante, sino una invitación
              para hacer negocios. Al enviar un pedido o solicitud a través de nuestro sitio web, usted está haciendo
              una oferta para comprar productos o servicios de acuerdo con estos Términos.
            </p>
            <p>
              Un contrato entre usted y nosotros solo se formará cuando aceptemos expresamente su pedido o comencemos a
              procesar su solicitud. Nos reservamos el derecho de aceptar o rechazar cualquier pedido a nuestra sola
              discreción.
            </p>

            <h2>6. Limitación de responsabilidad</h2>
            <p>
              En ningún caso SULKAR S.A.S., sus directores, empleados, socios, agentes, proveedores o afiliados serán
              responsables por cualquier daño indirecto, incidental, especial, consecuente o punitivo, incluyendo sin
              limitación, pérdida de ganancias, datos, uso, buena voluntad, u otras pérdidas intangibles, resultantes
              de:
            </p>
            <ul>
              <li>Su acceso o uso o incapacidad para acceder o usar el sitio web.</li>
              <li>Cualquier conducta o contenido de terceros en el sitio web.</li>
              <li>Cualquier contenido obtenido del sitio web.</li>
              <li>Acceso no autorizado, uso o alteración de sus transmisiones o contenido.</li>
            </ul>

            <h2>7. Indemnización</h2>
            <p>
              Usted acepta defender, indemnizar y mantener indemne a SULKAR S.A.S., sus afiliados, licenciantes y
              proveedores de servicios, y sus respectivos funcionarios, directores, empleados, contratistas, agentes,
              licenciantes, proveedores, sucesores y cesionarios de y contra cualquier reclamo, responsabilidad, daño,
              juicio, premio, pérdida, costo, gasto o tarifa (incluidos honorarios razonables de abogados) que surjan de
              o estén relacionados con su violación de estos Términos.
            </p>

            <h2>8. Ley aplicable y jurisdicción</h2>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes de la República de Colombia, sin tener
              en cuenta sus disposiciones sobre conflictos de leyes.
            </p>
            <p>
              Cualquier disputa legal que surja de o en relación con estos Términos estará sujeta a la jurisdicción
              exclusiva de los tribunales de Guadalajara de Buga, Valle del Cauca, Colombia.
            </p>

            <h2>9. Cambios a estos términos</h2>
            <p>
              Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en
              cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso con al menos 30 días de
              anticipación antes de que los nuevos términos entren en vigencia.
            </p>
            <p>
              Al continuar accediendo o utilizando nuestro sitio web después de que esas revisiones entren en vigencia,
              usted acepta estar sujeto a los términos revisados. Si no está de acuerdo con los nuevos términos, deje de
              usar el sitio web.
            </p>

            <h2>10. Contacto</h2>
            <p>Si tiene alguna pregunta sobre estos Términos y Condiciones, por favor contáctenos:</p>
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
