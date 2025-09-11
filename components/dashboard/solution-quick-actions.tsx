"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wand2,
  Plus,
  Users,
  BookOpen,
  Zap,
  TrendingUp,
  Clock,
  Target,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Rocket,
} from "lucide-react"

interface SolutionQuickActionsProps {
  onCreateSolution: () => void
  onOpenWizard: () => void
  onContactExpert: () => void
  onOpenResources: () => void
  solutionCount: number
  isProUser: boolean
}

export function SolutionQuickActions({
  onCreateSolution,
  onOpenWizard,
  onContactExpert,
  onOpenResources,
  solutionCount,
  isProUser,
}: SolutionQuickActionsProps) {
  const quickActions = [
    {
      id: "wizard",
      title: "Smart Solution Wizard",
      description: "AI-powered guidance to create the perfect solution",
      icon: <Wand2 className="w-8 h-8" />,
      color: "from-blue-600 to-cyan-600",
      action: onOpenWizard,
      badge: "Recommended",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      id: "create",
      title: "Create Solution",
      description: "Start building your AI or Blockchain solution",
      icon: <Plus className="w-8 h-8" />,
      color: "from-purple-600 to-pink-600",
      action: onCreateSolution,
      badge: "Quick Start",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      id: "expert",
      title: "Expert Consultation",
      description: "Get professional guidance from specialists",
      icon: <Users className="w-8 h-8" />,
      color: "from-amber-500 to-orange-600",
      action: onContactExpert,
      badge: "Professional",
      badgeColor: "bg-amber-100 text-amber-800",
    },
    {
      id: "resources",
      title: "Learning Center",
      description: "Expand your knowledge with courses and guides",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-green-600 to-teal-600",
      action: onOpenResources,
      badge: "Educational",
      badgeColor: "bg-green-100 text-green-800",
    },
  ]

  const stats = [
    {
      label: "Solutions Created",
      value: solutionCount.toString(),
      icon: <Rocket className="w-5 h-5" />,
      color: "text-blue-600",
    },
    {
      label: "Success Rate",
      value: "95%",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      label: "Avg. Timeline",
      value: "2-4 weeks",
      icon: <Clock className="w-5 h-5" />,
      color: "text-purple-600",
    },
    {
      label: "Expert Support",
      value: "24/7",
      icon: <Users className="w-5 h-5" />,
      color: "text-amber-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <span>Your Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div
                  className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mx-auto ${stat.color}`}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 hover:border-blue-500 group"
                onClick={action.action}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mx-auto text-white group-hover:scale-110 transition-transform`}
                  >
                    {action.icon}
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">{action.description}</p>
                    <Badge className={`mt-2 ${action.badgeColor}`}>{action.badge}</Badge>
                  </div>
                  <Button size="sm" variant="ghost" className="w-full group-hover:bg-blue-50 group-hover:text-blue-600">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pro Upgrade Hint */}
      {!isProUser && solutionCount >= 2 && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Unlock Advanced Features</h3>
                  <p className="text-gray-600">Get unlimited solutions, priority support, and advanced analytics</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade to PRO
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <span>Quick Tips</span>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Start with the Smart Wizard",
                description: "Our AI analyzes your needs and recommends the best solution approach",
                icon: <Wand2 className="w-5 h-5 text-blue-600" />,
              },
              {
                title: "Use Templates for Speed",
                description: "Pre-built solutions can save you weeks of development time",
                icon: <Zap className="w-5 h-5 text-green-600" />,
              },
              {
                title: "Get Expert Help Early",
                description: "Consulting with specialists upfront prevents costly mistakes later",
                icon: <Users className="w-5 h-5 text-amber-600" />,
              },
            ].map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {tip.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{tip.title}</h4>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
