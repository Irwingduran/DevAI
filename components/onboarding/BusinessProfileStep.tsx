"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"
import { StepProps } from "@/types/onboarding"
import { businessTypes, teamSizes } from "@/config/onboarding-options"

export function BusinessProfileStep({ userData, onDataChange, onNext }: StepProps) {
  const canProceed = userData.businessType && userData.teamSize && userData.usesDigitalTools !== null

  return (
    <div className="space-y-12 py-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Let's understand your business first</h2>
        <p className="text-xl text-gray-600">This helps me create the perfect solution for you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl h-fit">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-800">
                What type of business do you run?
              </label>
              <Select
                value={userData.businessType}
                onValueChange={(value) => onDataChange({ businessType: value })}
              >
                <SelectTrigger className="w-full bg-white/50 border-white/30">
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-800">
                How many people are on your team?
              </label>
              <Select
                value={userData.teamSize}
                onValueChange={(value) => onDataChange({ teamSize: value })}
              >
                <SelectTrigger className="w-full bg-white/50 border-white/30">
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  {teamSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl h-fit">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-800">Do you use digital tools?</label>
              <div className="flex gap-4">
                <Button
                  variant={userData.usesDigitalTools === true ? "default" : "outline"}
                  onClick={() => onDataChange({ usesDigitalTools: true })}
                  className="flex-1"
                >
                  Yes
                </Button>
                <Button
                  variant={userData.usesDigitalTools === false ? "default" : "outline"}
                  onClick={() => onDataChange({ usesDigitalTools: false })}
                  className="flex-1"
                >
                  No
                </Button>
              </div>
            </div>

            {userData.usesDigitalTools === true && (
              <div className="space-y-4">
                <label className="text-lg font-semibold text-gray-800">Which tools do you use?</label>
                <Input
                  placeholder="e.g., Slack, Google Workspace, Shopify..."
                  value={userData.digitalTools}
                  onChange={(e) => onDataChange({ digitalTools: e.target.value })}
                  className="bg-white/50 border-white/30"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {canProceed && (
        <div className="text-center pt-4">
          <Button
            size="lg"
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-xl"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>
        </div>
      )}
    </div>
  )
}