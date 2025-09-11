"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bot,
  Blocks,
  Sparkles,
  Wand2,
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Target,
  Lightbulb,
} from "lucide-react"

interface CreateSolutionModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateSolution: (solution: any) => void
  onOpenWizard: () => void
}

interface SolutionFormData {
  name: string
  description: string
  type: "AI" | "Blockchain" | "Hybrid" | ""
  complexity: "Beginner" | "Intermediate" | "Advanced" | ""
  estimatedTime: string
  benefits: string[]
  nextSteps: string[]
  tags: string[]
}

const solutionTemplates = [
  {
    id: "ai-chatbot",
    name: "AI Customer Support Chatbot",
    type: "AI" as const,
    complexity: "Intermediate" as const,
    description: "Automated customer service solution with natural language processing",
    estimatedTime: "2-3 weeks",
    benefits: [
      "24/7 customer support availability",
      "Reduced response time by 80%",
      "Cost savings on support staff",
      "Consistent service quality",
    ],
    nextSteps: [
      "Define conversation flows",
      "Train AI model with FAQs",
      "Integrate with existing systems",
      "Test and optimize responses",
    ],
    tags: ["AI", "Customer Service", "Automation", "NLP"],
    icon: <Bot className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "blockchain-supply",
    name: "Supply Chain Tracker",
    type: "Blockchain" as const,
    complexity: "Advanced" as const,
    description: "Transparent supply chain management with blockchain verification",
    estimatedTime: "4-6 weeks",
    benefits: [
      "Complete supply chain visibility",
      "Reduced fraud and counterfeiting",
      "Automated compliance reporting",
      "Enhanced customer trust",
    ],
    nextSteps: [
      "Design blockchain architecture",
      "Develop smart contracts",
      "Integrate with IoT sensors",
      "Deploy and test system",
    ],
    tags: ["Blockchain", "Supply Chain", "Transparency", "IoT"],
    icon: <Blocks className="w-6 h-6" />,
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "hybrid-analytics",
    name: "AI-Powered Analytics Platform",
    type: "Hybrid" as const,
    complexity: "Advanced" as const,
    description: "AI analytics with blockchain-verified data integrity",
    estimatedTime: "6-8 weeks",
    benefits: [
      "Real-time predictive insights",
      "Tamper-proof data records",
      "Automated report generation",
      "Enhanced decision making",
    ],
    nextSteps: [
      "Set up data pipelines",
      "Train ML models",
      "Implement blockchain verification",
      "Create dashboard interface",
    ],
    tags: ["Hybrid", "Analytics", "AI", "Blockchain"],
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-600",
  },
]

export function CreateSolutionModal({ isOpen, onClose, onCreateSolution, onOpenWizard }: CreateSolutionModalProps) {
  const [step, setStep] = useState(1)
  const [creationMethod, setCreationMethod] = useState<"manual" | "template" | "wizard" | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [formData, setFormData] = useState<SolutionFormData>({
    name: "",
    description: "",
    type: "",
    complexity: "",
    estimatedTime: "",
    benefits: [],
    nextSteps: [],
    tags: [],
  })

  const resetModal = () => {
    setStep(1)
    setCreationMethod(null)
    setSelectedTemplate(null)
    setFormData({
      name: "",
      description: "",
      type: "",
      complexity: "",
      estimatedTime: "",
      benefits: [],
      nextSteps: [],
      tags: [],
    })
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  const handleMethodSelect = (method: "manual" | "template" | "wizard") => {
    setCreationMethod(method)
    if (method === "wizard") {
      handleClose()
      onOpenWizard()
      return
    }
    setStep(2)
  }

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template)
    setFormData({
      name: template.name,
      description: template.description,
      type: template.type,
      complexity: template.complexity,
      estimatedTime: template.estimatedTime,
      benefits: template.benefits,
      nextSteps: template.nextSteps,
      tags: template.tags,
    })
    setStep(3)
  }

  const handleInputChange = (field: keyof SolutionFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayInputChange = (field: "benefits" | "nextSteps" | "tags", value: string) => {
    const items = value.split("\n").filter((item) => item.trim() !== "")
    setFormData((prev) => ({ ...prev, [field]: items }))
  }

  const handleSubmit = () => {
    const newSolution = {
      id: Date.now().toString(),
      ...formData,
      status: "planning" as const,
      progress: 0,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      timeSaved: "0 hrs/week",
      automationLevel: 0,
      resources: [],
      notes: [],
    }

    onCreateSolution(newSolution)
    handleClose()
  }

  const isFormValid = () => {
    return formData.name && formData.description && formData.type && formData.complexity
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <span>Create New Solution</span>
          </DialogTitle>
          <DialogDescription>Choose how you'd like to create your AI or Blockchain solution</DialogDescription>
        </DialogHeader>

        {/* Step 1: Choose Creation Method */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Smart Wizard */}
              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-500"
                onClick={() => handleMethodSelect("wizard")}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Wand2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Smart Wizard</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      AI-powered guided process that creates personalized solutions based on your business needs
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                </CardContent>
              </Card>

              {/* Template */}
              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-purple-500"
                onClick={() => handleMethodSelect("template")}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Use Template</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Start with proven solution templates and customize them for your specific needs
                    </p>
                  </div>
                  <Badge variant="outline">Quick Start</Badge>
                </CardContent>
              </Card>

              {/* Manual */}
              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-indigo-500"
                onClick={() => handleMethodSelect("manual")}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Manual Setup</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Create a completely custom solution from scratch with full control over every detail
                    </p>
                  </div>
                  <Badge variant="outline">Advanced</Badge>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Need help deciding? Our Smart Wizard analyzes your business and recommends the best approach.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Template Selection or Manual Form */}
        {step === 2 && creationMethod === "template" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Choose a Template</h3>
              <Button variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {solutionTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-500"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center text-white`}
                      >
                        {template.icon}
                      </div>
                      <Badge variant="outline">{template.complexity}</Badge>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg">{template.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Estimated Time:</span>
                        <span className="font-medium">{template.estimatedTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Type:</span>
                        <Badge className="text-xs">{template.type}</Badge>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-500 mb-2">Key Benefits:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {template.benefits.slice(0, 2).map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                        {template.benefits.length > 2 && (
                          <li className="text-blue-600">+{template.benefits.length - 2} more benefits</li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && creationMethod === "manual" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Solution Details</h3>
              <Button variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Solution Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., AI Customer Support Bot"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Solution Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select solution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AI">AI Solution</SelectItem>
                      <SelectItem value="Blockchain">Blockchain Solution</SelectItem>
                      <SelectItem value="Hybrid">Hybrid (AI + Blockchain)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="complexity">Complexity Level *</Label>
                  <Select value={formData.complexity} onValueChange={(value) => handleInputChange("complexity", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="estimatedTime">Estimated Timeline</Label>
                  <Input
                    id="estimatedTime"
                    value={formData.estimatedTime}
                    onChange={(e) => handleInputChange("estimatedTime", e.target.value)}
                    placeholder="e.g., 2-3 weeks"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe what this solution will do and how it will help your business..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (one per line)</Label>
                  <Textarea
                    id="tags"
                    value={formData.tags.join("\n")}
                    onChange={(e) => handleArrayInputChange("tags", e.target.value)}
                    placeholder="AI&#10;Automation&#10;Customer Service"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setStep(3)}>
                Next: Benefits & Steps
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Benefits and Next Steps */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Benefits & Implementation</h3>
              <Button variant="ghost" onClick={() => setStep(creationMethod === "template" ? 2 : 2)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="benefits">Expected Benefits (one per line)</Label>
                <Textarea
                  id="benefits"
                  value={formData.benefits.join("\n")}
                  onChange={(e) => handleArrayInputChange("benefits", e.target.value)}
                  placeholder="Reduce response time by 80%&#10;24/7 availability&#10;Cost savings on support staff"
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="nextSteps">Implementation Steps (one per line)</Label>
                <Textarea
                  id="nextSteps"
                  value={formData.nextSteps.join("\n")}
                  onChange={(e) => handleArrayInputChange("nextSteps", e.target.value)}
                  placeholder="Define requirements&#10;Set up development environment&#10;Train AI model&#10;Test and deploy"
                  rows={6}
                />
              </div>
            </div>

            {/* Preview */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold mb-3">Solution Preview</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {formData.name || "Untitled Solution"}
                </p>
                <p>
                  <strong>Type:</strong> {formData.type || "Not specified"}
                </p>
                <p>
                  <strong>Complexity:</strong> {formData.complexity || "Not specified"}
                </p>
                <p>
                  <strong>Timeline:</strong> {formData.estimatedTime || "Not specified"}
                </p>
                <p>
                  <strong>Benefits:</strong> {formData.benefits.length} listed
                </p>
                <p>
                  <strong>Steps:</strong> {formData.nextSteps.length} defined
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Create Solution
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
