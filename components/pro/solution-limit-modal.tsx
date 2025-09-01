"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Crown, ArrowRight, Zap, CheckCircle } from "lucide-react"

interface SolutionLimitModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: () => void
  currentCount: number
  limit: number
}

export function SolutionLimitModal({ isOpen, onClose, onUpgrade, currentCount, limit }: SolutionLimitModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl">You've reached your limit</DialogTitle>
          <DialogDescription className="text-lg">
            You have {currentCount} of {limit} solutions. Upgrade to PRO for unlimited access.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Current vs PRO Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Free Plan</h4>
                  <div className="text-2xl font-bold text-gray-600">{limit}</div>
                  <p className="text-xs text-gray-500">solutions max</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-1">
                    <Crown className="w-4 h-4 text-purple-600" />
                    <h4 className="font-medium text-purple-900">PRO Plan</h4>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">∞</div>
                  <p className="text-xs text-purple-700">unlimited solutions</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PRO Benefits */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3 text-center">Unlock with PRO:</h4>
              <div className="space-y-2">
                {[
                  "Unlimited solutions & projects",
                  "Advanced AI recommendations",
                  "Premium templates & tools",
                  "Priority expert support",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-3xl font-bold text-gray-900">$19</span>
              <div className="text-left">
                <div className="text-gray-600">/month</div>
                <div className="text-xs text-green-600">7-day free trial</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => {
                onUpgrade()
                onClose()
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold"
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to PRO
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
              Maybe Later
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">No commitment • Cancel anytime • 30-day money-back guarantee</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
