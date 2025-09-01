"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Clock,
  Eye,
  Pause,
  BarChart3,
  Brain,
  Link,
  Zap,
  AlertTriangle,
  Target,
  TrendingDown,
} from "lucide-react"

interface ProjectsFiltersProps {
  statusFilter: string
  setStatusFilter: (status: string) => void
  typeFilter: string
  setTypeFilter: (type: string) => void
  priorityFilter: string
  setPriorityFilter: (priority: string) => void
}

export function ProjectsFilters({
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  priorityFilter,
  setPriorityFilter,
}: ProjectsFiltersProps) {
  const statusOptions = [
    { value: "all", label: "All Status", icon: BarChart3, count: 12 },
    { value: "in-progress", label: "In Progress", icon: Clock, count: 4 },
    { value: "completed", label: "Completed", icon: CheckCircle, count: 3 },
    { value: "review", label: "In Review", icon: Eye, count: 2 },
    { value: "planning", label: "Planning", icon: Target, count: 2 },
    { value: "on-hold", label: "On Hold", icon: Pause, count: 1 },
  ]

  const typeOptions = [
    { value: "all", label: "All Types", icon: Zap, count: 12 },
    { value: "AI", label: "AI Solutions", icon: Brain, count: 6 },
    { value: "Blockchain", label: "Blockchain", icon: Link, count: 4 },
    { value: "Hybrid", label: "Hybrid", icon: Zap, count: 2 },
  ]

  const priorityOptions = [
    { value: "all", label: "All Priorities", icon: BarChart3, count: 12 },
    { value: "high", label: "High Priority", icon: AlertTriangle, count: 5 },
    { value: "medium", label: "Medium Priority", icon: Target, count: 4 },
    { value: "low", label: "Low Priority", icon: TrendingDown, count: 3 },
  ]

  const clearAllFilters = () => {
    setStatusFilter("all")
    setTypeFilter("all")
    setPriorityFilter("all")
  }

  const hasActiveFilters = statusFilter !== "all" || typeFilter !== "all" || priorityFilter !== "all"

  return (
    <Card className="bg-gray-50/50 border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filter Projects</h3>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Status Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Status</h4>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => {
                const Icon = option.icon
                const isActive = statusFilter === option.value

                return (
                  <Button
                    key={option.value}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter(option.value)}
                    className={`h-auto p-3 flex items-center gap-2 ${
                      isActive ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{option.label}</span>
                    <Badge
                      variant="secondary"
                      className={`ml-1 ${isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      {option.count}
                    </Badge>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Solution Type</h4>
            <div className="flex flex-wrap gap-2">
              {typeOptions.map((option) => {
                const Icon = option.icon
                const isActive = typeFilter === option.value

                return (
                  <Button
                    key={option.value}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTypeFilter(option.value)}
                    className={`h-auto p-3 flex items-center gap-2 ${
                      isActive ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{option.label}</span>
                    <Badge
                      variant="secondary"
                      className={`ml-1 ${isActive ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      {option.count}
                    </Badge>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Priority Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Priority Level</h4>
            <div className="flex flex-wrap gap-2">
              {priorityOptions.map((option) => {
                const Icon = option.icon
                const isActive = priorityFilter === option.value

                return (
                  <Button
                    key={option.value}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPriorityFilter(option.value)}
                    className={`h-auto p-3 flex items-center gap-2 ${
                      isActive ? "bg-orange-600 hover:bg-orange-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{option.label}</span>
                    <Badge
                      variant="secondary"
                      className={`ml-1 ${isActive ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      {option.count}
                    </Badge>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
