"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Crown, Zap } from "lucide-react"

interface ProPricingCardProps {
  onSubscribeClick: () => void
}

const pricingFeatures = [
  "Unlimited active solutions",
  "Advanced AI recommendations",
  "Exclusive premium templates",
  "Monthly expert consultation",
  "Priority email support",
  "Early access to features",
  "Advanced analytics dashboard",
  "Custom integrations",
]

export function ProPricingCard({ onSubscribeClick }: ProPricingCardProps) {
  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-gradient-to-br from-white via-purple-50 to-blue-50 border-2 border-purple-200 shadow-2xl relative overflow-hidden">
        {/* Popular Badge */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-1">
            <Crown className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>

        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">PRO Plan</h3>
              <p className="text-gray-600">Everything you need to scale</p>
            </div>
          </div>

          {/* Pricing */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-4xl font-bold text-gray-900">$19</span>
              <div className="text-left">
                <div className="text-gray-600">/month</div>
                <div className="text-xs text-gray-500">billed monthly</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <span className="text-gray-500 line-through">$39/month</span>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                50% OFF
              </Badge>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-center">What's included:</h4>
            <div className="space-y-2">
              {pricingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Button
              onClick={onSubscribeClick}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              <Zap className="w-4 h-4 mr-2" />
              Start 7-Day Free Trial
            </Button>
            <div className="text-center space-y-1">
              <p className="text-xs text-gray-500">No credit card required</p>
              <p className="text-xs text-gray-500">Cancel anytime • Full refund within 30 days</p>
            </div>
          </div>

          {/* Value Highlight */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Crown className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Premium Value</span>
            </div>
            <p className="text-xs text-purple-700">Get $500+ worth of premium templates and tools included</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
