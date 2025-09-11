"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles } from "lucide-react"
import { StepProps } from "@/types/onboarding"
import { priorityOptions } from "@/config/onboarding-options"

export function PrioritiesStep({ userData, onDataChange, onNext }: StepProps) {
  const togglePriority = (priorityId: string) => {
    const newPriorities = userData.priorities.includes(priorityId)
      ? userData.priorities.filter((p) => p !== priorityId)
      : [...userData.priorities, priorityId]
    
    onDataChange({ priorities: newPriorities })
  }

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What would you like to achieve first?</h2>
        <p className="text-base sm:text-lg text-gray-600">Select your top priorities to customize your solution</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {priorityOptions.map((priority) => {
          const Icon = priority.icon
          const isSelected = userData.priorities.includes(priority.id)
          
          return (
            <Button
              key={priority.id}
              variant={isSelected ? "default" : "outline"}
              size="lg"
              onClick={() => togglePriority(priority.id)}
              className={`flex items-center space-x-3 px-4 sm:px-6 py-3 rounded-2xl text-base sm:text-lg font-medium transition-all duration-200 ${
                isSelected
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                  : "bg-white/70 border-white/30 hover:bg-white/90 backdrop-blur-md"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{priority.label}</span>
              {isSelected && <CheckCircle className="w-5 h-5" />}
            </Button>
          )
        })}
        </div>
      </div>

      {userData.priorities.length > 0 && (
        <div className="text-center pt-4">
          <Button
            size="lg"
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-xl"
          >
            Generate my solution
            <Sparkles className="w-5 h-5 ml-3" />
          </Button>
        </div>
      )}
    </div>
  )
}