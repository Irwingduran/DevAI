"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectCard } from "@/components/dashboard/projects/project-card"
import { ProjectDetailModal } from "@/components/dashboard/projects/project-detail-modal"
import { ProjectsFilters } from "@/components/dashboard/projects/projects-filters"
import { Search, Plus, Filter, BarChart3, Clock, CheckCircle, AlertCircle, TrendingUp, Calendar } from "lucide-react"

interface Project {
  id: string
  name: string // Change from 'title' to 'name'
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
  projectManager: {
    name: string
    avatar: string
    email: string
  }
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

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  // Mock project data
  const projects: Project[] = [
    {
      id: "1",
      name: "AI Customer Support Bot", // Changed from 'title'
      description: "Intelligent chatbot for 24/7 customer service automation",
      status: "in-progress",
      progress: 75,
      type: "AI",
      priority: "high",
      startDate: "2024-01-15",
      estimatedCompletion: "2024-02-28",
      budget: "$15,000",
      team: ["Sarah Chen", "Mike Rodriguez", "AI Specialist"],
      tags: ["Customer Service", "Automation", "NLP"],
      lastUpdate: "2 hours ago",
      client: "TechCorp Solutions",
      projectManager: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "sarah.chen@company.com",
      },
      timeline: [
        {
          phase: "Requirements Gathering",
          status: "completed",
          date: "2024-01-15",
          description: "Collected all business requirements and use cases",
        },
        {
          phase: "AI Model Training",
          status: "completed",
          date: "2024-01-22",
          description: "Trained custom NLP model with company data",
        },
        {
          phase: "Integration Development",
          status: "current",
          date: "2024-02-01",
          description: "Building API integrations and chat interface",
        },
        {
          phase: "Testing & Deployment",
          status: "upcoming",
          date: "2024-02-20",
          description: "Quality assurance and production deployment",
        },
      ],
      updates: [
        {
          date: "2024-02-05",
          title: "Integration Progress Update",
          description: "Successfully integrated with existing CRM system. Chat interface 80% complete.",
          type: "update",
        },
        {
          date: "2024-02-03",
          title: "Milestone: API Development Complete",
          description: "All backend APIs are now functional and tested.",
          type: "milestone",
        },
        {
          date: "2024-02-01",
          title: "Minor Delay in UI Components",
          description: "Slight delay due to custom styling requirements. Adjusted timeline by 2 days.",
          type: "issue",
        },
      ],
    },
    {
      id: "2",
      name: "Blockchain Supply Chain Tracker", // Changed from 'title'
      description: "Transparent inventory tracking system using blockchain technology",
      status: "review",
      progress: 90,
      type: "Blockchain",
      priority: "medium",
      startDate: "2023-12-01",
      estimatedCompletion: "2024-02-15",
      budget: "$25,000",
      team: ["Alex Johnson", "Blockchain Dev", "QA Tester"],
      tags: ["Supply Chain", "Transparency", "Smart Contracts"],
      lastUpdate: "1 day ago",
      client: "Global Manufacturing Inc",
      projectManager: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "alex.johnson@company.com",
      },
      timeline: [
        {
          phase: "Blockchain Architecture",
          status: "completed",
          date: "2023-12-01",
          description: "Designed smart contract architecture",
        },
        {
          phase: "Smart Contract Development",
          status: "completed",
          date: "2023-12-15",
          description: "Developed and tested smart contracts",
        },
        {
          phase: "Frontend Integration",
          status: "completed",
          date: "2024-01-10",
          description: "Built user interface and web3 integration",
        },
        {
          phase: "Security Audit",
          status: "current",
          date: "2024-02-01",
          description: "Third-party security audit in progress",
        },
      ],
      updates: [
        {
          date: "2024-02-04",
          title: "Security Audit Results",
          description: "Initial security audit completed with minor recommendations implemented.",
          type: "milestone",
        },
        {
          date: "2024-02-02",
          title: "Performance Optimization",
          description: "Optimized gas costs by 30% through contract improvements.",
          type: "update",
        },
      ],
    },
    {
      id: "3",
      name: "Smart Analytics Dashboard", // Changed from 'title'
      description: "AI-powered business intelligence and predictive analytics platform",
      status: "completed",
      progress: 100,
      type: "AI",
      priority: "high",
      startDate: "2023-11-01",
      estimatedCompletion: "2024-01-31",
      budget: "$20,000",
      team: ["Emma Wilson", "Data Scientist", "Frontend Dev"],
      tags: ["Analytics", "Machine Learning", "Business Intelligence"],
      lastUpdate: "3 days ago",
      client: "RetailMax Corp",
      projectManager: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "emma.wilson@company.com",
      },
      timeline: [
        {
          phase: "Data Pipeline Setup",
          status: "completed",
          date: "2023-11-01",
          description: "Established data collection and processing pipeline",
        },
        {
          phase: "ML Model Development",
          status: "completed",
          date: "2023-11-20",
          description: "Built predictive models for sales forecasting",
        },
        {
          phase: "Dashboard Creation",
          status: "completed",
          date: "2023-12-15",
          description: "Developed interactive dashboard with real-time updates",
        },
        {
          phase: "Deployment & Training",
          status: "completed",
          date: "2024-01-31",
          description: "Deployed to production and trained client team",
        },
      ],
      updates: [
        {
          date: "2024-01-31",
          title: "Project Completed Successfully",
          description: "All deliverables completed. Client training session conducted.",
          type: "milestone",
        },
        {
          date: "2024-01-28",
          title: "Final Testing Complete",
          description: "All user acceptance tests passed. Ready for production deployment.",
          type: "update",
        },
      ],
    },
    {
      id: "4",
      name: "Hybrid Payment Processing System", // Changed from 'title'
      description: "Secure payment system combining AI fraud detection with blockchain verification",
      status: "planning",
      progress: 15,
      type: "Hybrid",
      priority: "high",
      startDate: "2024-02-01",
      estimatedCompletion: "2024-05-15",
      budget: "$35,000",
      team: ["David Park", "Security Expert", "Blockchain Dev"],
      tags: ["Payments", "Security", "Fraud Detection"],
      lastUpdate: "5 hours ago",
      client: "FinanceFlow Ltd",
      projectManager: {
        name: "David Park",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "david.park@company.com",
      },
      timeline: [
        {
          phase: "System Architecture Design",
          status: "current",
          date: "2024-02-01",
          description: "Designing hybrid architecture combining AI and blockchain",
        },
        {
          phase: "AI Model Development",
          status: "upcoming",
          date: "2024-02-20",
          description: "Building fraud detection algorithms",
        },
        {
          phase: "Blockchain Integration",
          status: "upcoming",
          date: "2024-03-15",
          description: "Implementing blockchain verification layer",
        },
        {
          phase: "Testing & Deployment",
          status: "upcoming",
          date: "2024-05-01",
          description: "Comprehensive testing and production deployment",
        },
      ],
      updates: [
        {
          date: "2024-02-05",
          title: "Architecture Review Complete",
          description: "Technical architecture approved by client and security team.",
          type: "milestone",
        },
        {
          date: "2024-02-03",
          title: "Team Assembly",
          description: "Core development team assembled and project kickoff completed.",
          type: "update",
        },
      ],
    },
    {
      id: "5",
      name: "AI Content Generation Platform", // Changed from 'title'
      description: "Automated content creation system for marketing and social media",
      status: "on-hold",
      progress: 40,
      type: "AI",
      priority: "low",
      startDate: "2024-01-01",
      estimatedCompletion: "2024-03-30",
      budget: "$12,000",
      team: ["Lisa Zhang", "Content Strategist"],
      tags: ["Content Creation", "Marketing", "Automation"],
      lastUpdate: "1 week ago",
      client: "Creative Agency Pro",
      projectManager: {
        name: "Lisa Zhang",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "lisa.zhang@company.com",
      },
      timeline: [
        {
          phase: "Content Strategy Development",
          status: "completed",
          date: "2024-01-01",
          description: "Defined content types and generation strategies",
        },
        {
          phase: "AI Model Training",
          status: "completed",
          date: "2024-01-20",
          description: "Trained models on brand-specific content",
        },
        {
          phase: "Platform Development",
          status: "current",
          date: "2024-02-01",
          description: "Building user interface and content management system",
        },
        {
          phase: "Integration & Testing",
          status: "upcoming",
          date: "2024-03-15",
          description: "Social media integrations and quality testing",
        },
      ],
      updates: [
        {
          date: "2024-01-28",
          title: "Project Paused",
          description: "Client requested temporary pause due to budget reallocation. Will resume in March.",
          type: "issue",
        },
        {
          date: "2024-01-25",
          title: "Content Quality Milestone",
          description: "AI-generated content quality meets client standards in initial testing.",
          type: "milestone",
        },
      ],
    },
    {
      id: "6",
      name: "Decentralized Identity Verification", // Changed from 'title'
      description: "Blockchain-based identity verification system for secure authentication",
      status: "in-progress",
      progress: 60,
      type: "Blockchain",
      priority: "medium",
      startDate: "2023-12-15",
      estimatedCompletion: "2024-03-01",
      budget: "$18,000",
      team: ["Robert Kim", "Security Analyst", "Blockchain Dev"],
      tags: ["Identity", "Security", "Decentralization"],
      lastUpdate: "4 hours ago",
      client: "SecureAuth Systems",
      projectManager: {
        name: "Robert Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "robert.kim@company.com",
      },
      timeline: [
        {
          phase: "Identity Protocol Design",
          status: "completed",
          date: "2023-12-15",
          description: "Designed decentralized identity protocol",
        },
        {
          phase: "Smart Contract Development",
          status: "completed",
          date: "2024-01-05",
          description: "Built identity verification smart contracts",
        },
        {
          phase: "SDK Development",
          status: "current",
          date: "2024-01-20",
          description: "Creating developer SDK for easy integration",
        },
        {
          phase: "Security Testing",
          status: "upcoming",
          date: "2024-02-15",
          description: "Comprehensive security and penetration testing",
        },
      ],
      updates: [
        {
          date: "2024-02-05",
          title: "SDK Beta Release",
          description: "Developer SDK beta version released for client testing.",
          type: "milestone",
        },
        {
          date: "2024-02-02",
          title: "Integration Progress",
          description: "Successfully integrated with major identity providers.",
          type: "update",
        },
      ],
    },
  ]

  // Filter projects based on search and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesType = typeFilter === "all" || project.type === typeFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  // Calculate statistics
  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "in-progress").length,
    completed: projects.filter((p) => p.status === "completed").length,
    onHold: projects.filter((p) => p.status === "on-hold").length,
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "on-hold":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default:
        return <BarChart3 className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
          <p className="text-gray-600 mt-1">Track and manage your AI & blockchain solutions</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Export Timeline
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
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

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-purple-600">94%</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search projects, tags, or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {(statusFilter !== "all" || typeFilter !== "all" || priorityFilter !== "all") && (
            <Badge className="ml-2 bg-blue-100 text-blue-700">Active</Badge>
          )}
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <ProjectsFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || statusFilter !== "all" || typeFilter !== "all" || priorityFilter !== "all"
              ? "Try adjusting your search or filters"
              : "You haven't created any projects yet"}
          </p>
          {!searchQuery && statusFilter === "all" && typeFilter === "all" && priorityFilter === "all" && (
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Project
            </Button>
          )}
        </Card>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}
