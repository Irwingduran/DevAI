"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ArrowRight, Sparkles } from "lucide-react"

interface ExpertCTABannerProps {
  onContactExpert: () => void
  variant?: "default" | "compact"
  showCondition?: boolean
}

export function ExpertCTABanner({ onContactExpert, variant = "default", showCondition = true }: ExpertCTABannerProps) {
  if (!showCondition) return null

  if (variant === "compact") {
    return (
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Need expert help?</p>
                <p className="text-sm text-gray-600">Get guidance from our specialists</p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={onContactExpert}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
            >
              Talk to Expert
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border border-amber-200 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Need help implementing your solution?</h3>
                <p className="text-gray-600 mt-1">Our team of experts can guide or build it for you.</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Expert guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Custom implementation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Ongoing support</span>
              </div>
            </div>

            <Button
              onClick={onContactExpert}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Talk to an Expert
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
