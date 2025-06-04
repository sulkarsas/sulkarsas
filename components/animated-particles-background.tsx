"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export function AnimatedParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar el canvas para que ocupe toda la pantalla
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Crear partículas
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150) // Limitar el número de partículas
    const particles: Particle[] = []

    const isDark = theme === "dark"

    // Colores base según el tema
    const baseColors = isDark
      ? ["#4CAF50", "#2E7D32", "#1B5E20", "#388E3C", "#66BB6A"] // Verdes para modo oscuro
      : ["#81C784", "#A5D6A7", "#C8E6C9", "#E8F5E9", "#F1F8E9"] // Verdes claros para modo claro

    // Crear partículas con propiedades aleatorias
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 5 + 1
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: baseColors[Math.floor(Math.random() * baseColors.length)],
      })
    }

    // Crear nebulosas
    const nebulae = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.3,
        radius: canvas.width * 0.3,
        color: isDark ? "rgba(46, 125, 50, 0.1)" : "rgba(46, 125, 50, 0.05)",
      },
      {
        x: canvas.width * 0.7,
        y: canvas.height * 0.6,
        radius: canvas.width * 0.25,
        color: isDark ? "rgba(76, 175, 80, 0.1)" : "rgba(76, 175, 80, 0.05)",
      },
      {
        x: canvas.width * 0.8,
        y: canvas.height * 0.2,
        radius: canvas.width * 0.2,
        color: isDark ? "rgba(129, 199, 132, 0.1)" : "rgba(129, 199, 132, 0.05)",
      },
    ]

    // Función para dibujar las nebulosas
    const drawNebulae = () => {
      nebulae.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius)
        gradient.addColorStop(0, nebula.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Función para animar las partículas
    const animate = () => {
      // Limpiar el canvas con un fondo que tenga transición suave
      ctx.fillStyle = isDark ? "#111827" : "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar nebulosas
      drawNebulae()

      // Dibujar y actualizar partículas
      particles.forEach((particle) => {
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1

        // Mover partículas
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Rebote en los bordes
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [mounted, theme])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full transition-colors duration-500" />
}
