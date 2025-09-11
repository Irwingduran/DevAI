"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Clock, Rocket, Bot, Blocks, Sparkles, CheckCircle } from "lucide-react"
import { loadOnboardingData, generateOnboardingInsights, getIndustryColor, getIndustryIcon, OnboardingInsights } from "@/utils/onboarding-data"

interface WelcomeMessageProps {
  userName?: string
  completedSolutions?: number
  totalSolutions?: number
  timesSaved?: string
}

export function WelcomeMessage({
  userName = "John",
  completedSolutions = 1,
  totalSolutions = 3,
  timesSaved = "24 hours",
}: WelcomeMessageProps) {
  const [insights, setInsights] = useState<OnboardingInsights | null>(null)
  const [hasOnboardingData, setHasOnboardingData] = useState(false)

  useEffect(() => {
    const onboardingData = loadOnboardingData()
    if (onboardingData) {
      setInsights(generateOnboardingInsights(onboardingData))
      setHasOnboardingData(true)
    }
  }, [])

  const completionPercentage = Math.round((completedSolutions / totalSolutions) * 100)
  
  // Get solution icon
  const getSolutionIcon = (type: string) => {
    switch(type) {
      case "AI": return Bot
      case "Blockchain": return Blocks
      case "Hybrid": return Sparkles
      default: return Rocket
    }
  }

  if (hasOnboardingData && insights) {
    const SolutionIcon = getSolutionIcon(insights.solution.type)
    const industryColor = getIndustryColor(insights.businessContext.industry)
    const industryEmoji = getIndustryIcon(insights.businessContext.industry)
    
    return (
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 border border-white/20 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-6">
              {/* Personalized Header with Onboarding Continuity */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{industryEmoji}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Welcome back! Your {insights.businessContext.industry} transformation is underway
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {insights.solution.name} is ready to save your team {insights.metrics.timeSaved}hrs/week
                      </p>
                    </div>
                  </div>
                  {/* Onboarding Completion Badge */}
                  <div className="hidden lg:flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Onboarding Complete</span>
                  </div>
                </div>
                
                {/* Progress Indicator */}
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-800">Your Journey Progress</h3>
                    <span className="text-sm text-gray-600">3 of 5 priorities identified</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Business Assessment</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Solution Design</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Implementation Planning</span>
                      <div className="w-4 h-4 border-2 border-blue-300 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
                
                {/* Solution Status Badge */}
                <div className="flex items-center space-x-3">
                  <Badge className="bg-gradient-to-r from-green-100 to-teal-100 text-green-800 border-green-200">
                    <SolutionIcon className="w-3 h-3 mr-1" />
                    {insights.solution.type} Solution Active
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800">
                    {insights.businessContext.stage} Stage
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    {insights.metrics.complexity}
                  </Badge>
                </div>
              </div>

              {/* Personalized Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${industryColor} rounded-xl flex items-center justify-center`}>
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{insights.metrics.estimatedValue}</p>
                    <p className="text-sm text-gray-600">Projected Annual Value</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{insights.metrics.timeSaved}hrs</p>
                    <p className="text-sm text-gray-600">Weekly time savings</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{insights.metrics.roiTimeline}</p>
                    <p className="text-sm text-gray-600">ROI break-even</p>
                  </div>
                </div>
              </div>

              {/* Quick Wins Preview */}
              <div className="bg-white/60 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">🎯 Ready to implement:</h3>
                <div className="flex flex-wrap gap-2">
                  {insights.recommendations.quickWins.map((win, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {win}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Solution Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className={`w-24 h-24 bg-gradient-to-r ${industryColor} rounded-2xl flex items-center justify-center shadow-xl`}>
                  <SolutionIcon className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl opacity-20 animate-pulse" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Fallback to generic welcome message if no onboarding data
  return (
    <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 border border-white/20 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Hi {userName}, here's your progress so far...</h2>
              <p className="text-gray-600 mt-2">You're making great progress on your digital transformation journey!</p>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{completionPercentage}%</p>
                  <p className="text-sm text-gray-600">Solutions completed</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{timesSaved}</p>
                  <p className="text-sm text-gray-600">Time saved this month</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">+45%</p>
                  <p className="text-sm text-gray-600">Efficiency increase</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
