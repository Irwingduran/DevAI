"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot, Blocks, Sparkles, CheckCircle } from "lucide-react"
import { Solution } from "@/types/onboarding"

interface SolutionGeneratorStepProps {
  solution: Solution
  onNext: () => void
}

export function SolutionGeneratorStep({ solution, onNext }: SolutionGeneratorStepProps) {
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">We've created a solution tailored to you</h2>
        <p className="text-base sm:text-lg text-gray-600">Based on your business profile and priorities</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Card className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md border border-white/30 shadow-2xl max-w-3xl mx-auto">
        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="text-center space-y-4">
            <div
              className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-xl ${
                solution.type === "AI"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-600"
                  : solution.type === "Blockchain"
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                    : "bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600"
              } text-white`}
            >
              {solution.type === "AI" ? (
                <Bot className="w-10 h-10" />
              ) : solution.type === "Blockchain" ? (
                <Blocks className="w-10 h-10" />
              ) : (
                <Sparkles className="w-10 h-10" />
              )}
            </div>

            <h3 className="text-3xl font-bold text-gray-900">{solution.name}</h3>
            <p className="text-lg text-gray-600">{solution.description}</p>

            <Badge
              variant="secondary"
              className={`text-lg px-4 py-2 ${
                solution.type === "AI"
                  ? "bg-blue-100 text-blue-800"
                  : solution.type === "Blockchain"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800"
              }`}
            >
              {solution.type} Solution
            </Badge>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-gray-800">Key Benefits:</h4>
            <div className="grid gap-3">
              {solution.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-gray-800">Optional Add-ons:</h4>
            <div className="space-y-3">
              {solution.addOns.map((addOn, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-white/30"
                >
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800">{addOn.name}</h5>
                    <p className="text-sm text-gray-600">{addOn.description}</p>
                  </div>
                  <Button
                    variant={addOn.enabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      // Toggle add-on logic would go here
                    }}
                  >
                    {addOn.enabled ? "Included" : "Add"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      </div>

      <div className="text-center pt-4">
        <Button
          size="lg"
          onClick={onNext}
          className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-xl"
        >
          Customize or Launch
          <ArrowRight className="w-5 h-5 ml-3" />
        </Button>
      </div>
    </div>
  )
}