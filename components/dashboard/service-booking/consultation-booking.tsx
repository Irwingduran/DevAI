"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock, Video, Phone, MapPin, CheckCircle, ArrowRight } from "lucide-react"

interface ConsultationBookingProps {
  isOpen: boolean
  onClose: () => void
  onBook: (bookingData: ConsultationBookingData) => void
  solutionContext?: {
    name: string
    type: string
  }
}

interface ConsultationBookingData {
  consultationDetails: {
    type: string
    duration: string
    preferredDate: Date
    preferredTime: string
    meetingType: string
    timezone: string
  }
  clientInfo: {
    name: string
    email: string
    phone: string
    company: string
    role: string
  }
  projectInfo: {
    description: string
    urgency: string
    budget: string
    goals: string
    challenges: string
  }
}

const consultationTypes = [
  {
    id: "strategy",
    name: "Strategy Consultation",
    duration: "60 minutes",
    description: "High-level strategy and roadmap planning",
    price: 0,
    features: ["Business analysis", "Technology recommendations", "Implementation roadmap", "ROI projections"],
  },
  {
    id: "technical",
    name: "Technical Deep Dive",
    duration: "90 minutes",
    description: "Detailed technical architecture and implementation planning",
    price: 0,
    features: ["Technical architecture", "Integration planning", "Security assessment", "Performance optimization"],
  },
  {
    id: "implementation",
    name: "Implementation Planning",
    duration: "45 minutes",
    description: "Project planning and resource allocation discussion",
    price: 0,
    features: ["Project timeline", "Resource requirements", "Risk assessment", "Success metrics"],
  },
]

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
]

export function ConsultationBooking({ isOpen, onClose, onBook, solutionContext }: ConsultationBookingProps) {
  const [step, setStep] = useState(1)
  const [selectedConsultationType, setSelectedConsultationType] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [formData, setFormData] = useState<ConsultationBookingData>({
    consultationDetails: {
      type: "",
      duration: "",
      preferredDate: new Date(),
      preferredTime: "",
      meetingType: "video",
      timezone: "EST",
    },
    clientInfo: {
      name: "",
      email: "",
      phone: "",
      company: "",
      role: "",
    },
    projectInfo: {
      description: solutionContext ? `Interested in ${solutionContext.name} (${solutionContext.type}) solution` : "",
      urgency: "",
      budget: "",
      goals: "",
      challenges: "",
    },
  })

  const updateFormData = (section: keyof ConsultationBookingData, updates: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...updates },
    }))
  }

  const handleConsultationTypeSelect = (typeId: string) => {
    const consultationType = consultationTypes.find((t) => t.id === typeId)
    if (consultationType) {
      setSelectedConsultationType(typeId)
      updateFormData("consultationDetails", {
        type: typeId,
        duration: consultationType.duration,
      })
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      updateFormData("consultationDetails", { preferredDate: date })
    }
  }

  const handleSubmit = () => {
    onBook(formData)
  }

  const canProceedToStep2 = selectedConsultationType && selectedDate && formData.consultationDetails.preferredTime
  const canProceedToStep3 = formData.clientInfo.name && formData.clientInfo.email
  const canSubmit = formData.projectInfo.description

  const selectedType = consultationTypes.find((t) => t.id === selectedConsultationType)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Book Your Free Consultation</DialogTitle>
          {solutionContext && (
            <div className="text-center mt-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-800">
                {solutionContext.name} • {solutionContext.type}
              </Badge>
            </div>
          )}
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 py-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step > stepNumber ? <CheckCircle className="w-4 h-4" /> : stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-12 h-0.5 mx-2 ${step > stepNumber ? "bg-blue-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* Step 1: Consultation Type & Scheduling */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">Choose Your Consultation</h3>
                <p className="text-gray-600 mt-2">Select the type of consultation that best fits your needs</p>
              </div>

              {/* Consultation Types */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {consultationTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] border-2 ${
                      selectedConsultationType === type.id
                        ? "border-blue-400 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => handleConsultationTypeSelect(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{type.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium">{type.duration}</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Free</Badge>
                        </div>

                        <div className="space-y-1 text-xs text-left">
                          {type.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedType && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-blue-900 mb-4">Schedule Your {selectedType.name}</h4>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Date Selection */}
                      <div className="space-y-4">
                        <Label>Select Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start text-left font-normal ${
                                !selectedDate && "text-muted-foreground"
                              }`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        {/* Meeting Type */}
                        <div className="space-y-2">
                          <Label>Meeting Type</Label>
                          <Select
                            value={formData.consultationDetails.meetingType}
                            onValueChange={(value) => updateFormData("consultationDetails", { meetingType: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="video">
                                <div className="flex items-center">
                                  <Video className="w-4 h-4 mr-2" />
                                  Video Call (Zoom)
                                </div>
                              </SelectItem>
                              <SelectItem value="phone">
                                <div className="flex items-center">
                                  <Phone className="w-4 h-4 mr-2" />
                                  Phone Call
                                </div>
                              </SelectItem>
                              <SelectItem value="in-person">
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-2" />
                                  In-Person (NYC Office)
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Time Selection */}
                      <div className="space-y-4">
                        <Label>Available Times (EST)</Label>
                        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={formData.consultationDetails.preferredTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => updateFormData("consultationDetails", { preferredTime: time })}
                              className={`text-xs ${
                                formData.consultationDetails.preferredTime === time
                                  ? "bg-blue-600 text-white"
                                  : "bg-white hover:bg-blue-50"
                              }`}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>

                        {/* Timezone */}
                        <div className="space-y-2">
                          <Label>Your Timezone</Label>
                          <Select
                            value={formData.consultationDetails.timezone}
                            onValueChange={(value) => updateFormData("consultationDetails", { timezone: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="EST">Eastern (EST/EDT)</SelectItem>
                              <SelectItem value="CST">Central (CST/CDT)</SelectItem>
                              <SelectItem value="MST">Mountain (MST/MDT)</SelectItem>
                              <SelectItem value="PST">Pacific (PST/PDT)</SelectItem>
                              <SelectItem value="UTC">UTC</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">Your Information</h3>
                <p className="text-gray-600 mt-2">Help us prepare for your consultation</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.clientInfo.name}
                    onChange={(e) => updateFormData("clientInfo", { name: e.target.value })}
                    placeholder="John Smith"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.clientInfo.email}
                    onChange={(e) => updateFormData("clientInfo", { email: e.target.value })}
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.clientInfo.phone}
                    onChange={(e) => updateFormData("clientInfo", { phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.clientInfo.company}
                    onChange={(e) => updateFormData("clientInfo", { company: e.target.value })}
                    placeholder="Acme Corporation"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    value={formData.clientInfo.role}
                    onChange={(e) => updateFormData("clientInfo", { role: e.target.value })}
                    placeholder="CEO, CTO, etc."
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!canProceedToStep3}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Project Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">Project Details</h3>
                <p className="text-gray-600 mt-2">Tell us about your project so we can prepare</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.projectInfo.description}
                    onChange={(e) => updateFormData("projectInfo", { description: e.target.value })}
                    placeholder="Describe your project, goals, and what you're looking to achieve..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Project Urgency</Label>
                    <Select
                      value={formData.projectInfo.urgency}
                      onValueChange={(value) => updateFormData("projectInfo", { urgency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP - Need to start immediately</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="2-3-months">2-3 months</SelectItem>
                        <SelectItem value="flexible">Flexible timeline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select
                      value={formData.projectInfo.budget}
                      onValueChange={(value) => updateFormData("projectInfo", { budget: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-10k">Under $10,000</SelectItem>
                        <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                        <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                        <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                        <SelectItem value="100k-plus">$100,000+</SelectItem>
                        <SelectItem value="not-sure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Primary Goals</Label>
                  <Textarea
                    id="goals"
                    value={formData.projectInfo.goals}
                    onChange={(e) => updateFormData("projectInfo", { goals: e.target.value })}
                    placeholder="What are your main objectives? What success looks like?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges">Current Challenges</Label>
                  <Textarea
                    id="challenges"
                    value={formData.projectInfo.challenges}
                    onChange={(e) => updateFormData("projectInfo", { challenges: e.target.value })}
                    placeholder="What challenges are you facing? What's not working currently?"
                    rows={3}
                  />
                </div>
              </div>

              {/* Booking Summary */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-green-900 mb-4">Consultation Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium text-gray-900">{selectedType?.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium text-gray-900">{selectedType?.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium text-gray-900">
                          {selectedDate ? format(selectedDate, "PPP") : "Not selected"}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium text-gray-900">
                          {formData.consultationDetails.preferredTime} {formData.consultationDetails.timezone}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Meeting:</span>
                        <span className="font-medium text-gray-900 capitalize">
                          {formData.consultationDetails.meetingType.replace("-", " ")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Cost:</span>
                        <span className="font-medium text-green-600">Free</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
