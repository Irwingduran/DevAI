"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, Clock, Video, Phone, MapPin, Mail, ArrowRight, User } from "lucide-react"

interface BookingSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  bookingData: {
    type: "consultation" | "service"
    consultationType?: string
    serviceType?: string
    date?: string
    time?: string
    duration?: string
    clientName: string
    clientEmail: string
    solutionContext?: {
      name: string
      type: string
    }
  }
  onScheduleAnother: () => void
  onViewDashboard: () => void
}

export function BookingSuccessModal({
  isOpen,
  onClose,
  bookingData,
  onScheduleAnother,
  onViewDashboard,
}: BookingSuccessModalProps) {
  const isConsultation = bookingData.type === "consultation"

  const getMeetingIcon = (meetingType?: string) => {
    switch (meetingType) {
      case "video":
        return <Video className="w-4 h-4" />
      case "phone":
        return <Phone className="w-4 h-4" />
      case "in-person":
        return <MapPin className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const handleAddToCalendar = () => {
    if (isConsultation && bookingData.date && bookingData.time) {
      // Generate calendar event
      const startDate = new Date(`${bookingData.date} ${bookingData.time}`)
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour later

      const event = {
        title: `${bookingData.consultationType} - Free Consultation`,
        start: startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
        end: endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
        description: `Free consultation call with our team about your ${bookingData.solutionContext?.name || "project"}.`,
      }

      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}`
      window.open(calendarUrl, "_blank")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl text-green-900">
            {isConsultation ? "Consultation Booked!" : "Service Request Submitted!"}
          </DialogTitle>
          <p className="text-gray-600 mt-2">
            {isConsultation
              ? "Your free consultation has been successfully scheduled."
              : "Your service request has been submitted and we'll be in touch soon."}
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-8">
          {/* Booking Details */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-900">
                  {isConsultation ? "Consultation Details" : "Service Request Details"}
                </h3>
                <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
              </div>

              <div className="space-y-4">
                {isConsultation ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-semibold text-green-900 capitalize">
                            {bookingData.consultationType?.replace("-", " ")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-semibold text-green-900">{bookingData.date}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-semibold text-green-900">{bookingData.time}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-semibold text-green-900">{bookingData.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Meeting:</span>
                          <div className="flex items-center space-x-1">
                            {getMeetingIcon("video")}
                            <span className="font-semibold text-green-900">Video Call</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Cost:</span>
                          <span className="font-semibold text-green-600">Free</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Service Type:</span>
                      <span className="font-semibold text-green-900">{bookingData.serviceType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Request ID:</span>
                      <span className="font-mono text-xs text-gray-800">
                        REQ-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}

                {bookingData.solutionContext && (
                  <div className="pt-3 border-t border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Solution Context:</span>
                      <Badge variant="outline" className="bg-white">
                        {bookingData.solutionContext.name} • {bookingData.solutionContext.type}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{bookingData.clientName}</p>
                    <p className="text-sm text-gray-600">{bookingData.clientEmail}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What Happens Next?</h3>
              <div className="space-y-4">
                {isConsultation ? (
                  <>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Confirmation Email</p>
                        <p className="text-sm text-gray-600">
                          You'll receive a confirmation email with calendar invite and meeting details within 5 minutes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Preparation Materials</p>
                        <p className="text-sm text-gray-600">
                          We'll send you a brief questionnaire to help us prepare for your consultation.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Consultation Call</p>
                        <p className="text-sm text-gray-600">
                          Join the video call at your scheduled time. We'll discuss your project and provide
                          recommendations.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        4
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Follow-up & Proposal</p>
                        <p className="text-sm text-gray-600">
                          After the call, we'll send you a detailed proposal with recommendations and next steps.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Request Review</p>
                        <p className="text-sm text-gray-600">
                          Our team will review your service request and requirements within 24 hours.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Initial Consultation</p>
                        <p className="text-sm text-gray-600">
                          We'll schedule a brief call to discuss your project details and answer any questions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Proposal & Timeline</p>
                        <p className="text-sm text-gray-600">
                          You'll receive a detailed proposal with timeline, deliverables, and pricing.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isConsultation && (
              <Button onClick={handleAddToCalendar} variant="outline" className="bg-white">
                <Calendar className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>
            )}

            <Button onClick={onScheduleAnother} variant="outline" className="bg-white">
              <Clock className="w-4 h-4 mr-2" />
              {isConsultation ? "Schedule Another" : "New Request"}
            </Button>

            <Button
              onClick={() => {
                window.open("mailto:support@yourcompany.com", "_blank")
              }}
              variant="outline"
              className="bg-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>

          {/* Main Action */}
          <div className="text-center pt-4">
            <Button
              onClick={onViewDashboard}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Support Notice */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600">
                Need to reschedule or have questions?{" "}
                <a href="mailto:support@yourcompany.com" className="text-blue-600 hover:underline font-medium">
                  Contact our team
                </a>{" "}
                or call{" "}
                <a href="tel:+1-555-123-4567" className="text-blue-600 hover:underline font-medium">
                  (555) 123-4567
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
