"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Upload, CheckCircle } from "lucide-react"

interface ProjectIntakeData {
  // Client Information
  clientInfo: {
    name: string
    email: string
    company: string
    role: string
    phone: string
    timezone: string
  }

  // Project Details
  projectDetails: {
    title: string
    description: string
    goals: string[]
    successMetrics: string
    timeline: string
    budget: string
    priority: string
  }

  // Technical Requirements
  technical: {
    currentSystems: string[]
    integrations: string[]
    dataVolume: string
    securityRequirements: string[]
    complianceNeeds: string[]
    technicalConstraints: string
  }

  // Team & Resources
  teamResources: {
    teamSize: string
    technicalExpertise: string
    dedicatedTime: string
    projectManager: boolean
    communicationPreference: string
    meetingFrequency: string
  }

  // Additional Information
  additional: {
    inspiration: string
    concerns: string
    questions: string
    attachments: File[]
    referralSource: string
    previousExperience: string
  }
}

interface ProjectIntakeFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProjectIntakeData) => void
  serviceType: string
  solutionContext?: {
    name: string
    type: string
    complexity: string
  }
}

const TOTAL_STEPS = 5

export function ProjectIntakeForm({ isOpen, onClose, onSubmit, serviceType, solutionContext }: ProjectIntakeFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ProjectIntakeData>({
    clientInfo: {
      name: "",
      email: "",
      company: "",
      role: "",
      phone: "",
      timezone: "",
    },
    projectDetails: {
      title: solutionContext?.name || "",
      description: "",
      goals: [],
      successMetrics: "",
      timeline: "",
      budget: "",
      priority: "",
    },
    technical: {
      currentSystems: [],
      integrations: [],
      dataVolume: "",
      securityRequirements: [],
      complianceNeeds: [],
      technicalConstraints: "",
    },
    teamResources: {
      teamSize: "",
      technicalExpertise: "",
      dedicatedTime: "",
      projectManager: false,
      communicationPreference: "",
      meetingFrequency: "",
    },
    additional: {
      inspiration: "",
      concerns: "",
      questions: "",
      attachments: [],
      referralSource: "",
      previousExperience: "",
    },
  })

  const progress = (currentStep / TOTAL_STEPS) * 100

  const updateFormData = (section: keyof ProjectIntakeData, updates: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...updates },
    }))
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.clientInfo.name && formData.clientInfo.email && formData.clientInfo.company
      case 2:
        return (
          formData.projectDetails.title &&
          formData.projectDetails.description &&
          formData.projectDetails.goals.length > 0
        )
      case 3:
        return formData.technical.dataVolume && formData.technical.currentSystems.length > 0
      case 4:
        return formData.teamResources.teamSize && formData.teamResources.technicalExpertise
      case 5:
        return true
      default:
        return false
    }
  }

  const handleGoalToggle = (goal: string, checked: boolean) => {
    const currentGoals = formData.projectDetails.goals
    const updatedGoals = checked ? [...currentGoals, goal] : currentGoals.filter((g) => g !== goal)

    updateFormData("projectDetails", { goals: updatedGoals })
  }

  const handleSystemToggle = (system: string, checked: boolean) => {
    const currentSystems = formData.technical.currentSystems
    const updatedSystems = checked ? [...currentSystems, system] : currentSystems.filter((s) => s !== system)

    updateFormData("technical", { currentSystems: updatedSystems })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Let's get to know you</h3>
              <p className="text-gray-600">Tell us about yourself and your company</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.clientInfo.name}
                  onChange={(e) => updateFormData("clientInfo", { name: e.target.value })}
                  placeholder="John Smith"
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
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
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={formData.clientInfo.timezone}
                  onValueChange={(value) => updateFormData("clientInfo", { timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
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
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Project Details</h3>
              <p className="text-gray-600">Help us understand your project requirements</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.projectDetails.title}
                  onChange={(e) => updateFormData("projectDetails", { title: e.target.value })}
                  placeholder="AI Customer Support System"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  value={formData.projectDetails.description}
                  onChange={(e) => updateFormData("projectDetails", { description: e.target.value })}
                  placeholder="Describe your project in detail. What problem are you trying to solve? What should the final solution accomplish?"
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label>Project Goals * (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Automate repetitive tasks",
                    "Improve customer experience",
                    "Increase operational efficiency",
                    "Generate new revenue streams",
                    "Reduce costs",
                    "Enhance data security",
                    "Scale business operations",
                    "Improve decision making",
                    "Competitive advantage",
                    "Compliance requirements",
                  ].map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        id={goal}
                        checked={formData.projectDetails.goals.includes(goal)}
                        onCheckedChange={(checked) => handleGoalToggle(goal, checked as boolean)}
                      />
                      <Label htmlFor={goal} className="text-sm cursor-pointer">
                        {goal}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timeline">Desired Timeline</Label>
                  <Select
                    value={formData.projectDetails.timeline}
                    onValueChange={(value) => updateFormData("projectDetails", { timeline: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP (Rush project)</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="2-3-months">2-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="6-months-plus">6+ months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select
                    value={formData.projectDetails.budget}
                    onValueChange={(value) => updateFormData("projectDetails", { budget: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-5k">Under $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100k-plus">$100,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metrics">Success Metrics</Label>
                <Textarea
                  id="metrics"
                  value={formData.projectDetails.successMetrics}
                  onChange={(e) => updateFormData("projectDetails", { successMetrics: e.target.value })}
                  placeholder="How will you measure the success of this project? (e.g., 50% reduction in response time, 30% increase in conversion rate)"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Technical Requirements</h3>
              <p className="text-gray-600">Tell us about your current systems and technical needs</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Current Systems (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "CRM (Salesforce, HubSpot, etc.)",
                    "E-commerce platform",
                    "Custom web application",
                    "Mobile app",
                    "Database system",
                    "Analytics tools",
                    "Marketing automation",
                    "ERP system",
                    "Other business software",
                    "No existing systems",
                  ].map((system) => (
                    <div key={system} className="flex items-center space-x-2">
                      <Checkbox
                        id={system}
                        checked={formData.technical.currentSystems.includes(system)}
                        onCheckedChange={(checked) => handleSystemToggle(system, checked as boolean)}
                      />
                      <Label htmlFor={system} className="text-sm cursor-pointer">
                        {system}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="integrations">Required Integrations</Label>
                <Textarea
                  id="integrations"
                  value={formData.technical.integrations.join(", ")}
                  onChange={(e) =>
                    updateFormData("technical", { integrations: e.target.value.split(", ").filter((i) => i) })
                  }
                  placeholder="List any specific tools, APIs, or systems that need to be integrated (e.g., Stripe, Google Analytics, Slack)"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dataVolume">Expected Data Volume</Label>
                  <Select
                    value={formData.technical.dataVolume}
                    onValueChange={(value) => updateFormData("technical", { dataVolume: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select data volume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (less than 1GB)</SelectItem>
                      <SelectItem value="medium">Medium (1GB to 100GB)</SelectItem>
                      <SelectItem value="large">Large (100GB to 1TB)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (1TB+)</SelectItem>
                      <SelectItem value="unknown">Not sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="security">Security Requirements</Label>
                  <Select
                    value={formData.technical.securityRequirements[0] || ""}
                    onValueChange={(value) => updateFormData("technical", { securityRequirements: [value] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Security level needed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard security</SelectItem>
                      <SelectItem value="enhanced">Enhanced security</SelectItem>
                      <SelectItem value="enterprise">Enterprise-grade</SelectItem>
                      <SelectItem value="compliance">Compliance required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="constraints">Technical Constraints</Label>
                <Textarea
                  id="constraints"
                  value={formData.technical.technicalConstraints}
                  onChange={(e) => updateFormData("technical", { technicalConstraints: e.target.value })}
                  placeholder="Any specific technical constraints, preferences, or requirements we should know about?"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Team & Resources</h3>
              <p className="text-gray-600">Help us understand your team and availability</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Select
                    value={formData.teamResources.teamSize}
                    onValueChange={(value) => updateFormData("teamResources", { teamSize: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="just-me">Just me</SelectItem>
                      <SelectItem value="2-5">2-5 people</SelectItem>
                      <SelectItem value="6-15">6-15 people</SelectItem>
                      <SelectItem value="16-50">16-50 people</SelectItem>
                      <SelectItem value="50-plus">50+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expertise">Technical Expertise Level</Label>
                  <Select
                    value={formData.teamResources.technicalExpertise}
                    onValueChange={(value) => updateFormData("teamResources", { technicalExpertise: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select expertise level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No technical background</SelectItem>
                      <SelectItem value="basic">Basic technical knowledge</SelectItem>
                      <SelectItem value="intermediate">Some technical experience</SelectItem>
                      <SelectItem value="advanced">Strong technical team</SelectItem>
                      <SelectItem value="expert">Expert development team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time Availability</Label>
                  <Select
                    value={formData.teamResources.dedicatedTime}
                    onValueChange={(value) => updateFormData("teamResources", { dedicatedTime: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Time you can dedicate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal (few hours/week)</SelectItem>
                      <SelectItem value="part-time">Part-time (10-20 hours/week)</SelectItem>
                      <SelectItem value="significant">Significant (20-30 hours/week)</SelectItem>
                      <SelectItem value="full-time">Full-time dedication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communication">Communication Preference</Label>
                  <Select
                    value={formData.teamResources.communicationPreference}
                    onValueChange={(value) => updateFormData("teamResources", { communicationPreference: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Preferred communication" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email updates</SelectItem>
                      <SelectItem value="calls">Regular calls</SelectItem>
                      <SelectItem value="slack">Slack/messaging</SelectItem>
                      <SelectItem value="project-tool">Project management tool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="projectManager"
                  checked={formData.teamResources.projectManager}
                  onCheckedChange={(checked) => updateFormData("teamResources", { projectManager: checked as boolean })}
                />
                <Label htmlFor="projectManager" className="cursor-pointer">
                  We have a dedicated project manager for this initiative
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingFreq">Preferred Meeting Frequency</Label>
                <Select
                  value={formData.teamResources.meetingFrequency}
                  onValueChange={(value) => updateFormData("teamResources", { meetingFrequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Meeting frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily standups</SelectItem>
                    <SelectItem value="weekly">Weekly check-ins</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly meetings</SelectItem>
                    <SelectItem value="monthly">Monthly reviews</SelectItem>
                    <SelectItem value="as-needed">As needed only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Additional Information</h3>
              <p className="text-gray-600">Final details to help us serve you better</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="inspiration">Inspiration & Examples</Label>
                <Textarea
                  id="inspiration"
                  value={formData.additional.inspiration}
                  onChange={(e) => updateFormData("additional", { inspiration: e.target.value })}
                  placeholder="Any examples, competitors, or existing solutions that inspire this project?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="concerns">Concerns & Challenges</Label>
                <Textarea
                  id="concerns"
                  value={formData.additional.concerns}
                  onChange={(e) => updateFormData("additional", { concerns: e.target.value })}
                  placeholder="What concerns or potential challenges do you foresee with this project?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="questions">Questions for Our Team</Label>
                <Textarea
                  id="questions"
                  value={formData.additional.questions}
                  onChange={(e) => updateFormData("additional", { questions: e.target.value })}
                  placeholder="Any specific questions you'd like to discuss with our team?"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="referral">How did you find us?</Label>
                  <Select
                    value={formData.additional.referralSource}
                    onValueChange={(value) => updateFormData("additional", { referralSource: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Referral source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google search</SelectItem>
                      <SelectItem value="social-media">Social media</SelectItem>
                      <SelectItem value="referral">Referral from colleague</SelectItem>
                      <SelectItem value="content">Blog/content</SelectItem>
                      <SelectItem value="event">Event/conference</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Previous AI/Blockchain Experience</Label>
                  <Select
                    value={formData.additional.previousExperience}
                    onValueChange={(value) => updateFormData("additional", { previousExperience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No previous experience</SelectItem>
                      <SelectItem value="some">Some experience</SelectItem>
                      <SelectItem value="moderate">Moderate experience</SelectItem>
                      <SelectItem value="extensive">Extensive experience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Upload className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Upload Supporting Documents (Optional)</h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Share any relevant documents, designs, specifications, or examples that might help us understand
                        your project better.
                      </p>
                      <Button variant="outline" className="bg-white border-blue-300 text-blue-700 hover:bg-blue-50">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Project Intake Form</DialogTitle>
          {solutionContext && (
            <div className="text-center mt-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-800">
                {solutionContext.name} • {serviceType}
              </Badge>
            </div>
          )}
        </DialogHeader>

        {/* Progress Bar */}
        <div className="px-2 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="py-6">{renderStep()}</div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="bg-transparent">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center space-x-3">
            {currentStep === TOTAL_STEPS ? (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8"
                disabled={!canProceed()}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Project
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
