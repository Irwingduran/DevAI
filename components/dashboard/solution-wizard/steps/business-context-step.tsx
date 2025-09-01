"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, Users, Laptop } from "lucide-react"
import type { WizardData } from "../solution-wizard"

interface BusinessContextStepProps {
  data: WizardData
  onUpdate: (updates: Partial<WizardData>) => void
}

const industries = [
  { value: "ecommerce", label: "E-commerce & Retail" },
  { value: "healthcare", label: "Healthcare & Wellness" },
  { value: "services", label: "Professional Services" },
  { value: "legal", label: "Legal & Consulting" },
  { value: "education", label: "Education & Training" },
  { value: "creative", label: "Creative & Design" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "real-estate", label: "Real Estate" },
  { value: "other", label: "Other" },
]

const teamSizes = [
  { value: "small", label: "Small (1-3 people)", description: "Solo entrepreneur or small team" },
  { value: "medium", label: "Medium (4-10 people)", description: "Growing business with dedicated roles" },
  { value: "large", label: "Large (11+ people)", description: "Established company with departments" },
]

export function BusinessContextStep({ data, onUpdate }: BusinessContextStepProps) {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Tell us about your business</h3>
          <p className="text-gray-600 mt-2">This helps us understand your context and needs</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Industry Selection */}
        <div className="space-y-4">
          <label className="text-lg font-semibold text-gray-800">What industry are you in?</label>
          <Select value={data.industry} onValueChange={(value) => onUpdate({ industry: value })}>
            <SelectTrigger className="w-full h-12 text-base">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry.value} value={industry.value}>
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Team Size Selection */}
        <div className="space-y-4">
          <label className="text-lg font-semibold text-gray-800">How big is your team?</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teamSizes.map((size) => (
              <Card
                key={size.value}
                className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  data.teamSize === size.value
                    ? "border-blue-400 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
                onClick={() => onUpdate({ teamSize: size.value })}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto ${
                      data.teamSize === size.value
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{size.label}</h4>
                    <p className="text-sm text-gray-600 mt-1">{size.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Digital Tools Usage */}
        <div className="space-y-4">
          <label className="text-lg font-semibold text-gray-800">Do you currently use digital tools?</label>
          <div className="flex gap-4">
            <Button
              variant={data.usesDigitalTools === true ? "default" : "outline"}
              onClick={() => onUpdate({ usesDigitalTools: true })}
              className="flex-1 h-12"
            >
              <Laptop className="w-4 h-4 mr-2" />
              Yes, we use digital tools
            </Button>
            <Button
              variant={data.usesDigitalTools === false ? "default" : "outline"}
              onClick={() => onUpdate({ usesDigitalTools: false })}
              className="flex-1 h-12"
            >
              No, mostly manual processes
            </Button>
          </div>

          {data.usesDigitalTools === true && (
            <div className="space-y-2 animate-in slide-in-from-top duration-300">
              <label className="text-sm font-medium text-gray-700">Which tools do you use? (optional)</label>
              <Input
                placeholder="e.g., Slack, Google Workspace, Shopify, QuickBooks..."
                value={data.digitalToolsDescription}
                onChange={(e) => onUpdate({ digitalToolsDescription: e.target.value })}
                className="h-12"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
