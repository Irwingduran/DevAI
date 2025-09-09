"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Clock,
  TrendingUp,
  Zap,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react"
import { SolutionFilters } from "@/components/dashboard/solutions/solution-filters"
import { SolutionDetailModal } from "@/components/dashboard/solutions/solution-detail-modal"
import { CreateSolutionModal } from "@/components/dashboard/create-solution-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export interface Solution {
  id: string
  name: string
  description: string
  tags: string[]
  status: "planning" | "in-progress" | "completed" | "paused"
  progress: number
  timeSaved: string
  automationLevel: number
  createdAt: string
  lastUpdated: string
  estimatedCompletion: string
  complexity: "Beginner" | "Intermediate" | "Advanced"
  type: "AI" | "Blockchain" | "Hybrid"
  benefits: string[]
  nextSteps: string[]
  resources: { type: string; title: string; url: string }[]
  notes: { id: string; content: string; timestamp: string; author: string }[]
  wizardData?: any
}

const initialSolutions: Solution[] = [
  {
    id: "1",
    name: "Customer Support AI Chatbot",
    description:
      "Automated customer service solution using natural language processing to handle common inquiries and escalate complex issues to human agents.",
    tags: ["AI", "Customer Service", "Automation", "NLP"],
    status: "in-progress",
    progress: 75,
    timeSaved: "15 hrs/week",
    automationLevel: 85,
    createdAt: "2024-01-15T10:00:00Z",
    lastUpdated: "2024-01-25T14:30:00Z",
    estimatedCompletion: "2024-02-01T00:00:00Z",
    complexity: "Intermediate",
    type: "AI",
    benefits: [
      "24/7 customer support availability",
      "Reduced response time from hours to seconds",
      "Consistent service quality across all interactions",
      "Cost reduction in support staff requirements",
    ],
    nextSteps: [
      "Complete training data preparation",
      "Implement sentiment analysis module",
      "Set up escalation workflows",
      "Conduct user acceptance testing",
    ],
    resources: [
      { type: "video", title: "AI Chatbot Implementation Guide", url: "#" },
      { type: "doc", title: "NLP Best Practices", url: "#" },
      { type: "template", title: "Customer Service Bot Template", url: "#" },
    ],
    notes: [
      {
        id: "n1",
        content: "Initial setup completed. API integration working well. Need to focus on training data quality.",
        timestamp: "2024-01-25T14:30:00Z",
        author: "You",
      },
    ],
  },
  {
    id: "2",
    name: "Supply Chain Blockchain Tracker",
    description:
      "Transparent supply chain management system with blockchain verification for product authenticity and traceability.",
    tags: ["Blockchain", "Supply Chain", "Transparency", "Verification"],
    status: "completed",
    progress: 100,
    timeSaved: "25 hrs/week",
    automationLevel: 95,
    createdAt: "2023-12-01T09:00:00Z",
    lastUpdated: "2024-01-10T16:45:00Z",
    estimatedCompletion: "2024-01-10T00:00:00Z",
    complexity: "Advanced",
    type: "Blockchain",
    benefits: [
      "Complete supply chain visibility",
      "Reduced fraud and counterfeiting",
      "Automated compliance reporting",
      "Enhanced customer trust",
    ],
    nextSteps: [
      "Monitor system performance",
      "Gather user feedback",
      "Plan next phase enhancements",
      "Document lessons learned",
    ],
    resources: [
      { type: "doc", title: "Blockchain Implementation Guide", url: "#" },
      { type: "code", title: "Smart Contract Templates", url: "#" },
      { type: "analytics", title: "Performance Dashboard", url: "#" },
    ],
    notes: [
      {
        id: "n2",
        content:
          "Successfully deployed to production. All stakeholders are satisfied with the transparency improvements.",
        timestamp: "2024-01-10T16:45:00Z",
        author: "You",
      },
    ],
  },
  {
    id: "3",
    name: "Smart Contract Payment System",
    description:
      "Automated payment processing system combining AI fraud detection with blockchain smart contracts for secure transactions.",
    tags: ["Hybrid", "Payments", "Security", "Smart Contracts"],
    status: "planning",
    progress: 20,
    timeSaved: "30 hrs/week",
    automationLevel: 90,
    createdAt: "2024-01-20T11:00:00Z",
    lastUpdated: "2024-01-26T09:15:00Z",
    estimatedCompletion: "2024-03-15T00:00:00Z",
    complexity: "Advanced",
    type: "Hybrid",
    benefits: [
      "Automated payment processing",
      "Real-time fraud detection",
      "Reduced transaction costs",
      "Enhanced security and transparency",
    ],
    nextSteps: [
      "Define technical requirements",
      "Design system architecture",
      "Select blockchain platform",
      "Develop AI fraud detection model",
    ],
    resources: [
      { type: "course", title: "Smart Contract Development", url: "#" },
      { type: "doc", title: "AI Fraud Detection Patterns", url: "#" },
      { type: "template", title: "Payment System Architecture", url: "#" },
    ],
    notes: [
      {
        id: "n3",
        content: "Initial research phase. Evaluating different blockchain platforms and AI models for fraud detection.",
        timestamp: "2024-01-26T09:15:00Z",
        author: "You",
      },
    ],
  },
  {
    id: "4",
    name: "Inventory Management AI",
    description:
      "Predictive inventory optimization system using machine learning to forecast demand and automate reordering processes.",
    tags: ["AI", "Inventory", "Optimization", "Machine Learning"],
    status: "in-progress",
    progress: 45,
    timeSaved: "12 hrs/week",
    automationLevel: 70,
    createdAt: "2024-01-10T08:30:00Z",
    lastUpdated: "2024-01-24T13:20:00Z",
    estimatedCompletion: "2024-02-20T00:00:00Z",
    complexity: "Intermediate",
    type: "AI",
    benefits: [
      "Reduced stockouts and overstock",
      "Automated reordering processes",
      "Improved cash flow management",
      "Better demand forecasting accuracy",
    ],
    nextSteps: [
      "Integrate with existing ERP system",
      "Train ML models with historical data",
      "Set up automated alerts",
      "Create reporting dashboard",
    ],
    resources: [
      { type: "video", title: "ML for Inventory Management", url: "#" },
      { type: "doc", title: "Demand Forecasting Techniques", url: "#" },
      { type: "template", title: "Inventory Optimization Model", url: "#" },
    ],
    notes: [
      {
        id: "n4",
        content: "ML model training is progressing well. Initial tests show 85% accuracy in demand prediction.",
        timestamp: "2024-01-24T13:20:00Z",
        author: "You",
      },
    ],
  },
  {
    id: "5",
    name: "Document Verification System",
    description:
      "Blockchain-based document authenticity verification system for secure document management and validation.",
    tags: ["Blockchain", "Verification", "Security", "Documents"],
    status: "paused",
    progress: 60,
    timeSaved: "8 hrs/week",
    automationLevel: 80,
    createdAt: "2023-11-15T14:00:00Z",
    lastUpdated: "2024-01-15T10:30:00Z",
    estimatedCompletion: "2024-02-28T00:00:00Z",
    complexity: "Beginner",
    type: "Blockchain",
    benefits: [
      "Tamper-proof document storage",
      "Instant verification capabilities",
      "Reduced manual verification time",
      "Enhanced document security",
    ],
    nextSteps: [
      "Resume development activities",
      "Complete user interface design",
      "Implement document upload feature",
      "Set up verification workflows",
    ],
    resources: [
      { type: "doc", title: "Document Verification Best Practices", url: "#" },
      { type: "template", title: "Blockchain Document Storage", url: "#" },
      { type: "code", title: "Verification Smart Contracts", url: "#" },
    ],
    notes: [
      {
        id: "n5",
        content: "Project paused due to resource constraints. Core blockchain functionality is working well.",
        timestamp: "2024-01-15T10:30:00Z",
        author: "You",
      },
    ],
  },
]

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>(initialSolutions)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedComplexity, setSelectedComplexity] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [solutionToDelete, setSolutionToDelete] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Auto-save to localStorage
  useEffect(() => {
    const savedSolutions = localStorage.getItem("dashboard-solutions")
    if (savedSolutions) {
      try {
        setSolutions(JSON.parse(savedSolutions))
      } catch (error) {
        console.error("Error loading solutions from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("dashboard-solutions", JSON.stringify(solutions))
  }, [solutions])

  // Filter and sort solutions
  const filteredAndSortedSolutions = useMemo(() => {
    const filtered = solutions.filter((solution) => {
      const matchesSearch =
        solution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        solution.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        solution.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus = selectedStatus === "all" || solution.status === selectedStatus
      const matchesType = selectedType === "all" || solution.type === selectedType
      const matchesComplexity = selectedComplexity === "all" || solution.complexity === selectedComplexity

      return matchesSearch && matchesStatus && matchesType && matchesComplexity
    })

    // Sort solutions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        case "progress":
          return b.progress - a.progress
        case "name":
          return a.name.localeCompare(b.name)
        case "status":
          const statusOrder = { "in-progress": 0, planning: 1, paused: 2, completed: 3 }
          return statusOrder[a.status] - statusOrder[b.status]
        default:
          return 0
      }
    })

    return filtered
  }, [solutions, searchQuery, selectedStatus, selectedType, selectedComplexity, sortBy])

  // Calculate stats
  const stats = useMemo(() => {
    const totalSolutions = solutions.length
    const inProgress = solutions.filter((s) => s.status === "in-progress").length
    const completed = solutions.filter((s) => s.status === "completed").length
    const totalTimeSaved = solutions.reduce((acc, solution) => {
      const hours = Number.parseInt(solution.timeSaved.split(" ")[0])
      return acc + (isNaN(hours) ? 0 : hours)
    }, 0)

    return { totalSolutions, inProgress, completed, totalTimeSaved }
  }, [solutions])

  const activeFiltersCount =
    [selectedStatus, selectedType, selectedComplexity].filter((f) => f !== "all").length + (searchQuery ? 1 : 0)

  // Solution management functions
  const createSolution = (solutionData: Partial<Solution>) => {
    const newSolution: Solution = {
      id: Date.now().toString(),
      name: solutionData.name || "New Solution",
      description: solutionData.description || "",
      tags: solutionData.tags || [],
      status: "planning",
      progress: 0,
      timeSaved: "0 hrs/week",
      automationLevel: 0,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      complexity: solutionData.complexity || "Beginner",
      type: solutionData.type || "AI",
      benefits: solutionData.benefits || [],
      nextSteps: solutionData.nextSteps || [],
      resources: [],
      notes: [],
      wizardData: solutionData.wizardData,
    }

    setSolutions((prev) => [newSolution, ...prev])
    toast({
      title: "Solution Created",
      description: `${newSolution.name} has been created successfully.`,
    })
    return newSolution
  }

  const updateSolution = (solutionId: string, updates: Partial<Solution>) => {
    setSolutions((prev) =>
      prev.map((solution) =>
        solution.id === solutionId ? { ...solution, ...updates, lastUpdated: new Date().toISOString() } : solution,
      ),
    )

    toast({
      title: "Solution Updated",
      description: "Your changes have been saved successfully.",
    })
  }

  const deleteSolution = (solutionId: string) => {
    const solution = solutions.find((s) => s.id === solutionId)
    setSolutions((prev) => prev.filter((s) => s.id !== solutionId))
    setSolutionToDelete(null)

    toast({
      title: "Solution Deleted",
      description: `${solution?.name} has been deleted successfully.`,
    })
  }

  const updateProgress = (solutionId: string, progress: number) => {
    updateSolution(solutionId, { progress })
  }

  const changeStatus = (solutionId: string, status: Solution["status"]) => {
    updateSolution(solutionId, { status })
  }

  const addNote = (solutionId: string, noteContent: string) => {
    const solution = solutions.find((s) => s.id === solutionId)
    if (!solution) return

    const newNote = {
      id: Date.now().toString(),
      content: noteContent,
      timestamp: new Date().toISOString(),
      author: "You",
    }

    updateSolution(solutionId, {
      notes: [...solution.notes, newNote],
    })
  }

  const clearFilters = () => {
    setSelectedStatus("all")
    setSelectedType("all")
    setSelectedComplexity("all")
    setSearchQuery("")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "planning":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "in-progress":
        return <Play className="w-4 h-4 text-orange-500" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "paused":
        return <Pause className="w-4 h-4 text-gray-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in-progress":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "paused":
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

  const handleSolutionClick = (solution: Solution) => {
    setSelectedSolution(solution)
  }

  const handleCreateSolution = (solutionData: any) => {
    const newSolution = createSolution(solutionData)
    setShowCreateModal(false)
    setSelectedSolution(newSolution)
  }

  const handleContactExpert = (context: any) => {
    toast({
      title: "Expert Contact Request",
      description: "An expert will contact you within 24 hours regarding your solution.",
    })
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
          disabled={isLoading}
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
                <p className="text-2xl font-bold text-gray-900">{stats.totalSolutions}</p>
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
                <p className="text-2xl font-bold text-orange-600">{stats.inProgress}</p>
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
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
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
                <p className="text-2xl font-bold text-purple-600">{stats.totalTimeSaved} hrs/week</p>
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
        {filteredAndSortedSolutions.map((solution) => (
          <Card
            key={solution.id}
            className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-200 cursor-pointer group relative"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1" onClick={() => handleSolutionClick(solution)}>
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {solution.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{solution.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(solution.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleSolutionClick(solution)}>
                        <Edit className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          changeStatus(solution.id, solution.status === "paused" ? "in-progress" : "paused")
                        }
                      >
                        {solution.status === "paused" ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Resume
                          </>
                        ) : (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSolutionToDelete(solution.id)} className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4" onClick={() => handleSolutionClick(solution)}>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge className={`text-xs ${getTypeColor(solution.type)}`}>{solution.type}</Badge>
                <Badge className={`text-xs ${getStatusColor(solution.status)}`}>
                  {solution.status.replace("-", " ")}
                </Badge>
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

              {/* Last Updated */}
              <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                Last updated: {new Date(solution.lastUpdated).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedSolutions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery || activeFiltersCount > 0 ? "No solutions found" : "No solutions yet"}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || activeFiltersCount > 0
              ? "Try adjusting your filters or search terms"
              : "Create your first AI or Blockchain solution to get started"}
          </p>
          {searchQuery || activeFiltersCount > 0 ? (
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          ) : (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Solution
            </Button>
          )}
        </div>
      )}

      {/* Modals */}
      {selectedSolution && (
        <SolutionDetailModal
          solution={selectedSolution}
          isOpen={!!selectedSolution}
          onClose={() => setSelectedSolution(null)}
          onUpdateProgress={updateProgress}
          onAddNote={addNote}
          onContactExpert={handleContactExpert}
          onUpdateSolution={updateSolution}
        />
      )}

      {showCreateModal && (
        <CreateSolutionModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateSolution={handleCreateSolution}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!solutionToDelete} onOpenChange={() => setSolutionToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Solution</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this solution? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => solutionToDelete && deleteSolution(solutionToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
