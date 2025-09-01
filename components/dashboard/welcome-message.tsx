"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Target, Clock } from "lucide-react"

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
  const completionPercentage = Math.round((completedSolutions / totalSolutions) * 100)

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
