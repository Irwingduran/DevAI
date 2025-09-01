"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle, Calendar, Sparkles } from "lucide-react"

interface FormData {
  fullName: string
  email: string
  businessType: string
  interests: string[]
  comments: string
  newsletterOptIn: boolean
  formOrigin: string
}

interface LeadCaptureFormProps {
  onSubmit?: (data: FormData) => Promise<void>
  onSuccess?: () => void
  className?: string
  variant?: "default" | "modal"
  formOrigin?: string
}

const BUSINESS_TYPES = [
  { value: "services", label: "Services" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "creative", label: "Creative" },
  { value: "other", label: "Other" },
]

const INTEREST_OPTIONS = [
  { id: "automate", label: "Automating my business" },
  { id: "sales", label: "Selling more" },
  { id: "insights", label: "Getting better data insights" },
  { id: "tools", label: "Exploring AI or Blockchain tools" },
  { id: "expert", label: "Hiring an expert" },
]

export function LeadCaptureForm({
  onSubmit,
  onSuccess,
  className = "",
  variant = "default",
  formOrigin = "LandingPage v1",
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    businessType: "",
    interests: [],
    comments: "",
    newsletterOptIn: false,
    formOrigin,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showCalendlyHint, setShowCalendlyHint] = useState(false)

  // Load saved form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("leadCaptureForm")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData({ ...parsed, formOrigin })
      } catch (error) {
        console.error("Error loading saved form data:", error)
      }
    }
  }, [formOrigin])

  // Save form data to localStorage on changes
  useEffect(() => {
    if (formData.fullName || formData.email || formData.businessType) {
      localStorage.setItem("leadCaptureForm", JSON.stringify(formData))
    }
  }, [formData])

  // Show Calendly hint when "Hiring an expert" is selected
  useEffect(() => {
    setShowCalendlyHint(formData.interests.includes("expert"))
  }, [formData.interests])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.businessType) {
      newErrors.businessType = "Please select your business type"
    }

    if (formData.interests.length === 0) {
      newErrors.interests = "Please select at least one interest"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Mock API call - replace with actual endpoint
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Default mock submission
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log("Form submitted:", formData)
      }

      setIsSuccess(true)
      localStorage.removeItem("leadCaptureForm") // Clear saved data on success

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setErrors({ submit: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleInterestChange = (interestId: string, checked: boolean) => {
    const newInterests = checked
      ? [...formData.interests, interestId]
      : formData.interests.filter((id) => id !== interestId)

    handleInputChange("interests", newInterests)
  }

  if (isSuccess) {
    return (
      <Card className={`w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg ${className}`}>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank you!</h3>
          <p className="text-gray-600 mb-6">We'll get in touch shortly with your personalized plan.</p>
          {showCalendlyHint && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Want to talk sooner?</span>
              </div>
              <p className="text-sm text-blue-600">
                Since you're interested in hiring an expert, you can also schedule a call directly.
              </p>
              <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700 text-white">
                Schedule a Call
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg ${className}`}>
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Smart Solution</h3>
          <p className="text-gray-600">Tell us about your business and we'll create a personalized plan</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Full Name *
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={`rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                errors.fullName ? "border-red-500" : ""
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Business Type */}
          <div className="space-y-2">
            <Label htmlFor="businessType" className="text-sm font-medium text-gray-700">
              Business Type *
            </Label>
            <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
              <SelectTrigger
                className={`rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.businessType ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select your business type" />
              </SelectTrigger>
              <SelectContent>
                {BUSINESS_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.businessType && <p className="text-sm text-red-600">{errors.businessType}</p>}
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">What are you most interested in? *</Label>
            <div className="space-y-3">
              {INTEREST_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={formData.interests.includes(option.id)}
                    onCheckedChange={(checked) => handleInterestChange(option.id, checked as boolean)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={option.id} className="text-sm text-gray-700 cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.interests && <p className="text-sm text-red-600">{errors.interests}</p>}
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments" className="text-sm font-medium text-gray-700">
              Comments or Questions (Optional)
            </Label>
            <Textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => handleInputChange("comments", e.target.value)}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[80px] resize-none"
              placeholder="Tell us more about your specific needs..."
            />
          </div>

          {/* Newsletter Opt-in */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="newsletter"
              checked={formData.newsletterOptIn}
              onCheckedChange={(checked) => handleInputChange("newsletterOptIn", checked as boolean)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="newsletter" className="text-sm text-gray-700 cursor-pointer">
              I want to receive tips & free tools
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Get My Smart Solution"
            )}
          </Button>

          {errors.submit && <p className="text-sm text-red-600 text-center">{errors.submit}</p>}

          {/* Calendly Hint */}
          {showCalendlyHint && !isSubmitting && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Prefer to talk directly?</span>
              </div>
              <p className="text-xs text-blue-600 mb-3">
                Since you're interested in hiring an expert, you can also schedule a consultation call.
              </p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
              >
                Schedule a Call
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
