"use client"

import { memo } from "react"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Toast {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  description?: string
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

const ToastIcon = memo(function ToastIcon({ type }: { type: Toast["type"] }) {
  switch (type) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "error":
      return <AlertCircle className="h-5 w-5 text-red-500" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />
  }
})

const ToastItem = memo(function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast
  onRemove: (id: string) => void
}) {
  const bgColor = {
    success: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
    error: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
    warning: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
    info: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
  }

  return (
    <div className={`rounded-lg border p-4 shadow-lg ${bgColor[toast.type]} animate-in slide-in-from-right`}>
      <div className="flex items-start gap-3">
        <ToastIcon type={toast.type} />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">{toast.title}</h4>
          {toast.description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{toast.description}</p>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(toast.id)}
          className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
})

export const ToastContainer = memo(function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
})
