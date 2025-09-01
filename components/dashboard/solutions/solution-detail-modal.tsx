"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Clock,
  TrendingUp,
  CheckCircle,
  Play,
  Pause,
  AlertCircle,
  Calendar,
  Users,
  FileText,
  Video,
  BookOpen,
  MessageCircle,
  HelpCircle,
  ExternalLink,
  Edit3,
  Save,
} from "lucide-react"

interface Solution {
  id: string
  name: string
  description: string
  tags: string[]
  status: "Planning" | "In-progress" | "Completed" | "Paused"
  progress: number
  timeSaved: string
  automationLevel: number
  createdAt: string
  estimatedCompletion: string
  complexity: "Beginner" | "Intermediate" | "Advanced"
  type: "AI" | "Blockchain" | "Hybrid"
}

interface SolutionDetailModalProps {
  solution: Solution
  isOpen: boolean
  onClose: () => void
}

export function SolutionDetailModal({ solution, isOpen, onClose }: SolutionDetailModalProps) {
  const [notes, setNotes] = useState(
    "Initial planning phase completed. Moving to implementation stage with focus on core AI model training.",
  )
  const [isEditingNotes, setIsEditingNotes] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Planning":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "In-progress":
        return <Play className="w-4 h-4 text-orange-500" />
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "Paused":
        return <Pause className="w-4 h-4 text-gray-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const milestones = [
    { id: 1, title: "Requirements Analysis", completed: true, date: "2024-01-15" },
    { id: 2, title: "System Architecture", completed: true, date: "2024-01-20" },
    { id: 3, title: "Core Development", completed: false, date: "2024-01-25", current: true },
    { id: 4, title: "Testing & QA", completed: false, date: "2024-01-30" },
    { id: 5, title: "Deployment", completed: false, date: "2024-02-01" },
  ]

  const resources = [
    { type: "video", title: "AI Chatbot Implementation Guide", duration: "45 min", url: "#" },
    { type: "doc", title: "Natural Language Processing Best Practices", pages: "12 pages", url: "#" },
    { type: "template", title: "Customer Service Bot Template", format: "JSON", url: "#" },
    { type: "course", title: "Advanced NLP Techniques", lessons: "8 lessons", url: "#" },
  ]

  const faqs = [
    {
      question: "How do I integrate the chatbot with my existing system?",
      answer:
        "You can integrate using our REST API or webhook endpoints. Documentation is available in the Resources tab.",
    },
    {
      question: "What languages does the AI support?",
      answer: "Currently supports English, Spanish, French, and German with 95%+ accuracy.",
    },
    {
      question: "How do I train the bot with custom data?",
      answer: "Upload your training data in CSV or JSON format through the training interface.",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">{solution.name}</DialogTitle>
              <p className="text-gray-600">{solution.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(solution.status)}
              <Badge
                className={`${
                  solution.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : solution.status === "In-progress"
                      ? "bg-orange-100 text-orange-800"
                      : solution.status === "Planning"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                }`}
              >
                {solution.status}
              </Badge>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Progress</p>
                      <p className="text-2xl font-bold text-blue-600">{solution.progress}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-500" />
                  </div>
                  <Progress value={solution.progress} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Time Saved</p>
                      <p className="text-2xl font-bold text-green-600">{solution.timeSaved}</p>
                    </div>
                    <Clock className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Per week estimated</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Automation</p>
                      <p className="text-2xl font-bold text-purple-600">{solution.automationLevel}%</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-purple-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Process automation</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Timeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Created</span>
                    <span className="text-sm font-medium">{new Date(solution.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Est. Completion</span>
                    <span className="text-sm font-medium">
                      {new Date(solution.estimatedCompletion).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Complexity</span>
                    <Badge variant="outline">{solution.complexity}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Team & Tags</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Solution Type</p>
                    <Badge
                      className={`${
                        solution.type === "AI"
                          ? "bg-purple-100 text-purple-800"
                          : solution.type === "Blockchain"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800"
                      }`}
                    >
                      {solution.type}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {solution.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          milestone.completed ? "bg-green-100" : milestone.current ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        {milestone.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : milestone.current ? (
                          <Play className="w-4 h-4 text-blue-600" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            milestone.completed
                              ? "text-green-700"
                              : milestone.current
                                ? "text-blue-700"
                                : "text-gray-700"
                          }`}
                        >
                          {milestone.title}
                        </p>
                        <p className="text-sm text-gray-500">{milestone.date}</p>
                      </div>
                      {milestone.current && <Badge className="bg-blue-100 text-blue-800">Current</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Time Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Time Invested</span>
                      <span className="font-medium">45 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg. Daily Progress</span>
                      <span className="font-medium">2.5 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Est. Remaining</span>
                      <span className="font-medium">15 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Efficiency Score</span>
                      <span className="font-medium text-green-600">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Quality Rating</span>
                      <span className="font-medium text-blue-600">4.8/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">On Schedule</span>
                      <span className="font-medium text-orange-600">Slightly Behind</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {resource.type === "video" && <Video className="w-5 h-5 text-blue-600" />}
                        {resource.type === "doc" && <FileText className="w-5 h-5 text-blue-600" />}
                        {resource.type === "template" && <FileText className="w-5 h-5 text-blue-600" />}
                        {resource.type === "course" && <BookOpen className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{resource.title}</h4>
                        <p className="text-sm text-gray-600">
                          {resource.duration || resource.pages || resource.format || resource.lessons}
                        </p>
                        <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-700">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Open Resource
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Learning Path</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">Complete AI Fundamentals Course</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    </div>
                    <span className="text-sm text-gray-700">Review NLP Best Practices Guide</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    </div>
                    <span className="text-sm text-gray-500">Advanced Integration Techniques</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Project Notes</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditingNotes(!isEditingNotes)}>
                    {isEditingNotes ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditingNotes ? (
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[200px]"
                    placeholder="Add your project notes here..."
                  />
                ) : (
                  <div className="min-h-[200px] p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-blue-200 pl-4">
                    <p className="text-sm font-medium text-gray-900">Core AI model training completed</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                  <div className="border-l-2 border-green-200 pl-4">
                    <p className="text-sm font-medium text-gray-900">System architecture finalized</p>
                    <p className="text-xs text-gray-500">5 days ago</p>
                  </div>
                  <div className="border-l-2 border-orange-200 pl-4">
                    <p className="text-sm font-medium text-gray-900">Requirements analysis phase completed</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Get Expert Help</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with AI Expert
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Consultation
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Join Community Forum
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="w-5 h-5" />
                    <span>Self-Help Resources</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="ghost">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Documentation
                  </Button>
                  <Button className="w-full justify-start" variant="ghost">
                    <Video className="w-4 h-4 mr-2" />
                    Video Tutorials
                  </Button>
                  <Button className="w-full justify-start" variant="ghost">
                    <FileText className="w-4 h-4 mr-2" />
                    Troubleshooting Guide
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
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
