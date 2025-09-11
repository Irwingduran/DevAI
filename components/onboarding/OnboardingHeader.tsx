"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft } from "lucide-react"
import { Step } from "@/types/onboarding"

interface OnboardingHeaderProps {
  currentStep: Step
  progress: number
  currentStepIndex: number
  totalSteps: number
  onBack: () => void
}

export function OnboardingHeader({ 
  currentStep, 
  progress, 
  currentStepIndex, 
  totalSteps, 
  onBack 
}: OnboardingHeaderProps) {
  const getStepLabel = (step: Step) => {
    switch (step) {
      case "business-profile": return "Business Profile"
      case "business-context": return "Business Context"
      case "current-tools": return "Current Tools"
      case "pain-points": return "Pain Points"
      case "process-mapping": return "Process Mapping"
      case "priorities": return "Priorities"
      case "solution-generator": return "Your Solution"
      case "final-cta": return "Next Steps"
      default: return ""
    }
  }

  if (currentStep === "hero") return null

  return (
    <header className="fixed top-16 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-white/20">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex-1 max-w-md mx-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStepIndex + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="text-sm text-gray-500">
          {getStepLabel(currentStep)}
        </div>
      </div>
    </header>
  )
}