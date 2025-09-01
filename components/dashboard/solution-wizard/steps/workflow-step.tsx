"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Mic, ImageIcon, Pause } from "lucide-react"
import type { WizardData } from "../solution-wizard"

interface WorkflowStepProps {
  data: WizardData
  onUpdate: (updates: Partial<WizardData>) => void
}

export function WorkflowStep({ data, onUpdate }: WorkflowStepProps) {
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    onUpdate({ uploadedFiles: [...data.uploadedFiles, ...files] })
  }

  const removeFile = (index: number) => {
    const newFiles = data.uploadedFiles.filter((_, i) => i !== index)
    onUpdate({ uploadedFiles: newFiles })
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real implementation, you'd handle voice recording here
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Describe a typical workflow</h3>
          <p className="text-gray-600 mt-2">Help us understand your process from start to finish</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Main Textarea */}
        <div className="space-y-4">
          <label className="text-lg font-semibold text-gray-800">Walk us through your typical business process</label>
          <Textarea
            placeholder="For example: 'A client contacts us via email, we schedule a consultation call, create a proposal, get approval, then deliver the service and send an invoice. The whole process usually takes 2-3 weeks...'"
            value={data.workflowDescription}
            onChange={(e) => onUpdate({ workflowDescription: e.target.value })}
            className="min-h-32 text-base leading-relaxed resize-none"
            rows={6}
          />
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>This helps us generate better automation ideas</span>
            <span>{data.workflowDescription.length} characters</span>
          </div>
        </div>

        {/* Upload Options */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-6 space-y-4">
            <h4 className="font-semibold text-gray-900">Optional: Add more context</h4>
            <p className="text-sm text-gray-600">
              Upload documents, screenshots, or record a voice note to provide additional details
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Document Upload */}
              <Button
                variant="outline"
                className="flex flex-col items-center space-y-2 h-auto py-4 bg-white hover:bg-gray-50"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileText className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium">Document</span>
                <span className="text-xs text-gray-500">PDF, DOC</span>
              </Button>

              {/* Image Upload */}
              <Button
                variant="outline"
                className="flex flex-col items-center space-y-2 h-auto py-4 bg-white hover:bg-gray-50"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium">Screenshot</span>
                <span className="text-xs text-gray-500">PNG, JPG</span>
              </Button>

              {/* Voice Recording */}
              <Button
                variant="outline"
                className={`flex flex-col items-center space-y-2 h-auto py-4 ${
                  isRecording ? "bg-red-50 border-red-200" : "bg-white hover:bg-gray-50"
                }`}
                onClick={toggleRecording}
              >
                {isRecording ? <Pause className="w-6 h-6 text-red-600" /> : <Mic className="w-6 h-6 text-purple-600" />}
                <span className="text-sm font-medium">{isRecording ? "Stop" : "Voice Note"}</span>
                <span className="text-xs text-gray-500">Record audio</span>
              </Button>

              {/* General Upload */}
              <Button
                variant="outline"
                className="flex flex-col items-center space-y-2 h-auto py-4 bg-white hover:bg-gray-50"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-6 h-6 text-orange-600" />
                <span className="text-sm font-medium">Other File</span>
                <span className="text-xs text-gray-500">Any format</span>
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
              multiple
              onChange={handleFileUpload}
            />
          </CardContent>
        </Card>

        {/* Uploaded Files */}
        {data.uploadedFiles.length > 0 && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-900 mb-3">Uploaded Files</h4>
              <div className="space-y-2">
                {data.uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <Card className="bg-red-50 border-red-200 animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <span className="text-red-900 font-medium">Recording in progress...</span>
                <span className="text-red-700 text-sm">Speak clearly about your workflow</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
