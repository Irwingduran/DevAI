import { OnboardingData } from "@/types/onboarding"

export function createDemoOnboardingData(): OnboardingData {
  const demoData: OnboardingData = {
    userData: {
      businessType: "Healthcare & Wellness",
      teamSize: "6-20 employees", 
      priorities: ["automate-workflows", "improve-security", "reduce-costs"],
      painPoints: ["manual-tasks", "data-security", "high-operational-costs", "poor-collaboration"],
      currentTools: [
        {
          name: "Excel",
          category: "Spreadsheet",
          satisfaction: "dislike",
          issues: ["Manual data entry", "Version control problems", "Limited collaboration"]
        },
        {
          name: "Email",
          category: "Communication", 
          satisfaction: "neutral",
          issues: ["Information scattered", "Hard to track conversations"]
        },
        {
          name: "QuickBooks",
          category: "Accounting",
          satisfaction: "love",
          issues: []
        }
      ],
      techSavviness: "intermediate",
      previousSolutions: [
        {
          type: "Software",
          outcome: "mixed-results",
          details: "Implemented CRM system but low adoption due to complexity"
        }
      ],
      processDescription: "Patients contact us via phone or email to schedule appointments. We manually check availability, book the appointment, send confirmation emails, and handle follow-ups. We also maintain patient records in separate systems and struggle with billing coordination between insurance and patients.",
      revenueRange: "$500k - $1M annually",
      growthStage: "established", 
      budgetRange: "$25k - $50k",
      timeline: "3-6 months",
      successMetrics: ["time-savings", "cost-reduction", "patient-satisfaction"]
    },
    solution: {
      id: "healthcare-ai-solution",
      name: "Healthcare Automation Suite",
      type: "AI",
      description: "Integrated AI solution for patient communication, appointment scheduling, and workflow automation specifically designed for healthcare practices.",
      components: [
        "AI Patient Communication Hub",
        "Smart Appointment Scheduler", 
        "Automated Follow-up System",
        "Secure Patient Data Manager"
      ],
      estimatedTimeToValue: "6-8 weeks",
      complexity: "Intermediate",
      integrations: ["EMR Systems", "Insurance Networks", "Payment Processors"]
    },
    createdAt: new Date().toISOString(),
    completedSteps: [
      "hero",
      "business-type", 
      "team-size",
      "priorities",
      "pain-points",
      "current-tools",
      "process-mapping",
      "business-context",
      "final-cta"
    ]
  }

  return demoData
}

export function setDemoOnboardingData() {
  if (typeof window !== 'undefined') {
    const demoData = createDemoOnboardingData()
    localStorage.setItem('futureflow_onboarding', JSON.stringify(demoData))
  }
}