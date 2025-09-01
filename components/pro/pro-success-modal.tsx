"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Crown, Gift, ArrowRight } from "lucide-react"

interface ProSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onExploreFeatures: () => void
}

export function ProSuccessModal({ isOpen, onClose, onExploreFeatures }: ProSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 relative">
            <Crown className="w-10 h-10 text-white" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl">Welcome to PRO! 🎉</DialogTitle>
          <DialogDescription className="text-lg">
            You're now part of our premium community with access to exclusive features.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Welcome Message */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Gift className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-900">Your PRO benefits are now active!</span>
              </div>
              <p className="text-sm text-purple-700">
                Enjoy your 7-day free trial. You won't be charged until{" "}
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          {/* Quick Benefits List */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-center">What's now unlocked:</h4>
            <div className="space-y-2">
              {[
                "Unlimited solutions & projects",
                "Premium marketplace content",
                "Advanced AI recommendations",
                "Priority expert support",
                "Monthly consultation calls",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => {
                onExploreFeatures()
                onClose()
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold"
            >
              Explore PRO Features
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
              Continue to Dashboard
            </Button>
          </div>

          {/* Support Note */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Need help getting started? Our PRO support team is here for you at{" "}
              <a href="mailto:pro@futureflow.com" className="text-purple-600 hover:underline">
                pro@futureflow.com
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
