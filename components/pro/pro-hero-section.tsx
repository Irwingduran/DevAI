"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, ArrowRight, Sparkles } from "lucide-react"

interface ProHeroSectionProps {
  onUpgradeClick: () => void
}

export function ProHeroSection({ onUpgradeClick }: ProHeroSectionProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 opacity-50" />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 text-lg">
              <Crown className="w-4 h-4 mr-2" />
              Premium Experience
            </Badge>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Unlock the power of{" "}
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PRO
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Go further with unlimited solutions, AI-powered insights, and personalized expert support.
              <br />
              <span className="text-purple-600 font-medium">Everything you need to scale your business.</span>
            </p>
          </div>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Instant access</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Button
              size="lg"
              onClick={onUpgradeClick}
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <p className="text-sm text-gray-500">No credit card required for trial</p>
          </div>

          {/* Social Proof */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-gray-500 mb-4">Trusted by 10,000+ entrepreneurs</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-400">Logo</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
