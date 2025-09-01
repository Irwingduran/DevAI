"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  Download,
  Share,
  Edit,
  MoreHorizontal,
} from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  status: "planning" | "in-progress" | "review" | "completed" | "on-hold"
  progress: number
  type: "AI" | "Blockchain" | "Hybrid"
  priority: "low" | "medium" | "high"
  startDate: string
  estimatedCompletion: string
  budget: string
  team: string[]
  tags: string[]
  lastUpdate: string
  client?: string
  timeline: {
    phase: string
    status: "completed" | "current" | "upcoming"
    date: string
    description: string
  }[]
  updates: {
    date: string
    title: string
    description: string
    type: "milestone" | "update" | "issue"
  }[]
}

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!project) {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "review":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "on-hold":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "planning":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "AI":
        return "bg-blue-100 text-blue-700"
      case "Blockchain":
        return "bg-purple-100 text-purple-700"
      case "Hybrid":
        return "bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "in-progress":
        return <Play className="w-4 h-4" />
      case "on-hold":
        return <Pause className="w-4 h-4" />
      case "review":
        return <Eye className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getTimelineStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "current":
        return "bg-blue-500"
      case "upcoming":
        return "bg-gray-300"
      default:
        return "bg-gray-300"
    }
  }

  const getUpdateTypeIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "issue":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-blue-500" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getStatusColor(project.status)}>
                  {getStatusIcon(project.status)}
                  <span className="ml-1 capitalize">{project.status.replace("-", " ")}</span>
                </Badge>
                <Badge className={getTypeColor(project.type)}>{project.type}</Badge>
                <Badge className={getPriorityColor(project.priority)} variant="outline">
                  {project.priority} priority
                </Badge>
              </div>

              <DialogTitle className="text-2xl font-bold text-gray-900">{project.title}</DialogTitle>

              {project.client && (
                <p className="text-gray-600">
                  Client: <span className="font-medium text-gray-900">{project.client}</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 overflow-y-auto flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Project Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                      <span className="text-sm font-semibold text-gray-900">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-3" />
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                      <div className="text-xs text-gray-600">Start Date</div>
                      <div className="text-sm font-semibold">{formatDate(project.startDate)}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                      <div className="text-xs text-gray-600">Due Date</div>
                      <div className="text-sm font-semibold">{formatDate(project.estimatedCompletion)}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <DollarSign className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                      <div className="text-xs text-gray-600">Budget</div>
                      <div className="text-sm font-semibold">{project.budget}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Users className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                      <div className="text-xs text-gray-600">Team Size</div>
                      <div className="text-sm font-semibold">{project.team.length} members</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {project.timeline.map((phase, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full ${getTimelineStatusColor(phase.status)}`} />
                          {index < project.timeline.length - 1 && <div className="w-0.5 h-12 bg-gray-200 mt-2" />}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                phase.status === "completed"
                                  ? "border-green-200 text-green-700"
                                  : phase.status === "current"
                                    ? "border-blue-200 text-blue-700"
                                    : "border-gray-200 text-gray-600"
                              }`}
                            >
                              {phase.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{phase.description}</p>
                          <p className="text-xs text-gray-500">{formatDate(phase.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="updates" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.updates.map((update, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="mt-0.5">{getUpdateTypeIcon(update.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{update.title}</h4>
                            <span className="text-xs text-gray-500">{formatDateTime(update.date)}</span>
                          </div>
                          <p className="text-sm text-gray-600">{update.description}</p>
                          <Badge
                            variant="outline"
                            className={`mt-2 text-xs ${
                              update.type === "milestone"
                                ? "border-green-200 text-green-700"
                                : update.type === "issue"
                                  ? "border-red-200 text-red-700"
                                  : "border-blue-200 text-blue-700"
                            }`}
                          >
                            {update.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.team.map((member, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>
                            {member
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{member}</div>
                          <div className="text-sm text-gray-600">Team Member</div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Support Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Support & Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                      <div className="text-center">
                        <div className="font-medium">Live Chat</div>
                        <div className="text-xs text-gray-600">Instant messaging</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                      <Phone className="w-6 h-6 text-green-600" />
                      <div className="text-center">
                        <div className="font-medium">Schedule Call</div>
                        <div className="text-xs text-gray-600">Video conference</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                      <Download className="w-6 h-6 text-purple-600" />
                      <div className="text-center">
                        <div className="font-medium">Export Report</div>
                        <div className="text-xs text-gray-600">PDF summary</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
