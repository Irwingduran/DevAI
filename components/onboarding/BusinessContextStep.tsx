"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Building2, TrendingUp, Settings } from "lucide-react"
import { StepProps } from "@/types/onboarding"
import { 
  revenueRanges, 
  businessAges, 
  growthStages, 
  budgetRanges, 
  implementationTimelines, 
  techSavviness 
} from "@/config/onboarding-options"

export function BusinessContextStep({ userData, onDataChange, onNext }: StepProps) {
  const canProceed = userData.revenueRange && userData.businessAge && userData.growthStage && userData.budgetRange && userData.implementationTimeline && userData.techSavviness

  const handleSuccessMetricToggle = (metric: string) => {
    const newMetrics = userData.successMetrics?.includes(metric)
      ? userData.successMetrics.filter(m => m !== metric)
      : [...(userData.successMetrics || []), metric]
    
    onDataChange({ successMetrics: newMetrics })
  }

  const successMetricOptions = [
    "Revenue growth",
    "Time savings",
    "Cost reduction", 
    "Customer satisfaction",
    "Team productivity",
    "Process efficiency",
    "Data insights",
    "Competitive advantage"
  ]

  return (
    <div className="space-y-12 py-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Let's understand your business better</h2>
        <p className="text-xl text-gray-600">This helps us create the most suitable solution for your situation</p>
      </div>

      <div className="space-y-8">
        {/* Business Fundamentals */}
        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Business Fundamentals</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Annual Revenue Range</label>
                <Select value={userData.revenueRange} onValueChange={(value) => onDataChange({ revenueRange: value })}>
                  <SelectTrigger className="bg-white/50 border-white/30">
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    {revenueRanges.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">How long have you been in business?</label>
                <Select value={userData.businessAge} onValueChange={(value) => onDataChange({ businessAge: value })}>
                  <SelectTrigger className="bg-white/50 border-white/30">
                    <SelectValue placeholder="Select business age" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessAges.map((age) => (
                      <SelectItem key={age} value={age}>{age}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Growth & Investment */}
        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">Growth & Investment</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">What stage is your business at?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {growthStages.map((stage) => (
                    <Button
                      key={stage.id}
                      variant={userData.growthStage === stage.id ? "default" : "outline"}
                      className={`p-4 h-auto text-left ${
                        userData.growthStage === stage.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-white/50 border-white/30 hover:bg-white/70"
                      }`}
                      onClick={() => onDataChange({ growthStage: stage.id })}
                    >
                      <div>
                        <div className="font-medium">{stage.label}</div>
                        <div className="text-sm opacity-80">{stage.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Budget Range for Solution</label>
                  <Select value={userData.budgetRange} onValueChange={(value) => onDataChange({ budgetRange: value })}>
                    <SelectTrigger className="bg-white/50 border-white/30">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((budget) => (
                        <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Implementation Timeline</label>
                  <Select value={userData.implementationTimeline} onValueChange={(value) => onDataChange({ implementationTimeline: value })}>
                    <SelectTrigger className="bg-white/50 border-white/30">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {implementationTimelines.map((timeline) => (
                        <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical & Success Context */}
        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-800">Technical & Success Context</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Technical Comfort Level</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {techSavviness.map((level) => (
                    <Button
                      key={level.id}
                      variant={userData.techSavviness === level.id ? "default" : "outline"}
                      className={`p-4 h-auto text-left ${
                        userData.techSavviness === level.id
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-white/50 border-white/30 hover:bg-white/70"
                      }`}
                      onClick={() => onDataChange({ techSavviness: level.id })}
                    >
                      <div>
                        <div className="font-medium">{level.label}</div>
                        <div className="text-sm opacity-80">{level.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">How do you measure business success?</label>
                <div className="flex flex-wrap gap-2">
                  {successMetricOptions.map((metric) => (
                    <Button
                      key={metric}
                      variant={userData.successMetrics?.includes(metric) ? "default" : "outline"}
                      size="sm"
                      className={`${
                        userData.successMetrics?.includes(metric)
                          ? "bg-gradient-to-r from-green-600 to-teal-600 text-white"
                          : "bg-white/50 border-white/30 hover:bg-white/70"
                      }`}
                      onClick={() => handleSuccessMetricToggle(metric)}
                    >
                      {metric}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">What's your biggest challenge right now? (Optional)</label>
                <Textarea
                  placeholder="Describe your main business challenge or goal..."
                  value={userData.currentChallenges || ""}
                  onChange={(e) => onDataChange({ currentChallenges: e.target.value })}
                  className="bg-white/50 border-white/30"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {canProceed && (
        <div className="text-center pt-6">
          <Button
            size="lg"
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-xl"
          >
            Continue to Pain Points
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>
        </div>
      )}
    </div>
  )
}