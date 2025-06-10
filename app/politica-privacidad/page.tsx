import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-sulkar-green dark:bg-gray-900">
        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Política de Privacidad</h1>
            <p className="text-lg text-white/90">
              Información sobre cómo SULKAR S.A.S. recopila, utiliza y protege sus datos personales.
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
            <h2>Introducción</h2>
            <p>
              En SULKAR S.A.S., valoramos y respetamos su privacidad. Esta Política de Privacidad explica cómo
              recopilamos, utilizamos, divulgamos y protegemos su información personal cuando utiliza nuestro sitio web
              y nuestros servicios.
            </p>
            <p>
              Al utilizar nuestro sitio web y servicios, usted acepta las prácticas descritas en esta Política de
              Privacidad. Le recomendamos que lea este documento detenidamente para comprender nuestras políticas y
              prácticas respecto a su información personal.
            </p>

            <h2>Información que recopilamos</h2>
            <p>Podemos recopilar los siguientes tipos de información:</p>
            <ul>
              <li>
                <strong>Información personal identificable:</strong> Nombre, dirección de correo electrónico, número de
                teléfono, dirección postal, información de la empresa y otra información que usted nos proporcione
                voluntariamente a través de formularios de contacto o al solicitar nuestros servicios.
              </li>
              <li>
                <strong>Información no personal:</strong> Datos anónimos sobre el uso del sitio web, como dirección IP,
                tipo de navegador, proveedor de servicios de Internet, páginas de referencia/salida, sistema operativo,
                fecha/hora y datos de navegación.
              </li>
            </ul>

            <h2>Cómo utilizamos su información</h2>
            <p>Utilizamos la información que recopilamos para los siguientes propósitos:</p>
            <ul>
              <li>Proporcionar, mantener y mejorar nuestros servicios</li>
              <li>Procesar y completar transacciones</li>
              <li>Enviar información técnica, actualizaciones, alertas de seguridad y mensajes de soporte</li>
              <li>Responder a sus comentarios, preguntas y solicitudes</li>
              <li>Comunicarnos con usted sobre productos, servicios, ofertas y eventos</li>
              <li>Monitorear y analizar tendencias, uso y actividades relacionadas con nuestros servicios</li>
              <li>Detectar, investigar y prevenir actividades fraudulentas y no autorizadas</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>

            <h2>Divulgación de su información</h2>
            <p>
              No vendemos, comercializamos ni alquilamos su información personal identificable a terceros. Sin embargo,
              podemos compartir su información en las siguientes circunstancias:
            </p>
            <ul>
              <li>
                <strong>Proveedores de servicios:</strong> Podemos compartir su información con terceros que realizan
                servicios en nuestro nombre (como procesamiento de pagos, análisis de datos, envío de correos
                electrónicos, servicios de alojamiento, servicio al cliente).
              </li>
              <li>
                <strong>Cumplimiento legal:</strong> Podemos divulgar su información si creemos de buena fe que dicha
                acción es necesaria para cumplir con una obligación legal, proteger y defender nuestros derechos o
                propiedad, proteger la seguridad personal de los usuarios de nuestros servicios o del público, o
                proteger contra responsabilidad legal.
              </li>
              <li>
                <strong>Transferencias comerciales:</strong> En caso de fusión, adquisición o venta de activos, su
                información personal puede ser transferida. Le notificaremos antes de que su información personal sea
                transferida y quede sujeta a una política de privacidad diferente.
              </li>
            </ul>

            <h2>Seguridad de los datos</h2>
            <p>
              La seguridad de su información personal es importante para nosotros. Implementamos medidas de seguridad
              técnicas, administrativas y físicas diseñadas para proteger su información personal contra acceso no
              autorizado, divulgación, uso y modificación.
            </p>
            <p>
              Sin embargo, ningún método de transmisión por Internet o método de almacenamiento electrónico es 100%
              seguro. Por lo tanto, aunque nos esforzamos por utilizar medios comercialmente aceptables para proteger su
              información personal, no podemos garantizar su seguridad absoluta.
            </p>

            <h2>Sus derechos</h2>
            <p>Usted tiene los siguientes derechos con respecto a su información personal:</p>
            <ul>
              <li>Derecho a acceder a su información personal</li>
              <li>Derecho a rectificar información inexacta o incompleta</li>
              <li>Derecho a eliminar su información personal en determinadas circunstancias</li>
              <li>Derecho a restringir el procesamiento de su información personal</li>
              <li>Derecho a la portabilidad de datos</li>
              <li>Derecho a oponerse al procesamiento de su información personal</li>
              <li>Derecho a retirar el consentimiento en cualquier momento</li>
            </ul>
            <p>
              Para ejercer estos derechos, póngase en contacto con nosotros a través de la información proporcionada en
              la sección "Contáctenos" a continuación.
            </p>

            <h2>Cookies y tecnologías similares</h2>
            <p>
              Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro sitio web
              y almacenar cierta información. Las cookies son archivos con una pequeña cantidad de datos que pueden
              incluir un identificador único anónimo.
            </p>
            <p>
              Puede instruir a su navegador para que rechace todas las cookies o para que le avise cuando se envía una
              cookie. Sin embargo, si no acepta cookies, es posible que no pueda utilizar algunas partes de nuestro
              servicio.
            </p>
            <p>
              Para obtener más información sobre cómo utilizamos las cookies, consulte nuestra{" "}
              <Link href="/cookies" className="text-sulkar-green dark:text-sulkar-lightgreen hover:underline">
                Política de Cookies
              </Link>
              .
            </p>

            <h2>Enlaces a sitios de terceros</h2>
            <p>
              Nuestro sitio web puede contener enlaces a sitios web de terceros. No tenemos control ni asumimos
              responsabilidad por el contenido, las políticas de privacidad o las prácticas de sitios web o servicios de
              terceros. Le recomendamos que lea la política de privacidad de cada sitio que visite.
            </p>

            <h2>Cambios a esta política de privacidad</h2>
            <p>
              Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio
              publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "última
              actualización" a continuación.
            </p>
            <p>
              Le recomendamos que revise esta Política de Privacidad periódicamente para conocer cualquier cambio. Los
              cambios a esta Política de Privacidad son efectivos cuando se publican en esta página.
            </p>

            <h2>Contáctenos</h2>
            <p>Si tiene alguna pregunta sobre esta Política de Privacidad, por favor contáctenos:</p>
            <ul>
              <li>Por correo electrónico: contactosulkar@gmail.com</li>
              <li>Por teléfono: 316 3141622</li>
              <li>Por correo postal: Calle 8 Sur #12-116, Guadalajara de Buga (V)</li>
            </ul>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">Última actualización: 3 de junio de 2025</p>
          </div>
        </div>
      </section>
    </div>
  )
}
