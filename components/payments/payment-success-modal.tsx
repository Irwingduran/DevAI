"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Calendar, MessageSquare, ArrowRight, User, Building } from "lucide-react"

interface PaymentSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  paymentData: {
    paymentIntentId: string
    amount: number
    currency: string
    serviceId: string
    isDeposit?: boolean
    customerInfo: {
      name: string
      email: string
      company?: string
    }
    paymentMethod: any
  }
  serviceDetails: {
    name: string
    description: string
    timeline: string
    features: string[]
  }
}

export function PaymentSuccessModal({ isOpen, onClose, paymentData, serviceDetails }: PaymentSuccessModalProps) {
  const [isDownloadingReceipt, setIsDownloadingReceipt] = useState(false)

  const handleDownloadReceipt = async () => {
    setIsDownloadingReceipt(true)

    try {
      // Generate and download receipt
      const response = await fetch("/api/payments/generate-receipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentIntentId: paymentData.paymentIntentId,
        }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `receipt-${paymentData.paymentIntentId}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("Error downloading receipt:", error)
    } finally {
      setIsDownloadingReceipt(false)
    }
  }

  const handleScheduleKickoff = () => {
    // Integrate with Calendly or your booking system
    window.open("https://calendly.com/your-team/project-kickoff", "_blank")
  }

  const handleContactTeam = () => {
    // Open support chat or email
    window.open("mailto:support@yourcompany.com", "_blank")
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl text-green-900">Payment Successful!</DialogTitle>
          <p className="text-gray-600 mt-2">
            Thank you for your payment. Your project is now confirmed and ready to begin.
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-8">
          {/* Payment Summary */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-900">Payment Confirmation</h3>
                <Badge className="bg-green-100 text-green-800">
                  {paymentData.isDeposit ? "Deposit Paid" : "Paid in Full"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-semibold text-green-900">
                      ${paymentData.amount.toLocaleString()} {paymentData.currency.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-mono text-xs text-gray-800">{paymentData.paymentIntentId.slice(-8)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-800">{formatDate(new Date())}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-semibold text-gray-900">{serviceDetails.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Timeline:</span>
                    <span className="text-gray-800">{serviceDetails.timeline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="text-gray-800">•••• {paymentData.paymentMethod.card?.last4}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{paymentData.customerInfo.name}</p>
                    <p className="text-gray-600">{paymentData.customerInfo.email}</p>
                  </div>
                </div>
                {paymentData.customerInfo.company && (
                  <div className="flex items-center space-x-3">
                    <Building className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">{paymentData.customerInfo.company}</p>
                      <p className="text-gray-600">Company</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What Happens Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Confirmation Email</p>
                    <p className="text-sm text-gray-600">
                      You'll receive a detailed confirmation email within 5 minutes with your receipt and project
                      details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Project Kickoff</p>
                    <p className="text-sm text-gray-600">
                      Our team will contact you within 24 hours to schedule your project kickoff meeting.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Project Begins</p>
                    <p className="text-sm text-gray-600">
                      Development starts immediately after the kickoff meeting with regular progress updates.
                    </p>
                  </div>
                </div>

                {paymentData.isDeposit && (
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Final Payment</p>
                      <p className="text-sm text-gray-600">
                        The remaining balance will be due before project delivery and final handover.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleDownloadReceipt}
              disabled={isDownloadingReceipt}
              variant="outline"
              className="bg-white"
            >
              {isDownloadingReceipt ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  <span>Downloading...</span>
                </div>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </>
              )}
            </Button>

            <Button onClick={handleScheduleKickoff} variant="outline" className="bg-white">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Kickoff
            </Button>

            <Button onClick={handleContactTeam} variant="outline" className="bg-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Team
            </Button>
          </div>

          {/* Close Button */}
          <div className="text-center pt-4">
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Support Notice */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600">
                Questions about your payment or project?{" "}
                <a href="mailto:support@yourcompany.com" className="text-blue-600 hover:underline font-medium">
                  Contact our support team
                </a>{" "}
                or call{" "}
                <a href="tel:+1-555-123-4567" className="text-blue-600 hover:underline font-medium">
                  (555) 123-4567
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
