"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building,
  Star,
  DollarSign,
  MessageSquare,
  Video,
  Edit,
  Eye,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Globe,
  Heart,
  Award,
  FileText
} from "lucide-react"
import type { Client, Project } from "@/types/freelancer"

interface ClientManagementProps {
  clients: Client[]
  projects: Project[]
  onClientUpdate: (clientId: string, updates: Partial<Client>) => void
  onCreateClient: () => void
  onContactClient: (clientId: string, method: "email" | "chat" | "video") => void
  className?: string
}

export function ClientManagement({ 
  clients, 
  projects,
  onClientUpdate, 
  onCreateClient,
  onContactClient,
  className = "" 
}: ClientManagementProps) {
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "inactive" | "potential">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "totalSpent" | "lastContact" | "rating">("name")
  const [selectedClient, setSelectedClient] = useState<string | null>(null)

  const enrichedClients = useMemo(() => {
    return clients.map(client => {
      const clientProjects = projects.filter(p => p.clientId === client.id)
      const activeProjects = clientProjects.filter(p => p.status === "active")
      const completedProjects = clientProjects.filter(p => p.status === "completed")
      const totalRevenue = clientProjects.reduce((sum, p) => sum + p.budget.amount, 0)
      const avgProjectValue = clientProjects.length > 0 ? totalRevenue / clientProjects.length : 0
      
      return {
        ...client,
        projectCount: clientProjects.length,
        activeProjects: activeProjects.length,
        completedProjects: completedProjects.length,
        totalRevenue,
        avgProjectValue,
        daysSinceLastContact: Math.floor((new Date().getTime() - new Date(client.lastContact).getTime()) / (1000 * 60 * 60 * 24))
      }
    })
  }, [clients, projects])

  const filteredClients = useMemo(() => {
    return enrichedClients
      .filter(client => {
        const matchesStatus = selectedStatus === "all" || client.status === selectedStatus
        const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()))
        return matchesStatus && matchesSearch
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name)
          case "totalSpent":
            return b.totalRevenue - a.totalRevenue
          case "lastContact":
            return new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime()
          case "rating":
            return b.rating - a.rating
          default:
            return 0
        }
      })
  }, [enrichedClients, selectedStatus, searchTerm, sortBy])

  const clientStats = useMemo(() => {
    const total = clients.length
    const active = clients.filter(c => c.status === "active").length
    const potential = clients.filter(c => c.status === "potential").length
    const totalRevenue = enrichedClients.reduce((sum, c) => sum + c.totalRevenue, 0)
    const avgRating = clients.reduce((sum, c) => sum + c.rating, 0) / clients.length
    const needsAttention = enrichedClients.filter(c => c.daysSinceLastContact > 14).length
    
    return { total, active, potential, totalRevenue, avgRating, needsAttention }
  }, [clients, enrichedClients])

  const getStatusColor = (status: Client["status"]) => {
    const colors = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      potential: "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
    return colors[status]
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ))
  }

  const getContactUrgency = (daysSinceLastContact: number) => {
    if (daysSinceLastContact > 30) return { color: "text-red-600", label: "Urgent" }
    if (daysSinceLastContact > 14) return { color: "text-yellow-600", label: "Soon" }
    return { color: "text-green-600", label: "Recent" }
  }

  const statusOptions = [
    { value: "all" as const, label: "All Clients", count: clients.length },
    { value: "active" as const, label: "Active", count: clients.filter(c => c.status === "active").length },
    { value: "potential" as const, label: "Potential", count: clients.filter(c => c.status === "potential").length },
    { value: "inactive" as const, label: "Inactive", count: clients.filter(c => c.status === "inactive").length }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header and Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
            <p className="text-gray-600">Manage relationships and track client interactions</p>
          </div>
          <Button onClick={onCreateClient} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">{clientStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-xl font-bold text-gray-900">{clientStats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Potential</p>
                  <p className="text-xl font-bold text-gray-900">{clientStats.potential}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-xl font-bold text-gray-900">${clientStats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-xl font-bold text-gray-900">{clientStats.avgRating.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Needs Attention</p>
                  <p className="text-xl font-bold text-gray-900">{clientStats.needsAttention}</p>
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
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "totalSpent" | "lastContact" | "rating")}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="totalSpent">Sort by Revenue</option>
                <option value="lastContact">Sort by Last Contact</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => {
          const contactUrgency = getContactUrgency(client.daysSinceLastContact)
          
          return (
            <Card key={client.id} className="bg-white/70 backdrop-blur-md border border-white/20 hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                      {client.company && (
                        <p className="text-sm text-gray-600">{client.company}</p>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {getRatingStars(client.rating)}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span>{client.timezone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className={`${contactUrgency.color} font-medium`}>
                      Last contact: {client.daysSinceLastContact}d ago ({contactUrgency.label})
                    </span>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Projects</span>
                    </div>
                    <p className="text-sm font-medium">
                      {client.projectCount} total ({client.activeProjects} active)
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Revenue</span>
                    </div>
                    <p className="text-sm font-medium">
                      ${client.totalRevenue.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Avg Project</span>
                    </div>
                    <p className="text-sm font-medium">
                      ${client.avgProjectValue.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Completed</span>
                    </div>
                    <p className="text-sm font-medium">{client.completedProjects}</p>
                  </div>
                </div>

                {/* Communication Preference */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Prefers:</span>
                    <div className="flex items-center space-x-1">
                      {client.communicationPreference === "email" && <Mail className="w-4 h-4 text-blue-600" />}
                      {client.communicationPreference === "chat" && <MessageSquare className="w-4 h-4 text-green-600" />}
                      {client.communicationPreference === "video" && <Video className="w-4 h-4 text-purple-600" />}
                      <span className="text-sm text-gray-600 capitalize">
                        {client.communicationPreference}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onContactClient(client.id, "email")}
                    className="text-xs"
                  >
                    <Mail className="w-3 h-3 mr-1" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onContactClient(client.id, "chat")}
                    className="text-xs"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Chat
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onContactClient(client.id, "video")}
                    className="text-xs"
                  >
                    <Video className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                </div>

                {/* Notes Preview */}
                {client.notes && (
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500 mb-1">Notes</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{client.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <Card className="bg-white/70 backdrop-blur-md border border-white/20">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedStatus !== "all" 
                ? "Try adjusting your filters or search terms" 
                : "Start building relationships by adding your first client"}
            </p>
            <Button onClick={onCreateClient} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}