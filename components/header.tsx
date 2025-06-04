"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Blog", href: "/blog" },
  { name: "Contacto", href: "/contacto" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="container-padding mx-auto flex h-16 items-center justify-between">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 relative">
            <span className="sr-only">SULKAR S.A.S.</span>
            <div className="relative z-10">
              <Image
                src="/logo-new.webp"
                alt="SULKAR S.A.S."
                width={150}
                height={150}
                className="h-14 w-auto relative z-10 dark:hidden"
              />
              <h1 className="hidden dark:block text-lg font-bold text-white">SULKAR S.A.S.</h1>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Abrir menú</span>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-sulkar-green dark:hover:text-sulkar-lightgreen ${
                pathname === item.href
                  ? "text-sulkar-green dark:text-sulkar-lightgreen"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-2">
          <ModeToggle />
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-gray-900/80" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 relative">
              <span className="sr-only">SULKAR S.A.S.</span>
              <div className="relative z-10">
                <Image
                  src="/logo-new.webp"
                  alt="SULKAR S.A.S."
                  width={150}
                  height={150}
                  className="h-14 w-auto relative z-10 dark:hidden"
                />
                <h1 className="hidden dark:block text-lg font-bold text-white">SULKAR S.A.S.</h1>
              </div>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Cerrar menú</span>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      pathname === item.href
                        ? "text-sulkar-green dark:text-sulkar-lightgreen"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 flex items-center gap-2">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
