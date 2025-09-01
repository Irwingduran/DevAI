"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Bot, Blocks, Sparkles, CheckCircle, Plus } from "lucide-react"
import type { WizardData } from "../solution-wizard"

interface SolutionPreviewStepProps {
  data: WizardData
  onUpdate: (updates: Partial<WizardData>) => void
}

const addOnOptions = [
  {
    id: "ai-analytics",
    name: "AI Analytics Dashboard",
    description: "Advanced insights and predictive analytics",
    icon: <Bot className="w-5 h-5" />,
    recommended: true,
  },
  {
    id: "blockchain-tracking",
    name: "Blockchain Traceability",
    description: "Transparent and secure data tracking",
    icon: <Blocks className="w-5 h-5" />,
    recommended: false,
  },
  {
    id: "smart-forms",
    name: "Smart Forms & Chat",
    description: "Intelligent data collection and communication",
    icon: <Sparkles className="w-5 h-5" />,
    recommended: true,
  },
]

export function SolutionPreviewStep({ data, onUpdate }: SolutionPreviewStepProps) {
  const solution = data.generatedSolution

  if (!solution) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Generating your solution...</p>
      </div>
    )
  }

  const toggleAddOn = (addOnId: string) => {
    const currentAddOns = data.selectedAddOns
    const newAddOns = currentAddOns.includes(addOnId)
      ? currentAddOns.filter((id) => id !== addOnId)
      : [...currentAddOns, addOnId]

    onUpdate({ selectedAddOns: newAddOns })
  }

  const getTypeIcon = () => {
    switch (solution.type) {
      case "AI":
        return <Bot className="w-10 h-10" />
      case "Blockchain":
        return <Blocks className="w-10 h-10" />
      case "Hybrid":
        return <Sparkles className="w-10 h-10" />
      default:
        return <Sparkles className="w-10 h-10" />
    }
  }

  const getTypeColor = () => {
    switch (solution.type) {
      case "AI":
        return "from-blue-500 to-cyan-600"
      case "Blockchain":
        return "from-purple-500 to-indigo-600"
      case "Hybrid":
        return "from-blue-500 via-purple-600 to-indigo-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div
          className={`w-20 h-20 bg-gradient-to-r ${getTypeColor()} rounded-3xl flex items-center justify-center mx-auto shadow-2xl`}
        >
          {getTypeIcon()}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 rounded-3xl opacity-20 animate-pulse" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-gray-900">Here's your smart solution</h3>
          <p className="text-gray-600 mt-2">Customized based on your business needs and priorities</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main Solution Card */}
        <Card className="bg-gradient-to-br from-white via-blue-50 to-purple-50 border-2 border-blue-200 shadow-2xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <h4 className="text-2xl font-bold text-gray-900">{solution.name}</h4>
                <Badge className={`bg-gradient-to-r ${getTypeColor()} text-white px-3 py-1`}>
                  {solution.type} Solution
                </Badge>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">{solution.description}</p>
            </div>

            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-gray-900 text-center">Key Benefits:</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {solution.summary.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-white/60 rounded-xl border border-white/30"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add-ons Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-900">Optional Add-ons</h4>
            <p className="text-gray-600 mt-2">Enhance your solution with these powerful features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOnOptions.map((addOn) => {
              const isSelected = data.selectedAddOns.includes(addOn.id)

              return (
                <Card
                  key={addOn.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] border-2 ${
                    isSelected
                      ? "border-green-400 bg-green-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${addOn.recommended ? "ring-2 ring-amber-200 ring-opacity-50" : ""}`}
                  onClick={() => toggleAddOn(addOn.id)}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isSelected ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {addOn.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h5 className="font-semibold text-gray-900">{addOn.name}</h5>
                            {addOn.recommended && (
                              <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{addOn.description}</p>
                        </div>
                      </div>

                      <Checkbox checked={isSelected} onCheckedChange={() => toggleAddOn(addOn.id)} className="mt-1" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Summary */}
        {data.selectedAddOns.length > 0 && (
          <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Plus className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-900">Selected Add-ons:</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.selectedAddOns.map((addOnId) => {
                  const addOn = addOnOptions.find((opt) => opt.id === addOnId)
                  return (
                    <Badge key={addOnId} className="bg-green-100 text-green-800 border-green-200">
                      {addOn?.name}
                    </Badge>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
