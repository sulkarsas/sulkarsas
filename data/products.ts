import type { Product } from "@/types/product"

export const products: Product[] = [
  {
    id: "pulpa-fresa",
    name: "Pulpa de Fresa",
    slug: "pulpa-de-fresa",
    category: "Pulpa de Fruta",
    image: "/productos/pulpa-fresa.jpg",
    origin: "Valle del Cauca, Colombia",
    description:
      "Pulpa de fresa 100% natural, sin conservantes ni azúcares añadidos. Ideal para jugos, batidos y postres.",
    longDescription:
      "Nuestra pulpa de fresa es elaborada con las mejores fresas seleccionadas del Valle del Cauca. Procesamos la fruta en su punto óptimo de maduración para garantizar el mejor sabor y valor nutricional. No contiene conservantes, colorantes ni azúcares añadidos, manteniendo todo el sabor y beneficios naturales de la fruta fresca. Ideal para la preparación de jugos, batidos, postres, helados y cócteles.",
    price: {
      min: 3.5,
      max: 5.0,
      currency: "USD",
    },
    availableSizes: ["250g", "500g", "1kg", "5kg", "20kg"],
    packaging: ["Bolsa aséptica", "Bolsa IQF", "Tambor aséptico (para volúmenes industriales)"],
    shelfLife: "24 meses congelado a -18°C",
    storageInstructions:
      "Mantener congelado a -18°C. Una vez descongelado, consumir dentro de las 24 horas siguientes y mantener refrigerado.",
    nutritionalInfo: {
      calories: "45 kcal por 100g",
      protein: "0.7g por 100g",
      carbs: "10.5g por 100g",
      fat: "0.3g por 100g",
      fiber: "2g por 100g",
      vitamins: ["Vitamina C", "Vitamina A", "Potasio", "Folato"],
    },
    certifications: [
      {
        name: "HACCP",
        icon: "shield-check",
        description: "Certificación de Análisis de Peligros y Puntos Críticos de Control",
      },
      {
        name: "ISO 9001",
        icon: "badge-check",
        description: "Sistema de Gestión de Calidad",
      },
      {
        name: "Global G.A.P.",
        icon: "globe",
        description: "Buenas Prácticas Agrícolas",
      },
    ],
    exportRoutes: [
      {
        destination: "Estados Unidos",
        transportMethod: "Marítimo",
        estimatedTime: "10-15 días",
        frequency: "Semanal",
      },
      {
        destination: "Unión Europea",
        transportMethod: "Marítimo",
        estimatedTime: "18-22 días",
        frequency: "Quincenal",
      },
      {
        destination: "Canadá",
        transportMethod: "Marítimo",
        estimatedTime: "12-16 días",
        frequency: "Quincenal",
      },
      {
        destination: "Japón",
        transportMethod: "Marítimo",
        estimatedTime: "25-30 días",
        frequency: "Mensual",
      },
    ],
    relatedProducts: ["pulpa-mango", "pulpa-maracuya", "fresa-congelada"],
    featured: true,
  },
  {
    id: "pulpa-mango",
    name: "Pulpa de Mango",
    slug: "pulpa-de-mango",
    category: "Pulpa de Fruta",
    image: "/productos/pulpa-mango.jpg",
    origin: "Tolima, Colombia",
    description: "Pulpa de mango Tommy 100% natural, sin conservantes ni azúcares añadidos. Sabor tropical auténtico.",
    longDescription:
      "Nuestra pulpa de mango Tommy es elaborada con los mejores mangos seleccionados del Tolima. Procesamos la fruta en su punto óptimo de maduración para garantizar el mejor sabor y valor nutricional. No contiene conservantes, colorantes ni azúcares añadidos, manteniendo todo el sabor y beneficios naturales de la fruta fresca. Su sabor dulce y aroma intenso la hacen perfecta para jugos, batidos, postres y salsas.",
    price: {
      min: 3.8,
      max: 5.2,
      currency: "USD",
    },
    availableSizes: ["250g", "500g", "1kg", "5kg", "20kg"],
    packaging: ["Bolsa aséptica", "Bolsa IQF", "Tambor aséptico (para volúmenes industriales)"],
    shelfLife: "24 meses congelado a -18°C",
    storageInstructions:
      "Mantener congelado a -18°C. Una vez descongelado, consumir dentro de las 24 horas siguientes y mantener refrigerado.",
    nutritionalInfo: {
      calories: "60 kcal por 100g",
      protein: "0.5g por 100g",
      carbs: "15g por 100g",
      fat: "0.2g por 100g",
      fiber: "1.6g por 100g",
      vitamins: ["Vitamina A", "Vitamina C", "Vitamina E", "Potasio"],
    },
    certifications: [
      {
        name: "HACCP",
        icon: "shield-check",
        description: "Certificación de Análisis de Peligros y Puntos Críticos de Control",
      },
      {
        name: "ISO 9001",
        icon: "badge-check",
        description: "Sistema de Gestión de Calidad",
      },
      {
        name: "Global G.A.P.",
        icon: "globe",
        description: "Buenas Prácticas Agrícolas",
      },
    ],
    exportRoutes: [
      {
        destination: "Estados Unidos",
        transportMethod: "Marítimo",
        estimatedTime: "10-15 días",
        frequency: "Semanal",
      },
      {
        destination: "Unión Europea",
        transportMethod: "Marítimo",
        estimatedTime: "18-22 días",
        frequency: "Quincenal",
      },
      {
        destination: "Emiratos Árabes Unidos",
        transportMethod: "Aéreo/Marítimo",
        estimatedTime: "Aéreo: 2-3 días / Marítimo: 25-30 días",
        frequency: "Aéreo: Semanal / Marítimo: Mensual",
      },
    ],
    relatedProducts: ["pulpa-fresa", "pulpa-maracuya", "mango-congelado"],
    featured: true,
  },
  {
    id: "pulpa-maracuya",
    name: "Pulpa de Maracuyá",
    slug: "pulpa-de-maracuya",
    category: "Pulpa de Fruta",
    image: "/productos/pulpa-maracuya.jpg",
    origin: "Huila, Colombia",
    description:
      "Pulpa de maracuyá 100% natural, con su característico sabor ácido y aromático. Perfecta para bebidas y postres.",
    longDescription:
      "Nuestra pulpa de maracuyá es elaborada con los mejores frutos seleccionados del Huila. Procesamos la fruta en su punto óptimo de maduración para garantizar el mejor sabor y valor nutricional. No contiene conservantes, colorantes ni azúcares añadidos, manteniendo todo el sabor y beneficios naturales de la fruta fresca. Su sabor ácido y aroma intenso la hacen perfecta para jugos, cócteles, postres y salsas exóticas.",
    price: {
      min: 4.0,
      max: 5.5,
      currency: "USD",
    },
    availableSizes: ["250g", "500g", "1kg", "5kg", "20kg"],
    packaging: ["Bolsa aséptica", "Bolsa IQF", "Tambor aséptico (para volúmenes industriales)"],
    shelfLife: "24 meses congelado a -18°C",
    storageInstructions:
      "Mantener congelado a -18°C. Una vez descongelado, consumir dentro de las 24 horas siguientes y mantener refrigerado.",
    nutritionalInfo: {
      calories: "55 kcal por 100g",
      protein: "0.8g por 100g",
      carbs: "13.5g por 100g",
      fat: "0.4g por 100g",
      fiber: "1.9g por 100g",
      vitamins: ["Vitamina C", "Vitamina A", "Hierro", "Potasio", "Fósforo"],
    },
    certifications: [
      {
        name: "HACCP",
        icon: "shield-check",
        description: "Certificación de Análisis de Peligros y Puntos Críticos de Control",
      },
      {
        name: "ISO 9001",
        icon: "badge-check",
        description: "Sistema de Gestión de Calidad",
      },
      {
        name: "Global G.A.P.",
        icon: "globe",
        description: "Buenas Prácticas Agrícolas",
      },
    ],
    exportRoutes: [
      {
        destination: "Estados Unidos",
        transportMethod: "Marítimo",
        estimatedTime: "10-15 días",
        frequency: "Semanal",
      },
      {
        destination: "Unión Europea",
        transportMethod: "Marítimo",
        estimatedTime: "18-22 días",
        frequency: "Quincenal",
      },
      {
        destination: "Asia",
        transportMethod: "Marítimo",
        estimatedTime: "28-35 días",
        frequency: "Mensual",
      },
    ],
    relatedProducts: ["pulpa-fresa", "pulpa-mango", "pulpa-guanabana"],
    featured: true,
  },
  {
    id: "banano-congelado",
    name: "Banano Congelado",
    slug: "banano-congelado",
    category: "Fruta Congelada",
    image: "/productos/banano.jpg",
    origin: "Urabá, Colombia",
    description:
      "Rodajas de banano congeladas mediante tecnología IQF, conservando todas sus propiedades nutricionales.",
    longDescription:
      "Nuestras rodajas de banano congelado son procesadas utilizando la tecnología Individual Quick Freezing (IQF), que permite congelar cada pieza individualmente, conservando su forma, textura, sabor y propiedades nutricionales. Ideal para smoothies, batidos, repostería y como ingrediente en múltiples preparaciones. No contiene conservantes ni aditivos, solo fruta natural en su punto óptimo de maduración.",
    price: {
      min: 3.2,
      max: 4.8,
      currency: "USD",
    },
    availableSizes: ["250g", "500g", "1kg", "5kg", "10kg"],
    packaging: ["Bolsa IQF", "Caja (para volúmenes industriales)"],
    shelfLife: "24 meses congelado a -18°C",
    storageInstructions:
      "Mantener congelado a -18°C. Una vez descongelado, no volver a congelar y consumir lo antes posible.",
    nutritionalInfo: {
      calories: "90 kcal por 100g",
      protein: "1.1g por 100g",
      carbs: "22.8g por 100g",
      fat: "0.3g por 100g",
      fiber: "2.6g por 100g",
      vitamins: ["Potasio", "Vitamina B6", "Vitamina C", "Magnesio"],
    },
    certifications: [
      {
        name: "HACCP",
        icon: "shield-check",
        description: "Certificación de Análisis de Peligros y Puntos Críticos de Control",
      },
      {
        name: "ISO 9001",
        icon: "badge-check",
        description: "Sistema de Gestión de Calidad",
      },
      {
        name: "Global G.A.P.",
        icon: "globe",
        description: "Buenas Prácticas Agrícolas",
      },
    ],
    exportRoutes: [
      {
        destination: "Estados Unidos",
        transportMethod: "Marítimo",
        estimatedTime: "10-15 días",
        frequency: "Semanal",
      },
      {
        destination: "Canadá",
        transportMethod: "Marítimo",
        estimatedTime: "12-16 días",
        frequency: "Quincenal",
      },
      {
        destination: "Unión Europea",
        transportMethod: "Marítimo",
        estimatedTime: "18-22 días",
        frequency: "Quincenal",
      },
    ],
    relatedProducts: ["mora-congelada", "fresa-congelada", "pina-congelada"],
    featured: false,
  },
  {
    id: "mora-congelada",
    name: "Mora Congelada",
    slug: "mora-congelada",
    category: "Fruta Congelada",
    image: "/productos/mora.jpg",
    origin: "Cundinamarca, Colombia",
    description: "Moras enteras congeladas mediante tecnología IQF, perfectas para repostería y smoothies.",
    longDescription:
      "Nuestras moras congeladas son procesadas utilizando la tecnología Individual Quick Freezing (IQF), que permite congelar cada fruta individualmente, conservando su forma, textura, sabor y propiedades nutricionales. Ideal para smoothies, batidos, repostería, mermeladas y como ingrediente en múltiples preparaciones. No contiene conservantes ni aditivos, solo fruta natural en su punto óptimo de maduración.",
    price: {
      min: 4.2,
      max: 5.8,
      currency: "USD",
    },
    availableSizes: ["250g", "500g", "1kg", "5kg", "10kg"],
    packaging: ["Bolsa IQF", "Caja (para volúmenes industriales)"],
    shelfLife: "24 meses congelado a -18°C",
    storageInstructions:
      "Mantener congelado a -18°C. Una vez descongelado, no volver a congelar y consumir lo antes posible.",
    nutritionalInfo: {
      calories: "43 kcal por 100g",
      protein: "1.4g por 100g",
      carbs: "9.6g por 100g",
      fat: "0.5g por 100g",
      fiber: "5.3g por 100g",
      vitamins: ["Vitamina C", "Vitamina K", "Manganeso", "Antioxidantes"],
    },
    certifications: [
      {
        name: "HACCP",
        icon: "shield-check",
        description: "Certificación de Análisis de Peligros y Puntos Críticos de Control",
      },
      {
        name: "ISO 9001",
        icon: "badge-check",
        description: "Sistema de Gestión de Calidad",
      },
      {
        name: "Global G.A.P.",
        icon: "globe",
        description: "Buenas Prácticas Agrícolas",
      },
    ],
    exportRoutes: [
      {
        destination: "Estados Unidos",
        transportMethod: "Marítimo",
        estimatedTime: "10-15 días",
        frequency: "Semanal",
      },
      {
        destination: "Canadá",
        transportMethod: "Marítimo",
        estimatedTime: "12-16 días",
        frequency: "Quincenal",
      },
      {
        destination: "Unión Europea",
        transportMethod: "Marítimo",
        estimatedTime: "18-22 días",
        frequency: "Quincenal",
      },
    ],
    relatedProducts: ["banano-congelado", "fresa-congelada", "pulpa-mora"],
    featured: true,
  },
  {
    id: "pina-congelada",
    name: "Piña Congelada",
    slug: "pina-congelada",
    category: "Fruta Congelada",
    image: "/productos/pina.jpg",
    origin: "Santander, Colombia",
    description: "Trozos de piña congelados mediante tecnología IQF, conservando su dulzura y frescura natural.",
    longDescription:
      "Nuestros trozos de piña congelada son procesados utilizando la tecnología Individual Quick Freezing (IQF), que permite congelar cada pieza individualmente, conservando su forma, textura, sabor y propiedades nutricionales. Ideal para smoothies, batidos, repostería, cócteles y como ingrediente en múltiples preparaciones. No contiene conservantes ni aditivos, solo fruta natural en su punto óptimo de maduración.",
    price: {
      min: 3.5,
      max: 5.0,
      currency: "USD",
    },
    availableSizes: ["250g", "500g", "1kg", "5kg", "10kg"],
    packaging: ["Bolsa IQF", "Caja (para volúmenes industriales)"],
    shelfLife: "24 meses congelado a -18°C",
    storageInstructions:
      "Mantener congelado a -18°C. Una vez descongelado, no volver a congelar y consumir lo antes posible.",
    nutritionalInfo: {
      calories: "50 kcal por 100g",
      protein: "0.5g por 100g",
      carbs: "13g por 100g",
      fat: "0.1g por 100g",
      fiber: "1.4g por 100g",
      vitamins: ["Vitamina C", "Manganeso", "Vitamina B6", "Bromelina"],
    },
    certifications: [
      {
        name: "HACCP",
        icon: "shield-check",
        description: "Certificación de Análisis de Peligros y Puntos Críticos de Control",
      },
      {
        name: "ISO 9001",
        icon: "badge-check",
        description: "Sistema de Gestión de Calidad",
      },
      {
        name: "Global G.A.P.",
        icon: "globe",
        description: "Buenas Prácticas Agrícolas",
      },
    ],
    exportRoutes: [
      {
        destination: "Estados Unidos",
        transportMethod: "Marítimo",
        estimatedTime: "10-15 días",
        frequency: "Semanal",
      },
      {
        destination: "Canadá",
        transportMethod: "Marítimo",
        estimatedTime: "12-16 días",
        frequency: "Quincenal",
      },
      {
        destination: "Unión Europea",
        transportMethod: "Marítimo",
        estimatedTime: "18-22 días",
        frequency: "Quincenal",
      },
      {
        destination: "Asia",
        transportMethod: "Marítimo",
        estimatedTime: "28-35 días",
        frequency: "Mensual",
      },
    ],
    relatedProducts: ["banano-congelado", "mora-congelada", "pulpa-pina"],
    featured: false,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(productIds: string[]): Product[] {
  return products.filter((product) => productIds.includes(product.id))
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}
