"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings, Users, Mail, ArrowRight, Calendar, Code, Crown } from "lucide-react"
import type { WizardData } from "../solution-wizard"

interface NextStepStepProps {
  data: WizardData
  onFinalAction: (action: "diy" | "expert" | "save", email?: string) => void
}

export function NextStepStep({ data, onFinalAction }: NextStepStepProps) {
  const [email, setEmail] = useState("")
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  const solution = data.generatedSolution

  const actionOptions = [
    {
      id: "diy",
      title: "Build it yourself",
      description: "Use our guided tools and step-by-step resources",
      icon: <Settings className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-600",
      features: ["Guided setup wizard", "Template library", "Video tutorials", "Community support"],
      cta: "Go to Dashboard",
      badge: "Self-guided",
    },
    {
      id: "expert",
      title: "Hire an expert",
      description: "Let our specialists design and implement your solution",
      icon: <Users className="w-8 h-8" />,
      color: "from-purple-500 to-pink-600",
      features: ["Custom implementation", "Dedicated project manager", "Full support", "Quality guarantee"],
      cta: "Schedule Consultation",
      badge: "Expert-led",
    },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto">
          <ArrowRight className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">What would you like to do now?</h3>
          <p className="text-gray-600 mt-2">Choose your path forward - we'll support you either way</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Solution Summary */}
        {solution && (
          <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Your Solution: {solution.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {solution.type} • {data.selectedAddOns.length} add-ons selected
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {actionOptions.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] border-2 ${
                selectedAction === option.id
                  ? "border-blue-400 bg-blue-50 shadow-xl"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
              } group`}
              onClick={() => setSelectedAction(option.id)}
            >
              <CardContent className="p-8 space-y-6">
                <div className="text-center space-y-4">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-gradient-to-r ${option.color} mx-auto group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {option.icon}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <h4 className="font-bold text-gray-900 text-xl">{option.title}</h4>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {option.badge}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{option.description}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">What's included:</p>
                  <ul className="space-y-2">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onFinalAction(option.id as "diy" | "expert")
                  }}
                  className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg`}
                >
                  {option.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Save for Later Option */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-6 h-6 text-amber-600" />
                <h4 className="font-semibold text-amber-900">Save and return later</h4>
              </div>
              <p className="text-amber-700 text-sm">
                Get your personalized solution report via email and come back when you're ready
              </p>
            </div>

            <div className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border-amber-200 focus:border-amber-400"
              />
              <Button
                onClick={() => onFinalAction("save", email)}
                disabled={!email}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6"
              >
                Save
              </Button>
            </div>

            <p className="text-xs text-amber-600 text-center">
              We'll include implementation roadmaps, resources, and next steps
            </p>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Free consultation available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Full source code included</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Community support</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            Questions? Contact us at{" "}
            <a href="mailto:support@futureflow.com" className="text-blue-600 hover:underline">
              support@futureflow.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
