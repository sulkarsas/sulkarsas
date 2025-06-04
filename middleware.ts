import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "sulkar-secret-key-change-in-production"

export async function middleware(request: NextRequest) {
  // Skip middleware entirely for upload route
  if (request.nextUrl.pathname.startsWith("/api/admin/upload")) {
    console.log("🔍 [MIDDLEWARE] Skipping upload route")
    return NextResponse.next()
  }

  // Skip middleware entirely for blogs route
  if (request.nextUrl.pathname.startsWith("/api/admin/blogs")) {
    console.log("🔍 [MIDDLEWARE] Skipping blogs route")
    return NextResponse.next()
  }

  // Verificar si la ruta es administrativa
  const isAdminRoute = request.nextUrl.pathname.startsWith("/management")
  const isAdminApiRoute = request.nextUrl.pathname.startsWith("/api/admin") && 
                         !request.nextUrl.pathname.startsWith("/api/admin/login") &&
                         !request.nextUrl.pathname.startsWith("/api/admin/verify")

  console.log("🔍 [MIDDLEWARE] Ruta:", request.nextUrl.pathname, { isAdminRoute, isAdminApiRoute })

  // Solo aplicar middleware a rutas administrativas
  if (!isAdminRoute && !isAdminApiRoute) {
    return NextResponse.next()
  }

  // Obtener token del header Authorization o de las cookies
  let token = request.headers.get("authorization")?.replace("Bearer ", "")
  
  // Si no hay token en el header, buscar en cookies
  if (!token) {
    token = request.cookies.get("admin_token")?.value
  }

  console.log("🍪 [MIDDLEWARE] Token encontrado:", { 
    hasAuthHeader: !!request.headers.get("authorization"),
    hasCookie: !!request.cookies.get("admin_token"),
    cookieValue: request.cookies.get("admin_token")?.value?.substring(0, 20) + "..." || "none",
    tokenLength: token?.length || 0,
    allCookies: request.cookies.toString(),
    allCookieNames: Array.from(request.cookies.getAll()).map(c => c.name)
  })

  // Si no hay token, redirigir al login
  if (!token) {
    console.log("❌ [MIDDLEWARE] No token - Redirigiendo a auth-system")
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/auth-system", request.url))
    }
    return NextResponse.json({ message: "Token requerido" }, { status: 401 })
  }

  try {
    // Verificar el JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as any
    
    if (!decoded || !decoded.username) {
      throw new Error("Token inválido")
    }

    console.log("✅ [MIDDLEWARE] Token válido para usuario:", decoded.username)
    // Token válido, continuar
    return NextResponse.next()
    
  } catch (error: any) {
    console.log("❌ [MIDDLEWARE] Token inválido:", error.message)
    // Token inválido
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/auth-system", request.url))
    }
    return NextResponse.json({ message: "Token inválido" }, { status: 401 })
  }
}

// Configurar las rutas que deben ser procesadas por el middleware
export const config = {
  matcher: ["/management/:path*", "/api/admin/:path*"],
}
