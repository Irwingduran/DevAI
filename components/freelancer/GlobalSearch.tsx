"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search,
  Filter,
  Calendar,
  User,
  Briefcase,
  CheckSquare,
  MessageSquare,
  FileText,
  DollarSign,
  Clock,
  ArrowRight,
  X,
  Loader2,
  History,
  TrendingUp
} from "lucide-react"
import type { Project, Client, Task, Communication, Payment, Invoice } from "@/types/freelancer"

interface SearchResult {
  id: string
  type: 'project' | 'client' | 'task' | 'communication' | 'payment' | 'invoice'
  title: string
  subtitle?: string
  description: string
  metadata: Record<string, any>
  relevance: number
  createdAt: string
}

interface SearchFilters {
  types: string[]
  dateRange: {
    start: string | null
    end: string | null
  }
  status: string[]
  clients: string[]
  projects: string[]
}

interface GlobalSearchProps {
  projects: Project[]
  clients: Client[]
  tasks: Task[]
  communications: Communication[]
  payments: Payment[]
  invoices: Invoice[]
  onResultClick: (result: SearchResult) => void
  onClose: () => void
  className?: string
}

export function GlobalSearch({
  projects,
  clients,
  tasks,
  communications,
  payments,
  invoices,
  onResultClick,
  onClose,
  className = ""
}: GlobalSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showFilters, setShowFilters] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    types: [],
    dateRange: { start: null, end: null },
    status: [],
    clients: [],
    projects: []
  })

  const searchInputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const typeIcons = {
    project: Briefcase,
    client: User,
    task: CheckSquare,
    communication: MessageSquare,
    payment: DollarSign,
    invoice: FileText
  }

  const typeColors = {
    project: "bg-blue-100 text-blue-800",
    client: "bg-green-100 text-green-800", 
    task: "bg-yellow-100 text-yellow-800",
    communication: "bg-purple-100 text-purple-800",
    payment: "bg-emerald-100 text-emerald-800",
    invoice: "bg-orange-100 text-orange-800"
  }

  useEffect(() => {
    searchInputRef.current?.focus()
    
    const savedSearches = localStorage.getItem('freelancer-recent-searches')
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  useEffect(() => {
    if (query.trim().length > 2) {
      performSearch()
    } else {
      setResults([])
    }
  }, [query, filters])

  const performSearch = async () => {
    setIsLoading(true)
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const searchResults: SearchResult[] = []
    const lowerQuery = query.toLowerCase()

    // Search projects
    if (filters.types.length === 0 || filters.types.includes('project')) {
      projects.forEach(project => {
        let relevance = 0
        let matchedFields: string[] = []

        if (project.name.toLowerCase().includes(lowerQuery)) {
          relevance += 10
          matchedFields.push('name')
        }
        if (project.description.toLowerCase().includes(lowerQuery)) {
          relevance += 8
          matchedFields.push('description')
        }
        if (project.status.toLowerCase().includes(lowerQuery)) {
          relevance += 5
          matchedFields.push('status')
        }
        if (project.phase.toLowerCase().includes(lowerQuery)) {
          relevance += 5
          matchedFields.push('phase')
        }

        if (relevance > 0) {
          const client = clients.find(c => c.id === project.clientId)
          searchResults.push({
            id: project.id,
            type: 'project',
            title: project.name,
            subtitle: client?.name,
            description: project.description,
            metadata: {
              status: project.status,
              phase: project.phase,
              progress: project.metrics.progress,
              budget: project.budget.amount,
              matchedFields
            },
            relevance,
            createdAt: project.createdAt
          })
        }
      })
    }

    // Search clients
    if (filters.types.length === 0 || filters.types.includes('client')) {
      clients.forEach(client => {
        let relevance = 0
        let matchedFields: string[] = []

        if (client.name.toLowerCase().includes(lowerQuery)) {
          relevance += 10
          matchedFields.push('name')
        }
        if (client.email.toLowerCase().includes(lowerQuery)) {
          relevance += 8
          matchedFields.push('email')
        }
        if (client.company?.toLowerCase().includes(lowerQuery)) {
          relevance += 8
          matchedFields.push('company')
        }
        if (client.notes.toLowerCase().includes(lowerQuery)) {
          relevance += 6
          matchedFields.push('notes')
        }

        if (relevance > 0) {
          searchResults.push({
            id: client.id,
            type: 'client',
            title: client.name,
            subtitle: client.company,
            description: client.notes,
            metadata: {
              status: client.status,
              email: client.email,
              totalSpent: client.totalSpent,
              rating: client.rating,
              matchedFields
            },
            relevance,
            createdAt: client.createdAt
          })
        }
      })
    }

    // Search tasks
    if (filters.types.length === 0 || filters.types.includes('task')) {
      tasks.forEach(task => {
        let relevance = 0
        let matchedFields: string[] = []

        if (task.title.toLowerCase().includes(lowerQuery)) {
          relevance += 10
          matchedFields.push('title')
        }
        if (task.description.toLowerCase().includes(lowerQuery)) {
          relevance += 8
          matchedFields.push('description')
        }
        if (task.status.toLowerCase().includes(lowerQuery)) {
          relevance += 5
          matchedFields.push('status')
        }
        if (task.priority.toLowerCase().includes(lowerQuery)) {
          relevance += 5
          matchedFields.push('priority')
        }

        if (relevance > 0) {
          searchResults.push({
            id: task.id,
            type: 'task',
            title: task.title,
            subtitle: `${task.status} • ${task.priority} priority`,
            description: task.description,
            metadata: {
              status: task.status,
              priority: task.priority,
              estimatedHours: task.estimatedHours,
              actualHours: task.actualHours,
              assignee: task.assignee,
              matchedFields
            },
            relevance,
            createdAt: task.completedAt || new Date().toISOString()
          })
        }
      })
    }

    // Search communications
    if (filters.types.length === 0 || filters.types.includes('communication')) {
      communications.forEach(comm => {
        let relevance = 0
        let matchedFields: string[] = []

        if (comm.content.toLowerCase().includes(lowerQuery)) {
          relevance += 10
          matchedFields.push('content')
        }
        if (comm.subject?.toLowerCase().includes(lowerQuery)) {
          relevance += 8
          matchedFields.push('subject')
        }
        if (comm.type.toLowerCase().includes(lowerQuery)) {
          relevance += 5
          matchedFields.push('type')
        }

        if (relevance > 0) {
          const project = projects.find(p => p.id === comm.projectId)
          searchResults.push({
            id: comm.id,
            type: 'communication',
            title: comm.subject || `${comm.type} message`,
            subtitle: project?.name,
            description: comm.content,
            metadata: {
              type: comm.type,
              participants: comm.participants,
              timestamp: comm.timestamp,
              aiGenerated: comm.aiGenerated,
              matchedFields
            },
            relevance,
            createdAt: comm.timestamp
          })
        }
      })
    }

    // Search payments
    if (filters.types.length === 0 || filters.types.includes('payment')) {
      payments.forEach(payment => {
        let relevance = 0
        let matchedFields: string[] = []

        if (payment.description.toLowerCase().includes(lowerQuery)) {
          relevance += 10
          matchedFields.push('description')
        }
        if (payment.status.toLowerCase().includes(lowerQuery)) {
          relevance += 8
          matchedFields.push('status')
        }
        if (payment.type.toLowerCase().includes(lowerQuery)) {
          relevance += 6
          matchedFields.push('type')
        }

        if (relevance > 0) {
          const project = projects.find(p => p.id === payment.projectId)
          const client = clients.find(c => c.id === payment.clientId)
          searchResults.push({
            id: payment.id,
            type: 'payment',
            title: payment.description,
            subtitle: `${client?.name} • ${project?.name}`,
            description: `$${payment.amount} ${payment.status}`,
            metadata: {
              amount: payment.amount,
              status: payment.status,
              type: payment.type,
              dueDate: payment.dueDate,
              paidDate: payment.paidDate,
              matchedFields
            },
            relevance,
            createdAt: payment.paidDate || payment.dueDate
          })
        }
      })
    }

    // Search invoices
    if (filters.types.length === 0 || filters.types.includes('invoice')) {
      invoices.forEach(invoice => {
        let relevance = 0
        let matchedFields: string[] = []

        if (invoice.number.toLowerCase().includes(lowerQuery)) {
          relevance += 10
          matchedFields.push('number')
        }
        if (invoice.status.toLowerCase().includes(lowerQuery)) {
          relevance += 8
          matchedFields.push('status')
        }
        if (invoice.notes?.toLowerCase().includes(lowerQuery)) {
          relevance += 6
          matchedFields.push('notes')
        }

        if (relevance > 0) {
          const project = projects.find(p => p.id === invoice.projectId)
          const client = clients.find(c => c.id === invoice.clientId)
          searchResults.push({
            id: invoice.id,
            type: 'invoice',
            title: invoice.number,
            subtitle: `${client?.name} • ${project?.name}`,
            description: `$${invoice.total} ${invoice.status}`,
            metadata: {
              total: invoice.total,
              status: invoice.status,
              issueDate: invoice.issueDate,
              dueDate: invoice.dueDate,
              paidAt: invoice.paidAt,
              matchedFields
            },
            relevance,
            createdAt: invoice.issueDate
          })
        }
      })
    }

    // Sort by relevance and date
    const sortedResults = searchResults
      .sort((a, b) => {
        if (a.relevance !== b.relevance) {
          return b.relevance - a.relevance
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      .slice(0, 20) // Limit to 20 results

    setResults(sortedResults)
    setSelectedIndex(-1)
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, -1))
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleResultClick(results[selectedIndex])
      }
      return
    }
  }

  const handleResultClick = (result: SearchResult) => {
    // Save to recent searches
    const newRecentSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5)
    setRecentSearches(newRecentSearches)
    localStorage.setItem('freelancer-recent-searches', JSON.stringify(newRecentSearches))

    onResultClick(result)
  }

  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery)
  }

  const clearFilters = () => {
    setFilters({
      types: [],
      dateRange: { start: null, end: null },
      status: [],
      clients: [],
      projects: []
    })
  }

  const getResultIcon = (type: string) => {
    const Icon = typeIcons[type as keyof typeof typeIcons]
    return Icon ? <Icon className="w-4 h-4" /> : <Search className="w-4 h-4" />
  }

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50 ${className}`}>
      <Card className="w-full max-w-3xl mx-4 bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search projects, clients, tasks, payments..."
                className="w-full pl-10 pr-4 py-3 text-lg border-0 focus:ring-0 focus:outline-none bg-transparent"
              />
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 animate-spin" />
              )}
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Types</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(typeIcons).map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          types: prev.types.includes(type) 
                            ? prev.types.filter(t => t !== type)
                            : [...prev.types, type]
                        }))
                      }}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        filters.types.includes(type)
                          ? typeColors[type as keyof typeof typeColors]
                          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : v) && 
                    "Active filters applied"}
                </span>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-0 max-h-96 overflow-y-auto">
          {query.trim().length <= 2 && recentSearches.length > 0 && (
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <History className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">Recent searches</span>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-900">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim().length > 2 && results.length === 0 && !isLoading && (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">No results found</p>
              <p className="text-sm">Try adjusting your search terms or filters</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="p-2">
              <div className="flex items-center justify-between px-2 py-2 text-sm text-gray-600">
                <span>{results.length} results found</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Sorted by relevance</span>
                </div>
              </div>
              {results.map((result, index) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedIndex === index ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${typeColors[result.type]}`}>
                      {getResultIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900 truncate">
                          {result.title}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {result.type}
                        </Badge>
                      </div>
                      {result.subtitle && (
                        <p className="text-sm text-gray-600 mt-1">{result.subtitle}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {result.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                        <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                        {result.metadata.matchedFields && (
                          <span>
                            Matched: {result.metadata.matchedFields.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <div className="p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>Advanced search powered by AI</span>
        </div>
      </Card>
    </div>
  )
}