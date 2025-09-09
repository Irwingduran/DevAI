export type Step =
  | "hero"
  | "business-profile"
  | "business-context"
  | "current-tools"
  | "pain-points"
  | "process-mapping"
  | "priorities"
  | "solution-generator"
  | "final-cta"

export interface CurrentTool {
  name: string
  satisfaction?: string
}

export interface UserData {
  businessType: string
  teamSize: string
  usesDigitalTools: boolean | null
  digitalTools: string
  painPoints: string[]
  processDescription: string
  priorities: string[]
  email: string
  
  // New business context fields
  revenueRange: string
  businessAge: string
  growthStage: string
  budgetRange: string
  implementationTimeline: string
  techSavviness: string
  currentChallenges: string
  successMetrics: string[]
  
  // Competitive intelligence fields
  currentTools: CurrentTool[]
  previousSolutionOutcome: string
  previousSolutionDetails: string
  biggestFrustration: string
  idealSolutionFeatures: string[]
}

export interface Solution {
  name: string
  description: string
  benefits: string[]
  addOns: AddOn[]
  type: "AI" | "Blockchain" | "Hybrid"
}

export interface AddOn {
  name: string
  description: string
  enabled: boolean
}

export interface OnboardingData {
  userData: UserData
  solution: Solution
  timestamp: string
  id: string
}

export interface StepProps {
  userData: UserData
  onDataChange: (data: Partial<UserData>) => void
  onNext: () => void
  onBack?: () => void
}