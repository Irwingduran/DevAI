"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Shield, BarChart3, Users, MessageCircle, Cog, TrendingUp, Zap } from "lucide-react"

const categories = [
  {
    id: "customer-service",
    name: "Customer Service",
    icon: MessageCircle,
    description: "AI chatbots and support automation",
    count: 24,
    trending: true,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "analytics",
    name: "Analytics & BI",
    icon: BarChart3,
    description: "Data analysis and business intelligence",
    count: 18,
    trending: false,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "security",
    name: "Security",
    icon: Shield,
    description: "Blockchain security and verification",
    count: 15,
    trending: true,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "automation",
    name: "Process Automation",
    icon: Cog,
    description: "Workflow and business process automation",
    count: 32,
    trending: false,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: TrendingUp,
    description: "AI-powered marketing and content tools",
    count: 21,
    trending: true,
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "supply-chain",
    name: "Supply Chain",
    icon: Users,
    description: "Blockchain tracking and logistics",
    count: 12,
    trending: false,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "payments",
    name: "Payments",
    icon: Zap,
    description: "Cryptocurrency and payment processing",
    count: 9,
    trending: true,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: "ai-tools",
    name: "AI Tools",
    icon: Bot,
    description: "General AI utilities and frameworks",
    count: 28,
    trending: false,
    color: "bg-cyan-100 text-cyan-600",
  },
]

export function MarketplaceCategories() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Browse Categories</h2>
        <Badge variant="outline" className="text-xs">
          {categories.reduce((sum, cat) => sum + cat.count, 0)} total products
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Card
              key={category.id}
              className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-200 cursor-pointer group"
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{category.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {category.count} items
                    </Badge>
                    {category.trending && (
                      <Badge className="text-xs bg-orange-100 text-orange-800">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
