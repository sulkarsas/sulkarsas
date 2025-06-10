import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, CreditCard, Banknote, Coins } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container-padding mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block relative">
              <div className="relative z-10">
                <Image
                  src="/logo-new.webp"
                  alt="SULKAR S.A.S."
                  width={200}
                  height={200}
                  className="h-20 w-auto relative z-10 dark:hidden"
                />
                <h1 className="hidden dark:block text-xl font-bold text-white">SULKAR S.A.S.</h1>
              </div>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Conectamos mercados globales mediante la exportación e importación de productos de calidad, ofreciendo
              soluciones logísticas integrales.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://web.facebook.com/profile.php?id=61576795193664&locale=es_LA"
                className="text-gray-500 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/sulkar.07"
                className="text-gray-500 hover:text-sulkar-green dark:hover:text-sulkar-lightgreen"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
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
                <strong>Dirección:</strong> Calle 8 Sur #12-116, Guadalajara de Buga (V)
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Teléfono:</strong> 316 3141622
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Email:</strong> contactosulkar@gmail.com
              </li>
            </ul>

            {/* Métodos de Pago - Sección destacada */}
            <div className="mt-6 p-4 bg-gradient-to-r from-sulkar-green/10 to-sulkar-lightgreen/10 dark:from-sulkar-green/20 dark:to-sulkar-lightgreen/20 rounded-lg border border-sulkar-green/20">
              <h4 className="text-sm font-semibold text-sulkar-green dark:text-sulkar-lightgreen mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Métodos de Pago
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <CreditCard className="h-3 w-3 text-sulkar-green" />
                  <span>Tarjetas de crédito/débito</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <Banknote className="h-3 w-3 text-sulkar-green" />
                  <span>Transferencias bancarias</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <Coins className="h-3 w-3 text-sulkar-green" />
                  <span>Criptomonedas (BTC, ETH, USDT)</span>
                </div>
              </div>
            </div>
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
