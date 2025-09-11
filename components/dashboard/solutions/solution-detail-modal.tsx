"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Bot,
  Blocks,
  Sparkles,
  CheckCircle,
  Users,
  FileText,
  Video,
  Code,
  ExternalLink,
  MessageCircle,
  Calendar,
  AlertCircle,
  TrendingUp,
  X,
  Play,
  Save,
  Edit3,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { Solution } from "@/app/dashboard/solutions/page"

interface SolutionDetailModalProps {
  isOpen: boolean
  onClose: () => void
  solution: Solution | null
  onUpdateProgress: (solutionId: string, progress: number) => void
  onAddNote: (solutionId: string, note: string) => void
  onContactExpert: (context: any) => void
  onUpdateSolution: (solutionId: string, updates: Partial<Solution>) => void
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "AI":
      return <Bot className="w-5 h-5" />
    case "Blockchain":
      return <Blocks className="w-5 h-5" />
    case "Hybrid":
      return <Sparkles className="w-5 h-5" />
    default:
      return <Bot className="w-5 h-5" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "AI":
      return "from-blue-500 to-cyan-600"
    case "Blockchain":
      return "from-purple-500 to-indigo-600"
    case "Hybrid":
      return "from-blue-500 via-purple-600 to-indigo-600"
    default:
      return "from-gray-500 to-gray-600"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "planning":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "paused":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const resourceIcons = {
  video: Video,
  doc: FileText,
  template: Code,
  course: Users,
  analytics: TrendingUp,
  code: Code,
}

export function SolutionDetailModal({
  isOpen,
  onClose,
  solution,
  onUpdateProgress,
  onAddNote,
  onContactExpert,
  onUpdateSolution,
}: SolutionDetailModalProps) {
  const [newNote, setNewNote] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedSolution, setEditedSolution] = useState<Partial<Solution>>({})
  const [progressValue, setProgressValue] = useState(solution?.progress || 0)

  if (!solution) return null

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    setIsAddingNote(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
    onAddNote(solution.id, newNote)
    setNewNote("")
    setIsAddingNote(false)

    toast({
      title: "Note Added",
      description: "Your note has been saved successfully.",
    })
  }

  const handleProgressUpdate = (newProgress: number[]) => {
    const progress = newProgress[0]
    setProgressValue(progress)
    onUpdateProgress(solution.id, progress)

    toast({
      title: "Progress Updated",
      description: `Progress updated to ${progress}%`,
    })
  }

  const handleStatusChange = (newStatus: string) => {
    onUpdateSolution(solution.id, { status: newStatus as Solution["status"] })

    toast({
      title: "Status Updated",
      description: `Status changed to ${newStatus.replace("-", " ")}`,
    })
  }

  const handleSaveEdits = () => {
    if (Object.keys(editedSolution).length > 0) {
      onUpdateSolution(solution.id, editedSolution)
      setEditedSolution({})
      setIsEditing(false)

      toast({
        title: "Solution Updated",
        description: "Your changes have been saved successfully.",
      })
    }
  }

  const handleEditChange = (field: keyof Solution, value: any) => {
    setEditedSolution((prev) => ({ ...prev, [field]: value }))
  }

  const mockMilestones = [
    {
      id: "1",
      title: "Project Setup",
      status: solution.progress >= 20 ? "completed" : "pending",
      date: "Jan 15, 2025",
      description: "Initial configuration and environment setup",
    },
    {
      id: "2",
      title: "Core Development",
      status: solution.progress >= 50 ? "completed" : solution.progress >= 20 ? "in-progress" : "pending",
      date: "Jan 22, 2025",
      description: "Building main functionality and features",
    },
    {
      id: "3",
      title: "Testing & QA",
      status: solution.progress >= 80 ? "completed" : solution.progress >= 50 ? "in-progress" : "pending",
      date: "Jan 29, 2025",
      description: "Comprehensive testing and quality assurance",
    },
    {
      id: "4",
      title: "Deployment",
      status: solution.progress >= 100 ? "completed" : solution.progress >= 80 ? "in-progress" : "pending",
      date: "Feb 5, 2025",
      description: "Production deployment and go-live",
    },
  ]

  const displaySolution = { ...solution, ...editedSolution }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${getTypeColor(displaySolution.type)} rounded-xl flex items-center justify-center text-white`}
                >
                  {getTypeIcon(displaySolution.type)}
                </div>
                <div>
                  {isEditing ? (
                    <Input
                      value={editedSolution.name || displaySolution.name}
                      onChange={(e) => handleEditChange("name", e.target.value)}
                      className="text-2xl font-bold"
                    />
                  ) : (
                    <DialogTitle className="text-2xl">{displaySolution.name}</DialogTitle>
                  )}
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">{displaySolution.type}</Badge>
                    <Select value={displaySolution.status} onValueChange={handleStatusChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    {displaySolution.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              {isEditing ? (
                <Textarea
                  value={editedSolution.description || displaySolution.description}
                  onChange={(e) => handleEditChange("description", e.target.value)}
                  className="max-w-2xl"
                />
              ) : (
                <p className="text-gray-600 max-w-2xl">{displaySolution.description}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSaveEdits} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Progress Overview */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Progress Overview</h3>
                      <span className="text-2xl font-bold text-blue-600">{progressValue}%</span>
                    </div>
                    <Progress value={progressValue} className="h-3 mb-4" />
                    <div className="space-y-3">
                      <Label>Update Progress</Label>
                      <Slider
                        value={[progressValue]}
                        onValueChange={handleProgressUpdate}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                      <div>
                        <p className="text-gray-600">Estimated Time</p>
                        <p className="font-medium">
                          {displaySolution.estimatedCompletion
                            ? new Date(displaySolution.estimatedCompletion).toLocaleDateString()
                            : "Not set"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Complexity</p>
                        <p className="font-medium">{displaySolution.complexity}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Key Benefits</h3>
                    <div className="space-y-3">
                      {displaySolution.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
                    <div className="space-y-3">
                      {displaySolution.nextSteps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Quick Stats */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h4 className="font-semibold text-gray-900">Project Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Created</span>
                        <span className="font-medium">{new Date(displaySolution.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Last Updated</span>
                        <span className="font-medium">
                          {new Date(displaySolution.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Type</span>
                        <Badge variant="outline">{displaySolution.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Status</span>
                        <Badge className={getStatusColor(displaySolution.status)}>
                          {displaySolution.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Impact Metrics */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h4 className="font-semibold text-gray-900">Impact Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Time Saved</span>
                        <span className="font-medium text-green-600">{displaySolution.timeSaved}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Automation Level</span>
                        <span className="font-medium text-blue-600">{displaySolution.automationLevel}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Complexity</span>
                        <Badge variant="outline">{displaySolution.complexity}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardContent className="p-6 space-y-3">
                    <h4 className="font-semibold text-gray-900">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => onContactExpert({ solution: displaySolution.name, type: "implementation" })}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Get Expert Help
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Review
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Ask Question
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Milestones</h3>
                  <div className="space-y-4">
                    {mockMilestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex items-start space-x-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              milestone.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : milestone.status === "in-progress"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {milestone.status === "completed" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : milestone.status === "in-progress" ? (
                              <Play className="w-4 h-4" />
                            ) : (
                              <span className="text-sm font-medium">{index + 1}</span>
                            )}
                          </div>
                          {index < mockMilestones.length - 1 && <div className="w-px h-8 bg-gray-200 mt-2" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                          <p className="text-xs text-gray-500 mt-2">{milestone.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Progress Analytics</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                        <span className="text-lg font-bold text-blue-600">{progressValue}%</span>
                      </div>
                      <Progress value={progressValue} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {mockMilestones.filter((m) => m.status === "completed").length}
                        </div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {mockMilestones.filter((m) => m.status === "in-progress").length}
                        </div>
                        <div className="text-sm text-gray-600">In Progress</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Time Tracking</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time Spent</span>
                          <span className="font-medium">{Math.round(progressValue * 0.6)} hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estimated Remaining</span>
                          <span className="font-medium">{Math.round((100 - progressValue) * 0.4)} hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displaySolution.resources.map((resource, index) => {
                const IconComponent = resourceIcons[resource.type as keyof typeof resourceIcons] || FileText
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{resource.title}</h4>
                          <p className="text-sm text-gray-600 capitalize">{resource.type}</p>
                          <Button size="sm" variant="ghost" className="mt-2 p-0 h-auto">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Open
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Additional Resources */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recommended Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Best Practices Guide",
                      description: "Learn industry best practices for your solution type",
                      type: "guide",
                      duration: "15 min read",
                    },
                    {
                      title: "Video Tutorial Series",
                      description: "Step-by-step implementation tutorials",
                      type: "video",
                      duration: "2 hours",
                    },
                    {
                      title: "Community Forum",
                      description: "Connect with other users and experts",
                      type: "community",
                      duration: "Always available",
                    },
                    {
                      title: "API Documentation",
                      description: "Complete technical documentation",
                      type: "docs",
                      duration: "Reference",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Add Note</h3>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Add your thoughts, progress updates, or questions..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-24"
                  />
                  <Button
                    onClick={handleAddNote}
                    disabled={!newNote.trim() || isAddingNote}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  >
                    {isAddingNote ? "Adding..." : "Add Note"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {displaySolution.notes.map((note) => (
                <Card key={note.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-medium text-gray-900">{note.author}</span>
                      <span className="text-sm text-gray-500">{new Date(note.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-700">{note.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Get Expert Help</h3>
                  <p className="text-gray-600 mb-4">
                    Stuck on implementation? Our experts can help you move forward quickly.
                  </p>
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                      onClick={() => onContactExpert({ solution: displaySolution.name, type: "implementation" })}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Contact Expert
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Call
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Self-Help Options</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Browse Documentation
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Video className="w-4 h-4 mr-2" />
                      Watch Tutorials
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Community Forum
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Report Issue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {[
                    {
                      question: "How do I update my solution progress?",
                      answer:
                        "You can update progress manually in the Progress tab using the slider, or it will be automatically updated as you complete milestones.",
                    },
                    {
                      question: "Can I modify the solution after starting?",
                      answer:
                        "Yes, solutions can be customized at any time. Use the Edit button to modify details, or contact an expert if you need help with major changes.",
                    },
                    {
                      question: "What if I get stuck during implementation?",
                      answer:
                        "Use the 'Get Expert Help' button to connect with our specialists who can provide guidance and support.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
