"use client"

import type React from "react"

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Bot, Blocks, Sparkles, TrendingUp, Clock, Plus, ArrowRight, DollarSign, Rocket, Target, Users, Zap } from "lucide-react"

// Import components
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { WelcomeMessage } from "@/components/dashboard/welcome-message"
import { CTACard } from "@/components/dashboard/cta-card"
import { EmptyState } from "@/components/dashboard/empty-state"
import { ToastSystem, useToast } from "@/components/dashboard/toast-system"
import { ExpertCTABanner } from "@/components/dashboard/expert-cta-banner"
import { SolutionFilters } from "@/components/dashboard/solutions/solution-filters"
import { SolutionCreationHub } from "@/components/dashboard/solution-creation-hub"
import { SolutionQuickActions } from "@/components/dashboard/solution-quick-actions"
import { CreateSolutionModal } from "@/components/dashboard/create-solution-modal"
import { SolutionWizard } from "@/components/dashboard/solution-wizard/solution-wizard"
import { IndustryInsights } from "@/components/dashboard/industry-insights"
import { SmartRecommendations } from "@/components/dashboard/smart-recommendations"
import { ProgressTracker } from "@/components/dashboard/progress-tracker"
import { AdvancedMetricsChart } from "@/components/charts/AdvancedMetricsChart"
import { AnalyticsDashboard } from "@/components/charts/AnalyticsDashboard"
import { RealTimeMonitor } from "@/components/charts/RealTimeMonitor"
import { loadOnboardingData, generateOnboardingInsights, getIndustrySpecificMetrics } from "@/utils/onboarding-data"

// Keep existing interfaces and mock data from the original dashboard
interface Solution {
  id: string
  name: string
  type: "AI" | "Blockchain" | "Hybrid"
  status: "planning" | "in-progress" | "completed" | "paused"
  progress: number
  description: string
  estimatedTime: string
  complexity: "Beginner" | "Intermediate" | "Advanced"
  benefits: string[]
  nextSteps: string[]
  resources: { type: string; title: string; url: string }[]
  createdAt: string
  lastUpdated: string
  tags?: string[]
  wizardData?: any
  timeSaved: string
  automationLevel: number
  notes: { id: string; content: string; timestamp: string; author: string }[]
}

interface Metric {
  label: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}

// Add mock projects data

const mockSolutions: Solution[] = [
  {
    id: "1",
    name: "Smart Inbox AI",
    type: "AI",
    status: "in-progress",
    progress: 65,
    description: "AI-powered communication hub that manages all client interactions across channels",
    estimatedTime: "2-3 weeks",
    complexity: "Intermediate",
    benefits: [
      "Automatically categorize and prioritize messages",
      "Generate smart replies and follow-ups",
      "Track client sentiment and satisfaction",
      "Reduce response time by 70%",
      "Integrate with existing CRM systems",
    ],
    nextSteps: ["Set up email integration", "Configure AI response templates", "Train sentiment analysis model"],
    resources: [
      { type: "video", title: "Getting Started with Smart Inbox", url: "#" },
      { type: "doc", title: "API Integration Guide", url: "#" },
      { type: "template", title: "Response Templates", url: "#" },
      { type: "course", title: "AI Communication Mastery", url: "#" },
    ],
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-20",
    tags: ["AI", "Communication", "CRM"],
    timeSaved: "15 hrs/week",
    automationLevel: 85,
    notes: [],
  },
  {
    id: "2",
    name: "Blockchain Certifier",
    type: "Blockchain",
    status: "planning",
    progress: 15,
    description: "Transparent financial tracking with blockchain-verified transactions",
    estimatedTime: "4-6 weeks",
    complexity: "Advanced",
    benefits: [
      "Immutable financial records",
      "Real-time cash flow insights",
      "Automated compliance reporting",
      "Reduce audit costs by 60%",
      "Enhanced security and transparency",
    ],
    nextSteps: ["Choose blockchain network", "Design smart contract architecture", "Set up development environment"],
    resources: [
      { type: "course", title: "Blockchain Fundamentals", url: "#" },
      { type: "code", title: "Smart Contract Templates", url: "#" },
      { type: "doc", title: "Security Best Practices", url: "#" },
      { type: "video", title: "Blockchain Implementation Guide", url: "#" },
    ],
    createdAt: "2024-01-10",
    lastUpdated: "2024-01-18",
    tags: ["Blockchain", "Finance", "Security"],
    timeSaved: "20 hrs/week",
    automationLevel: 90,
    notes: [],
  },
]

const mockMetrics: Metric[] = [
  {
    label: "Active Solutions",
    value: "5",
    change: "+2 this month",
    trend: "up",
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    label: "Completion Rate",
    value: "67%",
    change: "+12% vs last month",
    trend: "up",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    label: "Time Saved",
    value: "156h",
    change: "This month",
    trend: "up",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    label: "ROI Estimate",
    value: "$45,200",
    change: "Projected annual",
    trend: "up",
    icon: <DollarSign className="w-5 h-5" />,
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [solutions, setSolutions] = useState<Solution[]>(mockSolutions)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showCreationHub, setShowCreationHub] = useState(false)
  const [showSolutionWizard, setShowSolutionWizard] = useState(false)
  const [dynamicMetrics, setDynamicMetrics] = useState<Metric[]>(mockMetrics)
  const [advancedMetricsData, setAdvancedMetricsData] = useState<any[]>([])
  const [industryContext, setIndustryContext] = useState<string>("General Business")

  // Add Solution filters state
  const [solutionFilters, setSolutionFilters] = useState({
    search: "",
    status: "all",
    type: "all",
    complexity: "all",
    sortBy: "recent",
  })

  const { toasts, removeToast, showSuccess, showError, showInfo } = useToast()

  // Load dynamic metrics based on onboarding data
  useEffect(() => {
    const onboardingData = loadOnboardingData()
    if (onboardingData) {
      const insights = generateOnboardingInsights(onboardingData)
      const industryMetrics = getIndustrySpecificMetrics(insights.businessContext.industry)
      
      // Create personalized metrics based on onboarding data
      const personalizedMetrics: Metric[] = [
        {
          label: "Active Solutions",
          value: solutions.filter(s => s.status !== 'completed').length.toString(),
          change: "+2 this month",
          trend: "up",
          icon: <Rocket className="w-5 h-5" />,
        },
        {
          label: insights.businessContext.industry === "E-commerce" ? "Conversion Rate" : 
                insights.businessContext.industry === "Healthcare" ? "Patient Satisfaction" :
                insights.businessContext.industry === "Services" ? "Client Retention" : "Productivity",
          value: industryMetrics[0]?.value || "85%",
          change: industryMetrics[0]?.description || "Above target",
          trend: industryMetrics[0]?.trend === "up" ? "up" : "down",
          icon: insights.businessContext.industry === "E-commerce" ? <Target className="w-5 h-5" /> :
                insights.businessContext.industry === "Healthcare" ? <Users className="w-5 h-5" /> : 
                <TrendingUp className="w-5 h-5" />,
        },
        {
          label: "Time Saved",
          value: `${insights.metrics.timeSaved}hrs`,
          change: "Weekly savings",
          trend: "up",
          icon: <Clock className="w-5 h-5" />,
        },
        {
          label: "Projected Value",
          value: insights.metrics.estimatedValue,
          change: insights.metrics.roiTimeline + " ROI",
          trend: "up",
          icon: <DollarSign className="w-5 h-5" />,
        },
      ]

      // Add industry-specific metric if available
      if (industryMetrics.length > 1) {
        personalizedMetrics[1] = {
          ...personalizedMetrics[1],
          label: industryMetrics[1]?.label || personalizedMetrics[1].label,
          value: industryMetrics[1]?.value || personalizedMetrics[1].value,
          change: industryMetrics[1]?.description || personalizedMetrics[1].change,
          trend: industryMetrics[1]?.trend === "up" ? "up" : "down",
          icon: insights.businessContext.industry === "E-commerce" ? <Zap className="w-5 h-5" /> :
                insights.businessContext.industry === "Healthcare" ? <Target className="w-5 h-5" /> :
                <Users className="w-5 h-5" />
        }
      }

      setDynamicMetrics(personalizedMetrics)
      
      // Generate advanced metrics data for charts
      const advancedData = [
        {
          label: "Revenue Growth",
          value: parseInt(insights.metrics.estimatedValue.replace(/[$,]/g, '')) || 45000,
          previousValue: 38000,
          change: 18.4,
          trend: "up" as const,
          format: "currency" as const,
          target: 50000,
          chartData: Array.from({ length: 30 }, (_, i) => ({
            time: `Day ${i + 1}`,
            value: 35000 + Math.random() * 15000 + i * 500
          })),
          color: "#10B981"
        },
        {
          label: insights.businessContext.industry.includes("Healthcare") ? "Patient Satisfaction" :
                insights.businessContext.industry.includes("E-commerce") ? "Conversion Rate" : 
                "Customer Satisfaction",
          value: 94.2,
          previousValue: 89.1,
          change: 5.1,
          trend: "up" as const,
          format: "percentage" as const,
          target: 95,
          chartData: Array.from({ length: 30 }, (_, i) => ({
            time: `Day ${i + 1}`,
            value: 85 + Math.random() * 10 + i * 0.2
          })),
          color: "#3B82F6"
        },
        {
          label: "Efficiency Score",
          value: parseInt(insights.metrics.timeSaved) || 18,
          previousValue: 12,
          change: 6,
          trend: "up" as const,
          format: "time" as const,
          target: 25,
          chartData: Array.from({ length: 30 }, (_, i) => ({
            time: `Day ${i + 1}`,
            value: 10 + Math.random() * 15 + i * 0.3
          })),
          color: "#8B5CF6"
        },
        {
          label: "Process Automation",
          value: 78.5,
          previousValue: 65.2,
          change: 13.3,
          trend: "up" as const,
          format: "percentage" as const,
          target: 85,
          chartData: Array.from({ length: 30 }, (_, i) => ({
            time: `Day ${i + 1}`,
            value: 60 + Math.random() * 20 + i * 0.6
          })),
          color: "#F59E0B"
        }
      ]

      setAdvancedMetricsData(advancedData)
      setIndustryContext(insights.businessContext.industry)
    }
  }, [solutions])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "planning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "paused":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "AI":
        return "bg-blue-500"
      case "Blockchain":
        return "bg-purple-500"
      case "Hybrid":
        return "bg-gradient-to-r from-blue-500 to-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  // Enhanced solution filtering and sorting
  const filteredSolutions = solutions
    .filter((solution) => {
      const matchesSearch =
        solution.name.toLowerCase().includes(solutionFilters.search.toLowerCase()) ||
        solution.description.toLowerCase().includes(solutionFilters.search.toLowerCase())
      const matchesStatus = solutionFilters.status === "all" || solution.status === solutionFilters.status
      const matchesType = solutionFilters.type === "all" || solution.type === solutionFilters.type
      const matchesComplexity =
        solutionFilters.complexity === "all" || solution.complexity === solutionFilters.complexity
      return matchesSearch && matchesStatus && matchesType && matchesComplexity
    })
    .sort((a, b) => {
      switch (solutionFilters.sortBy) {
        case "progress":
          return b.progress - a.progress
        case "name":
          return a.name.localeCompare(b.name)
        case "status":
          return a.status.localeCompare(b.status)
        case "recent":
        default:
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      }
    })

  const activeSolutionFiltersCount = Object.values(solutionFilters).filter(
    (value) => value !== "all" && value !== "" && value !== "recent",
  ).length

  const handleCreateSolution = (newSolution: Solution) => {
    setSolutions((prev) => [...prev, newSolution])
    showSuccess("Solution created successfully!", `${newSolution.name} has been added to your dashboard.`)
  }

  const handleScheduleConsultation = () => {
    showInfo("Opening consultation scheduler...", "You'll be redirected to our booking system.")
  }

  const shouldShowExpertCTA = () => {
    const incompleteSolutions = solutions.filter((s) => s.status !== "completed").length
    return incompleteSolutions >= 2 || solutions.length === 0
  }

  const handleExpertContact = (context?: { solution?: string; type?: string }) => {
    showInfo("Expert contact requested", "We'll connect you with a specialist shortly.")
  }

  const handleOpenCreationHub = () => {
    setShowCreationHub(true)
  }

  const handleOpenWizard = () => {
    setShowSolutionWizard(true)
  }

  const handleOpenResources = () => {
    setActiveTab("resources")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      {/* Toast System */}
      <ToastSystem toasts={toasts} onRemoveToast={removeToast} />

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Welcome Message */}
                <WelcomeMessage />

                {/* Advanced Metrics Chart */}
                {advancedMetricsData.length > 0 && (
                  <AdvancedMetricsChart 
                    metrics={advancedMetricsData}
                    title="Live Performance Metrics"
                    timeRange="30d"
                    onTimeRangeChange={(range) => console.log("Time range changed:", range)}
                  />
                )}

                {/* Real-Time Performance Monitor */}
                <RealTimeMonitor 
                  updateInterval={3000}
                  maxDataPoints={50}
                />

                {/* Advanced Analytics Dashboard */}
                <AnalyticsDashboard 
                  industry={industryContext}
                  timeRange="30d"
                />

                {/* Industry-Specific Insights */}
                <IndustryInsights />

                {/* Smart Solution Recommendations */}
                <SmartRecommendations 
                  onCreateSolution={handleCreateSolution}
                  onContactExpert={handleExpertContact}
                />

                {/* Progress Tracker */}
                <ProgressTracker solutions={solutions} />

                {/* Solution Quick Actions */}
                <SolutionQuickActions
                  onCreateSolution={handleOpenCreationHub}
                  onOpenWizard={handleOpenWizard}
                  onContactExpert={() => handleExpertContact()}
                  onOpenResources={handleOpenResources}
                  solutionCount={solutions.length}
                  isProUser={false}
                />

                {/* Expert CTA Banner */}
                <ExpertCTABanner onContactExpert={() => handleExpertContact()} showCondition={shouldShowExpertCTA()} />

                {/* CTA Card */}
                <CTACard onScheduleConsultation={handleScheduleConsultation} />
              </div>
            )}

            {/* Solutions Tab */}
            {activeTab === "solutions" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Solutions</h2>
                    <p className="text-gray-600">Manage your AI and Blockchain implementations</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      onClick={handleOpenWizard}
                      className="bg-white/50 border-white/30 hover:bg-white/70"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Smart Wizard
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      onClick={handleOpenCreationHub}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Solution
                    </Button>
                  </div>
                </div>

                {/* Solution Filters */}
                <SolutionFilters
                  searchQuery={solutionFilters.search}
                  onSearchChange={(search) => setSolutionFilters((prev) => ({ ...prev, search }))}
                  selectedStatus={solutionFilters.status}
                  onStatusChange={(status) => setSolutionFilters((prev) => ({ ...prev, status }))}
                  selectedType={solutionFilters.type}
                  onTypeChange={(type) => setSolutionFilters((prev) => ({ ...prev, type }))}
                  selectedComplexity={solutionFilters.complexity}
                  onComplexityChange={(complexity) => setSolutionFilters((prev) => ({ ...prev, complexity }))}
                  sortBy={solutionFilters.sortBy}
                  onSortChange={(sortBy) => setSolutionFilters((prev) => ({ ...prev, sortBy }))}
                  activeFiltersCount={activeSolutionFiltersCount}
                  onClearFilters={() =>
                    setSolutionFilters({ search: "", status: "all", type: "all", complexity: "all", sortBy: "recent" })
                  }
                />

                {/* Solutions Grid or Empty State */}
                {filteredSolutions.length === 0 ? (
                  <EmptyState type="solutions" onCreateNew={handleOpenCreationHub} />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredSolutions.map((solution) => (
                      <Card
                        key={solution.id}
                        className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        onClick={() => setSelectedSolution(solution)}
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-12 h-12 ${getTypeColor(solution.type)} rounded-xl flex items-center justify-center text-white`}
                              >
                                {solution.type === "AI" ? (
                                  <Bot className="w-6 h-6" />
                                ) : solution.type === "Blockchain" ? (
                                  <Blocks className="w-6 h-6" />
                                ) : (
                                  <Sparkles className="w-6 h-6" />
                                )}
                              </div>
                              <div>
                                <CardTitle className="text-lg">{solution.name}</CardTitle>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="outline">{solution.type}</Badge>
                                  <Badge variant="outline">{solution.complexity}</Badge>
                                  {solution.tags?.includes("AI-Generated") && (
                                    <Badge className="bg-green-100 text-green-800 text-xs">AI-Generated</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600">{solution.description}</p>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">{solution.progress}%</span>
                            </div>
                            <Progress value={solution.progress} className="h-2" />
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">Key Benefits:</p>
                            <div className="space-y-1">
                              {solution.benefits.slice(0, 2).map((benefit, index) => (
                                <p key={index} className="text-xs text-gray-600">
                                  • {benefit}
                                </p>
                              ))}
                              {solution.benefits.length > 2 && (
                                <p className="text-xs text-blue-600">+{solution.benefits.length - 2} more benefits</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <Badge className={getStatusColor(solution.status)}>
                              {solution.status.replace("-", " ")}
                            </Badge>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{solution.estimatedTime}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-white/20">
                            <span className="text-xs text-gray-500">Updated {solution.lastUpdated}</span>
                            <Button size="sm" variant="ghost">
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-8">
                {/* Analytics Header */}
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">Advanced Analytics</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Deep insights into your business performance with real-time data visualization, 
                    predictive analytics, and industry-specific benchmarks.
                  </p>
                </div>

                {/* Enhanced Analytics Dashboard */}
                <AnalyticsDashboard 
                  industry={industryContext}
                  timeRange="30d"
                />

                {/* Advanced Metrics with Drill-down */}
                {advancedMetricsData.length > 0 && (
                  <AdvancedMetricsChart 
                    metrics={advancedMetricsData}
                    title="Detailed Performance Analysis"
                    timeRange="90d"
                    onTimeRangeChange={(range) => console.log("Analytics time range:", range)}
                  />
                )}

                {/* Real-time Monitoring */}
                <RealTimeMonitor 
                  updateInterval={2000}
                  maxDataPoints={100}
                />

                {/* Performance Comparison */}
                <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Industry Benchmarks</CardTitle>
                    <p className="text-sm text-gray-600">Compare your performance against industry standards</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-green-600">Above Average</p>
                        <p className="text-sm text-gray-600">Revenue Growth</p>
                        <p className="text-xs text-gray-500">Your: 23% | Industry: 15%</p>
                      </div>
                      
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <Target className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-blue-600">Excellent</p>
                        <p className="text-sm text-gray-600">Customer Satisfaction</p>
                        <p className="text-xs text-gray-500">Your: 94% | Industry: 87%</p>
                      </div>
                      
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                          <Zap className="w-8 h-8 text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-purple-600">Leading</p>
                        <p className="text-sm text-gray-600">Automation Level</p>
                        <p className="text-xs text-gray-500">Your: 78% | Industry: 52%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI-Powered Insights */}
                <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-white/20 shadow-lg">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Business Insights</h3>
                          <p className="text-sm text-gray-600">Automated analysis of your performance trends</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/60 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">🚀 Growth Opportunities</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Peak performance occurs on Tuesday-Thursday</li>
                            <li>• Customer acquisition cost decreased 18% this quarter</li>
                            <li>• Process automation could save additional 12 hours/week</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-white/60 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">💡 Recommendations</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Increase marketing spend during peak performance days</li>
                            <li>• Implement advanced workflow automation</li>
                            <li>• Consider expanding to similar market segments</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === "resources" && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">Resources & Documentation</h2>
                  <p className="text-gray-600">Everything you need to maximize your solution effectiveness</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                        <Bot className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">AI Implementation Guide</h3>
                      <p className="text-sm text-gray-600">Step-by-step guide for AI solution deployment</p>
                      <Button variant="outline" size="sm">
                        View Guide
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                        <Blocks className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Blockchain Integration</h3>
                      <p className="text-sm text-gray-600">Best practices for blockchain implementation</p>
                      <Button variant="outline" size="sm">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Team Training</h3>
                      <p className="text-sm text-gray-600">Training modules for your team members</p>
                      <Button variant="outline" size="sm">
                        Start Training
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <CreateSolutionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateSolution={handleCreateSolution}
        onOpenWizard={() => {
          setShowCreateModal(false)
          setShowSolutionWizard(true)
        }}
      />

      <SolutionWizard
        isOpen={showSolutionWizard}
        onClose={() => setShowSolutionWizard(false)}
        onCreateSolution={handleCreateSolution}
        onContactExpert={handleExpertContact}
      />

      {/* Solution Creation Hub Modal */}
      {showCreationHub && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create New Solution</h2>
                <Button variant="ghost" onClick={() => setShowCreationHub(false)}>
                  ×
                </Button>
              </div>
              <SolutionCreationHub
                onCreateSolution={(solution) => {
                  handleCreateSolution(solution)
                  setShowCreationHub(false)
                }}
                onContactExpert={handleExpertContact}
                solutionCount={solutions.length}
                isProUser={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
