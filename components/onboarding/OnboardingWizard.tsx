"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import { AuthButton } from "@/components/auth/auth-button"

// Types
import { Step, UserData, OnboardingData } from "@/types/onboarding"

// Utils
import { generateSolution } from "@/utils/solution-generator"

// Components
import { FloatingParticles } from "./FloatingParticles"
import { AssistantAvatar } from "./AssistantAvatar"
import { OnboardingHeader } from "./OnboardingHeader"
import { HeroStep } from "./HeroStep"
import { BusinessProfileStep } from "./BusinessProfileStep"
import { BusinessContextStep } from "./BusinessContextStep"
import { CurrentToolsStep } from "./CurrentToolsStep"
import { PainPointsStep } from "./PainPointsStep"
import { ProcessMappingStep } from "./ProcessMappingStep"
import { PrioritiesStep } from "./PrioritiesStep"
import { SolutionGeneratorStep } from "./SolutionGeneratorStep"
import { FinalCTAStep } from "./FinalCTAStep"

const STEPS: Step[] = [
  "hero",
  "business-profile",
  "business-context",
  "current-tools",
  "pain-points",
  "process-mapping",
  "priorities",
  "solution-generator",
  "final-cta",
]

export function OnboardingWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>("hero")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [assistantVisible, setAssistantVisible] = useState(false)
  
  const [userData, setUserData] = useState<UserData>({
    businessType: "",
    teamSize: "",
    usesDigitalTools: null,
    digitalTools: "",
    painPoints: [],
    processDescription: "",
    priorities: [],
    email: "",
    
    // New business context fields
    revenueRange: "",
    businessAge: "",
    growthStage: "",
    budgetRange: "",
    implementationTimeline: "",
    techSavviness: "",
    currentChallenges: "",
    successMetrics: [],
    
    // Competitive intelligence fields
    currentTools: [],
    previousSolutionOutcome: "",
    previousSolutionDetails: "",
    biggestFrustration: "",
    idealSolutionFeatures: [],
  })

  // Load saved progress on mount
  useEffect(() => {
    const savedData = localStorage.getItem('onboarding_progress')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setUserData(parsed.userData)
        setCurrentStep(parsed.currentStep)
      } catch (error) {
        console.error('Error loading saved progress:', error)
      }
    }
  }, [])

  // Save progress on every change
  useEffect(() => {
    if (currentStep !== 'hero') {
      localStorage.setItem('onboarding_progress', JSON.stringify({
        userData,
        currentStep,
        timestamp: new Date().toISOString()
      }))
    }
  }, [userData, currentStep])

  // Calculate progress
  const currentStepIndex = STEPS.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100

  // Generate solution based on user data
  const solution = useMemo(() => generateSolution(userData), [userData])

  // Navigation functions
  const navigateToStep = useCallback((step: Step) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep(step)
      setIsTransitioning(false)
      if (step === "business-profile") {
        setAssistantVisible(true)
      }
    }, 300)
  }, [])

  const goNext = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep)
    if (currentIndex < STEPS.length - 1) {
      navigateToStep(STEPS[currentIndex + 1])
    }
  }, [currentStep, navigateToStep])

  const goBack = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep)
    if (currentIndex > 0) {
      navigateToStep(STEPS[currentIndex - 1])
    }
  }, [currentStep, navigateToStep])

  // Data update function
  const handleDataChange = useCallback((data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }))
  }, [])

  // Save complete onboarding data
  const saveOnboardingData = useCallback((): OnboardingData => {
    const onboardingData: OnboardingData = {
      userData,
      solution,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
    }
    localStorage.setItem('futureflow_onboarding', JSON.stringify(onboardingData))
    return onboardingData
  }, [userData, solution])

  // Handle AI Builder route
  const handleAIBuilderRoute = useCallback(async () => {
    setIsProcessing(true)
    try {
      saveOnboardingData()
      await router.push('/ai-builder')
    } catch (error) {
      console.error('Error navigating to AI Builder:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [router, saveOnboardingData])

  // Handle Personalized Service route
  const handlePersonalizedServiceRoute = useCallback(async () => {
    setIsProcessing(true)
    try {
      const onboardingData = saveOnboardingData()
      
      const response = await fetch('/api/project/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(onboardingData)
      })
      
      if (response.ok) {
        const project = await response.json()
        await router.push(`/dashboard/project/${project.id}`)
      } else {
        await router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error generating project:', error)
      await router.push('/dashboard')
    } finally {
      setIsProcessing(false)
    }
  }, [router, saveOnboardingData])

  // Handle email submission
  const handleEmailSubmit = useCallback(async () => {
    if (!userData.email) return
    
    try {
      const response = await fetch('/api/email/save-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          userData,
          solution,
        })
      })
      
      if (response.ok) {
        alert('Solution sent to your email!')
      }
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }, [userData, solution])

  // Render current step
  const renderStep = () => {
    const stepProps = {
      userData,
      onDataChange: handleDataChange,
      onNext: goNext,
      onBack: goBack,
    }

    switch (currentStep) {
      case "hero":
        return <HeroStep onNext={goNext} />
      case "business-profile":
        return <BusinessProfileStep {...stepProps} />
      case "business-context":
        return <BusinessContextStep {...stepProps} />
      case "current-tools":
        return <CurrentToolsStep {...stepProps} />
      case "pain-points":
        return <PainPointsStep {...stepProps} />
      case "process-mapping":
        return <ProcessMappingStep {...stepProps} />
      case "priorities":
        return <PrioritiesStep {...stepProps} />
      case "solution-generator":
        return <SolutionGeneratorStep solution={solution} onNext={goNext} />
      case "final-cta":
        return (
          <FinalCTAStep
            email={userData.email}
            onEmailChange={(email) => handleDataChange({ email })}
            onAIBuilder={handleAIBuilderRoute}
            onPersonalizedService={handlePersonalizedServiceRoute}
            onSendEmail={handleEmailSubmit}
            isProcessing={isProcessing}
            solution={solution}
            userData={userData}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <FloatingParticles />
      <AssistantAvatar visible={assistantVisible} />

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">FutureFlow</span>
          </div>
          <AuthButton />
        </div>
      </nav>

      {/* Progress Header */}
      <OnboardingHeader
        currentStep={currentStep}
        progress={progress}
        currentStepIndex={currentStepIndex}
        totalSteps={STEPS.length}
        onBack={goBack}
      />

      {/* Main Content */}
      <main className={`relative z-10 ${currentStep !== "hero" ? "pt-32" : "pt-16"} px-6 pb-12`}>
        <div className="max-w-4xl mx-auto">
          <div
            className={`transition-all duration-300 ${
              isTransitioning
                ? "opacity-0 transform translate-y-8 scale-95"
                : "opacity-100 transform translate-y-0 scale-100"
            }`}
          >
            {renderStep()}
          </div>
        </div>
      </main>
    </div>
  )
}