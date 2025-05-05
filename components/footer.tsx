import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container-padding mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block relative">
              <div className="relative z-10">
                <Image
                  src="/logo-sulkar.png"
                  alt="SULKAR S.A.S."
                  width={200}
                  height={67}
                  className="h-20 w-auto relative z-10 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Empresa exportadora de pulpa de fruta, fruta congelada y derivados. Servicios de contratación pública y
              venta de bienes.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/nosotros"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/productos"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/contratacion"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen"
                >
                  Contratación Pública
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/politica-privacidad"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-condiciones"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen"
                >
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Dirección:</strong> Calle Principal #123, Bogotá, Colombia
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Teléfono:</strong> +57 (1) 123-4567
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Email:</strong> info@sulkar.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} SULKAR S.A.S. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
