"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, Mail, CheckCircle, ArrowRight, MessageSquare, Settings, Code, Lightbulb } from "lucide-react"
import { ServiceTierSelector } from "./service-booking/service-tier-selector"
import { ProjectIntakeForm } from "./service-booking/project-intake-form"
import { ConsultationBooking } from "./service-booking/consultation-booking"
import { BookingSuccessModal } from "./service-booking/booking-success-modal"

interface ExpertContactModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ExpertContactData) => void
  prefilledSolution?: string
  prefilledType?: string
}

interface ExpertContactData {
  helpType: string[]
  supportType: string
  name: string
  email: string
  message: string
  solutionContext?: string
}

const helpTypes = [
  {
    id: "planning",
    label: "Planning my project",
    description: "Help with strategy and roadmap",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    id: "implementation",
    label: "Technical implementation",
    description: "Build and deploy the solution",
    icon: <Code className="w-5 h-5" />,
  },
  {
    id: "advice",
    label: "Just need quick advice",
    description: "Quick consultation or guidance",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    id: "optimization",
    label: "Optimize existing solution",
    description: "Improve current implementation",
    icon: <Settings className="w-5 h-5" />,
  },
]

const supportTypes = [
  {
    id: "video-call",
    label: "Schedule a video call",
    description: "30-minute consultation",
    icon: <Calendar className="w-5 h-5" />,
    badge: "Free",
  },
  {
    id: "email-quote",
    label: "Get a quote via email",
    description: "Detailed proposal and pricing",
    icon: <Mail className="w-5 h-5" />,
    badge: "Custom",
  },
]

export function ExpertContactModal({
  isOpen,
  onClose,
  onSubmit,
  prefilledSolution,
  prefilledType,
}: ExpertContactModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<ExpertContactData>({
    helpType: prefilledType ? [prefilledType] : [],
    supportType: "",
    name: "",
    email: "",
    message: "",
    solutionContext: prefilledSolution,
  })
  const [showServiceTiers, setShowServiceTiers] = useState(false)
  const [showIntakeForm, setShowIntakeForm] = useState(false)
  const [showConsultationBooking, setShowConsultationBooking] = useState(false)
  const [showBookingSuccess, setShowBookingSuccess] = useState(false)
  const [selectedTier, setSelectedTier] = useState<any>(null)
  const [bookingData, setBookingData] = useState<any>(null)

  const handleHelpTypeToggle = (typeId: string) => {
    setFormData((prev) => ({
      ...prev,
      helpType: prev.helpType.includes(typeId) ? prev.helpType.filter((t) => t !== typeId) : [...prev.helpType, typeId],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Instead of just submitting, route to appropriate booking flow
    if (formData.supportType === "video-call") {
      setShowConsultationBooking(true)
      onClose()
    } else {
      setShowServiceTiers(true)
      onClose()
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
    // Process intake form data
    setBookingData({
      type: "service",
      serviceType: selectedTier?.name,
      clientName: intakeData.clientInfo.name,
      clientEmail: intakeData.clientInfo.email,
      solutionContext: prefilledSolution
        ? {
            name: prefilledSolution,
            type: prefilledType || "AI",
          }
        : undefined,
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
      solutionContext: prefilledSolution
        ? {
            name: prefilledSolution,
            type: prefilledType || "AI",
          }
        : undefined,
    })
    setShowBookingSuccess(true)
  }

  const canProceedToStep2 = formData.helpType.length > 0
  const canProceedToStep3 = formData.supportType !== ""
  const canSubmit = formData.name && formData.email

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span>Let's connect you with the right expert</span>
          </DialogTitle>
          <DialogDescription>
            {prefilledSolution
              ? `Get expert help with your ${prefilledSolution} solution`
              : "Tell us what you need help with and we'll match you with the perfect specialist"}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 py-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step > stepNumber ? <CheckCircle className="w-4 h-4" /> : stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-12 h-0.5 mx-2 ${step > stepNumber ? "bg-amber-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: What do you need help with? */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What do you need help with?</h3>
                <p className="text-gray-600 mb-6">Select all that apply</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {helpTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                      formData.helpType.includes(type.id)
                        ? "border-amber-400 bg-amber-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => handleHelpTypeToggle(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            formData.helpType.includes(type.id)
                              ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {type.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{type.label}</h4>
                          <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                        </div>
                        {formData.helpType.includes(type.id) && <CheckCircle className="w-5 h-5 text-amber-600" />}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {prefilledSolution && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-sm font-medium text-blue-900">Solution context: {prefilledSolution}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Preferred support type */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">How would you like to connect?</h3>
                <p className="text-gray-600 mb-6">Choose your preferred way to get support</p>
              </div>

              <div className="space-y-4">
                {supportTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 hover:scale-[1.01] ${
                      formData.supportType === type.id
                        ? "border-amber-400 bg-amber-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => setFormData((prev) => ({ ...prev, supportType: type.id }))}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              formData.supportType === type.id
                                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {type.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{type.label}</h4>
                            <p className="text-sm text-gray-600">{type.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={type.badge === "Free" ? "default" : "outline"}
                            className={type.badge === "Free" ? "bg-green-100 text-green-800" : ""}
                          >
                            {type.badge}
                          </Badge>
                          {formData.supportType === type.id && <CheckCircle className="w-5 h-5 text-amber-600" />}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!canProceedToStep3}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact info */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your contact information</h3>
                <p className="text-gray-600 mb-6">We'll use this to get in touch with you</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Name *</label>
                  <Input
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email *</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Additional details (optional)</label>
                <Textarea
                  placeholder="Tell us more about your project, timeline, or specific requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  rows={4}
                />
              </div>

              {/* Summary */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Request Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Help needed:</span>
                      <span className="font-medium">
                        {formData.helpType.map((type) => helpTypes.find((h) => h.id === type)?.label).join(", ")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Contact method:</span>
                      <span className="font-medium">
                        {supportTypes.find((s) => s.id === formData.supportType)?.label}
                      </span>
                    </div>
                    {prefilledSolution && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Solution:</span>
                        <span className="font-medium">{prefilledSolution}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8"
                >
                  Request Support
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>

      {/* Service Booking Modals */}
      <ServiceTierSelector
        isOpen={showServiceTiers}
        onClose={() => setShowServiceTiers(false)}
        onSelectTier={handleTierSelection}
        solutionContext={
          prefilledSolution
            ? {
                name: prefilledSolution,
                type: prefilledType || "AI",
                complexity: "Intermediate",
              }
            : undefined
        }
      />

      <ProjectIntakeForm
        isOpen={showIntakeForm}
        onClose={() => setShowIntakeForm(false)}
        onSubmit={handleIntakeSubmission}
        serviceType={selectedTier?.name || ""}
        solutionContext={
          prefilledSolution
            ? {
                name: prefilledSolution,
                type: prefilledType || "AI",
                complexity: "Intermediate",
              }
            : undefined
        }
      />

      <ConsultationBooking
        isOpen={showConsultationBooking}
        onClose={() => setShowConsultationBooking(false)}
        onBook={handleConsultationBooking}
        solutionContext={
          prefilledSolution
            ? {
                name: prefilledSolution,
                type: prefilledType || "AI",
              }
            : undefined
        }
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
          // Navigate to dashboard - you can add this functionality
        }}
      />
    </Dialog>
  )
}
