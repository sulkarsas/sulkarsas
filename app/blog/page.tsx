// app/blog/page.tsx - Server Component
import { Suspense } from "react"
import BlogClientPage from "@/components/blog-client-page"

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogClientPage />
    </Suspense>
  )
}

function BlogLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-sulkar-green/80 to-sulkar-green/40 dark:from-gray-900/90 dark:to-gray-900/70" />
        </div>
        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Blog</h1>
            <p className="text-xl text-white/90">Cargando contenido...</p>
          </div>
        </div>
      </section>
    </div>
  )
}
