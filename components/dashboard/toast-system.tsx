"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, X, Info } from "lucide-react"

interface Toast {
  id: string
  type: "success" | "error" | "info"
  title: string
  message?: string
  duration?: number
}

interface ToastSystemProps {
  toasts: Toast[]
  onRemoveToast: (id: string) => void
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const toastColors = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
}

export function ToastSystem({ toasts, onRemoveToast }: ToastSystemProps) {
  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.duration !== 0) {
        const timer = setTimeout(() => {
          onRemoveToast(toast.id)
        }, toast.duration || 5000)

        return () => clearTimeout(timer)
      }
    })
  }, [toasts, onRemoveToast])

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => {
        const Icon = toastIcons[toast.type]
        return (
          <Card
            key={toast.id}
            className={`${toastColors[toast.type]} border shadow-lg animate-in slide-in-from-right duration-300`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium">{toast.title}</h4>
                  {toast.message && <p className="text-sm mt-1 opacity-90">{toast.message}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveToast(toast.id)}
                  className="p-1 h-auto hover:bg-black/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const showSuccess = (title: string, message?: string) => {
    addToast({ type: "success", title, message })
  }

  const showError = (title: string, message?: string) => {
    addToast({ type: "error", title, message })
  }

  const showInfo = (title: string, message?: string) => {
    addToast({ type: "info", title, message })
  }

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showInfo,
  }
}
