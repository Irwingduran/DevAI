"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Bot, Rocket } from "lucide-react"

interface HeroStepProps {
  onNext: () => void
}

export function HeroStep({ onNext }: HeroStepProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-12 max-w-3xl">
        <div className="space-y-6">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Rocket className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 rounded-3xl opacity-20 animate-pulse" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Ready to{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              future-proof
            </span>
            <br />
            your business?
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Discover how AI and Blockchain can boost your operations in 3 minutes.
            <br />
            <span className="text-blue-600 font-medium">No technical knowledge needed.</span>
          </p>
        </div>

        <div className="space-y-6">
          <Button
            size="lg"
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
          >
            Let's explore
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>

          <Card className="max-w-md mx-auto bg-white/60 backdrop-blur-md border border-white/20 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700 font-medium">I'll guide you through a few steps</p>
              </div>
              <p className="text-sm text-gray-500">✨ Personalized recommendations • No signup required</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}