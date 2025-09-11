"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Bot,
  Play,
  Pause,
  Stop,
  Settings,
  Activity,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Code,
  Paintbrush,
  TestTube,
  Server,
  PenTool,
  BarChart3,
  Headphones,
  RefreshCw,
  Plus,
  Filter,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Eye,
  Edit,
  Download,
  Upload
} from "lucide-react"
import type { AIAgent, AIAgentType, Task } from "@/types/freelancer"

interface AIAgentPanelProps {
  aiAgents: AIAgent[]
  tasks: Task[]
  onAgentUpdate: (agentId: string, updates: Partial<AIAgent>) => void
  onCreateAgent: () => void
  onAssignTask: (agentId: string, taskId: string) => void
  className?: string
}

export function AIAgentPanel({ 
  aiAgents, 
  tasks,
  onAgentUpdate, 
  onCreateAgent,
  onAssignTask,
  className = "" 
}: AIAgentPanelProps) {
  const [selectedType, setSelectedType] = useState<AIAgentType | "all">("all")
  const [selectedStatus, setSelectedStatus] = useState<"all" | "idle" | "working" | "completed" | "error">("all")
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const agentTypeIcons = {
    "project-manager": Monitor,
    "developer": Code,
    "designer": Paintbrush,
    "qa-engineer": TestTube,
    "devops": Server,
    "content-writer": PenTool,
    "data-analyst": BarChart3,
    "customer-support": Headphones
  }

  const agentTypeColors = {
    "project-manager": "bg-blue-100 text-blue-800 border-blue-200",
    "developer": "bg-green-100 text-green-800 border-green-200",
    "designer": "bg-purple-100 text-purple-800 border-purple-200",
    "qa-engineer": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "devops": "bg-orange-100 text-orange-800 border-orange-200",
    "content-writer": "bg-pink-100 text-pink-800 border-pink-200",
    "data-analyst": "bg-indigo-100 text-indigo-800 border-indigo-200",
    "customer-support": "bg-teal-100 text-teal-800 border-teal-200"
  }

  const getStatusColor = (status: AIAgent["status"]) => {
    const colors = {
      idle: "bg-gray-100 text-gray-800 border-gray-200",
      working: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      error: "bg-red-100 text-red-800 border-red-200"
    }
    return colors[status]
  }

  const getStatusIcon = (status: AIAgent["status"]) => {
    switch (status) {
      case "idle": return <Pause className="w-4 h-4" />
      case "working": return <Activity className="w-4 h-4 animate-pulse" />
      case "completed": return <CheckCircle className="w-4 h-4" />
      case "error": return <AlertTriangle className="w-4 h-4" />
    }
  }

  const filteredAgents = useMemo(() => {
    return aiAgents.filter(agent => {
      const matchesType = selectedType === "all" || agent.type === selectedType
      const matchesStatus = selectedStatus === "all" || agent.status === selectedStatus
      return matchesType && matchesStatus
    })
  }, [aiAgents, selectedType, selectedStatus])

  const agentStats = useMemo(() => {
    const total = aiAgents.length
    const working = aiAgents.filter(a => a.status === "working").length
    const idle = aiAgents.filter(a => a.status === "idle").length
    const totalTasksCompleted = aiAgents.reduce((sum, a) => sum + a.tasksCompleted, 0)
    const totalTimeSaved = aiAgents.reduce((sum, a) => sum + a.timesSaved, 0)
    const totalCostSaved = aiAgents.reduce((sum, a) => sum + a.costSaved, 0)
    const avgEfficiency = aiAgents.reduce((sum, a) => sum + a.efficiency, 0) / aiAgents.length
    
    return { total, working, idle, totalTasksCompleted, totalTimeSaved, totalCostSaved, avgEfficiency }
  }, [aiAgents])

  const assignedTasks = useMemo(() => {
    return tasks.filter(task => 
      aiAgents.some(agent => agent.id === task.assignee)
    )
  }, [tasks, aiAgents])

  const handleAgentAction = (agentId: string, action: "start" | "pause" | "stop") => {
    const newStatus = action === "start" ? "working" : action === "pause" ? "idle" : "idle"
    onAgentUpdate(agentId, { status: newStatus })
  }

  const typeOptions = [
    { value: "all" as const, label: "All Types", count: aiAgents.length },
    { value: "project-manager" as const, label: "Project Manager", count: aiAgents.filter(a => a.type === "project-manager").length },
    { value: "developer" as const, label: "Developer", count: aiAgents.filter(a => a.type === "developer").length },
    { value: "designer" as const, label: "Designer", count: aiAgents.filter(a => a.type === "designer").length },
    { value: "qa-engineer" as const, label: "QA Engineer", count: aiAgents.filter(a => a.type === "qa-engineer").length }
  ]

  const statusOptions = [
    { value: "all" as const, label: "All Status", count: aiAgents.length },
    { value: "working" as const, label: "Working", count: aiAgents.filter(a => a.status === "working").length },
    { value: "idle" as const, label: "Idle", count: aiAgents.filter(a => a.status === "idle").length },
    { value: "completed" as const, label: "Completed", count: aiAgents.filter(a => a.status === "completed").length },
    { value: "error" as const, label: "Error", count: aiAgents.filter(a => a.status === "error").length }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header and Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Agent Orchestration</h2>
            <p className="text-gray-600">Manage and monitor your AI workforce</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="text-gray-600">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={onCreateAgent} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Deploy Agent
            </Button>
          </div>
        </div>

        {/* AI Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-700">Active Agents</p>
                  <p className="text-2xl font-bold text-blue-900">{agentStats.working}/{agentStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-700">Tasks Completed</p>
                  <p className="text-2xl font-bold text-green-900">{agentStats.totalTasksCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-700">Time Saved</p>
                  <p className="text-2xl font-bold text-purple-900">{agentStats.totalTimeSaved}h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-yellow-700">Efficiency</p>
                  <p className="text-2xl font-bold text-yellow-900">{Math.round(agentStats.avgEfficiency)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Savings Highlight */}
        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-900">AI ROI Dashboard</h3>
                  <p className="text-emerald-700">Your AI agents have saved <span className="font-bold">${agentStats.totalCostSaved.toLocaleString()}</span> in operational costs this month</p>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                +{Math.round(agentStats.avgEfficiency)}% Productivity
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/20">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Type Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Type:</span>
              <div className="flex items-center space-x-1">
                {typeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedType(option.value)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedType === option.value
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {option.label} ({option.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
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
          </div>
        </CardContent>
      </Card>

      {/* AI Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => {
          const TypeIcon = agentTypeIcons[agent.type]
          const currentTask = agent.currentTask ? tasks.find(t => t.id === agent.currentTask) : null
          
          return (
            <Card key={agent.id} className="bg-white/70 backdrop-blur-md border border-white/20 hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <TypeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <Badge className={agentTypeColors[agent.type]}>
                        {agent.type.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(agent.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(agent.status)}
                      <span>{agent.status}</span>
                    </div>
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Battery className="w-4 h-4" />
                    <span>{agent.efficiency}%</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Current Task */}
                {currentTask && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-blue-900">Current Task</span>
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        {currentTask.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-700 truncate">{currentTask.title}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-blue-600">
                      <span>Progress</span>
                      <span>{Math.round((currentTask.actualHours / currentTask.estimatedHours) * 100)}%</span>
                    </div>
                  </div>
                )}

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Completed</span>
                    </div>
                    <p className="text-sm font-medium">{agent.tasksCompleted}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">In Progress</span>
                    </div>
                    <p className="text-sm font-medium">{agent.tasksInProgress}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Time Saved</span>
                    </div>
                    <p className="text-sm font-medium">{agent.timesSaved}h</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Cost Saved</span>
                    </div>
                    <p className="text-sm font-medium">${agent.costSaved}</p>
                  </div>
                </div>

                {/* Efficiency Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Efficiency</span>
                    <span className="text-sm font-medium">{agent.efficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        agent.efficiency >= 80 ? "bg-gradient-to-r from-green-400 to-green-600" :
                        agent.efficiency >= 60 ? "bg-gradient-to-r from-yellow-400 to-yellow-600" :
                        "bg-gradient-to-r from-red-400 to-red-600"
                      }`}
                      style={{ width: `${agent.efficiency}%` }}
                    />
                  </div>
                </div>

                {/* Capabilities */}
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-700">Capabilities</span>
                  <div className="flex flex-wrap gap-1">
                    {agent.capabilities.slice(0, 3).map((capability) => (
                      <Badge key={capability} variant="outline" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                    {agent.capabilities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{agent.capabilities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center space-x-2">
                  {agent.status === "idle" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAgentAction(agent.id, "start")}
                      className="flex-1 text-green-600 border-green-200 hover:bg-green-50"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                  {agent.status === "working" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAgentAction(agent.id, "pause")}
                      className="flex-1 text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                    >
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Monitor
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredAgents.length === 0 && (
        <Card className="bg-white/70 backdrop-blur-md border border-white/20">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No AI agents found</h3>
            <p className="text-gray-600 mb-4">
              Deploy your first AI agent to start automating your workflow
            </p>
            <Button onClick={onCreateAgent} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Deploy Agent
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}