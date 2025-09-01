"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, ArrowRight } from "lucide-react"

interface CTACardProps {
  onScheduleConsultation?: () => void
}

export function CTACard({ onScheduleConsultation }: CTACardProps) {
  const handleScheduleClick = () => {
    // Placeholder for Calendly integration
    console.log("Opening Calendly widget...")
    if (onScheduleConsultation) {
      onScheduleConsultation()
    }
  }

  return (
    <Card className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white border-0 shadow-2xl">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Need help from an expert?</h3>
                <p className="text-white/90 mt-1">Get personalized guidance from our AI & Blockchain specialists</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>30-minute free consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Expert guidance</span>
              </div>
            </div>

            <Button
              onClick={handleScheduleClick}
              className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8 py-3 rounded-xl"
            >
              Schedule a free consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
              <Calendar className="w-12 h-12 text-white/60" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
