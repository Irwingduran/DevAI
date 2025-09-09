import { NextRequest, NextResponse } from 'next/server'

interface OnboardingData {
  userData: {
    businessType: string
    teamSize: string
    usesDigitalTools: boolean | null
    digitalTools: string
    painPoints: string[]
    processDescription: string
    priorities: string[]
    email: string
  }
  solution: {
    name: string
    description: string
    benefits: string[]
    addOns: { name: string; description: string; enabled: boolean }[]
    type: "AI" | "Blockchain" | "Hybrid"
  }
  timestamp: string
  id: string
}

interface ProjectSpec {
  id: string
  title: string
  description: string
  requirements: string[]
  techStack: string[]
  timeline: string
  budget: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'pending' | 'in-progress' | 'completed'
  createdAt: string
  onboardingData: OnboardingData
}

export async function POST(request: NextRequest) {
  try {
    const onboardingData: OnboardingData = await request.json()

    // Generate automated project specification based on onboarding data
    const projectSpec: ProjectSpec = generateProjectSpec(onboardingData)

    // TODO: Save to database
    // await saveProjectToDatabase(projectSpec)

    // TODO: Send notification to development team
    // await notifyDevelopmentTeam(projectSpec)

    return NextResponse.json(projectSpec, { status: 201 })
  } catch (error) {
    console.error('Error generating project:', error)
    return NextResponse.json(
      { error: 'Failed to generate project specification' },
      { status: 500 }
    )
  }
}

function generateProjectSpec(data: OnboardingData): ProjectSpec {
  const { userData, solution } = data
  
  // Analyze business requirements
  const hasAutomationNeeds = userData.painPoints.includes('manual-tasks') || 
                            userData.priorities.includes('automate-workflows')
  const hasFinanceNeeds = userData.painPoints.includes('finance-tracking')
  const hasClientCommNeeds = userData.painPoints.includes('client-overload')
  const hasAnalyticsNeeds = userData.priorities.includes('better-insights')
  
  // Generate requirements based on pain points and priorities
  const requirements = generateRequirements(userData, solution)
  
  // Determine tech stack based on solution type
  const techStack = generateTechStack(solution.type, userData.usesDigitalTools)
  
  // Estimate timeline and budget based on complexity
  const complexity = calculateComplexity(requirements, userData.teamSize)
  const { timeline, budget } = estimateProjectScope(complexity)

  return {
    id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: `${solution.name} Implementation for ${userData.businessType}`,
    description: `Implement ${solution.description.toLowerCase()} for a ${userData.teamSize} ${userData.businessType.toLowerCase()} team.`,
    requirements,
    techStack,
    timeline,
    budget,
    priority: determinePriority(userData.priorities),
    status: 'pending',
    createdAt: new Date().toISOString(),
    onboardingData: data
  }
}

function generateRequirements(userData: OnboardingData['userData'], solution: OnboardingData['solution']): string[] {
  const requirements: string[] = [
    `Core ${solution.type} implementation based on ${solution.name}`,
    `Integration with existing business process: ${userData.processDescription.slice(0, 100)}...`
  ]

  // Add pain point specific requirements
  if (userData.painPoints.includes('manual-tasks')) {
    requirements.push('Automated workflow system to reduce manual tasks')
  }
  if (userData.painPoints.includes('client-overload')) {
    requirements.push('Centralized communication hub for client management')
  }
  if (userData.painPoints.includes('finance-tracking')) {
    requirements.push('Financial tracking and reporting system')
  }
  if (userData.painPoints.includes('organization')) {
    requirements.push('Project and task management system')
  }

  // Add priority-based requirements
  if (userData.priorities.includes('increase-sales')) {
    requirements.push('Sales analytics and lead management features')
  }
  if (userData.priorities.includes('better-insights')) {
    requirements.push('Business intelligence dashboard with key metrics')
  }
  if (userData.priorities.includes('save-time')) {
    requirements.push('Time-saving automation features')
  }

  // Add enabled add-ons as requirements
  solution.addOns.filter(addon => addon.enabled).forEach(addon => {
    requirements.push(`${addon.name}: ${addon.description}`)
  })

  return requirements
}

function generateTechStack(solutionType: string, usesDigitalTools: boolean | null): string[] {
  const baseTech = ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis']
  
  if (solutionType === 'AI' || solutionType === 'Hybrid') {
    baseTech.push('OpenAI GPT-4', 'LangChain', 'Python', 'TensorFlow')
  }
  
  if (solutionType === 'Blockchain' || solutionType === 'Hybrid') {
    baseTech.push('Ethereum', 'Solidity', 'Web3.js', 'IPFS')
  }
  
  // Add integration technologies if they use digital tools
  if (usesDigitalTools) {
    baseTech.push('REST APIs', 'Webhooks', 'OAuth 2.0')
  }
  
  baseTech.push('Next.js', 'React', 'Tailwind CSS', 'Docker')
  
  return baseTech
}

function calculateComplexity(requirements: string[], teamSize: string): 'low' | 'medium' | 'high' {
  let complexityScore = 0
  
  // Base complexity on number of requirements
  complexityScore += requirements.length
  
  // Adjust for team size (smaller teams = higher complexity)
  if (teamSize === 'Just me') complexityScore += 3
  else if (teamSize === '2-5 people') complexityScore += 1
  
  // Determine complexity level
  if (complexityScore <= 5) return 'low'
  if (complexityScore <= 10) return 'medium'
  return 'high'
}

function estimateProjectScope(complexity: 'low' | 'medium' | 'high'): { timeline: string; budget: string } {
  switch (complexity) {
    case 'low':
      return { timeline: '4-6 weeks', budget: '$15,000 - $25,000' }
    case 'medium':
      return { timeline: '8-12 weeks', budget: '$25,000 - $45,000' }
    case 'high':
      return { timeline: '16-24 weeks', budget: '$45,000 - $75,000' }
  }
}

function determinePriority(priorities: string[]): 'High' | 'Medium' | 'Low' {
  if (priorities.includes('save-time') || priorities.includes('increase-sales')) {
    return 'High'
  }
  if (priorities.includes('automate-workflows') || priorities.includes('better-insights')) {
    return 'Medium'
  }
  return 'Low'
}