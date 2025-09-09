import { OnboardingData, UserData, Solution } from "@/types/onboarding"

export interface OnboardingInsights {
  userData: UserData
  solution: Solution
  businessContext: {
    industry: string
    stage: string
    size: string
    techLevel: string
  }
  metrics: {
    estimatedValue: string
    timeSaved: string
    complexity: string
    roiTimeline: string
  }
  recommendations: {
    nextSteps: string[]
    integrations: string[]
    quickWins: string[]
  }
}

export function loadOnboardingData(): OnboardingData | null {
  if (typeof window === 'undefined') return null
  
  try {
    const data = localStorage.getItem('futureflow_onboarding')
    if (!data) return null
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading onboarding data:', error)
    return null
  }
}

export function generateOnboardingInsights(data: OnboardingData): OnboardingInsights {
  const { userData, solution } = data
  
  // Business context analysis
  const businessContext = {
    industry: userData.businessType || "General Business",
    stage: userData.growthStage || "established",
    size: userData.teamSize || "small",
    techLevel: userData.techSavviness || "intermediate"
  }

  // Calculate personalized metrics
  const metrics = calculatePersonalizedMetrics(userData)
  
  // Generate smart recommendations
  const recommendations = generateSmartRecommendations(userData, solution)

  return {
    userData,
    solution,
    businessContext,
    metrics,
    recommendations
  }
}

function calculatePersonalizedMetrics(userData: UserData) {
  // Revenue-based value estimates
  const estimatedValue = userData.revenueRange?.includes("$1M") ? "$25,000" : 
                        userData.revenueRange?.includes("$5M") ? "$50,000" : 
                        userData.revenueRange?.includes("$500k") ? "$18,000" : "$12,000"

  // Team-size based time savings
  const timeSaved = userData.teamSize?.includes("50+") ? "35" : 
                   userData.teamSize?.includes("20") ? "25" : 
                   userData.teamSize?.includes("6-20") ? "18" : "12"

  // Complexity based on tech savviness
  const complexity = userData.techSavviness === "developer" ? "Advanced" : 
                    userData.techSavviness === "advanced" ? "Intermediate-Advanced" :
                    userData.techSavviness === "beginner" ? "Beginner-Friendly" : "Intermediate"

  // ROI timeline based on budget and business size
  const roiTimeline = userData.budgetRange?.includes("$100k") ? "2-3 months" : 
                     userData.revenueRange?.includes("$1M") ? "3-4 months" : "4-6 months"

  return {
    estimatedValue,
    timeSaved,
    complexity,
    roiTimeline
  }
}

function generateSmartRecommendations(userData: UserData, solution: Solution) {
  const businessType = userData.businessType || ""
  const painPoints = userData.painPoints || []
  const currentTools = userData.currentTools || []
  
  let nextSteps: string[] = []
  let integrations: string[] = []
  let quickWins: string[] = []

  // Industry-specific recommendations
  if (businessType.includes("Healthcare")) {
    nextSteps = [
      "Set up HIPAA-compliant data storage",
      "Configure patient communication workflows",
      "Implement appointment scheduling automation"
    ]
    integrations = ["Epic EHR", "Cerner", "Practice Management System"]
    quickWins = ["Automated appointment reminders", "Patient intake forms", "Billing automation"]
  } else if (businessType.includes("E-commerce")) {
    nextSteps = [
      "Connect inventory management system",
      "Set up automated order processing",
      "Configure customer support workflows"
    ]
    integrations = ["Shopify", "WooCommerce", "Stripe", "Inventory Management"]
    quickWins = ["Abandoned cart recovery", "Order status automation", "Customer segmentation"]
  } else if (businessType.includes("Services")) {
    nextSteps = [
      "Implement client onboarding automation",
      "Set up project management workflows",
      "Configure billing and invoicing"
    ]
    integrations = ["CRM System", "Project Management", "Accounting Software"]
    quickWins = ["Client intake automation", "Proposal generation", "Time tracking"]
  } else {
    // General business recommendations
    nextSteps = [
      "Define automation workflows",
      "Set up data integrations",
      "Configure user permissions"
    ]
    integrations = ["Email Platform", "CRM", "Analytics Tools"]
    quickWins = ["Email automation", "Report generation", "Task management"]
  }

  // Adjust based on current tools
  const toolNames = currentTools.map(t => t.name)
  integrations = integrations.filter(integration => 
    !toolNames.some(tool => integration.toLowerCase().includes(tool.toLowerCase()))
  )

  // Add current tools that need integration
  const problematicTools = currentTools.filter(t => 
    ["hate", "dislike"].includes(t.satisfaction || "")
  )
  if (problematicTools.length > 0) {
    nextSteps.unshift(`Replace underperforming tools: ${problematicTools.map(t => t.name).join(", ")}`)
  }

  return {
    nextSteps: nextSteps.slice(0, 4), // Limit to 4 items
    integrations: integrations.slice(0, 5), // Limit to 5 items  
    quickWins: quickWins.slice(0, 3) // Limit to 3 items
  }
}

export function getIndustrySpecificMetrics(businessType: string) {
  const industry = businessType.toLowerCase()
  
  if (industry.includes("healthcare") || industry.includes("wellness")) {
    return [
      { label: "Patient Satisfaction", value: "94%", trend: "up", description: "Above industry average" },
      { label: "No-show Rate", value: "12%", trend: "down", description: "Reduced by 45%" },
      { label: "Processing Time", value: "3.2min", trend: "down", description: "Per patient check-in" },
      { label: "Compliance Score", value: "98%", trend: "up", description: "HIPAA compliant" }
    ]
  } else if (industry.includes("e-commerce") || industry.includes("retail")) {
    return [
      { label: "Conversion Rate", value: "3.2%", trend: "up", description: "Above industry average" },
      { label: "Cart Abandonment", value: "68%", trend: "down", description: "Reduced by 12%" },
      { label: "Order Fulfillment", value: "1.8 days", trend: "down", description: "Average processing" },
      { label: "Customer LTV", value: "$284", trend: "up", description: "Lifetime value" }
    ]
  } else if (industry.includes("services") || industry.includes("consulting")) {
    return [
      { label: "Client Retention", value: "89%", trend: "up", description: "Annual retention rate" },
      { label: "Project Margin", value: "28%", trend: "up", description: "Average profit margin" },
      { label: "Delivery Time", value: "15 days", trend: "down", description: "Project completion" },
      { label: "Client Satisfaction", value: "4.7/5", trend: "up", description: "Average rating" }
    ]
  } else if (industry.includes("education") || industry.includes("training")) {
    return [
      { label: "Completion Rate", value: "87%", trend: "up", description: "Course completion" },
      { label: "Student Engagement", value: "92%", trend: "up", description: "Active participation" },
      { label: "Assessment Scores", value: "8.4/10", trend: "up", description: "Average performance" },
      { label: "Certification Rate", value: "78%", trend: "up", description: "Students certified" }
    ]
  } else {
    return [
      { label: "Productivity", value: "85%", trend: "up", description: "Team efficiency" },
      { label: "Cost Reduction", value: "23%", trend: "down", description: "Operational savings" },
      { label: "Process Time", value: "4.2 hrs", trend: "down", description: "Task completion" },
      { label: "Error Rate", value: "2.1%", trend: "down", description: "Quality improvement" }
    ]
  }
}

export function getIndustryColor(businessType: string): string {
  const industry = businessType.toLowerCase()
  
  if (industry.includes("healthcare")) return "from-green-500 to-teal-600"
  if (industry.includes("e-commerce")) return "from-orange-500 to-red-600" 
  if (industry.includes("services")) return "from-blue-500 to-cyan-600"
  if (industry.includes("education")) return "from-purple-500 to-indigo-600"
  if (industry.includes("creative")) return "from-pink-500 to-purple-600"
  return "from-blue-500 to-purple-600"
}

export function getIndustryIcon(businessType: string): string {
  const industry = businessType.toLowerCase()
  
  if (industry.includes("healthcare")) return "🏥"
  if (industry.includes("e-commerce")) return "🛒"
  if (industry.includes("services")) return "🤝"
  if (industry.includes("education")) return "🎓"
  if (industry.includes("creative")) return "🎨"
  if (industry.includes("manufacturing")) return "🏭"
  if (industry.includes("real estate")) return "🏠"
  return "🚀"
}