"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, ArrowRight, Sparkles, X } from "lucide-react"
import { useState } from "react"

interface ProUpgradeBannerProps {
  onUpgradeClick: () => void
  variant?: "overview" | "compact"
  showDismiss?: boolean
}

export function ProUpgradeBanner({ onUpgradeClick, variant = "overview", showDismiss = false }: ProUpgradeBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  if (variant === "compact") {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 shadow-sm relative">
        {showDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDismissed(true)}
            className="absolute top-2 right-2 p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Upgrade to PRO</p>
                <p className="text-sm text-gray-600">Unlock unlimited solutions & premium features</p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={onUpgradeClick}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 border-purple-200 shadow-xl relative overflow-hidden">
      {showDismiss && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsDismissed(true)}
          className="absolute top-4 right-4 p-1 h-auto z-10"
        >
          <X className="w-4 h-4" />
        </Button>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <CardContent className="p-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="space-y-4 flex-1">
            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Limited Time Offer
              </Badge>
              <Badge variant="outline" className="border-green-400 text-green-600 bg-green-50">
                50% OFF First Month
              </Badge>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to unlock your full potential?</h3>
              <p className="text-gray-600 text-lg max-w-2xl">
                Join PRO and get unlimited solutions, AI-powered insights, and priority expert support.
              </p>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>$500+ in premium content</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={onUpgradeClick}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <div className="text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">$19</span>
                  <div className="text-gray-600">
                    <div>/month</div>
                    <div className="text-xs">after trial</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block ml-8">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full opacity-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
