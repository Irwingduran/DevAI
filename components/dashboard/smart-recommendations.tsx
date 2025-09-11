"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Bot, 
  Blocks, 
  Sparkles, 
  ArrowRight, 
  Star, 
  Clock, 
  DollarSign,
  TrendingUp,
  Zap,
  Target,
  Users,
  Shield,
  BarChart3
} from "lucide-react"
import { loadOnboardingData, generateOnboardingInsights, OnboardingInsights } from "@/utils/onboarding-data"

interface SmartRecommendationsProps {
  onCreateSolution?: (solution: any) => void
  onContactExpert?: (context: any) => void
  className?: string
}

interface RecommendedSolution {
  id: string
  name: string
  type: "AI" | "Blockchain" | "Hybrid"
  priority: "High" | "Medium" | "Low"
  complexity: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: string
  estimatedCost: string
  potentialROI: string
  description: string
  benefits: string[]
  implementationSteps: string[]
  requiredTools: string[]
  matchScore: number
  reasonForRecommendation: string
}

export function SmartRecommendations({ onCreateSolution, onContactExpert, className = "" }: SmartRecommendationsProps) {
  const [insights, setInsights] = useState<OnboardingInsights | null>(null)
  const [recommendations, setRecommendations] = useState<RecommendedSolution[]>([])

  useEffect(() => {
    const onboardingData = loadOnboardingData()
    if (onboardingData) {
      const generatedInsights = generateOnboardingInsights(onboardingData)
      setInsights(generatedInsights)
      setRecommendations(generateSmartSolutionRecommendations(generatedInsights))
    }
  }, [])

  const getSolutionIcon = (type: string) => {
    switch(type) {
      case "AI": return Bot
      case "Blockchain": return Blocks
      case "Hybrid": return Sparkles
      default: return Target
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "High": return "bg-red-100 text-red-800 border-red-200"
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case "AI": return "from-blue-500 to-cyan-600"
      case "Blockchain": return "from-purple-500 to-indigo-600"
      case "Hybrid": return "from-blue-500 via-purple-500 to-indigo-600"
      default: return "from-gray-500 to-gray-600"
    }
  }

  if (!insights || recommendations.length === 0) {
    return (
      <Card className={`bg-white/70 backdrop-blur-md border border-white/20 shadow-lg ${className}`}>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
              <p className="text-gray-600">Complete the onboarding to receive AI-powered solution recommendations tailored to your business.</p>
            </div>
            <Button variant="outline" className="bg-white/50 border-white/30 hover:bg-white/70">
              Start Onboarding
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Smart Solution Recommendations</CardTitle>
                <p className="text-sm text-gray-600">AI-powered suggestions based on your business profile</p>
              </div>
            </div>
            <Badge className="bg-purple-100 text-purple-800">
              {recommendations.length} Matches
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((solution) => {
          const SolutionIcon = getSolutionIcon(solution.type)
          const typeColor = getTypeColor(solution.type)
          
          return (
            <Card key={solution.id} className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${typeColor} rounded-xl flex items-center justify-center text-white`}>
                      <SolutionIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{solution.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{solution.type}</Badge>
                        <Badge className={getPriorityColor(solution.priority)}>
                          {solution.priority} Priority
                        </Badge>
                        <div className="flex items-center space-x-1 text-xs text-yellow-600">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{solution.matchScore}% Match</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">{solution.description}</p>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-900 mb-1">Why this is recommended:</p>
                  <p className="text-xs text-blue-700">{solution.reasonForRecommendation}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <Clock className="w-4 h-4 text-gray-500" />
                    </div>
                    <p className="text-xs font-medium text-gray-900">{solution.estimatedTime}</p>
                    <p className="text-xs text-gray-600">Timeline</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                    </div>
                    <p className="text-xs font-medium text-gray-900">{solution.estimatedCost}</p>
                    <p className="text-xs text-gray-600">Investment</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                    </div>
                    <p className="text-xs font-medium text-gray-900">{solution.potentialROI}</p>
                    <p className="text-xs text-gray-600">Expected ROI</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Key Benefits:</p>
                  <div className="space-y-1">
                    {solution.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <p className="text-xs text-gray-600">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4 border-t border-white/20">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={() => onCreateSolution?.(solution)}
                  >
                    Start Building
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white/50 border-white/30 hover:bg-white/70"
                    onClick={() => onContactExpert?.({ solution: solution.name, type: solution.type })}
                  >
                    Get Expert Help
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {recommendations.length > 2 && (
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-white/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Want More Personalized Recommendations?</h3>
            <p className="text-gray-600 mb-4">
              Our AI can suggest even more tailored solutions based on your specific use cases and constraints.
            </p>
            <Button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              onClick={() => onContactExpert?.({ type: "advanced_recommendations" })}
            >
              Get Advanced AI Recommendations
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function generateSmartSolutionRecommendations(insights: OnboardingInsights): RecommendedSolution[] {
  const { userData, businessContext } = insights
  const industry = businessContext.industry.toLowerCase()
  const painPoints = userData.painPoints || []
  const currentTools = userData.currentTools || []
  const recommendations: RecommendedSolution[] = []

  // Industry-specific AI recommendations
  if (industry.includes("healthcare")) {
    recommendations.push({
      id: "healthcare-ai-1",
      name: "Patient Communication AI",
      type: "AI",
      priority: "High",
      complexity: "Intermediate",
      estimatedTime: "4-6 weeks",
      estimatedCost: "$15,000-25,000",
      potentialROI: "300%",
      description: "AI-powered system to automate patient communications, appointment scheduling, and follow-ups.",
      benefits: [
        "Reduce no-shows by 40%",
        "Automate 80% of routine communications", 
        "Improve patient satisfaction scores",
        "Free up 15 hours/week of staff time"
      ],
      implementationSteps: [
        "Integrate with existing EMR system",
        "Set up patient communication workflows",
        "Train AI on medical protocols",
        "Deploy and monitor"
      ],
      requiredTools: ["EMR Integration", "SMS Gateway", "Email Platform"],
      matchScore: 92,
      reasonForRecommendation: "Your healthcare practice can significantly benefit from automating patient communications and reducing administrative overhead."
    })
  }
  
  if (industry.includes("e-commerce")) {
    recommendations.push({
      id: "ecommerce-ai-1", 
      name: "Smart Inventory Optimizer",
      type: "AI",
      priority: "High",
      complexity: "Advanced",
      estimatedTime: "6-8 weeks",
      estimatedCost: "$25,000-40,000",
      potentialROI: "450%",
      description: "AI system that predicts demand, optimizes inventory levels, and automates restocking decisions.",
      benefits: [
        "Reduce inventory costs by 25%",
        "Prevent stockouts for 95% of products",
        "Automate 90% of purchase decisions",
        "Improve cash flow management"
      ],
      implementationSteps: [
        "Connect to inventory management system",
        "Implement demand forecasting algorithms", 
        "Set up automated reorder triggers",
        "Monitor and optimize performance"
      ],
      requiredTools: ["Inventory Management System", "Sales Analytics", "Supplier APIs"],
      matchScore: 89,
      reasonForRecommendation: "E-commerce businesses typically see massive ROI from AI-powered inventory optimization, especially with your current growth trajectory."
    })
  }

  // Universal blockchain solution for transparency
  recommendations.push({
    id: "universal-blockchain-1",
    name: "Business Transparency Chain", 
    type: "Blockchain",
    priority: "Medium",
    complexity: "Advanced",
    estimatedTime: "8-12 weeks",
    estimatedCost: "$40,000-60,000", 
    potentialROI: "250%",
    description: "Blockchain solution to create immutable records of business transactions and build customer trust.",
    benefits: [
      "Increase customer trust by 60%",
      "Reduce audit costs by 70%",
      "Enable transparent supply chain",
      "Create competitive differentiation"
    ],
    implementationSteps: [
      "Design blockchain architecture",
      "Develop smart contracts",
      "Integrate with existing systems",
      "Deploy and validate"
    ],
    requiredTools: ["Blockchain Platform", "Smart Contract Development", "System Integrations"],
    matchScore: 75,
    reasonForRecommendation: "Blockchain transparency can significantly differentiate your business and reduce compliance costs in your industry."
  })

  // Pain point specific recommendations
  if (painPoints.includes("data-security")) {
    recommendations.push({
      id: "security-hybrid-1",
      name: "AI-Powered Security Shield",
      type: "Hybrid", 
      priority: "High",
      complexity: "Advanced",
      estimatedTime: "10-14 weeks",
      estimatedCost: "$50,000-75,000",
      potentialROI: "600%",
      description: "Combined AI threat detection with blockchain-secured data storage for ultimate protection.",
      benefits: [
        "Prevent 99.5% of security breaches",
        "Immutable audit trail",
        "Real-time threat detection",
        "Regulatory compliance assurance"
      ],
      implementationSteps: [
        "Implement AI threat detection",
        "Set up blockchain data storage",
        "Create security protocols",
        "Deploy monitoring systems"
      ],
      requiredTools: ["Security Infrastructure", "Blockchain Storage", "AI/ML Platform"],
      matchScore: 95,
      reasonForRecommendation: "Data security concerns make this hybrid AI-blockchain solution essential for protecting your business and customer data."
    })
  }

  return recommendations.slice(0, 4) // Return top 4 recommendations
}