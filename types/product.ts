export interface ProductRoute {
  destination: string
  transportMethod: string
  estimatedTime: string
  frequency: string
}

export interface ProductNutrition {
  calories: string
  protein: string
  carbs: string
  fat: string
  fiber: string
  vitamins: string[]
}

export interface ProductCertification {
  name: string
  icon: string
  description: string
}

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  image: string
  origin: string
  description: string
  longDescription?: string
  price?: {
    min: number
    max: number
    currency: string
  }
  availableSizes?: string[]
  packaging?: string[]
  shelfLife?: string
  storageInstructions?: string
  nutritionalInfo?: ProductNutrition
  certifications?: ProductCertification[]
  exportRoutes?: ProductRoute[]
  relatedProducts?: string[]
  featured?: boolean
}
