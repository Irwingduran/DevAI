"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, CreditCard, Shield, CheckCircle } from "lucide-react"

interface SubscribeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubscribe: (email: string) => void
  userEmail?: string
}

export function SubscribeModal({ isOpen, onClose, onSubscribe, userEmail = "" }: SubscribeModalProps) {
  const [email, setEmail] = useState(userEmail)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubscribe = async () => {
    if (!email || !agreedToTerms) return

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      onSubscribe(email)
      setIsProcessing(false)
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl">Start your PRO journey</DialogTitle>
          <DialogDescription className="text-lg">
            Join thousands of entrepreneurs scaling their businesses with PRO
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Plan Summary */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">PRO Plan</span>
                </div>
                <Badge className="bg-green-100 text-green-800">7-day free trial</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Monthly subscription</span>
                  <span className="font-semibold">$19/month</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">First 7 days</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-200 mt-3">
                <p className="text-xs text-gray-600">Cancel anytime during trial • No charges until trial ends</p>
              </div>
            </CardContent>
          </Card>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/50 border-white/30"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-purple-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-600 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Subscribe Button */}
          <Button
            onClick={handleSubscribe}
            disabled={!email || !agreedToTerms || isProcessing}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Subscribe with Stripe</span>
              </div>
            )}
          </Button>

          {/* Security Note */}
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Secure Payment</span>
            </div>
            <p className="text-xs text-gray-600">Your payment information is encrypted and secure</p>
          </div>

          {/* Quick Benefits */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900 text-center">You'll get instant access to:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {["Unlimited solutions", "Premium templates", "AI recommendations", "Expert support"].map(
                (benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
