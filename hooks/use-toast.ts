"use client"

import { useState, useCallback } from "react"

interface Toast {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  description?: string
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newToast = { ...toast, id }

    setToasts((prev) => [...prev, newToast])

    // Auto remove after duration
    const duration = toast.duration || 5000
    setTimeout(() => {
      removeToast(id)
    }, duration)

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const success = useCallback(
    (title: string, description?: string) => {
      return addToast({ type: "success", title, description })
    },
    [addToast],
  )

  const error = useCallback(
    (title: string, description?: string) => {
      return addToast({ type: "error", title, description })
    },
    [addToast],
  )

  const warning = useCallback(
    (title: string, description?: string) => {
      return addToast({ type: "warning", title, description })
    },
    [addToast],
  )

  const info = useCallback(
    (title: string, description?: string) => {
      return addToast({ type: "info", title, description })
    },
    [addToast],
  )

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  }
}
