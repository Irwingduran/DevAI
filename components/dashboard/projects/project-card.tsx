"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Calendar, MoreHorizontal, CheckCircle, Pause, Play, Eye } from "lucide-react"

interface Project {
  id: string
  name: string // Make sure this matches
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
}

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
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

            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {project.name}
            </h3>

            {project.client && (
              <p className="text-sm text-gray-600">
                Client: <span className="font-medium">{project.client}</span>
              </p>
            )}
          </div>

          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4" onClick={onClick}>
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{project.description}</p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold text-gray-900">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Due {formatDate(project.estimatedCompletion)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{project.team.length} team members</span>
          </div>
        </div>

        {/* Budget */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Budget</span>
          <span className="font-semibold text-gray-900">{project.budget}</span>
        </div>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Team Avatars */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member, index) => (
              <Avatar key={index} className="w-6 h-6 border-2 border-white">
                <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                <AvatarFallback className="text-xs">
                  {member
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.team.length > 3 && (
              <div className="w-6 h-6 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-600">+{project.team.length - 3}</span>
              </div>
            )}
          </div>

          <span className="text-xs text-gray-500">Updated {project.lastUpdate}</span>
        </div>
      </CardContent>
    </Card>
  )
}
