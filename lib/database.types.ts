export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          username: string
          email: string | null
          password_hash: string
          full_name: string | null
          role: "admin" | "editor" | "viewer"
          is_active: boolean
          created_at: string
          updated_at: string
          last_login: string | null
        }
        Insert: {
          id?: string
          username: string
          email?: string | null
          password_hash: string
          full_name?: string | null
          role?: "admin" | "editor" | "viewer"
          is_active?: boolean
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          username?: string
          email?: string | null
          password_hash?: string
          full_name?: string | null
          role?: "admin" | "editor" | "viewer"
          is_active?: boolean
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
        Relationships: []
      }
      blogs: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content: string
          category: string | null
          tags: string[] | null
          author: string
          author_role: string | null
          author_image: string | null
          image: string | null
          featured_image: string | null
          additional_images: string[] | null
          status: "draft" | "published" | "archived"
          published_at: string | null
          created_at: string
          updated_at: string
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          content: string
          category?: string | null
          tags?: string[] | null
          author: string
          author_role?: string | null
          author_image?: string | null
          image?: string | null
          featured_image?: string | null
          additional_images?: string[] | null
          status?: "draft" | "published" | "archived"
          published_at?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string | null
          content?: string
          category?: string | null
          tags?: string[] | null
          author?: string
          author_role?: string | null
          author_image?: string | null
          image?: string | null
          featured_image?: string | null
          additional_images?: string[] | null
          status?: "draft" | "published" | "archived"
          published_at?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blogs_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blogs_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          key: string
          value: Json
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "site_settings_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
