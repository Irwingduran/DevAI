"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Upload, Mic, FileText, ImageIcon, Pause } from "lucide-react"
import { StepProps } from "@/types/onboarding"

export function ProcessMappingStep({ userData, onDataChange, onNext }: StepProps) {
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const canProceed = userData.processDescription.length > 50

  type UploadKind = "document" | "image" | "pdf"
  const handleFileUpload = (type: UploadKind) => {
    const input = fileInputRef.current
    if (!input) return
    // Dynamically set accepted file types based on selection
    switch (type) {
      case "document":
        input.accept = ".pdf,.doc,.docx,.txt,.md,.rtf,.csv"
        break
      case "image":
        input.accept = ".png,.jpg,.jpeg,.gif,.webp"
        break
      case "pdf":
        input.accept = ".pdf"
        break
      default:
        input.accept = ""
    }
    // Reset the value so selecting the same file twice still triggers change
    input.value = ""
    input.click()
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Tell me about how your business works</h2>
        <p className="text-base sm:text-lg text-gray-600">From receiving a client to delivering a service...</p>
      </div>

      <div className="flex-1 flex flex-col">
        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl flex-1">
          <CardContent className="p-4 sm:p-6 space-y-4 h-full flex flex-col">
          <div className="flex-1 flex flex-col space-y-4">
            <Textarea
              placeholder="Describe your typical business process... For example: 'A client contacts us via email, we schedule a consultation, create a proposal, get approval, then deliver the service and send an invoice.'"
              value={userData.processDescription}
              onChange={(e) => onDataChange({ processDescription: e.target.value })}
              className="flex-1 bg-white/50 border-white/30 text-base resize-none"
            />

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>This helps me understand what to automate or improve</span>
              <span>{userData.processDescription.length} characters</span>
            </div>
          </div>

          <div className="border-t border-white/30 pt-6">
            <p className="text-lg font-semibold text-gray-800 mb-4">Or upload additional context:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center space-y-2 h-auto py-4 bg-white/50 border-white/30 hover:bg-white/70"
                onClick={() => setIsRecording(!isRecording)}
              >
                {isRecording ? <Pause className="w-6 h-6 text-red-500" /> : <Mic className="w-6 h-6" />}
                <span className="text-sm">{isRecording ? "Stop" : "Voice"}</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center space-y-2 h-auto py-4 bg-white/50 border-white/30 hover:bg-white/70"
                onClick={() => handleFileUpload('document')}
              >
                <FileText className="w-6 h-6" />
                <span className="text-sm">Document</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center space-y-2 h-auto py-4 bg-white/50 border-white/30 hover:bg-white/70"
                onClick={() => handleFileUpload('image')}
              >
                <ImageIcon className="w-6 h-6" />
                <span className="text-sm">Image</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center space-y-2 h-auto py-4 bg-white/50 border-white/30 hover:bg-white/70"
                onClick={() => handleFileUpload('pdf')}
              >
                <Upload className="w-6 h-6" />
                <span className="text-sm">PDF</span>
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                // Handle file upload
                console.log('File selected:', e.target.files?.[0])
              }}
            />
          </div>
        </CardContent>
      </Card>
      </div>

      {canProceed && (
        <div className="text-center pt-4">
          <Button
            size="lg"
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-xl"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>
        </div>
      )}
    </div>
  )
}