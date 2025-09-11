"use client"

import type React from "react"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Shield, CheckCircle, AlertCircle, Lock, DollarSign, Calendar, User } from "lucide-react"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_...")

interface PaymentFormData {
  email: string
  name: string
  company?: string
  billingAddress: {
    line1: string
    line2?: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  savePaymentMethod: boolean
}

interface ServiceDetails {
  id: string
  name: string
  price: number
  description: string
  timeline: string
  isDeposit?: boolean
  depositAmount?: number
  remainingAmount?: number
  features: string[]
}

interface StripePaymentFormProps {
  serviceDetails: ServiceDetails
  clientInfo?: {
    name: string
    email: string
    company?: string
  }
  onPaymentSuccess: (paymentData: any) => void
  onPaymentError: (error: string) => void
  onCancel: () => void
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
      fontFamily: '"Inter", system-ui, sans-serif',
    },
    invalid: {
      color: "#9e2146",
    },
  },
  hidePostalCode: false,
}

function PaymentForm({
  serviceDetails,
  clientInfo,
  onPaymentSuccess,
  onPaymentError,
  onCancel,
}: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [formData, setFormData] = useState<PaymentFormData>({
    email: clientInfo?.email || "",
    name: clientInfo?.name || "",
    company: clientInfo?.company || "",
    billingAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "US",
    },
    savePaymentMethod: false,
  })

  const paymentAmount = serviceDetails.isDeposit
    ? serviceDetails.depositAmount || serviceDetails.price * 0.5
    : serviceDetails.price

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setPaymentError(null)

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setPaymentError("Card element not found")
      setIsProcessing(false)
      return
    }

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: formData.name,
          email: formData.email,
          address: formData.billingAddress,
        },
      })

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message)
      }

      // Create payment intent on your backend
      const response = await fetch("/api/payments/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(paymentAmount * 100), // Convert to cents
          currency: "usd",
          serviceId: serviceDetails.id,
          isDeposit: serviceDetails.isDeposit,
          customerInfo: {
            name: formData.name,
            email: formData.email,
            company: formData.company,
          },
          billingAddress: formData.billingAddress,
          savePaymentMethod: formData.savePaymentMethod,
        }),
      })

      const { client_secret, error: backendError } = await response.json()

      if (backendError) {
        throw new Error(backendError)
      }

      // Confirm payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: paymentMethod.id,
      })

      if (confirmError) {
        throw new Error(confirmError.message)
      }

      if (paymentIntent.status === "succeeded") {
        onPaymentSuccess({
          paymentIntentId: paymentIntent.id,
          amount: paymentAmount,
          currency: "usd",
          serviceId: serviceDetails.id,
          isDeposit: serviceDetails.isDeposit,
          customerInfo: {
            name: formData.name,
            email: formData.email,
            company: formData.company,
          },
          paymentMethod: paymentMethod,
        })
      }
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentError(error instanceof Error ? error.message : "An unexpected error occurred")
      onPaymentError(error instanceof Error ? error.message : "Payment failed")
    } finally {
      setIsProcessing(false)
    }
  }

  const updateFormData = (updates: Partial<PaymentFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const updateBillingAddress = (updates: Partial<PaymentFormData["billingAddress"]>) => {
    setFormData((prev) => ({
      ...prev,
      billingAddress: { ...prev.billingAddress, ...updates },
    }))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Service Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span>Payment Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{serviceDetails.name}</h3>
              <p className="text-sm text-gray-600">{serviceDetails.description}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="outline" className="bg-white">
                  <Calendar className="w-3 h-3 mr-1" />
                  {serviceDetails.timeline}
                </Badge>
                {serviceDetails.isDeposit && <Badge className="bg-amber-100 text-amber-800">Deposit Payment</Badge>}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">${paymentAmount.toLocaleString()}</div>
              {serviceDetails.isDeposit && serviceDetails.remainingAmount && (
                <div className="text-sm text-gray-600">
                  Remaining: ${serviceDetails.remainingAmount.toLocaleString()}
                </div>
              )}
            </div>
          </div>

          {serviceDetails.features.length > 0 && (
            <div className="pt-4 border-t border-blue-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Included:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {serviceDetails.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-3 h-3 text-green-600 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              {serviceDetails.features.length > 4 && (
                <p className="text-sm text-blue-600 mt-1">+{serviceDetails.features.length - 4} more features</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Customer Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  required
                  placeholder="John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  required
                  placeholder="john@company.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData({ company: e.target.value })}
                placeholder="Acme Corporation"
              />
            </div>
          </CardContent>
        </Card>

        {/* Billing Address */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="line1">Address Line 1 *</Label>
              <Input
                id="line1"
                value={formData.billingAddress.line1}
                onChange={(e) => updateBillingAddress({ line1: e.target.value })}
                required
                placeholder="123 Main Street"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="line2">Address Line 2</Label>
              <Input
                id="line2"
                value={formData.billingAddress.line2}
                onChange={(e) => updateBillingAddress({ line2: e.target.value })}
                placeholder="Apt, suite, etc."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.billingAddress.city}
                  onChange={(e) => updateBillingAddress({ city: e.target.value })}
                  required
                  placeholder="New York"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.billingAddress.state}
                  onChange={(e) => updateBillingAddress({ state: e.target.value })}
                  required
                  placeholder="NY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal_code">ZIP Code *</Label>
                <Input
                  id="postal_code"
                  value={formData.billingAddress.postal_code}
                  onChange={(e) => updateBillingAddress({ postal_code: e.target.value })}
                  required
                  placeholder="10001"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Payment Method</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="savePayment"
                checked={formData.savePaymentMethod}
                onCheckedChange={(checked) => updateFormData({ savePaymentMethod: checked as boolean })}
              />
              <Label htmlFor="savePayment" className="text-sm cursor-pointer">
                Save payment method for future purchases
              </Label>
            </div>

            {paymentError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <AlertDescription className="text-red-800">{paymentError}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">Secure Payment</p>
                <p className="text-xs text-green-700">
                  Your payment information is encrypted and processed securely by Stripe
                </p>
              </div>
              <Lock className="w-4 h-4 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!stripe || isProcessing}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>
                  Pay ${paymentAmount.toLocaleString()}
                  {serviceDetails.isDeposit ? " Deposit" : ""}
                </span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export function StripePaymentForm(props: StripePaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  )
}
