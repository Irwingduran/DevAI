"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Briefcase,
  Clock,
  Bot,
  Target,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Award,
  AlertTriangle
} from "lucide-react"
import type { Project, Client, Payment, AIAgent, DashboardMetrics } from "@/types/freelancer"

interface AnalyticsData {
  projects: Project[]
  clients: Client[]
  payments: Payment[]
  aiAgents: AIAgent[]
  metrics: DashboardMetrics
}

interface TimeRange {
  label: string
  value: string
  days: number
}

interface PerformanceInsight {
  type: 'positive' | 'negative' | 'neutral'
  title: string
  description: string
  value: string
  change: number
  recommendation?: string
}

interface AdvancedAnalyticsProps {
  data: AnalyticsData
  className?: string
}

export function AdvancedAnalytics({ data, className = "" }: AdvancedAnalyticsProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("30d")
  const [selectedMetric, setSelectedMetric] = useState<string>("revenue")

  const timeRanges: TimeRange[] = [
    { label: "7 Days", value: "7d", days: 7 },
    { label: "30 Days", value: "30d", days: 30 },
    { label: "90 Days", value: "90d", days: 90 },
    { label: "1 Year", value: "1y", days: 365 }
  ]

  const analyticsCharts = useMemo(() => {
    const { projects, clients, payments, aiAgents, metrics } = data
    
    // Revenue trend analysis
    const revenueData = Array.from({ length: 12 }, (_, i) => {
      const month = new Date()
      month.setMonth(month.getMonth() - i)
      return {
        month: month.toLocaleDateString('en-US', { month: 'short' }),
        revenue: metrics.revenue.current * (0.8 + Math.random() * 0.4),
        payments: payments.length * (0.5 + Math.random() * 0.5),
        clients: clients.length * (0.7 + Math.random() * 0.3)
      }
    }).reverse()

    // Project completion rate
    const completionRate = projects.length > 0 
      ? (projects.filter(p => p.status === 'completed').length / projects.length) * 100
      : 0

    // Client satisfaction trend
    const satisfactionTrend = clients.reduce((acc, client) => acc + client.rating, 0) / clients.length

    // AI efficiency metrics
    const aiEfficiency = aiAgents.reduce((acc, agent) => acc + agent.efficiency, 0) / aiAgents.length

    return {
      revenueData,
      completionRate,
      satisfactionTrend,
      aiEfficiency
    }
  }, [data])

  const performanceInsights = useMemo((): PerformanceInsight[] => {
    const { projects, clients, payments, aiAgents, metrics } = data

    const insights: PerformanceInsight[] = []

    // Revenue growth insight
    const revenueGrowth = metrics.revenue.growth
    insights.push({
      type: revenueGrowth > 0 ? 'positive' : revenueGrowth < -10 ? 'negative' : 'neutral',
      title: 'Revenue Trend',
      description: revenueGrowth > 0 ? 'Strong revenue growth' : 'Revenue decline detected',
      value: `${revenueGrowth > 0 ? '+' : ''}${revenueGrowth.toFixed(1)}%`,
      change: revenueGrowth,
      recommendation: revenueGrowth < 0 ? 'Consider diversifying client base and raising rates' : undefined
    })

    // Client retention insight
    const activeClients = clients.filter(c => c.status === 'active').length
    const clientRetention = metrics.clients.retention
    insights.push({
      type: clientRetention > 90 ? 'positive' : clientRetention < 70 ? 'negative' : 'neutral',
      title: 'Client Retention',
      description: `${activeClients} active clients with ${clientRetention}% retention`,
      value: `${clientRetention}%`,
      change: clientRetention - 85,
      recommendation: clientRetention < 80 ? 'Focus on improving client communication and project delivery' : undefined
    })

    // AI utilization insight
    const aiUtilization = metrics.ai.efficiency
    insights.push({
      type: aiUtilization > 70 ? 'positive' : aiUtilization < 50 ? 'negative' : 'neutral',
      title: 'AI Efficiency',
      description: `AI agents operating at ${aiUtilization}% efficiency`,
      value: `${aiUtilization}%`,
      change: aiUtilization - 60,
      recommendation: aiUtilization < 60 ? 'Consider optimizing AI agent workflows and training' : undefined
    })

    // Project health insight
    const healthyProjects = projects.filter(p => p.metrics.health === 'healthy').length
    const projectHealthRate = projects.length > 0 ? (healthyProjects / projects.length) * 100 : 0
    insights.push({
      type: projectHealthRate > 80 ? 'positive' : projectHealthRate < 60 ? 'negative' : 'neutral',
      title: 'Project Health',
      description: `${healthyProjects} of ${projects.length} projects are healthy`,
      value: `${projectHealthRate.toFixed(0)}%`,
      change: projectHealthRate - 75,
      recommendation: projectHealthRate < 70 ? 'Review at-risk projects and allocate additional resources' : undefined
    })

    // Profit margin insight
    const profitMargin = metrics.financial.profit > 0 
      ? (metrics.financial.profit / metrics.revenue.current) * 100 
      : 0
    insights.push({
      type: profitMargin > 30 ? 'positive' : profitMargin < 15 ? 'negative' : 'neutral',
      title: 'Profit Margin',
      description: `Current profit margin across all projects`,
      value: `${profitMargin.toFixed(1)}%`,
      change: profitMargin - 25,
      recommendation: profitMargin < 20 ? 'Review project costs and consider rate optimization' : undefined
    })

    return insights
  }, [data])

  const generateRecommendations = () => {
    const recs = performanceInsights
      .filter(insight => insight.recommendation)
      .map(insight => insight.recommendation!)

    return recs.length > 0 ? recs : ['Continue current performance - all metrics are healthy!']
  }

  const exportAnalytics = () => {
    const exportData = {
      generatedAt: new Date().toISOString(),
      timeRange: selectedTimeRange,
      metrics: data.metrics,
      insights: performanceInsights,
      recommendations: generateRecommendations(),
      summary: {
        totalRevenue: data.metrics.revenue.current,
        activeProjects: data.projects.filter(p => p.status === 'active').length,
        clientSatisfaction: data.metrics.clients.satisfaction,
        aiEfficiency: data.metrics.ai.efficiency
      }
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `freelancer-analytics-${selectedTimeRange}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Advanced Analytics</h2>
          <p className="text-gray-600">Deep insights into your freelance business performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedTimeRange(range.value)}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  selectedTimeRange === range.value
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <Button variant="outline" onClick={exportAnalytics}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceInsights.map((insight, index) => (
          <Card key={index} className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {insight.type === 'positive' && (
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                    {insight.type === 'negative' && (
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      </div>
                    )}
                    {insight.type === 'neutral' && (
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Activity className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                    <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{insight.value}</p>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                  {insight.recommendation && (
                    <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-yellow-800">{insight.recommendation}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  insight.change > 0 ? "text-green-600" : insight.change < 0 ? "text-red-600" : "text-gray-600"
                }`}>
                  {insight.change > 0 ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : insight.change < 0 ? (
                    <ArrowDownRight className="w-4 h-4" />
                  ) : null}
                  <span>{Math.abs(insight.change).toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue & Growth Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/70 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LineChart className="w-5 h-5 text-blue-600" />
              <span>Revenue Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    ${data.metrics.revenue.current.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Current Month</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    +{data.metrics.revenue.growth.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600">Growth Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    ${data.metrics.revenue.projection.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Projected</p>
                </div>
              </div>
              
              <div className="h-40 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <BarChart3 className="w-12 h-12 text-blue-500 mx-auto" />
                  <p className="text-gray-600">Interactive revenue chart</p>
                  <p className="text-sm text-gray-500">Detailed visualization would appear here</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              <span>Project Portfolio</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Active", count: data.projects.filter(p => p.status === 'active').length, color: "bg-green-500" },
                  { label: "Completed", count: data.projects.filter(p => p.status === 'completed').length, color: "bg-blue-500" },
                  { label: "Paused", count: data.projects.filter(p => p.status === 'paused').length, color: "bg-yellow-500" },
                  { label: "Pipeline", count: data.metrics.projects.pipeline, color: "bg-purple-500" }
                ].map((item) => (
                  <div key={item.label} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`} />
                    <div>
                      <p className="font-semibold text-gray-900">{item.count}</p>
                      <p className="text-sm text-gray-600">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="h-32 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <PieChart className="w-10 h-10 text-purple-500 mx-auto" />
                  <p className="text-gray-600 text-sm">Portfolio distribution chart</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Performance & Efficiency */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-indigo-600" />
            <span>AI Performance Analytics</span>
            <Badge className="bg-indigo-100 text-indigo-800">BETA</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-indigo-900">{data.metrics.ai.tasksAutomated}</p>
              <p className="text-sm text-indigo-600">Tasks Automated</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-900">{data.metrics.ai.timeSaved}h</p>
              <p className="text-sm text-green-600">Time Saved</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-emerald-900">${data.metrics.ai.costSaved.toLocaleString()}</p>
              <p className="text-sm text-emerald-600">Cost Saved</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-900">{data.metrics.ai.efficiency}%</p>
              <p className="text-sm text-purple-600">Efficiency Rate</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/60 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">AI ROI Analysis</h4>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Monthly AI investment cost</span>
              <span className="font-medium">$299</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600">Cost savings generated</span>
              <span className="font-medium text-green-600">$8,750</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1 pt-2 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Net ROI</span>
              <span className="font-bold text-green-600">+2,825%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-600" />
            <span>AI-Powered Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {generateRecommendations().map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-amber-800">{index + 1}</span>
                </div>
                <p className="text-amber-800 text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}