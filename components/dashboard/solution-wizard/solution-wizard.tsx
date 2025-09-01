"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

// Import step components
import { BusinessContextStep } from "./steps/business-context-step"
import { PainPointsStep } from "./steps/pain-points-step"
import { WorkflowStep } from "./steps/workflow-step"
import { PrioritiesStep } from "./steps/priorities-step"
import { SolutionPreviewStep } from "./steps/solution-preview-step"
import { NextStepStep } from "./steps/next-step-step"

export interface WizardData {
  // Step 1 - Business Context
  industry: string
  teamSize: string
  usesDigitalTools: boolean | null
  digitalToolsDescription: string

  // Step 2 - Pain Points
  painPoints: string[]

  // Step 3 - Workflow
  workflowDescription: string
  uploadedFiles: File[]

  // Step 4 - Priorities
  priority: string

  // Step 5 - Solution Preview
  selectedAddOns: string[]

  // Generated solution data
  generatedSolution: {
    name: string
    type: "AI" | "Blockchain" | "Hybrid"
    summary: string[]
    description: string
  } | null
}

interface SolutionWizardProps {
  isOpen: boolean
  onClose: () => void
  onCreateSolution: (solution: any) => void
  onContactExpert: (context: any) => void
}

const TOTAL_STEPS = 6

export function SolutionWizard({ isOpen, onClose, onCreateSolution, onContactExpert }: SolutionWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [wizardData, setWizardData] = useState<WizardData>({
    industry: "",
    teamSize: "",
    usesDigitalTools: null,
    digitalToolsDescription: "",
    painPoints: [],
    workflowDescription: "",
    uploadedFiles: [],
    priority: "",
    selectedAddOns: [],
    generatedSolution: null,
  })

  const progress = (currentStep / TOTAL_STEPS) * 100

  const updateWizardData = (updates: Partial<WizardData>) => {
    setWizardData((prev) => ({ ...prev, ...updates }))
  }

  const handleNext = () => {
    if (currentStep === 4) {
      // Generate solution before showing preview
      const solution = generateSolution(wizardData)
      updateWizardData({ generatedSolution: solution })
    }

    if (currentStep < TOTAL_STEPS) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
        setIsTransitioning(false)
      }, 150)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1)
        setIsTransitioning(false)
      }, 150)
    }
  }

  const handleClose = () => {
    setCurrentStep(1)
    setWizardData({
      industry: "",
      teamSize: "",
      usesDigitalTools: null,
      digitalToolsDescription: "",
      painPoints: [],
      workflowDescription: "",
      uploadedFiles: [],
      priority: "",
      selectedAddOns: [],
      generatedSolution: null,
    })
    onClose()
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return wizardData.industry && wizardData.teamSize && wizardData.usesDigitalTools !== null
      case 2:
        return wizardData.painPoints.length > 0
      case 3:
        return wizardData.workflowDescription.trim().length > 20
      case 4:
        return wizardData.priority !== ""
      case 5:
        return true // Always can proceed from solution preview
      case 6:
        return true // Final step
      default:
        return false
    }
  }

  const generateSolution = (data: WizardData) => {
    // Simple solution generation logic based on inputs
    const hasClientCommunication = data.painPoints.includes("client-communication")
    const hasFinanceIssues = data.painPoints.includes("finance-organization")
    const wantsAutomation = data.priority === "automate-tasks"
    const wantsMoreClients = data.priority === "get-clients"

    if (hasClientCommunication || wantsAutomation) {
      return {
        name: "Smart Communication Hub",
        type: "AI" as const,
        summary: [
          "Automatically categorize and prioritize all client messages",
          "Generate intelligent responses and follow-up reminders",
          "Track client satisfaction and communication patterns",
        ],
        description:
          "AI-powered communication system that streamlines all client interactions across multiple channels, reducing response time and improving customer satisfaction.",
      }
    } else if (hasFinanceIssues) {
      return {
        name: "Blockchain Finance Tracker",
        type: "Blockchain" as const,
        summary: [
          "Immutable financial records with complete transparency",
          "Real-time cash flow monitoring and alerts",
          "Automated compliance reporting and tax preparation",
        ],
        description:
          "Blockchain-based financial management system that provides transparent, secure tracking of all business transactions with automated reporting capabilities.",
      }
    } else if (wantsMoreClients) {
      return {
        name: "AI Customer Acquisition Engine",
        type: "Hybrid" as const,
        summary: [
          "AI-powered lead scoring and customer insights",
          "Blockchain-verified customer testimonials and reviews",
          "Automated marketing campaigns with smart targeting",
        ],
        description:
          "Hybrid AI-Blockchain platform that combines intelligent customer acquisition with transparent reputation management to grow your business.",
      }
    } else {
      return {
        name: "Business Intelligence Suite",
        type: "Hybrid" as const,
        summary: [
          "Comprehensive business analytics with AI insights",
          "Secure data management with blockchain verification",
          "Automated workflow optimization and recommendations",
        ],
        description:
          "Complete business intelligence platform that combines AI analytics with blockchain security to optimize your operations and drive growth.",
      }
    }
  }

  const handleFinalAction = (action: "diy" | "expert" | "save", email?: string) => {
    if (!wizardData.generatedSolution) return

    const solutionData = {
      id: Math.random().toString(36).substr(2, 9),
      name: wizardData.generatedSolution.name,
      type: wizardData.generatedSolution.type,
      status: "planning" as const,
      progress: 0,
      description: wizardData.generatedSolution.description,
      estimatedTime: "2-4 weeks",
      complexity: "Intermediate" as const,
      benefits: wizardData.generatedSolution.summary,
      nextSteps: ["Review solution requirements", "Set up development environment", "Begin implementation"],
      resources: [],
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      tags: ["Generated", "Draft"],
      wizardData: wizardData, // Store original wizard data
    }

    switch (action) {
      case "diy":
        onCreateSolution(solutionData)
        handleClose()
        break
      case "expert":
        onContactExpert({
          solution: wizardData.generatedSolution.name,
          type: "implementation",
          wizardData: wizardData,
        })
        handleClose()
        break
      case "save":
        // Save to localStorage for later
        localStorage.setItem(`solution-draft-${Date.now()}`, JSON.stringify({ ...solutionData, email }))
        handleClose()
        break
    }
  }

  const renderStep = () => {
    const stepProps = {
      data: wizardData,
      onUpdate: updateWizardData,
      onNext: handleNext,
      onBack: handleBack,
    }

    switch (currentStep) {
      case 1:
        return <BusinessContextStep {...stepProps} />
      case 2:
        return <PainPointsStep {...stepProps} />
      case 3:
        return <WorkflowStep {...stepProps} />
      case 4:
        return <PrioritiesStep {...stepProps} />
      case 5:
        return <SolutionPreviewStep {...stepProps} />
      case 6:
        return <NextStepStep {...stepProps} onFinalAction={handleFinalAction} />
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] p-0 overflow-hidden">
        <div className="flex flex-col h-[95vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900">Create New Solution</h2>
              <div className="text-sm text-gray-500">
                Step {currentStep} of {TOTAL_STEPS}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <div className="flex-1 overflow-y-auto">
            <div
              className={`transition-all duration-150 ${
                isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
              }`}
            >
              {renderStep()}
            </div>
          </div>

          {/* Footer Navigation */}
          {currentStep < 6 && (
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-white">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <span>{currentStep === 5 ? "Continue" : "Next"}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
