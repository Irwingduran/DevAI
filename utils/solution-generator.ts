import { UserData, Solution } from "@/types/onboarding"

export function generateSolution(userData: UserData): Solution {
  // Existing pain point analysis
  const hasFinanceIssues = userData.painPoints.includes("finance-tracking")
  const hasClientOverload = userData.painPoints.includes("client-overload")
  const wantsAutomation = userData.priorities.includes("automate-workflows")
  
  // New business context analysis
  const isEarlyStage = ["startup", "growth"].includes(userData.growthStage)
  const isEstablished = ["established", "mature"].includes(userData.growthStage)
  const hasHighBudget = ["$50k - $100k", "$100k+"].includes(userData.budgetRange)
  const hasLowBudget = ["Under $5k", "$5k - $15k"].includes(userData.budgetRange)
  const isTechSavvy = ["advanced", "developer"].includes(userData.techSavviness)
  const needsSupport = ["beginner", "intermediate"].includes(userData.techSavviness)
  const hasScalingIssues = userData.painPoints.includes("scaling-operations")
  const hasSecurityConcerns = userData.painPoints.includes("data-security")
  const hasComplianceNeeds = userData.painPoints.includes("compliance-issues")
  const isLargeRevenue = ["$1M - $5M", "$5M+"].includes(userData.revenueRange)
  
  // Industry and competitive intelligence analysis
  const businessType = userData.businessType || ""
  const isServicesIndustry = businessType.includes("Services") || businessType.includes("Consulting")
  const isEcommerce = businessType.includes("E-commerce") || businessType.includes("Retail")
  const isHealthcare = businessType.includes("Healthcare") || businessType.includes("Wellness")
  const isEducation = businessType.includes("Education") || businessType.includes("Training")
  const isCreative = businessType.includes("Creative") || businessType.includes("Design")
  
  // Current tools analysis
  const hasProblematicTools = userData.currentTools?.some(tool => 
    ["hate", "dislike"].includes(tool.satisfaction || "")
  ) || false
  const hasLowToolSatisfaction = userData.currentTools?.filter(tool => 
    ["hate", "dislike", "neutral"].includes(tool.satisfaction || "")
  ).length > (userData.currentTools?.length || 0) / 2
  const hasPreviousFailures = ["failed", "too-complex"].includes(userData.previousSolutionOutcome || "")
  
  // Industry-specific pain points
  const hasIndustrySchedulingIssues = userData.painPoints.includes("client-scheduling") || userData.painPoints.includes("patient-scheduling")
  const hasDocumentManagementIssues = userData.painPoints.includes("document-management")
  const hasInventoryIssues = userData.painPoints.includes("inventory-management")
  const hasPaymentProcessingIssues = userData.painPoints.includes("payment-processing")
  const hasStudentEngagementIssues = userData.painPoints.includes("student-engagement")
  const hasCreativeProjectIssues = userData.painPoints.includes("project-management")

  // Enhanced solution logic based on multiple factors
  
  // Industry-specific solutions with competitive intelligence
  
  // Healthcare-specific solution
  if (isHealthcare && (hasIndustrySchedulingIssues || hasComplianceNeeds)) {
    return {
      name: "HealthFlow AI",
      description: "HIPAA-compliant healthcare management platform with AI-powered patient engagement and blockchain record security",
      benefits: [
        "HIPAA-compliant patient scheduling and communication",
        "Blockchain-secured patient records and audit trails",
        "AI-powered appointment optimization and no-show prediction",
        "Automated insurance verification and billing",
        hasProblematicTools ? "Seamless migration from existing problematic tools" : "Integration with current healthcare tools"
      ],
      addOns: [
        { 
          name: "Telemedicine Integration", 
          description: "Built-in video consultations and remote monitoring", 
          enabled: hasHighBudget 
        },
        { 
          name: "AI Diagnosis Assistant", 
          description: "Clinical decision support and symptom analysis", 
          enabled: isTechSavvy && hasHighBudget 
        },
        { 
          name: "Patient Portal", 
          description: "Secure patient communication and document sharing", 
          enabled: true 
        },
      ],
      type: hasHighBudget ? "Hybrid" : "AI",
    }
  }

  // E-commerce specific solution
  if (isEcommerce && (hasInventoryIssues || hasPaymentProcessingIssues)) {
    return {
      name: "CommerceBoost AI",
      description: `${hasHighBudget ? 'Enterprise-grade' : 'Smart'} e-commerce platform with AI inventory optimization and blockchain supply chain tracking`,
      benefits: [
        "AI-powered demand forecasting and automatic reordering",
        "Multi-channel inventory synchronization across platforms",
        "Secure payment processing with fraud detection",
        "Customer behavior analytics and personalized recommendations",
        hasLowToolSatisfaction ? "Complete replacement for underperforming tools" : "Enhanced integration with existing e-commerce stack"
      ],
      addOns: [
        { 
          name: "Blockchain Supply Chain", 
          description: "End-to-end product traceability", 
          enabled: hasHighBudget || hasSecurityConcerns 
        },
        { 
          name: "AI Customer Service", 
          description: "Intelligent chatbots and automated support", 
          enabled: userData.painPoints.includes("customer-support") 
        },
        { 
          name: "Dynamic Pricing Engine", 
          description: "AI-driven competitive pricing optimization", 
          enabled: userData.priorities.includes("increase-sales") 
        },
      ],
      type: hasHighBudget ? "Hybrid" : "AI",
    }
  }

  // Education-specific solution
  if (isEducation && hasStudentEngagementIssues) {
    return {
      name: "EduEngage AI",
      description: "AI-powered learning platform with blockchain credentialing and personalized student journey optimization",
      benefits: [
        "AI-driven personalized learning paths and content adaptation",
        "Real-time student engagement tracking and intervention alerts",
        "Blockchain-verified certificates and credential management",
        "Automated grading and progress analytics",
        hasPreviousFailures ? "Simplified implementation designed to avoid past complexity issues" : "Intuitive platform designed for educators"
      ],
      addOns: [
        { 
          name: "Virtual Classroom", 
          description: "Interactive online learning environment", 
          enabled: hasHighBudget 
        },
        { 
          name: "Parent Portal", 
          description: "Real-time student progress communication", 
          enabled: true 
        },
        { 
          name: "AI Content Generator", 
          description: "Automated quiz and assignment creation", 
          enabled: userData.painPoints.includes("content-creation") 
        },
      ],
      type: hasHighBudget ? "Hybrid" : "AI",
    }
  }

  // Professional Services solution
  if (isServicesIndustry && (hasIndustrySchedulingIssues || hasDocumentManagementIssues)) {
    return {
      name: "ProServices AI",
      description: `${hasHighBudget ? 'Enterprise' : 'Professional'} services management with AI workflow optimization and blockchain contract security`,
      benefits: [
        "Intelligent client scheduling with automatic availability optimization",
        "Secure document management with version control and blockchain signatures",
        "AI-powered project timeline and resource planning",
        "Automated time tracking and billing integration",
        hasProblematicTools ? "Modern replacement for frustrating legacy tools" : "Seamless integration with professional service tools"
      ],
      addOns: [
        { 
          name: "Client Portal", 
          description: "Secure client communication and project tracking", 
          enabled: true 
        },
        { 
          name: "Smart Contracts", 
          description: "Blockchain-verified service agreements", 
          enabled: hasHighBudget && isTechSavvy 
        },
        { 
          name: "AI Proposal Generator", 
          description: "Automated proposal creation from project requirements", 
          enabled: hasHighBudget 
        },
      ],
      type: hasHighBudget ? "Hybrid" : "AI",
    }
  }

  // Creative industry solution
  if (isCreative && hasCreativeProjectIssues) {
    return {
      name: "CreativeFlow AI",
      description: "AI-enhanced creative project management with blockchain asset protection and client collaboration tools",
      benefits: [
        "AI-powered project timeline optimization and resource allocation",
        "Blockchain-secured digital asset management and rights protection",
        "Streamlined client feedback and approval workflows",
        "Automated invoice generation based on project milestones",
        hasLowToolSatisfaction ? "Intuitive alternative to complex existing tools" : "Enhanced creative workflow optimization"
      ],
      addOns: [
        { 
          name: "AI Asset Generator", 
          description: "AI-assisted creative content generation", 
          enabled: hasHighBudget 
        },
        { 
          name: "Client Collaboration Hub", 
          description: "Real-time creative review and approval system", 
          enabled: userData.painPoints.includes("client-approval") 
        },
        { 
          name: "Royalty Tracking", 
          description: "Blockchain-based usage rights and royalty management", 
          enabled: hasHighBudget && hasSecurityConcerns 
        },
      ],
      type: hasHighBudget ? "Hybrid" : "AI",
    }
  }
  
  // High-security, compliance-focused solution for established businesses
  if ((hasSecurityConcerns || hasComplianceNeeds) && (isEstablished || isLargeRevenue)) {
    return {
      name: "Enterprise Security Suite",
      description: "Blockchain-secured platform with AI-driven compliance monitoring for enterprise-level security",
      benefits: [
        "Immutable audit trails for regulatory compliance",
        "AI-powered threat detection and prevention",
        "Automated compliance reporting and alerts",
        "End-to-end encryption with blockchain verification"
      ],
      addOns: [
        { 
          name: "Smart Contract Automation", 
          description: "Automated compliance workflows", 
          enabled: hasHighBudget 
        },
        { 
          name: "Predictive Risk Analytics", 
          description: "AI-powered risk assessment", 
          enabled: true 
        },
        { 
          name: "Multi-party Verification", 
          description: "Blockchain consensus for critical decisions", 
          enabled: hasComplianceNeeds 
        },
      ],
      type: "Blockchain",
    }
  }

  // Scaling-focused solution for growing businesses
  if ((hasScalingIssues || isEarlyStage) && (hasClientOverload || wantsAutomation)) {
    return {
      name: "Growth Acceleration AI",
      description: "AI-powered automation suite designed to scale operations without increasing overhead",
      benefits: [
        "Intelligent workflow automation that adapts to growth",
        "Multi-channel customer communication management",
        "Automated quality control and performance monitoring",
        "Predictive resource planning and optimization"
      ],
      addOns: [
        { 
          name: "Customer Journey AI", 
          description: "Personalized customer experiences at scale", 
          enabled: userData.priorities.includes("increase-sales") 
        },
        { 
          name: "Blockchain Analytics", 
          description: "Transparent performance tracking", 
          enabled: hasHighBudget 
        },
        { 
          name: "Team Collaboration Hub", 
          description: "AI-enhanced team coordination", 
          enabled: userData.painPoints.includes("team-collaboration") 
        },
      ],
      type: "AI",
    }
  }

  // Financial optimization for businesses with finance issues
  if (hasFinanceIssues || userData.priorities.includes("increase-sales")) {
    const solutionName = isEarlyStage ? "Smart Finance Tracker" : "Financial Intelligence Platform"
    const complexity = hasHighBudget && isTechSavvy ? "Advanced" : "Essential"
    
    return {
      name: solutionName,
      description: `${complexity} financial management with ${hasHighBudget ? 'blockchain security and' : ''} AI-powered insights for better cash flow control`,
      benefits: [
        hasHighBudget ? "Blockchain-secured financial records" : "Secure cloud-based financial tracking",
        "AI-powered cash flow forecasting and alerts",
        "Automated expense categorization and reporting",
        "Integration with existing accounting systems"
      ],
      addOns: [
        { 
          name: "Predictive Analytics", 
          description: "AI forecasting for revenue and expenses", 
          enabled: true 
        },
        { 
          name: "Smart Contracts", 
          description: "Automated payment processing", 
          enabled: hasHighBudget && isTechSavvy 
        },
        { 
          name: "Tax Optimization AI", 
          description: "Intelligent tax planning recommendations", 
          enabled: isLargeRevenue 
        },
      ],
      type: hasHighBudget ? "Hybrid" : "AI",
    }
  }

  // Communication-focused solution
  if (hasClientOverload || userData.painPoints.includes("team-collaboration")) {
    return {
      name: "Unified Communication AI",
      description: "AI-powered communication hub that centralizes and optimizes all business interactions",
      benefits: [
        "Smart message routing and prioritization across channels",
        "AI-generated response suggestions and templates",
        "Real-time sentiment analysis and customer satisfaction tracking",
        "Automated follow-up sequences and appointment scheduling"
      ],
      addOns: [
        { 
          name: "Voice AI Integration", 
          description: "AI-powered phone call handling", 
          enabled: hasHighBudget 
        },
        { 
          name: "Blockchain Message Verification", 
          description: "Tamper-proof communication records", 
          enabled: hasSecurityConcerns 
        },
        { 
          name: "Customer Analytics Dashboard", 
          description: "Deep insights into customer behavior", 
          enabled: userData.priorities.includes("better-insights") 
        },
      ],
      type: "AI",
    }
  }

  // Default comprehensive solution based on business context
  const defaultSolutionType = hasHighBudget && isTechSavvy ? "Hybrid" : 
                            hasSecurityConcerns ? "Blockchain" : "AI"
  
  const defaultBenefits = hasHighBudget ? [
    "360° business intelligence with AI analytics",
    "Blockchain-secured data management and transactions",
    "Automated workflow optimization across departments",
    "Predictive insights for strategic decision making"
  ] : [
    "Smart business analytics and reporting",
    "Automated routine task management", 
    "Integrated communication and collaboration tools",
    "Scalable solution that grows with your business"
  ]

  return {
    name: isEarlyStage ? "Business Growth Assistant" : "Enterprise Intelligence Platform",
    description: `Comprehensive ${defaultSolutionType.toLowerCase()} solution tailored for ${userData.growthStage} businesses focusing on ${userData.priorities[0] || 'operational efficiency'}`,
    benefits: defaultBenefits,
    addOns: [
      { 
        name: "Industry-Specific Modules", 
        description: `Specialized tools for ${userData.businessType}`, 
        enabled: true 
      },
      { 
        name: "Advanced Analytics Suite", 
        description: "Deep business intelligence and forecasting", 
        enabled: hasHighBudget || userData.priorities.includes("better-insights") 
      },
      { 
        name: "Integration Marketplace", 
        description: "Connect with 100+ business tools", 
        enabled: needsSupport || userData.digitalTools?.length > 0 
      },
    ],
    type: defaultSolutionType,
  }
}