"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Rocket, Users, BookmarkPlus, ArrowRight, CheckCircle, Sparkles, Clock, Target, Zap } from "lucide-react"
import type { WizardData } from "../solution-wizard"

// Import service booking components
import { ServiceTierSelector } from "../../service-booking/service-tier-selector"
import { ProjectIntakeForm } from "../../service-booking/project-intake-form"
import { ConsultationBooking } from "../../service-booking/consultation-booking"
import { BookingSuccessModal } from "../../service-booking/booking-success-modal"

interface NextStepStepProps {
  data: WizardData
  onUpdate: (updates: Partial<WizardData>) => void
  onFinalAction: (action: "diy" | "expert" | "save", email?: string) => void
}

export function NextStepStep({ data, onFinalAction }: NextStepStepProps) {
  const [selectedAction, setSelectedAction] = useState<string>("")
  const [email, setEmail] = useState("")
  const [showServiceTiers, setShowServiceTiers] = useState(false)
  const [showIntakeForm, setShowIntakeForm] = useState(false)
  const [showConsultationBooking, setShowConsultationBooking] = useState(false)
  const [showBookingSuccess, setShowBookingSuccess] = useState(false)
  const [selectedTier, setSelectedTier] = useState<any>(null)
  const [bookingData, setBookingData] = useState<any>(null)

  const solution = data.generatedSolution

  if (!solution) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Loading your solution...</p>
      </div>
    )
  }

  const handleActionSelect = (action: string) => {
    setSelectedAction(action)

    if (action === "expert") {
      setShowServiceTiers(true)
    } else if (action === "diy") {
      onFinalAction("diy")
    }
  }

  const handleSaveForLater = () => {
    if (email) {
      onFinalAction("save", email)
    }
  }

  const handleTierSelection = (tier: any) => {
    setSelectedTier(tier)
    setShowServiceTiers(false)

    if (tier.id === "consultation") {
      setShowConsultationBooking(true)
    } else {
      setShowIntakeForm(true)
    }
  }

  const handleIntakeSubmission = (intakeData: any) => {
    setShowIntakeForm(false)
    setBookingData({
      type: "service",
      serviceType: selectedTier?.name,
      clientName: intakeData.clientInfo.name,
      clientEmail: intakeData.clientInfo.email,
      solutionContext: {
        name: solution.name,
        type: solution.type,
        complexity: solution.complexity,
        estimatedTime: solution.estimatedTime,
      },
    })
    setShowBookingSuccess(true)
  }

  const handleConsultationBooking = (consultationData: any) => {
    setShowConsultationBooking(false)
    setBookingData({
      type: "consultation",
      consultationType: consultationData.consultationDetails.type,
      date: consultationData.consultationDetails.preferredDate,
      time: consultationData.consultationDetails.preferredTime,
      duration: consultationData.consultationDetails.duration,
      clientName: consultationData.clientInfo.name,
      clientEmail: consultationData.clientInfo.email,
      solutionContext: {
        name: solution.name,
        type: solution.type,
        complexity: solution.complexity,
        estimatedTime: solution.estimatedTime,
      },
    })
    setShowBookingSuccess(true)
  }

  const getTypeIcon = () => {
    switch (solution.type) {
      case "AI":
        return <Zap className="w-8 h-8" />
      case "Blockchain":
        return <Target className="w-8 h-8" />
      case "Hybrid":
        return <Sparkles className="w-8 h-8" />
      default:
        return <Sparkles className="w-8 h-8" />
    }
  }

  const getTypeColor = () => {
    switch (solution.type) {
      case "AI":
        return "from-blue-500 to-cyan-600"
      case "Blockchain":
        return "from-purple-500 to-indigo-600"
      case "Hybrid":
        return "from-blue-500 via-purple-600 to-indigo-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div
          className={`w-20 h-20 bg-gradient-to-r ${getTypeColor()} rounded-3xl flex items-center justify-center mx-auto shadow-2xl`}
        >
          {getTypeIcon()}
        </div>
        <div>
          <h3 className="text-3xl font-bold text-gray-900">Your solution is ready!</h3>
          <p className="text-gray-600 mt-2">Choose how you'd like to proceed with implementation</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Solution Summary Card */}
        <Card className="bg-gradient-to-br from-white via-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <h4 className="text-2xl font-bold text-gray-900">{solution.name}</h4>
                <Badge className={`bg-gradient-to-r ${getTypeColor()} text-white px-3 py-1`}>
                  {solution.type} Solution
                </Badge>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">{solution.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">Timeline</p>
                <p className="text-gray-600">{solution.estimatedTime}</p>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">Complexity</p>
                <p className="text-gray-600">{solution.complexity}</p>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">Benefits</p>
                <p className="text-gray-600">{solution.benefits.length} key benefits</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Selection */}
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-900">How would you like to proceed?</h4>
            <p className="text-gray-600 mt-2">Choose the implementation approach that works best for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DIY Option */}
            <Card
              className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] border-2 ${
                selectedAction === "diy"
                  ? "border-blue-400 bg-blue-50 shadow-xl"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
              }`}
              onClick={() => handleActionSelect("diy")}
            >
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h5 className="text-xl font-bold text-gray-900">Start Building Now</h5>
                  <p className="text-gray-600 mt-2">
                    Get immediate access to your solution with guided implementation resources
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Immediate access</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Step-by-step guides</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Community support</span>
                  </div>
                </div>
                {selectedAction === "diy" && (
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                    onClick={() => onFinalAction("diy")}
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    Start Building
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Expert Option */}
            <Card
              className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] border-2 ${
                selectedAction === "expert"
                  ? "border-purple-400 bg-purple-50 shadow-xl"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
              }`}
              onClick={() => handleActionSelect("expert")}
            >
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h5 className="text-xl font-bold text-gray-900">Work with Experts</h5>
                  <p className="text-gray-600 mt-2">
                    Get professional implementation with dedicated project management
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Professional implementation</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Dedicated project manager</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Ongoing support & training</span>
                  </div>
                </div>
                {selectedAction === "expert" && (
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    onClick={() => setShowServiceTiers(true)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Get Expert Help
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save for Later Option */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <BookmarkPlus className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Save for Later</h5>
                  <p className="text-sm text-gray-600">Get a copy of your solution via email</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-64"
                />
                <Button
                  variant="outline"
                  onClick={handleSaveForLater}
                  disabled={!email}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps Preview */}
        {solution.nextSteps.length > 0 && (
          <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
            <CardContent className="p-6">
              <h5 className="font-semibold text-green-900 mb-4 flex items-center">
                <ArrowRight className="w-5 h-5 mr-2" />
                What happens next?
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solution.nextSteps.slice(0, 4).map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-green-800 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Service Booking Modals */}
      <ServiceTierSelector
        isOpen={showServiceTiers}
        onClose={() => setShowServiceTiers(false)}
        onSelectTier={handleTierSelection}
        solutionContext={{
          name: solution.name,
          type: solution.type,
          complexity: solution.complexity,
          estimatedTime: solution.estimatedTime,
        }}
      />

      <ProjectIntakeForm
        isOpen={showIntakeForm}
        onClose={() => setShowIntakeForm(false)}
        onSubmit={handleIntakeSubmission}
        serviceType={selectedTier?.name || ""}
        solutionContext={{
          name: solution.name,
          type: solution.type,
          complexity: solution.complexity,
          estimatedTime: solution.estimatedTime,
        }}
      />

      <ConsultationBooking
        isOpen={showConsultationBooking}
        onClose={() => setShowConsultationBooking(false)}
        onBook={handleConsultationBooking}
        solutionContext={{
          name: solution.name,
          type: solution.type,
          complexity: solution.complexity,
          estimatedTime: solution.estimatedTime,
        }}
      />

      <BookingSuccessModal
        isOpen={showBookingSuccess}
        onClose={() => setShowBookingSuccess(false)}
        bookingData={bookingData || {}}
        onScheduleAnother={() => {
          setShowBookingSuccess(false)
          setShowConsultationBooking(true)
        }}
        onViewDashboard={() => {
          setShowBookingSuccess(false)
          onFinalAction("diy")
        }}
      />
    </div>
  )
}
