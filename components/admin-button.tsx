"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { AdminAuth } from "@/components/admin-auth"
import { Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/hooks/use-admin-auth"

export function AdminButton() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { isAuthenticated } = useAdminAuth()

  const handleAuthSuccess = () => {
    console.log("Auth success - closing dialog and navigating")
    setIsOpen(false)
    router.push("/admin")
  }

  const handleClick = () => {
    console.log("Admin button clicked")
    if (isAuthenticated) {
      // Si ya está autenticado, ir directamente al panel
      router.push("/admin")
    } else {
      // Si no está autenticado, mostrar el diálogo de login
      setIsOpen(true)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="ml-2 relative z-50 hover:bg-sulkar-green/10 hover:border-sulkar-green hover:text-sulkar-green dark:hover:bg-sulkar-lightgreen/10 dark:hover:border-sulkar-lightgreen dark:hover:text-sulkar-lightgreen transition-all duration-200"
          onClick={handleClick}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Acceso Administrativo</DialogTitle>
          <DialogDescription>Ingresa tus credenciales para acceder al panel de administración</DialogDescription>
        </DialogHeader>
        <AdminAuth />
      </DialogContent>
    </Dialog>
  )
}
