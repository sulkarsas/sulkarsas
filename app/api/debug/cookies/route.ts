import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log("🔍 [DEBUG API] Checking cookies from server side...")
  
  const adminToken = request.cookies.get("admin_token")
  const allCookies = Array.from(request.cookies.getAll())
  
  const result = {
    hasAdminToken: !!adminToken,
    adminTokenValue: adminToken?.value?.substring(0, 20) + "..." || null,
    adminTokenLength: adminToken?.value?.length || 0,
    allCookieNames: allCookies.map(c => c.name),
    allCookies: allCookies.map(c => ({ name: c.name, value: c.value.substring(0, 20) + "..." })),
    cookieString: request.headers.get("cookie") || "",
    timestamp: new Date().toISOString()
  }
  
  console.log("🍪 [DEBUG API] Cookie analysis:", result)
  
  return NextResponse.json(result)
}
