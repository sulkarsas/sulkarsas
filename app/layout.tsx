import type React from "react"
import type { Metadata } from "next"
import { Inter, Work_Sans } from "next/font/google"
import "./globals.css"
import "highlight.js/styles/github-dark.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedParticlesBackground } from "@/components/animated-particles-background"
import { ScrollToTop } from "@/components/scroll-to-top"
import { WhatsAppButton } from "@/components/whatsapp-button"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
})

export const metadata: Metadata = {
  title: "SULKAR S.A.S. | Exportación de Pulpa de Fruta y Contratación Pública",
  description:
    "Empresa exportadora de pulpa de fruta, fruta congelada y derivados. Servicios de contratación pública y venta de bienes.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${workSans.variable} font-sans relative transition-colors duration-500`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AnimatedParticlesBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <ScrollToTop />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
