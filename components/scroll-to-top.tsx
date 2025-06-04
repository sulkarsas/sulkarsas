"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Cuando cambia la ruta, hacer scroll al inicio
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para un desplazamiento suave
    })
  }, [pathname]) // Se ejecuta cada vez que cambia la ruta

  return null // Este componente no renderiza nada visible
}
