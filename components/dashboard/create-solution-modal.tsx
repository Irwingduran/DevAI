"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Bot, Blocks, Sparkles } from "lucide-react"

interface CreateSolutionModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateSolution: (solution: any) => void
}

const solutionTypes = [
  { value: "AI", label: "AI Solution", icon: Bot, color: "from-blue-500 to-cyan-600" },
  { value: "Blockchain", label: "Blockchain Solution", icon: Blocks, color: "from-purple-500 to-indigo-600" },
  { value: "Hybrid", label: "Hybrid Solution", icon: Sparkles, color: "from-blue-500 via-purple-600 to-indigo-600" },
]

const complexityLevels = [
  { value: "Beginner", label: "Beginner", description: "Simple implementation, minimal setup" },
  {
    value: "Intermediate",
    label: "Intermediate",
    description: "Moderate complexity, some technical knowledge required",
  },
  { value: "Advanced", label: "Advanced", description: "Complex implementation, technical expertise needed" },
]

export function CreateSolutionModal({ isOpen, onClose, onCreateSolution }: CreateSolutionModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    complexity: "",
    estimatedTime: "",
    implementationType: "diy", // 'diy' or 'expert'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newSolution = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: "planning",
      progress: 0,
      benefits: [],
      nextSteps: [],
      resources: [],
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    onCreateSolution(newSolution)
    onClose()

    // Reset form
    setFormData({
      name: "",
      description: "",
      type: "",
      complexity: "",
      estimatedTime: "",
      implementationType: "diy",
    })
  }

  const selectedType = solutionTypes.find((type) => type.value === formData.type)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Solution</DialogTitle>
          <DialogDescription>
            Define your new AI or Blockchain solution to start your implementation journey.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Solution Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Solution Name</label>
            <Input
              placeholder="e.g., Smart Customer Support AI"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          {/* Solution Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Solution Type</label>
            <div className="grid grid-cols-3 gap-3">
              {solutionTypes.map((type) => {
                const Icon = type.icon
                const isSelected = formData.type === type.value

                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, type: type.value }))}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center mx-auto mb-2`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-medium">{type.label}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <Textarea
              placeholder="Describe what this solution will do and how it will help your business..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              required
            />
          </div>

          {/* Complexity and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Complexity Level</label>
              <Select
                value={formData.complexity}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, complexity: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent>
                  {complexityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div>
                        <p className="font-medium">{level.label}</p>
                        <p className="text-xs text-gray-500">{level.description}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Estimated Time</label>
              <Select
                value={formData.estimatedTime}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, estimatedTime: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                  <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
                  <SelectItem value="1-2 months">1-2 months</SelectItem>
                  <SelectItem value="2-3 months">2-3 months</SelectItem>
                  <SelectItem value="3+ months">3+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Implementation Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Implementation Approach</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, implementationType: "diy" }))}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData.implementationType === "diy"
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <h4 className="font-medium text-gray-900">Do it yourself</h4>
                <p className="text-sm text-gray-600 mt-1">Use our guided tools and resources</p>
                <Badge variant="outline" className="mt-2">
                  Self-guided
                </Badge>
              </button>

              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, implementationType: "expert" }))}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData.implementationType === "expert"
                    ? "border-purple-400 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <h4 className="font-medium text-gray-900">Hire an expert</h4>
                <p className="text-sm text-gray-600 mt-1">Get professional implementation</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline">Expert-led</Badge>
                  {formData.implementationType === "expert" && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        // This would trigger the expert contact modal
                        console.log("Contact expert for:", formData.name)
                      }}
                      className="text-xs text-purple-600 hover:underline"
                    >
                      Contact expert →
                    </button>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              disabled={!formData.name || !formData.type || !formData.description}
            >
              Create Solution
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
