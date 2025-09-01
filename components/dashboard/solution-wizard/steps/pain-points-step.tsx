"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Repeat, MessageCircle, DollarSign, Eye, Users, HelpCircle } from "lucide-react"
import type { WizardData } from "../solution-wizard"

interface PainPointsStepProps {
  data: WizardData
  onUpdate: (updates: Partial<WizardData>) => void
}

const painPointOptions = [
  {
    id: "repetitive-tasks",
    title: "Too many repetitive tasks",
    description: "Manual work that could be automated",
    icon: <Repeat className="w-6 h-6" />,
    color: "from-red-500 to-pink-600",
  },
  {
    id: "client-communication",
    title: "Time lost answering clients",
    description: "Constant interruptions and similar questions",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "finance-organization",
    title: "Unorganized finances",
    description: "Hard to track expenses and cash flow",
    icon: <DollarSign className="w-6 h-6" />,
    color: "from-green-500 to-teal-600",
  },
  {
    id: "low-visibility",
    title: "Low online visibility",
    description: "Struggling to reach potential customers",
    icon: <Eye className="w-6 h-6" />,
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "customer-retention",
    title: "Hard to retain customers",
    description: "Customers don't come back or refer others",
    icon: <Users className="w-6 h-6" />,
    color: "from-orange-500 to-red-600",
  },
  {
    id: "not-sure",
    title: "I don't know yet",
    description: "Still exploring what could be improved",
    icon: <HelpCircle className="w-6 h-6" />,
    color: "from-gray-500 to-gray-600",
  },
]

export function PainPointsStep({ data, onUpdate }: PainPointsStepProps) {
  const togglePainPoint = (pointId: string) => {
    const currentPoints = data.painPoints
    const newPoints = currentPoints.includes(pointId)
      ? currentPoints.filter((p) => p !== pointId)
      : [...currentPoints, pointId]

    onUpdate({ painPoints: newPoints })
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">What challenges are you facing?</h3>
          <p className="text-gray-600 mt-2">Select all that apply - this helps us prioritize solutions</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPointOptions.map((option) => {
            const isSelected = data.painPoints.includes(option.id)

            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] border-2 ${
                  isSelected
                    ? "border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl shadow-blue-500/20"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
                } group`}
                onClick={() => togglePainPoint(option.id)}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-r ${option.color} group-hover:scale-110 transition-transform shadow-lg`}
                    >
                      {option.icon}
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-lg">{option.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{option.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {data.painPoints.length > 0 && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Selected challenges:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.painPoints.map((pointId) => {
                const option = painPointOptions.find((opt) => opt.id === pointId)
                return (
                  <span key={pointId} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {option?.title}
                  </span>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
