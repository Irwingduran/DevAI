"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Download, Mail, ExternalLink } from "lucide-react"

interface PurchaseSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    title: string
    type: string
    price: number
  } | null
  onDownload?: () => void
  onAccessContent?: () => void
}

export function PurchaseSuccessModal({
  isOpen,
  onClose,
  product,
  onDownload,
  onAccessContent,
}: PurchaseSuccessModalProps) {
  // Don't render if no product data
  if (!product) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl">Purchase Successful!</DialogTitle>
          <DialogDescription className="text-lg">
            You now have access to <strong>{product.title}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <p className="font-medium text-gray-900">Order Summary</p>
                <p className="text-sm text-gray-600">{product.type.charAt(0).toUpperCase() + product.type.slice(1)}</p>
                <p className="text-lg font-bold text-green-600">{product.price === 0 ? "Free" : `$${product.price}`}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {product.type === "template" && onDownload && (
              <Button onClick={onDownload} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Download Files
              </Button>
            )}

            {(product.type === "course" || product.type === "tool") && onAccessContent && (
              <Button onClick={onAccessContent} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                <ExternalLink className="w-4 h-4 mr-2" />
                Access Content
              </Button>
            )}

            <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
              Back to Marketplace
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Check your email</p>
                <p className="text-xs text-blue-700">
                  We've sent you a confirmation email with download links and access instructions.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Need help? Contact us at{" "}
              <a href="mailto:support@futureflow.com" className="text-blue-600 hover:underline">
                support@futureflow.com
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
