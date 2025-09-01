"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, Mail, Clock, ArrowRight } from "lucide-react"

interface ExpertSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  supportType: string
  onBookInstantly?: () => void
}

export function ExpertSuccessModal({ isOpen, onClose, supportType, onBookInstantly }: ExpertSuccessModalProps) {
  const isVideoCall = supportType === "video-call"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl">Request Sent Successfully!</DialogTitle>
          <DialogDescription className="text-lg">We'll contact you shortly to get started.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                {isVideoCall ? (
                  <Calendar className="w-5 h-5 text-blue-600" />
                ) : (
                  <Mail className="w-5 h-5 text-purple-600" />
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    {isVideoCall ? "Video consultation requested" : "Quote request submitted"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isVideoCall
                      ? "We'll send you a calendar link within 2 hours"
                      : "You'll receive a detailed proposal within 24 hours"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{isVideoCall ? "Average response time: 2 hours" : "Average response time: 24 hours"}</span>
          </div>

          <div className="space-y-3">
            {isVideoCall && onBookInstantly && (
              <Button
                onClick={() => {
                  onBookInstantly()
                  onClose()
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Instantly (Calendly)
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}

            <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
              Back to Dashboard
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Questions? Email us at{" "}
              <a href="mailto:experts@futureflow.com" className="text-blue-600 hover:underline">
                experts@futureflow.com
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
