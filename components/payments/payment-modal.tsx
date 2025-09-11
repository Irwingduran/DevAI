"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { StripePaymentForm } from "./stripe-payment-form"
import { PaymentSuccessModal } from "./payment-success-modal"
import { CreditCard, Calendar, CheckCircle, Clock, ArrowRight, Shield, Zap } from "lucide-react"

interface PaymentOption {
  id: string
  type: "full" | "deposit"
  amount: number
  title: string
  description: string
  benefits: string[]
  popular?: boolean
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  serviceDetails: {
    id: string
    name: string
    price: number
    description: string
    timeline: string
    features: string[]
  }
  clientInfo?: {
    name: string
    email: string
    company?: string
  }
  onPaymentComplete: (paymentData: any) => void
}

export function PaymentModal({ isOpen, onClose, serviceDetails, clientInfo, onPaymentComplete }: PaymentModalProps) {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<PaymentOption | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [paymentData, setPaymentData] = useState<any>(null)

  // Calculate payment options
  const depositAmount = Math.round(serviceDetails.price * 0.5)
  const remainingAmount = serviceDetails.price - depositAmount

  const paymentOptions: PaymentOption[] = [
    {
      id: "full",
      type: "full",
      amount: serviceDetails.price,
      title: "Pay in Full",
      description: "Complete payment now and get started immediately",
      benefits: ["Immediate project start", "5% discount applied", "Priority support", "No additional payments needed"],
    },
    {
      id: "deposit",
      type: "deposit",
      amount: depositAmount,
      title: "50% Deposit",
      description: "Pay half now, remainder before project completion",
      benefits: [
        "Lower upfront cost",
        "Flexible payment schedule",
        "Project starts immediately",
        `Remaining $${remainingAmount.toLocaleString()} due before delivery`,
      ],
      popular: true,
    },
  ]

  const handlePaymentOptionSelect = (option: PaymentOption) => {
    setSelectedPaymentOption(option)
    setShowPaymentForm(true)
  }

  const handlePaymentSuccess = (data: any) => {
    setPaymentData(data)
    setShowPaymentForm(false)
    setShowSuccessModal(true)
  }

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error)
    // Handle payment error (show toast, etc.)
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    onPaymentComplete(paymentData)
    onClose()
  }

  const resetToOptions = () => {
    setShowPaymentForm(false)
    setSelectedPaymentOption(null)
  }

  return (
    <>
      <Dialog open={isOpen && !showSuccessModal} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              {showPaymentForm ? "Complete Your Payment" : "Choose Payment Option"}
            </DialogTitle>
          </DialogHeader>

          {!showPaymentForm ? (
            <div className="space-y-6 mt-6">
              {/* Service Summary */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{serviceDetails.name}</h3>
                      <p className="text-gray-600 mt-1">{serviceDetails.description}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <Badge variant="outline" className="bg-white">
                          <Calendar className="w-3 h-3 mr-1" />
                          {serviceDetails.timeline}
                        </Badge>
                        <Badge variant="outline" className="bg-white">
                          {serviceDetails.features.length} Features Included
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">${serviceDetails.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Project Value</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] border-2 ${
                      option.popular
                        ? "border-green-400 shadow-xl bg-gradient-to-b from-green-50 to-white"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => handlePaymentOptionSelect(option)}
                  >
                    {option.popular && (
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-2 text-sm font-medium rounded-t-lg">
                        <Zap className="w-4 h-4 inline mr-1" />
                        Most Popular
                      </div>
                    )}

                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-gray-900">{option.title}</h3>
                          <p className="text-gray-600 text-sm">{option.description}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-gray-900">${option.amount.toLocaleString()}</div>
                          {option.type === "deposit" && (
                            <div className="text-sm text-gray-600">+ ${remainingAmount.toLocaleString()} due later</div>
                          )}
                          {option.type === "full" && serviceDetails.price > option.amount && (
                            <div className="text-sm text-green-600 font-medium">
                              Save ${(serviceDetails.price - option.amount).toLocaleString()}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2 text-left">
                          {option.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>

                        <Button
                          className={`w-full py-3 ${
                            option.popular
                              ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                          } text-white`}
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          {option.type === "full" ? "Pay Now" : "Pay Deposit"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Security Notice */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>SSL Encrypted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>Stripe Secure</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span>Instant Processing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            selectedPaymentOption && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-6">
                  <Button variant="outline" onClick={resetToOptions}>
                    ← Back to Options
                  </Button>
                  <Badge variant="outline" className="bg-blue-50 text-blue-800">
                    {selectedPaymentOption.title}
                  </Badge>
                </div>

                <StripePaymentForm
                  serviceDetails={{
                    ...serviceDetails,
                    isDeposit: selectedPaymentOption.type === "deposit",
                    depositAmount: selectedPaymentOption.amount,
                    remainingAmount: selectedPaymentOption.type === "deposit" ? remainingAmount : undefined,
                  }}
                  clientInfo={clientInfo}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  onCancel={resetToOptions}
                />
              </div>
            )
          )}
        </DialogContent>
      </Dialog>

      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        paymentData={paymentData}
        serviceDetails={serviceDetails}
      />
    </>
  )
}
