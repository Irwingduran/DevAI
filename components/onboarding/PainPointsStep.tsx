"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle } from "lucide-react"
import { StepProps } from "@/types/onboarding"
import { painPointOptions, industryPainPoints } from "@/config/onboarding-options"

export function PainPointsStep({ userData, onDataChange, onNext }: StepProps) {
  const togglePainPoint = (pointId: string) => {
    const newPainPoints = userData.painPoints.includes(pointId)
      ? userData.painPoints.filter((p) => p !== pointId)
      : [...userData.painPoints, pointId]
    
    onDataChange({ painPoints: newPainPoints })
  }

  // Get industry-specific pain points if available
  const industrySpecificPainPoints = userData.businessType && industryPainPoints[userData.businessType as keyof typeof industryPainPoints]

  return (
    <div className="space-y-8 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">What's your biggest challenge right now?</h2>
        <p className="text-xl text-gray-600">
          {industrySpecificPainPoints 
            ? `Based on your ${userData.businessType} business, here are common challenges plus other options`
            : "Select all that apply - this helps me prioritize solutions"
          }
        </p>
      </div>

      {/* Industry-specific section */}
      {industrySpecificPainPoints && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Common {userData.businessType} Challenges
            </h3>
            <p className="text-gray-600">These are specific to your industry</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industrySpecificPainPoints.map((option) => {
              const Icon = option.icon
              const isSelected = userData.painPoints.includes(option.id)
              
              return (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                    isSelected
                      ? "border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl shadow-purple-500/20"
                      : "border-white/30 bg-white/70 hover:border-white/50"
                  } backdrop-blur-md group`}
                  onClick={() => togglePainPoint(option.id)}
                >
                  <CardContent className="p-4 sm:p-6 space-y-3">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          isSelected
                            ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                            : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                        } transition-all duration-200`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{option.title}</h3>
                        <p className="text-gray-600">{option.description}</p>
                      </div>
                      {isSelected && <CheckCircle className="w-6 h-6 text-purple-600" />}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* General pain points section */}
      <div className="space-y-6">
        {industrySpecificPainPoints && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Other Common Business Challenges</h3>
            <p className="text-gray-600">General challenges that affect many businesses</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {painPointOptions.map((option) => {
            const Icon = option.icon
            const isSelected = userData.painPoints.includes(option.id)
            
            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  isSelected
                    ? "border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl shadow-blue-500/20"
                    : "border-white/30 bg-white/70 hover:border-white/50"
                } backdrop-blur-md group`}
                onClick={() => togglePainPoint(option.id)}
              >
                <CardContent className="p-4 sm:p-6 space-y-3">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                      } transition-all duration-200`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{option.title}</h3>
                      <p className="text-gray-600">{option.description}</p>
                    </div>
                    {isSelected && <CheckCircle className="w-6 h-6 text-blue-600" />}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {userData.painPoints.length > 0 && (
        <div className="text-center pt-6">
          <Button
            size="lg"
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-xl"
          >
            Continue to Process Mapping
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>
        </div>
      )}
    </div>
  )
}