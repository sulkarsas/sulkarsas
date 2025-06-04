export interface BlogPost {
  id?: string
  slug: string
  title: string
  date?: string
  author: string
  authorRole: string
  authorImage: string
  image: string
  featuredImage?: string
  additionalImages?: string[]
  tags: string[]
  category: string
  excerpt: string
  content: string
  relatedPosts?: string[]
  status?: "draft" | "published"
  publishedAt?: string
}
