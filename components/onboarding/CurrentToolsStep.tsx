"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Plus, X, Settings, AlertTriangle } from "lucide-react"
import { StepProps } from "@/types/onboarding"
import { 
  industryTools, 
  toolSatisfactionLevels, 
  previousSolutionOutcomes 
} from "@/config/onboarding-options"

export function CurrentToolsStep({ userData, onDataChange, onNext }: StepProps) {
  const [newTool, setNewTool] = useState("")
  const [showOtherTools, setShowOtherTools] = useState(false)

  // Get suggested tools based on industry
  const suggestedTools = userData.businessType && industryTools[userData.businessType as keyof typeof industryTools] || []
  
  const canProceed = userData.currentTools && userData.currentTools.length > 0

  const addCurrentTool = (toolName: string, satisfaction: string = "") => {
    const currentTools = userData.currentTools || []
    if (!currentTools.find(t => t.name === toolName)) {
      const newTools = [...currentTools, { name: toolName, satisfaction }]
      onDataChange({ currentTools: newTools })
    }
  }

  const removeCurrentTool = (toolName: string) => {
    const currentTools = userData.currentTools || []
    const newTools = currentTools.filter(t => t.name !== toolName)
    onDataChange({ currentTools: newTools })
  }

  const updateToolSatisfaction = (toolName: string, satisfaction: string) => {
    const currentTools = userData.currentTools || []
    const newTools = currentTools.map(t => 
      t.name === toolName ? { ...t, satisfaction } : t
    )
    onDataChange({ currentTools: newTools })
  }

  const addCustomTool = () => {
    if (newTool.trim()) {
      addCurrentTool(newTool.trim())
      setNewTool("")
    }
  }

  return (
    <div className="space-y-12 py-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">What tools do you currently use?</h2>
        <p className="text-xl text-gray-600">Understanding your current setup helps us recommend the best integration approach</p>
      </div>

      <div className="space-y-8">
        {/* Industry-specific tools */}
        {suggestedTools.length > 0 && (
          <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">Common {userData.businessType} Tools</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {suggestedTools.map((tool) => {
                  const isSelected = userData.currentTools?.find(t => t.name === tool)
                  return (
                    <Button
                      key={tool}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className={`h-auto p-3 text-left justify-start ${
                        isSelected 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                          : "bg-white/50 border-white/30 hover:bg-white/70"
                      }`}
                      onClick={() => {
                        if (isSelected) {
                          removeCurrentTool(tool)
                        } else {
                          addCurrentTool(tool)
                        }
                      }}
                    >
                      <span className="text-sm font-medium">{tool}</span>
                    </Button>
                  )
                })}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOtherTools(!showOtherTools)}
                className="text-blue-600 hover:text-blue-700"
              >
                {showOtherTools ? "Hide" : "Add"} other tools
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Custom tool input */}
        {(showOtherTools || suggestedTools.length === 0) && (
          <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Add Your Tools</h3>
              <div className="flex space-x-3">
                <Input
                  placeholder="Enter tool name (e.g., Slack, QuickBooks, etc.)"
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomTool()}
                  className="flex-1 bg-white/50 border-white/30"
                />
                <Button onClick={addCustomTool} disabled={!newTool.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current tools with satisfaction ratings */}
        {userData.currentTools && userData.currentTools.length > 0 && (
          <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">How satisfied are you with these tools?</h3>
              
              <div className="space-y-4">
                {userData.currentTools.map((tool) => (
                  <div key={tool.name} className="bg-white/50 rounded-lg p-4 border border-white/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">{tool.name}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCurrentTool(tool.name)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {toolSatisfactionLevels.map((level) => {
                        const Icon = level.icon
                        const isSelected = tool.satisfaction === level.id
                        return (
                          <Button
                            key={level.id}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            className={`h-auto p-2 flex flex-col items-center space-y-1 ${
                              isSelected 
                                ? level.id === "love" || level.id === "like" 
                                  ? "bg-gradient-to-r from-green-600 to-teal-600 text-white"
                                  : level.id === "hate" || level.id === "dislike"
                                    ? "bg-gradient-to-r from-red-600 to-orange-600 text-white"
                                    : "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
                                : "bg-white/50 border-white/30 hover:bg-white/70"
                            }`}
                            onClick={() => updateToolSatisfaction(tool.name, level.id)}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-xs font-medium">{level.label}</span>
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Previous solution attempts */}
        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <h3 className="text-xl font-semibold text-gray-800">Previous Solution Attempts</h3>
            </div>
            
            <p className="text-gray-600">Have you tried implementing similar solutions before?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {previousSolutionOutcomes.map((outcome) => {
                const Icon = outcome.icon
                const isSelected = userData.previousSolutionOutcome === outcome.id
                return (
                  <Button
                    key={outcome.id}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-auto p-4 text-left ${
                      isSelected 
                        ? outcome.id === "successful" 
                          ? "bg-gradient-to-r from-green-600 to-teal-600 text-white"
                          : outcome.id === "failed" || outcome.id === "too-complex"
                            ? "bg-gradient-to-r from-red-600 to-orange-600 text-white"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white/50 border-white/30 hover:bg-white/70"
                    }`}
                    onClick={() => onDataChange({ previousSolutionOutcome: outcome.id })}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className="w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{outcome.label}</div>
                        <div className="text-sm opacity-80">{outcome.description}</div>
                      </div>
                    </div>
                  </Button>
                )
              })}
            </div>

            {/* Additional context for previous attempts */}
            {userData.previousSolutionOutcome && userData.previousSolutionOutcome !== "no-previous" && (
              <div className="space-y-3 pt-4 border-t border-white/30">
                <label className="text-sm font-medium text-gray-700">
                  Tell us more about your experience (optional)
                </label>
                <Textarea
                  placeholder="What worked well? What didn't? What would you do differently?"
                  value={userData.previousSolutionDetails || ""}
                  onChange={(e) => onDataChange({ previousSolutionDetails: e.target.value })}
                  className="bg-white/50 border-white/30"
                  rows={3}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {canProceed && (
        <div className="text-center pt-6">
          <Button
            size="lg"
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-xl"
          >
            Continue to Process Mapping
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>
        </div>
      )}
    </div>
  )
}