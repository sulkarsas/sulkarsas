"use client"

import { useState, useCallback, useMemo } from "react"
import type { BlogPost } from "@/types/blog-post"

interface ValidationErrors {
  title?: string
  excerpt?: string
  content?: string
  category?: string
  featuredImage?: string
  tags?: string
}

interface ValidationRules {
  title: {
    required: boolean
    minLength: number
    maxLength: number
  }
  excerpt: {
    required: boolean
    minLength: number
    maxLength: number
  }
  content: {
    required: boolean
    minLength: number
  }
  category: {
    required: boolean
  }
}

const VALIDATION_RULES: ValidationRules = {
  title: {
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  excerpt: {
    required: true,
    minLength: 20,
    maxLength: 300,
  },
  content: {
    required: true,
    minLength: 100,
  },
  category: {
    required: true,
  },
}

export function useFormValidation(post: BlogPost | null) {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = useCallback((field: keyof BlogPost, value: any): string | undefined => {
    switch (field) {
      case "title": {
        const rules = VALIDATION_RULES.title
        if (rules.required && (!value || value.trim().length === 0)) {
          return "El título es requerido"
        }
        if (value && value.length < rules.minLength) {
          return `El título debe tener al menos ${rules.minLength} caracteres`
        }
        if (value && value.length > rules.maxLength) {
          return `El título no puede exceder ${rules.maxLength} caracteres`
        }
        break
      }

      case "excerpt": {
        const rules = VALIDATION_RULES.excerpt
        if (rules.required && (!value || value.trim().length === 0)) {
          return "El extracto es requerido"
        }
        if (value && value.length < rules.minLength) {
          return `El extracto debe tener al menos ${rules.minLength} caracteres`
        }
        if (value && value.length > rules.maxLength) {
          return `El extracto no puede exceder ${rules.maxLength} caracteres`
        }
        break
      }

      case "content": {
        const rules = VALIDATION_RULES.content
        if (rules.required && (!value || value.trim().length === 0)) {
          return "El contenido es requerido"
        }
        if (value && value.length < rules.minLength) {
          return `El contenido debe tener al menos ${rules.minLength} caracteres`
        }
        break
      }

      case "category": {
        const rules = VALIDATION_RULES.category
        if (rules.required && (!value || value.trim().length === 0)) {
          return "La categoría es requerida"
        }
        break
      }

      case "featuredImage": {
        if (value && !isValidImageUrl(value)) {
          return "La URL de la imagen no es válida"
        }
        break
      }

      case "tags": {
        if (Array.isArray(value) && value.length > 10) {
          return "No puedes agregar más de 10 etiquetas"
        }
        break
      }

      default:
        break
    }
    return undefined
  }, [])

  const isValidImageUrl = (url: string): boolean => {
    if (url.startsWith("data:image/")) return true // Base64 images
    try {
      new URL(url)
      return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)
    } catch {
      return false
    }
  }

  const validatePost = useCallback(
    (postToValidate: BlogPost): ValidationErrors => {
      const newErrors: ValidationErrors = {}

      // Validar cada campo
      Object.keys(VALIDATION_RULES).forEach((field) => {
        const fieldKey = field as keyof BlogPost
        const error = validateField(fieldKey, postToValidate[fieldKey])
        if (error) {
          newErrors[fieldKey as keyof ValidationErrors] = error
        }
      })

      // Validaciones adicionales
      if (postToValidate.featuredImage) {
        const imageError = validateField("featuredImage", postToValidate.featuredImage)
        if (imageError) newErrors.featuredImage = imageError
      }

      if (postToValidate.tags) {
        const tagsError = validateField("tags", postToValidate.tags)
        if (tagsError) newErrors.tags = tagsError
      }

      setErrors(newErrors)
      return newErrors
    },
    [validateField],
  )

  const validateSingleField = useCallback(
    (field: keyof BlogPost, value: any) => {
      const error = validateField(field, value)
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }))
      return error
    },
    [validateField],
  )

  const markFieldAsTouched = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  const isFieldTouched = useCallback((field: string) => touched[field] || false, [touched])

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0
  }, [errors])

  const canSave = useMemo(() => {
    if (!post) return false
    return post.title.trim().length > 0 && post.content.trim().length > 0 && isValid
  }, [post, isValid])

  const canPublish = useMemo(() => {
    if (!post) return false
    return (
      canSave &&
      post.excerpt.trim().length > 0 &&
      post.category.trim().length > 0 &&
      post.featuredImage &&
      post.featuredImage.length > 0
    )
  }, [post, canSave])

  const clearErrors = useCallback(() => {
    setErrors({})
    setTouched({})
  }, [])

  const getFieldError = useCallback(
    (field: string) => {
      return isFieldTouched(field) ? errors[field as keyof ValidationErrors] : undefined
    },
    [errors, isFieldTouched],
  )

  return {
    errors,
    touched,
    isValid,
    canSave,
    canPublish,
    validatePost,
    validateSingleField,
    markFieldAsTouched,
    isFieldTouched,
    clearErrors,
    getFieldError,
  }
}
