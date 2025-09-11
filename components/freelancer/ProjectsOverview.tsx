"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Calendar,
  Clock,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Play,
  Pause,
  Eye,
  Edit,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Target,
  Bot,
  MessageSquare,
  FileText,
  BarChart3
} from "lucide-react"
import type { Project, ProjectStatus, ProjectPhase, AIAgent } from "@/types/freelancer"

interface ProjectsOverviewProps {
  projects: Project[]
  onProjectUpdate: (projectId: string, updates: Partial<Project>) => void
  onCreateProject: () => void
  className?: string
}

export function ProjectsOverview({ 
  projects, 
  onProjectUpdate, 
  onCreateProject,
  className = "" 
}: ProjectsOverviewProps) {
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "all">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "progress">("dueDate")

  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        const matchesStatus = selectedStatus === "all" || project.status === selectedStatus
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesStatus && matchesSearch
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "dueDate":
            return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
          case "priority":
            const priorityOrder = { "critical": 4, "high": 3, "medium": 2, "low": 1 }
            const aPriority = a.tasks.reduce((max, task) => 
              Math.max(max, priorityOrder[task.priority] || 0), 0)
            const bPriority = b.tasks.reduce((max, task) => 
              Math.max(max, priorityOrder[task.priority] || 0), 0)
            return bPriority - aPriority
          case "progress":
            return b.metrics.progress - a.metrics.progress
          default:
            return 0
        }
      })
  }, [projects, selectedStatus, searchTerm, sortBy])

  const getStatusColor = (status: ProjectStatus) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800 border-gray-200",
      proposal: "bg-yellow-100 text-yellow-800 border-yellow-200",
      negotiation: "bg-orange-100 text-orange-800 border-orange-200",
      active: "bg-green-100 text-green-800 border-green-200",
      paused: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-purple-100 text-purple-800 border-purple-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      maintenance: "bg-teal-100 text-teal-800 border-teal-200"
    }
    return colors[status]
  }

  const getPhaseColor = (phase: ProjectPhase) => {
    const colors = {
      discovery: "bg-indigo-100 text-indigo-800",
      planning: "bg-blue-100 text-blue-800",
      design: "bg-purple-100 text-purple-800",
      development: "bg-green-100 text-green-800",
      testing: "bg-yellow-100 text-yellow-800",
      deployment: "bg-orange-100 text-orange-800",
      review: "bg-pink-100 text-pink-800",
      support: "bg-teal-100 text-teal-800"
    }
    return colors[phase]
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case "healthy": return "text-green-600"
      case "at-risk": return "text-yellow-600"
      case "critical": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const updateProjectStatus = (projectId: string, newStatus: ProjectStatus) => {
    onProjectUpdate(projectId, { status: newStatus })
  }

  const updateProjectPhase = (projectId: string, newPhase: ProjectPhase) => {
    onProjectUpdate(projectId, { phase: newPhase })
  }

  const projectStats = useMemo(() => {
    const total = projects.length
    const active = projects.filter(p => p.status === "active").length
    const completed = projects.filter(p => p.status === "completed").length
    const atRisk = projects.filter(p => p.metrics.health === "at-risk" || p.metrics.health === "critical").length
    const totalRevenue = projects.reduce((sum, p) => sum + p.budget.amount, 0)
    const completedRevenue = projects.filter(p => p.status === "completed").reduce((sum, p) => sum + p.budget.amount, 0)
    
    return { total, active, completed, atRisk, totalRevenue, completedRevenue }
  }, [projects])

  const statusOptions: { value: ProjectStatus | "all", label: string, count: number }[] = [
    { value: "all", label: "All Projects", count: projects.length },
    { value: "active", label: "Active", count: projects.filter(p => p.status === "active").length },
    { value: "proposal", label: "Proposals", count: projects.filter(p => p.status === "proposal").length },
    { value: "completed", label: "Completed", count: projects.filter(p => p.status === "completed").length },
    { value: "paused", label: "Paused", count: projects.filter(p => p.status === "paused").length }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header and Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Projects Overview</h2>
            <p className="text-gray-600">Manage your active projects and track progress</p>
          </div>
          <Button onClick={onCreateProject} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{projectStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{projectStats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{projectStats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">At Risk</p>
                  <p className="text-2xl font-bold text-gray-900">{projectStats.atRisk}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/20">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex items-center space-x-1">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedStatus(option.value)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedStatus === option.value
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {option.label} ({option.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Sort */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "dueDate" | "priority" | "progress")}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="dueDate">Sort by Due Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="progress">Sort by Progress</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="bg-white/70 backdrop-blur-md border border-white/20 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
                <Badge variant="outline" className={getPhaseColor(project.phase)}>
                  {project.phase}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">{project.metrics.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${project.metrics.progress}%` }}
                  />
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Budget</span>
                  </div>
                  <p className="text-sm font-medium">
                    ${project.budget.amount.toLocaleString()}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Due Date</span>
                  </div>
                  <p className="text-sm font-medium">
                    {new Date(project.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Team</span>
                  </div>
                  <p className="text-sm font-medium">{project.team.length} members</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Bot className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">AI Agents</span>
                  </div>
                  <p className="text-sm font-medium">{project.aiAgents.length} active</p>
                </div>
              </div>

              {/* Health Status */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    project.metrics.health === "healthy" ? "bg-green-500" :
                    project.metrics.health === "at-risk" ? "bg-yellow-500" : "bg-red-500"
                  }`} />
                  <span className="text-sm font-medium">Project Health</span>
                </div>
                <span className={`text-sm font-medium capitalize ${getHealthColor(project.metrics.health)}`}>
                  {project.metrics.health}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Chat
                </Button>
              </div>

              {/* Quick Status Update */}
              <div className="border-t pt-3">
                <p className="text-xs text-gray-500 mb-2">Quick Actions</p>
                <div className="flex items-center space-x-1">
                  {project.status === "active" && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => updateProjectStatus(project.id, "paused")}
                      className="text-xs"
                    >
                      <Pause className="w-3 h-3 mr-1" />
                      Pause
                    </Button>
                  )}
                  {project.status === "paused" && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => updateProjectStatus(project.id, "active")}
                      className="text-xs"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Resume
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-xs">
                    <FileText className="w-3 h-3 mr-1" />
                    Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card className="bg-white/70 backdrop-blur-md border border-white/20">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedStatus !== "all" 
                ? "Try adjusting your filters or search terms" 
                : "Get started by creating your first project"}
            </p>
            <Button onClick={onCreateProject} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}