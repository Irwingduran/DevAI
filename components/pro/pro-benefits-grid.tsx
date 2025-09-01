"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Infinity, Brain, Crown, Calendar, Headphones, Zap, CheckCircle } from "lucide-react"

const proBenefits = [
  {
    icon: <Infinity className="w-8 h-8" />,
    title: "Unlimited Solutions",
    description: "Create and manage unlimited AI & Blockchain solutions",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Advanced AI Recommendations",
    description: "Get personalized insights and optimization suggestions",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: <Crown className="w-8 h-8" />,
    title: "Exclusive Templates & Tools",
    description: "Access premium marketplace content worth $500+",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Monthly Expert Check-in",
    description: "30-minute consultation call with our specialists",
    color: "from-green-500 to-teal-600",
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Priority Support",
    description: "Get help within 2 hours, not 24 hours",
    color: "from-indigo-500 to-purple-600",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Early Access",
    description: "Be first to try new features and beta releases",
    color: "from-red-500 to-pink-600",
  },
]

export function ProBenefitsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {proBenefits.map((benefit, index) => (
        <Card
          key={index}
          className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
        >
          <CardContent className="p-6 text-center space-y-4">
            <div
              className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform shadow-lg`}
            >
              {benefit.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
            <div className="pt-2">
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Included in PRO</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
