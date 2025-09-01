"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, BarChart3, Zap, Compass } from "lucide-react"
import type { WizardData } from "../solution-wizard"

interface PrioritiesStepProps {
  data: WizardData
  onUpdate: (updates: Partial<WizardData>) => void
}

const priorityOptions = [
  {
    id: "save-time",
    title: "Save time",
    description: "Automate repetitive tasks and streamline processes",
    icon: <Clock className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-600",
    benefits: ["Reduce manual work", "Focus on high-value activities", "Improve efficiency"],
  },
  {
    id: "get-clients",
    title: "Get more clients",
    description: "Improve marketing and customer acquisition",
    icon: <Users className="w-8 h-8" />,
    color: "from-green-500 to-teal-600",
    benefits: ["Better lead generation", "Improved conversion rates", "Customer retention"],
  },
  {
    id: "improve-data",
    title: "Improve data insights",
    description: "Better analytics and business intelligence",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "from-purple-500 to-indigo-600",
    benefits: ["Data-driven decisions", "Performance tracking", "Predictive analytics"],
  },
  {
    id: "automate-tasks",
    title: "Automate workflows",
    description: "Create smart, automated business processes",
    icon: <Zap className="w-8 h-8" />,
    color: "from-orange-500 to-red-600",
    benefits: ["Workflow automation", "Reduced errors", "24/7 operations"],
  },
  {
    id: "explore-options",
    title: "Just exploring",
    description: "Want to see what's possible with AI/Blockchain",
    icon: <Compass className="w-8 h-8" />,
    color: "from-gray-500 to-gray-600",
    benefits: ["Learn new technologies", "Competitive advantage", "Future-proof business"],
  },
]

export function PrioritiesStep({ data, onUpdate }: PrioritiesStepProps) {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">What would you like to improve first?</h3>
          <p className="text-gray-600 mt-2">Choose your top priority to customize your solution</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorityOptions.map((option) => {
            const isSelected = data.priority === option.id

            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] border-2 ${
                  isSelected
                    ? "border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl shadow-blue-500/20"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
                } group`}
                onClick={() => onUpdate({ priority: option.id })}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="text-center space-y-4">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-gradient-to-r ${option.color} mx-auto group-hover:scale-110 transition-transform shadow-lg`}
                    >
                      {option.icon}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-900 text-xl">{option.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{option.description}</p>
                    </div>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Key Benefits:</p>
                    <ul className="space-y-1">
                      {option.benefits.map((benefit, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center space-x-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {data.priority && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 animate-in slide-in-from-bottom duration-300">
            <div className="text-center space-y-2">
              <h4 className="font-semibold text-blue-900">Great choice!</h4>
              <p className="text-blue-700">
                We'll create a solution focused on{" "}
                <span className="font-medium">
                  {priorityOptions.find((opt) => opt.id === data.priority)?.title.toLowerCase()}
                </span>{" "}
                for your business.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
