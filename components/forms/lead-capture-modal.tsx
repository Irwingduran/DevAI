"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LeadCaptureForm } from "./lead-capture-form"
import { X } from "lucide-react"

interface LeadCaptureModalProps {
  trigger?: React.ReactNode
  triggerText?: string
  onSuccess?: () => void
  formOrigin?: string
}

export function LeadCaptureModal({
  trigger,
  triggerText = "Get Started",
  onSuccess,
  formOrigin = "Modal",
}: LeadCaptureModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess()
    }
    // Keep modal open to show success message
    // User can close manually or it will auto-close after a delay
    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }

  const defaultTrigger = (
    <Button
      size="lg"
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {triggerText}
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 bg-transparent border-0 shadow-none">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-12 right-0 text-white hover:text-gray-300 hover:bg-white/10 rounded-full z-10"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
          <LeadCaptureForm variant="modal" formOrigin={formOrigin} onSuccess={handleSuccess} className="shadow-2xl" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
