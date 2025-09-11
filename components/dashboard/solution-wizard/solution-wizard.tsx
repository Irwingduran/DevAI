"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, ArrowRight, CheckCircle, Wand2, Sparkles, Users, Target, Lightbulb } from "lucide-react"

// Import step components
import { BusinessContextStep } from "./steps/business-context-step"
import { PainPointsStep } from "./steps/pain-points-step"
import { WorkflowStep } from "./steps/workflow-step"
import { PrioritiesStep } from "./steps/priorities-step"
import { SolutionPreviewStep } from "./steps/solution-preview-step"
import { NextStepStep } from "./steps/next-step-step"

interface SolutionWizardProps {
  isOpen: boolean
  onClose: () => void
  onCreateSolution: (solution: any) => void
  onContactExpert: (context: any) => void
}

interface WizardData {
  businessContext: {
    industry: string
    businessSize: string
    currentChallenges: string[]
    goals: string[]
    timeline: string
    budget: string
  }
  painPoints: {
    primaryPain: string
    impactLevel: number
    currentSolution: string
    limitations: string[]
    urgency: string
  }
  workflow: {
    currentProcess: string[]
    stakeholders: string[]
    tools: string[]
    bottlenecks: string[]
    idealOutcome: string
  }
  priorities: {
    mustHave: string[]
    niceToHave: string[]
    dealBreakers: string[]
    successMetrics: string[]
    riskTolerance: string
  }
  generatedSolution: {
    name: string
    type: "AI" | "Blockchain" | "Hybrid"
    description: string
    complexity: "Beginner" | "Intermediate" | "Advanced"
    estimatedTime: string
    benefits: string[]
    nextSteps: string[]
    tags: string[]
    confidence: number
  } | null
}

const steps = [
  {
    id: 1,
    title: "Business Context",
    description: "Tell us about your business and goals",
    icon: <Target className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Pain Points",
    description: "What challenges are you facing?",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Current Workflow",
    description: "How do you currently handle this?",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Priorities",
    description: "What matters most to you?",
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    id: 5,
    title: "Solution Preview",
    description: "Review your personalized solution",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    id: 6,
    title: "Next Steps",
    description: "Choose how to proceed",
    icon: <ArrowRight className="w-5 h-5" />,
  },
]

export function SolutionWizard({ isOpen, onClose, onCreateSolution, onContactExpert }: SolutionWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState<WizardData>({
    businessContext: {
      industry: "",
      businessSize: "",
      currentChallenges: [],
      goals: [],
      timeline: "",
      budget: "",
    },
    painPoints: {
      primaryPain: "",
      impactLevel: 5,
      currentSolution: "",
      limitations: [],
      urgency: "",
    },
    workflow: {
      currentProcess: [],
      stakeholders: [],
      tools: [],
      bottlenecks: [],
      idealOutcome: "",
    },
    priorities: {
      mustHave: [],
      niceToHave: [],
      dealBreakers: [],
      successMetrics: [],
      riskTolerance: "",
    },
    generatedSolution: null,
  })

  const updateWizardData = (step: keyof WizardData, data: any) => {
    setWizardData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }))
  }

  const generateSolution = () => {
    // AI-powered solution generation based on wizard data
    const { businessContext, painPoints, workflow, priorities } = wizardData

    // Simple AI logic for demo - in real app this would call an AI service
    let solutionType: "AI" | "Blockchain" | "Hybrid" = "AI"
    let complexity: "Beginner" | "Intermediate" | "Advanced" = "Intermediate"
    let estimatedTime = "2-3 weeks"

    // Determine solution type based on pain points and goals
    if (
      painPoints.primaryPain.toLowerCase().includes("transparency") ||
      painPoints.primaryPain.toLowerCase().includes("trust") ||
      businessContext.goals.some((goal) => goal.toLowerCase().includes("security"))
    ) {
      solutionType = "Blockchain"
      complexity = "Advanced"
      estimatedTime = "4-6 weeks"
    } else if (
      businessContext.goals.some((goal) => goal.toLowerCase().includes("automation")) &&
      painPoints.primaryPain.toLowerCase().includes("data")
    ) {
      solutionType = "Hybrid"
      complexity = "Advanced"
      estimatedTime = "6-8 weeks"
    }

    // Generate solution name based on context
    const solutionNames = {
      AI: [
        "Smart Customer Assistant",
        "Intelligent Process Optimizer",
        "AI-Powered Analytics Platform",
        "Automated Decision Engine",
      ],
      Blockchain: [
        "Transparent Tracking System",
        "Secure Verification Platform",
        "Decentralized Management Hub",
        "Blockchain Audit Trail",
      ],
      Hybrid: [
        "Smart Verification System",
        "AI-Blockchain Analytics",
        "Intelligent Trust Platform",
        "Hybrid Automation Suite",
      ],
    }

    const randomName = solutionNames[solutionType][Math.floor(Math.random() * solutionNames[solutionType].length)]

    const generatedSolution = {
      name: randomName,
      type: solutionType,
      description: `A ${solutionType.toLowerCase()} solution designed to address ${painPoints.primaryPain.toLowerCase()} while achieving ${businessContext.goals.join(", ").toLowerCase()}.`,
      complexity,
      estimatedTime,
      benefits: [
        `Solve ${painPoints.primaryPain.toLowerCase()}`,
        `Achieve ${businessContext.goals[0]?.toLowerCase() || "business goals"}`,
        `Reduce manual work by 70%`,
        `Improve efficiency and accuracy`,
        `Scale with your business growth`,
      ],
      nextSteps: [
        "Review and refine requirements",
        "Set up development environment",
        "Begin implementation phase",
        "Test and optimize solution",
        "Deploy and train team",
      ],
      tags: ["AI-Generated", solutionType, complexity, businessContext.industry],
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100% confidence
    }

    updateWizardData("generatedSolution", generatedSolution)
    setCurrentStep(5)
  }

  const handleNext = () => {
    if (currentStep === 4) {
      generateSolution()
    } else if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setCurrentStep(1)
    setWizardData({
      businessContext: {
        industry: "",
        businessSize: "",
        currentChallenges: [],
        goals: [],
        timeline: "",
        budget: "",
      },
      painPoints: {
        primaryPain: "",
        impactLevel: 5,
        currentSolution: "",
        limitations: [],
        urgency: "",
      },
      workflow: {
        currentProcess: [],
        stakeholders: [],
        tools: [],
        bottlenecks: [],
        idealOutcome: "",
      },
      priorities: {
        mustHave: [],
        niceToHave: [],
        dealBreakers: [],
        successMetrics: [],
        riskTolerance: "",
      },
      generatedSolution: null,
    })
    onClose()
  }

  const handleCreateSolution = () => {
    if (wizardData.generatedSolution) {
      const newSolution = {
        id: Date.now().toString(),
        ...wizardData.generatedSolution,
        status: "planning" as const,
        progress: 0,
        createdAt: new Date().toISOString().split("T")[0],
        lastUpdated: new Date().toISOString().split("T")[0],
        timeSaved: "0 hrs/week",
        automationLevel: 0,
        resources: [],
        notes: [],
        wizardData: wizardData,
      }

      onCreateSolution(newSolution)
      handleClose()
    }
  }

  const handleContactExpert = () => {
    onContactExpert({
      source: "wizard",
      wizardData: wizardData,
      generatedSolution: wizardData.generatedSolution,
    })
    handleClose()
  }

  const progressPercentage = (currentStep / 6) * 100

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Wand2 className="w-6 h-6 text-blue-600" />
            <span>Smart Solution Wizard</span>
          </DialogTitle>
          <DialogDescription>
            Let our AI guide you through creating the perfect solution for your business
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Step {currentStep} of 6</span>
            <span className="text-gray-600">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-between py-4 border-y">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center space-x-2 ${
                step.id === currentStep ? "text-blue-600" : step.id < currentStep ? "text-green-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.id === currentStep
                    ? "bg-blue-100 text-blue-600"
                    : step.id < currentStep
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.id < currentStep ? <CheckCircle className="w-4 h-4" /> : step.icon}
              </div>
              <div className="hidden md:block">
                <p className="font-medium text-sm">{step.title}</p>
                <p className="text-xs opacity-75">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px] py-6">
          {currentStep === 1 && (
            <BusinessContextStep
              data={wizardData.businessContext}
              onUpdate={(data) => updateWizardData("businessContext", data)}
            />
          )}
          {currentStep === 2 && (
            <PainPointsStep data={wizardData.painPoints} onUpdate={(data) => updateWizardData("painPoints", data)} />
          )}
          {currentStep === 3 && (
            <WorkflowStep data={wizardData.workflow} onUpdate={(data) => updateWizardData("workflow", data)} />
          )}
          {currentStep === 4 && (
            <PrioritiesStep data={wizardData.priorities} onUpdate={(data) => updateWizardData("priorities", data)} />
          )}
          {currentStep === 5 && wizardData.generatedSolution && (
            <SolutionPreviewStep solution={wizardData.generatedSolution} wizardData={wizardData} />
          )}
          {currentStep === 6 && (
            <NextStepStep
              solution={wizardData.generatedSolution}
              onCreateSolution={handleCreateSolution}
              onContactExpert={handleContactExpert}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            {currentStep < 5 && (
              <Button onClick={handleNext}>
                {currentStep === 4 ? "Generate Solution" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {currentStep === 5 && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => setCurrentStep(6)}>
                  Choose Next Steps
                </Button>
                <Button onClick={handleCreateSolution}>Create Solution</Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
