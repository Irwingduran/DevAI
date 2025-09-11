"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Target, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  ArrowRight,
  Calendar,
  Flag,
  Zap,
  Star,
  Award
} from "lucide-react"
import { loadOnboardingData, generateOnboardingInsights, OnboardingInsights } from "@/utils/onboarding-data"

interface ProgressTrackerProps {
  solutions?: any[]
  className?: string
}

interface Goal {
  id: string
  priority: string
  name: string
  description: string
  progress: number
  status: "not-started" | "in-progress" | "completed" | "on-hold"
  targetDate: string
  relatedSolutions: string[]
  keyMilestones: {
    name: string
    completed: boolean
    dueDate: string
  }[]
  estimatedImpact: string
  successMetrics: string[]
}

export function ProgressTracker({ solutions = [], className = "" }: ProgressTrackerProps) {
  const [insights, setInsights] = useState<OnboardingInsights | null>(null)
  const [goals, setGoals] = useState<Goal[]>([])
  const [overallProgress, setOverallProgress] = useState(0)

  useEffect(() => {
    const onboardingData = loadOnboardingData()
    if (onboardingData) {
      const generatedInsights = generateOnboardingInsights(onboardingData)
      setInsights(generatedInsights)
      
      const generatedGoals = generateGoalsFromPriorities(generatedInsights, solutions)
      setGoals(generatedGoals)
      
      // Calculate overall progress
      const totalProgress = generatedGoals.reduce((sum, goal) => sum + goal.progress, 0)
      setOverallProgress(Math.round(totalProgress / generatedGoals.length))
    }
  }, [solutions])

  const getStatusColor = (status: string) => {
    switch(status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200"
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200" 
      case "on-hold": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in-progress": return <Clock className="w-4 h-4 text-blue-600" />
      case "on-hold": return <Flag className="w-4 h-4 text-yellow-600" />
      default: return <Target className="w-4 h-4 text-gray-600" />
    }
  }

  if (!insights || goals.length === 0) {
    return (
      <Card className={`bg-white/70 backdrop-blur-md border border-white/20 shadow-lg ${className}`}>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Complete the onboarding to set up goal tracking and monitor your transformation progress.</p>
            </div>
            <Button variant="outline" className="bg-white/50 border-white/30 hover:bg-white/70">
              Set Up Goals
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const completedGoals = goals.filter(g => g.status === "completed").length
  const activeGoals = goals.filter(g => g.status === "in-progress").length

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-green-50 via-teal-50 to-blue-50 border border-white/20 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Transformation Goals</CardTitle>
                <p className="text-sm text-gray-600">Track your progress toward business objectives</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{overallProgress}%</p>
              <p className="text-sm text-gray-600">Overall Progress</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Goals Progress</span>
              <span>{completedGoals} of {goals.length} completed</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{completedGoals}</p>
                <p className="text-sm text-gray-600">Goals Achieved</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{activeGoals}</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{insights.metrics.estimatedValue}</p>
                <p className="text-sm text-gray-600">Projected Value</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <Card key={goal.id} className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{goal.name}</CardTitle>
                    {getStatusIcon(goal.status)}
                  </div>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(goal.status)}>
                      {goal.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      {goal.priority} Priority
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{goal.progress}%</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <Progress value={goal.progress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Progress</span>
                  <span>Target: {goal.targetDate}</span>
                </div>
              </div>

              {/* Key Milestones */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Key Milestones:</p>
                <div className="space-y-1">
                  {goal.keyMilestones.slice(0, 3).map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {milestone.completed ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <div className="w-3 h-3 border border-gray-300 rounded-full" />
                      )}
                      <span className={`text-xs ${milestone.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                        {milestone.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Solutions */}
              {goal.relatedSolutions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Related Solutions:</p>
                  <div className="flex flex-wrap gap-1">
                    {goal.relatedSolutions.map((solution, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                        {solution}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Expected Impact */}
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Award className="w-4 h-4 text-green-600" />
                  <p className="text-sm font-medium text-green-900">Expected Impact</p>
                </div>
                <p className="text-sm text-green-700">{goal.estimatedImpact}</p>
              </div>

              {/* Action Button */}
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
              >
                {goal.status === "completed" ? "View Results" : 
                 goal.status === "in-progress" ? "Continue Progress" : "Start Goal"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievement Recognition */}
      {completedGoals > 0 && (
        <Card className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border border-white/20 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Congratulations! 🎉</h3>
                <p className="text-gray-600 mt-2">
                  You've completed {completedGoals} {completedGoals === 1 ? 'goal' : 'goals'} on your transformation journey.
                  Keep up the excellent progress!
                </p>
              </div>
              <div className="flex justify-center space-x-2">
                {Array.from({ length: Math.min(completedGoals, 5) }).map((_, index) => (
                  <Star key={index} className="w-6 h-6 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function generateGoalsFromPriorities(insights: OnboardingInsights, solutions: any[]): Goal[] {
  const { userData, businessContext } = insights
  const priorities = userData.priorities || []
  const goals: Goal[] = []

  // Map priorities to specific goals
  priorities.forEach((priority, index) => {
    let goalName = ""
    let description = ""
    let estimatedImpact = ""
    let keyMilestones: Goal['keyMilestones'] = []
    let successMetrics: string[] = []
    let relatedSolutions: string[] = []

    // Determine progress based on existing solutions
    const relatedSolutionCount = solutions.filter(s => 
      s.name.toLowerCase().includes(priority.toLowerCase()) || 
      s.description.toLowerCase().includes(priority.toLowerCase())
    ).length
    
    const baseProgress = relatedSolutionCount > 0 ? 30 + (relatedSolutionCount * 20) : 15
    const progress = Math.min(baseProgress, 100)

    switch(priority) {
      case "automate-workflows":
        goalName = "Automate Key Business Workflows"
        description = "Implement AI-powered automation to eliminate repetitive tasks and increase efficiency"
        estimatedImpact = `Save ${insights.metrics.timeSaved} hours per week and reduce operational costs by 30%`
        keyMilestones = [
          { name: "Map current workflows", completed: true, dueDate: "Week 1" },
          { name: "Identify automation opportunities", completed: progress > 30, dueDate: "Week 2" },
          { name: "Implement first automation", completed: progress > 60, dueDate: "Week 4" },
          { name: "Deploy full workflow automation", completed: progress > 90, dueDate: "Week 8" }
        ]
        successMetrics = ["Process time reduction", "Error rate decrease", "Employee satisfaction"]
        relatedSolutions = solutions.filter(s => s.type === "AI").map(s => s.name).slice(0, 2)
        break

      case "improve-security":
        goalName = "Enhance Data Security & Compliance"
        description = "Implement blockchain-based security measures to protect sensitive data and ensure compliance"
        estimatedImpact = "Achieve 99.9% security compliance and reduce breach risk by 95%"
        keyMilestones = [
          { name: "Security audit completion", completed: progress > 20, dueDate: "Week 2" },
          { name: "Blockchain security implementation", completed: progress > 50, dueDate: "Week 6" },
          { name: "Staff security training", completed: progress > 70, dueDate: "Week 8" },
          { name: "Compliance certification", completed: progress > 90, dueDate: "Week 12" }
        ]
        successMetrics = ["Security incidents", "Compliance score", "Customer trust rating"]
        relatedSolutions = solutions.filter(s => s.type === "Blockchain").map(s => s.name).slice(0, 2)
        break

      case "reduce-costs":
        goalName = "Optimize Operations & Reduce Costs"
        description = "Use AI analytics to identify cost-saving opportunities and optimize resource allocation"
        estimatedImpact = `Reduce operational costs by 25% and increase profit margins by ${insights.metrics.estimatedValue}`
        keyMilestones = [
          { name: "Cost analysis completed", completed: progress > 25, dueDate: "Week 3" },
          { name: "Optimization strategies defined", completed: progress > 50, dueDate: "Week 5" },
          { name: "Implementation of cost-saving measures", completed: progress > 75, dueDate: "Week 8" },
          { name: "Achieve target cost reduction", completed: progress > 90, dueDate: "Week 12" }
        ]
        successMetrics = ["Cost per operation", "Profit margins", "Resource utilization"]
        relatedSolutions = solutions.filter(s => s.description.includes("cost") || s.description.includes("optim")).map(s => s.name).slice(0, 2)
        break

      case "scale-operations":
        goalName = "Scale Operations Efficiently"
        description = "Build scalable systems that can handle growth without proportional cost increases"
        estimatedImpact = "Enable 300% growth capacity with only 50% cost increase"
        keyMilestones = [
          { name: "Scalability assessment", completed: progress > 30, dueDate: "Week 2" },
          { name: "Scalable architecture design", completed: progress > 60, dueDate: "Week 6" },
          { name: "Infrastructure implementation", completed: progress > 80, dueDate: "Week 10" },
          { name: "Scale testing and optimization", completed: progress > 95, dueDate: "Week 14" }
        ]
        successMetrics = ["System capacity", "Response times", "Cost per transaction"]
        relatedSolutions = solutions.filter(s => s.type === "Hybrid" || s.complexity === "Advanced").map(s => s.name).slice(0, 2)
        break

      default:
        goalName = `Achieve ${priority.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}`
        description = `Strategic objective focused on ${priority.replace("-", " ")}`
        estimatedImpact = "Significant improvement in business metrics and competitive advantage"
        keyMilestones = [
          { name: "Planning phase", completed: progress > 20, dueDate: "Week 2" },
          { name: "Implementation phase", completed: progress > 60, dueDate: "Week 8" },
          { name: "Optimization phase", completed: progress > 90, dueDate: "Week 12" }
        ]
        successMetrics = ["Performance metrics", "ROI achievement"]
        relatedSolutions = solutions.map(s => s.name).slice(0, 1)
    }

    const status = progress >= 100 ? "completed" : 
                  progress >= 30 ? "in-progress" : 
                  progress >= 15 ? "not-started" : "not-started"

    goals.push({
      id: `goal-${index + 1}`,
      priority: index < 2 ? "High" : index < 4 ? "Medium" : "Low",
      name: goalName,
      description,
      progress,
      status,
      targetDate: getTargetDate(index),
      relatedSolutions,
      keyMilestones,
      estimatedImpact,
      successMetrics
    })
  })

  return goals.slice(0, 4) // Return top 4 goals
}

function getTargetDate(index: number): string {
  const dates = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"]
  return dates[index] || "Q1 2025"
}