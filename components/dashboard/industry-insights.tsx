"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Target, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Zap,
  Users
} from "lucide-react"
import { loadOnboardingData, generateOnboardingInsights, getIndustrySpecificMetrics, getIndustryColor, getIndustryIcon, OnboardingInsights } from "@/utils/onboarding-data"

interface IndustryInsightsProps {
  className?: string
}

export function IndustryInsights({ className = "" }: IndustryInsightsProps) {
  const [insights, setInsights] = useState<OnboardingInsights | null>(null)
  const [industryMetrics, setIndustryMetrics] = useState<any[]>([])

  useEffect(() => {
    const onboardingData = loadOnboardingData()
    if (onboardingData) {
      const generatedInsights = generateOnboardingInsights(onboardingData)
      const metrics = getIndustrySpecificMetrics(generatedInsights.businessContext.industry)
      setInsights(generatedInsights)
      setIndustryMetrics(metrics)
    }
  }, [])

  if (!insights) {
    return (
      <Card className={`bg-white/70 backdrop-blur-md border border-white/20 shadow-lg ${className}`}>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Insights</h3>
              <p className="text-gray-600">Complete the onboarding to see personalized industry insights and benchmarks.</p>
            </div>
            <Button variant="outline" className="bg-white/50 border-white/30 hover:bg-white/70">
              Start Onboarding
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const industryColor = getIndustryColor(insights.businessContext.industry)
  const industryEmoji = getIndustryIcon(insights.businessContext.industry)

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Industry Overview */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${industryColor} rounded-xl flex items-center justify-center text-white`}>
              <span className="text-2xl">{industryEmoji}</span>
            </div>
            <div>
              <CardTitle className="text-xl">{insights.businessContext.industry} Insights</CardTitle>
              <p className="text-sm text-gray-600">Industry-specific performance and recommendations</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {industryMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Business Context Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{insights.businessContext.stage}</p>
                <p className="text-xs text-gray-600">Growth Stage</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{insights.businessContext.size}</p>
                <p className="text-xs text-gray-600">Team Size</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{insights.businessContext.techLevel}</p>
                <p className="text-xs text-gray-600">Tech Level</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Wins & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Wins */}
        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <CardTitle className="text-lg">Quick Wins</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.recommendations.quickWins.map((win, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{win}</p>
                </div>
              </div>
            ))}
            <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Implement Quick Wins
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-orange-600" />
              <CardTitle className="text-lg">Recommended Next Steps</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.recommendations.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-orange-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{step}</p>
                </div>
              </div>
            ))}
            <Button size="sm" variant="outline" className="w-full bg-white/50 border-white/30 hover:bg-white/70">
              View Detailed Roadmap
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Integration Opportunities */}
      {insights.recommendations.integrations.length > 0 && (
        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg">Integration Opportunities</CardTitle>
              </div>
              <Badge className="bg-blue-100 text-blue-800">{insights.recommendations.integrations.length} Available</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {insights.recommendations.integrations.map((integration, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-900">{integration}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/30">
              <p className="text-sm text-gray-600 mb-3">
                Connect these tools to maximize your {insights.solution.type} solution effectiveness
              </p>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                Explore Integrations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}