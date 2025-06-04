import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthService } from "@/lib/auth-service"
import supabaseAdmin from "@/lib/supabaseAdmin"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          // Verificar credenciales usando el AuthService existente
          const isValid = await AuthService.verifyCredentials(
            credentials.username,
            credentials.password
          )

          if (isValid) {
            // Obtener datos del usuario admin
            const { data: admin, error } = await supabaseAdmin
              .from("admin_users")
              .select("id, username, email")
              .eq("username", credentials.username)
              .eq("is_active", true)
              .single()

            if (error || !admin) {
              return null
            }

            return {
              id: admin.id,
              name: admin.username,
              email: admin.email,
              role: "admin"
            }
          }

          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: "/admin"
  }
}
