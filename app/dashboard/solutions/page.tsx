"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Clock, TrendingUp, Zap, Play, Pause, CheckCircle, AlertCircle } from "lucide-react"
import { SolutionFilters } from "@/components/dashboard/solutions/solution-filters"
import { SolutionDetailModal } from "@/components/dashboard/solutions/solution-detail-modal"
import { CreateSolutionModal } from "@/components/dashboard/create-solution-modal"

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

const mockSolutions: Solution[] = [
  {
    id: "1",
    name: "Customer Support AI Chatbot",
    description: "Automated customer service solution using natural language processing",
    tags: ["AI", "Customer Service", "Automation"],
    status: "In-progress",
    progress: 75,
    timeSaved: "15 hrs/week",
    automationLevel: 85,
    createdAt: "2024-01-15",
    estimatedCompletion: "2024-02-01",
    complexity: "Intermediate",
    type: "AI",
  },
  {
    id: "2",
    name: "Supply Chain Blockchain Tracker",
    description: "Transparent supply chain management with blockchain verification",
    tags: ["Blockchain", "Supply Chain", "Transparency"],
    status: "Completed",
    progress: 100,
    timeSaved: "25 hrs/week",
    automationLevel: 95,
    createdAt: "2023-12-01",
    estimatedCompletion: "2024-01-10",
    complexity: "Advanced",
    type: "Blockchain",
  },
  {
    id: "3",
    name: "Smart Contract Payment System",
    description: "Automated payment processing with AI fraud detection",
    tags: ["Hybrid", "Payments", "Security"],
    status: "Planning",
    progress: 20,
    timeSaved: "30 hrs/week",
    automationLevel: 90,
    createdAt: "2024-01-20",
    estimatedCompletion: "2024-03-15",
    complexity: "Advanced",
    type: "Hybrid",
  },
  {
    id: "4",
    name: "Inventory Management AI",
    description: "Predictive inventory optimization using machine learning",
    tags: ["AI", "Inventory", "Optimization"],
    status: "In-progress",
    progress: 45,
    timeSaved: "12 hrs/week",
    automationLevel: 70,
    createdAt: "2024-01-10",
    estimatedCompletion: "2024-02-20",
    complexity: "Intermediate",
    type: "AI",
  },
  {
    id: "5",
    name: "Document Verification System",
    description: "Blockchain-based document authenticity verification",
    tags: ["Blockchain", "Verification", "Security"],
    status: "Paused",
    progress: 60,
    timeSaved: "8 hrs/week",
    automationLevel: 80,
    createdAt: "2023-11-15",
    estimatedCompletion: "2024-02-28",
    complexity: "Beginner",
    type: "Blockchain",
  },
  {
    id: "6",
    name: "Marketing Campaign Optimizer",
    description: "AI-powered campaign optimization with blockchain attribution",
    tags: ["Hybrid", "Marketing", "Analytics"],
    status: "Completed",
    progress: 100,
    timeSaved: "20 hrs/week",
    automationLevel: 88,
    createdAt: "2023-10-01",
    estimatedCompletion: "2023-12-15",
    complexity: "Intermediate",
    type: "Hybrid",
  },
]

export default function SolutionsPage() {
  const [solutions] = useState<Solution[]>(mockSolutions)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedComplexity, setSelectedComplexity] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "In-progress":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "Paused":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "AI":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Blockchain":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Hybrid":
        return "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredSolutions = solutions.filter((solution) => {
    const matchesSearch =
      solution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      solution.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || solution.status.toLowerCase() === selectedStatus
    const matchesType = selectedType === "all" || solution.type === selectedType
    const matchesComplexity = selectedComplexity === "all" || solution.complexity === selectedComplexity

    return matchesSearch && matchesStatus && matchesType && matchesComplexity
  })

  const activeFiltersCount = [selectedStatus, selectedType, selectedComplexity].filter((f) => f !== "all").length

  const clearFilters = () => {
    setSelectedStatus("all")
    setSelectedType("all")
    setSelectedComplexity("all")
    setSearchQuery("")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Solutions</h1>
          <p className="text-gray-600 mt-1">Manage and track your AI & Blockchain solutions</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Solution
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Solutions</p>
                <p className="text-2xl font-bold text-gray-900">{solutions.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-orange-600">
                  {solutions.filter((s) => s.status === "In-progress").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {solutions.filter((s) => s.status === "Completed").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time Saved</p>
                <p className="text-2xl font-bold text-purple-600">110 hrs/week</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <SolutionFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedComplexity={selectedComplexity}
        onComplexityChange={setSelectedComplexity}
        sortBy={sortBy}
        onSortChange={setSortBy}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={clearFilters}
      />

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSolutions.map((solution) => (
          <Card
            key={solution.id}
            className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-200 cursor-pointer group"
            onClick={() => setSelectedSolution(solution)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {solution.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{solution.description}</p>
                </div>
                {getStatusIcon(solution.status)}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge className={`text-xs ${getTypeColor(solution.type)}`}>{solution.type}</Badge>
                <Badge className={`text-xs ${getStatusColor(solution.status)}`}>{solution.status}</Badge>
                <Badge variant="outline" className="text-xs">
                  {solution.complexity}
                </Badge>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{solution.progress}%</span>
                </div>
                <Progress value={solution.progress} className="h-2" />
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Time Saved</p>
                  <p className="font-semibold text-green-600">{solution.timeSaved}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Automation</p>
                  <p className="font-semibold text-blue-600">{solution.automationLevel}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredSolutions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No solutions found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or create a new solution</p>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Solution
          </Button>
        </div>
      )}

      {/* Modals */}
      {selectedSolution && (
        <SolutionDetailModal
          solution={selectedSolution}
          isOpen={!!selectedSolution}
          onClose={() => setSelectedSolution(null)}
        />
      )}

      {showCreateModal && <CreateSolutionModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />}
    </div>
  )
}
