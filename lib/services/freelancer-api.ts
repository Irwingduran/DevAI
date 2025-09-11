"use client"

import type {
  FreelancerProfile,
  Project,
  Client,
  Payment,
  Invoice,
  AIAgent,
  Notification,
  Communication,
  Task,
  DashboardMetrics
} from "@/types/freelancer"

// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.your-domain.com' 
  : 'http://localhost:3001/api'

const API_VERSION = 'v1'
const BASE_URL = `${API_BASE_URL}/${API_VERSION}`

// Types for API responses
interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface ApiError {
  success: false
  error: string
  code?: number
  details?: any
}

// Utility function for making API requests
class FreelancerApiClient {
  private baseURL: string
  private authToken: string | null = null

  constructor() {
    this.baseURL = BASE_URL
    this.authToken = typeof window !== 'undefined' 
      ? localStorage.getItem('freelancer-auth-token') 
      : null
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (this.authToken) {
      defaultHeaders['Authorization'] = `Bearer ${this.authToken}`
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const error: ApiError = await response.json()
        throw new Error(error.error || `HTTP ${response.status}`)
      }

      const data: ApiResponse<T> = await response.json()
      return data
    } catch (error) {
      console.error('API request failed:', error)
      
      // For demo purposes, return mock data when API fails
      return this.getMockData<T>(endpoint)
    }
  }

  private getMockData<T>(endpoint: string): ApiResponse<T> {
    // Return appropriate mock data based on endpoint
    console.log('Using mock data for:', endpoint)
    
    // This would contain your mock data logic
    const mockResponses: Record<string, any> = {
      '/freelancer/profile': {
        data: {
          id: "freelancer-1",
          email: "developer@agency.com",
          name: "Alex Johnson",
          skills: [],
          hourlyRate: 85,
          availability: { hoursPerWeek: 40, schedule: {}, vacations: [] },
          rating: 4.9,
          completedProjects: 47,
          totalEarnings: 124500,
          timezone: "UTC-8",
          languages: ["English", "Spanish"],
          certifications: [],
          portfolio: [],
          paymentMethods: [],
          createdAt: "2022-01-15T00:00:00Z",
          updatedAt: new Date().toISOString()
        },
        success: true
      }
    }

    return mockResponses[endpoint] || { data: {} as T, success: true }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async patch<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  setAuthToken(token: string) {
    this.authToken = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('freelancer-auth-token', token)
    }
  }

  clearAuthToken() {
    this.authToken = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('freelancer-auth-token')
    }
  }
}

// Create a singleton instance
const apiClient = new FreelancerApiClient()

// Freelancer Profile API
export const freelancerProfileApi = {
  getProfile: async (): Promise<FreelancerProfile> => {
    const response = await apiClient.get<FreelancerProfile>('/freelancer/profile')
    return response.data
  },

  updateProfile: async (updates: Partial<FreelancerProfile>): Promise<FreelancerProfile> => {
    const response = await apiClient.patch<FreelancerProfile>('/freelancer/profile', updates)
    return response.data
  },

  uploadAvatar: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData()
    formData.append('avatar', file)
    
    const response = await fetch(`${BASE_URL}/freelancer/profile/avatar`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${apiClient.authToken}`
      }
    })
    
    return response.json()
  }
}

// Projects API
export const projectsApi = {
  getProjects: async (filters?: {
    status?: string
    clientId?: string
    limit?: number
    offset?: number
  }): Promise<{ projects: Project[], total: number }> => {
    const queryParams = new URLSearchParams()
    if (filters?.status) queryParams.append('status', filters.status)
    if (filters?.clientId) queryParams.append('clientId', filters.clientId)
    if (filters?.limit) queryParams.append('limit', filters.limit.toString())
    if (filters?.offset) queryParams.append('offset', filters.offset.toString())

    const response = await apiClient.get<{ projects: Project[], total: number }>(
      `/projects?${queryParams.toString()}`
    )
    return response.data
  },

  getProject: async (projectId: string): Promise<Project> => {
    const response = await apiClient.get<Project>(`/projects/${projectId}`)
    return response.data
  },

  createProject: async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    const response = await apiClient.post<Project>('/projects', project)
    return response.data
  },

  updateProject: async (projectId: string, updates: Partial<Project>): Promise<Project> => {
    const response = await apiClient.patch<Project>(`/projects/${projectId}`, updates)
    return response.data
  },

  deleteProject: async (projectId: string): Promise<void> => {
    await apiClient.delete(`/projects/${projectId}`)
  },

  updateProjectStatus: async (projectId: string, status: string): Promise<Project> => {
    const response = await apiClient.patch<Project>(`/projects/${projectId}/status`, { status })
    return response.data
  }
}

// Clients API
export const clientsApi = {
  getClients: async (filters?: {
    status?: string
    limit?: number
    offset?: number
  }): Promise<{ clients: Client[], total: number }> => {
    const queryParams = new URLSearchParams()
    if (filters?.status) queryParams.append('status', filters.status)
    if (filters?.limit) queryParams.append('limit', filters.limit.toString())
    if (filters?.offset) queryParams.append('offset', filters.offset.toString())

    const response = await apiClient.get<{ clients: Client[], total: number }>(
      `/clients?${queryParams.toString()}`
    )
    return response.data
  },

  getClient: async (clientId: string): Promise<Client> => {
    const response = await apiClient.get<Client>(`/clients/${clientId}`)
    return response.data
  },

  createClient: async (client: Omit<Client, 'id' | 'createdAt' | 'lastContact'>): Promise<Client> => {
    const response = await apiClient.post<Client>('/clients', client)
    return response.data
  },

  updateClient: async (clientId: string, updates: Partial<Client>): Promise<Client> => {
    const response = await apiClient.patch<Client>(`/clients/${clientId}`, updates)
    return response.data
  },

  deleteClient: async (clientId: string): Promise<void> => {
    await apiClient.delete(`/clients/${clientId}`)
  }
}

// Payments API
export const paymentsApi = {
  getPayments: async (filters?: {
    status?: string
    projectId?: string
    clientId?: string
    limit?: number
    offset?: number
  }): Promise<{ payments: Payment[], total: number }> => {
    const queryParams = new URLSearchParams()
    if (filters?.status) queryParams.append('status', filters.status)
    if (filters?.projectId) queryParams.append('projectId', filters.projectId)
    if (filters?.clientId) queryParams.append('clientId', filters.clientId)
    if (filters?.limit) queryParams.append('limit', filters.limit.toString())
    if (filters?.offset) queryParams.append('offset', filters.offset.toString())

    const response = await apiClient.get<{ payments: Payment[], total: number }>(
      `/payments?${queryParams.toString()}`
    )
    return response.data
  },

  getPayment: async (paymentId: string): Promise<Payment> => {
    const response = await apiClient.get<Payment>(`/payments/${paymentId}`)
    return response.data
  },

  createPayment: async (payment: Omit<Payment, 'id'>): Promise<Payment> => {
    const response = await apiClient.post<Payment>('/payments', payment)
    return response.data
  },

  updatePayment: async (paymentId: string, updates: Partial<Payment>): Promise<Payment> => {
    const response = await apiClient.patch<Payment>(`/payments/${paymentId}`, updates)
    return response.data
  },

  processPayment: async (paymentId: string): Promise<{ success: boolean, transactionId: string }> => {
    const response = await apiClient.post<{ success: boolean, transactionId: string }>(
      `/payments/${paymentId}/process`, {}
    )
    return response.data
  }
}

// Invoices API
export const invoicesApi = {
  getInvoices: async (filters?: {
    status?: string
    projectId?: string
    clientId?: string
    limit?: number
    offset?: number
  }): Promise<{ invoices: Invoice[], total: number }> => {
    const queryParams = new URLSearchParams()
    if (filters?.status) queryParams.append('status', filters.status)
    if (filters?.projectId) queryParams.append('projectId', filters.projectId)
    if (filters?.clientId) queryParams.append('clientId', filters.clientId)
    if (filters?.limit) queryParams.append('limit', filters.limit.toString())
    if (filters?.offset) queryParams.append('offset', filters.offset.toString())

    const response = await apiClient.get<{ invoices: Invoice[], total: number }>(
      `/invoices?${queryParams.toString()}`
    )
    return response.data
  },

  getInvoice: async (invoiceId: string): Promise<Invoice> => {
    const response = await apiClient.get<Invoice>(`/invoices/${invoiceId}`)
    return response.data
  },

  createInvoice: async (invoice: Omit<Invoice, 'id' | 'number'>): Promise<Invoice> => {
    const response = await apiClient.post<Invoice>('/invoices', invoice)
    return response.data
  },

  updateInvoice: async (invoiceId: string, updates: Partial<Invoice>): Promise<Invoice> => {
    const response = await apiClient.patch<Invoice>(`/invoices/${invoiceId}`, updates)
    return response.data
  },

  sendInvoice: async (invoiceId: string): Promise<{ success: boolean, sentAt: string }> => {
    const response = await apiClient.post<{ success: boolean, sentAt: string }>(
      `/invoices/${invoiceId}/send`, {}
    )
    return response.data
  },

  generatePDF: async (invoiceId: string): Promise<{ pdfUrl: string }> => {
    const response = await apiClient.get<{ pdfUrl: string }>(`/invoices/${invoiceId}/pdf`)
    return response.data
  }
}

// AI Agents API
export const aiAgentsApi = {
  getAgents: async (): Promise<AIAgent[]> => {
    const response = await apiClient.get<AIAgent[]>('/ai-agents')
    return response.data
  },

  getAgent: async (agentId: string): Promise<AIAgent> => {
    const response = await apiClient.get<AIAgent>(`/ai-agents/${agentId}`)
    return response.data
  },

  createAgent: async (agent: Omit<AIAgent, 'id'>): Promise<AIAgent> => {
    const response = await apiClient.post<AIAgent>('/ai-agents', agent)
    return response.data
  },

  updateAgent: async (agentId: string, updates: Partial<AIAgent>): Promise<AIAgent> => {
    const response = await apiClient.patch<AIAgent>(`/ai-agents/${agentId}`, updates)
    return response.data
  },

  deployAgent: async (agentId: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>(`/ai-agents/${agentId}/deploy`, {})
    return response.data
  },

  pauseAgent: async (agentId: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>(`/ai-agents/${agentId}/pause`, {})
    return response.data
  },

  assignTask: async (agentId: string, taskId: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>(
      `/ai-agents/${agentId}/assign-task`, { taskId }
    )
    return response.data
  }
}

// Notifications API
export const notificationsApi = {
  getNotifications: async (filters?: {
    read?: boolean
    type?: string
    limit?: number
    offset?: number
  }): Promise<{ notifications: Notification[], total: number }> => {
    const queryParams = new URLSearchParams()
    if (filters?.read !== undefined) queryParams.append('read', filters.read.toString())
    if (filters?.type) queryParams.append('type', filters.type)
    if (filters?.limit) queryParams.append('limit', filters.limit.toString())
    if (filters?.offset) queryParams.append('offset', filters.offset.toString())

    const response = await apiClient.get<{ notifications: Notification[], total: number }>(
      `/notifications?${queryParams.toString()}`
    )
    return response.data
  },

  markAsRead: async (notificationId: string): Promise<Notification> => {
    const response = await apiClient.patch<Notification>(
      `/notifications/${notificationId}`, { read: true, readAt: new Date().toISOString() }
    )
    return response.data
  },

  markAllAsRead: async (): Promise<{ success: boolean, updated: number }> => {
    const response = await apiClient.patch<{ success: boolean, updated: number }>(
      '/notifications/mark-all-read', {}
    )
    return response.data
  },

  deleteNotification: async (notificationId: string): Promise<void> => {
    await apiClient.delete(`/notifications/${notificationId}`)
  }
}

// Tasks API
export const tasksApi = {
  getTasks: async (filters?: {
    status?: string
    assignee?: string
    projectId?: string
    priority?: string
    limit?: number
    offset?: number
  }): Promise<{ tasks: Task[], total: number }> => {
    const queryParams = new URLSearchParams()
    if (filters?.status) queryParams.append('status', filters.status)
    if (filters?.assignee) queryParams.append('assignee', filters.assignee)
    if (filters?.projectId) queryParams.append('projectId', filters.projectId)
    if (filters?.priority) queryParams.append('priority', filters.priority)
    if (filters?.limit) queryParams.append('limit', filters.limit.toString())
    if (filters?.offset) queryParams.append('offset', filters.offset.toString())

    const response = await apiClient.get<{ tasks: Task[], total: number }>(
      `/tasks?${queryParams.toString()}`
    )
    return response.data
  },

  getTask: async (taskId: string): Promise<Task> => {
    const response = await apiClient.get<Task>(`/tasks/${taskId}`)
    return response.data
  },

  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await apiClient.post<Task>('/tasks', task)
    return response.data
  },

  updateTask: async (taskId: string, updates: Partial<Task>): Promise<Task> => {
    const response = await apiClient.patch<Task>(`/tasks/${taskId}`, updates)
    return response.data
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await apiClient.delete(`/tasks/${taskId}`)
  }
}

// Communications API
export const communicationsApi = {
  getCommunications: async (filters?: {
    projectId?: string
    type?: string
    limit?: number
    offset?: number
  }): Promise<{ communications: Communication[], total: number }> => {
    const queryParams = new URLSearchParams()
    if (filters?.projectId) queryParams.append('projectId', filters.projectId)
    if (filters?.type) queryParams.append('type', filters.type)
    if (filters?.limit) queryParams.append('limit', filters.limit.toString())
    if (filters?.offset) queryParams.append('offset', filters.offset.toString())

    const response = await apiClient.get<{ communications: Communication[], total: number }>(
      `/communications?${queryParams.toString()}`
    )
    return response.data
  },

  sendMessage: async (communication: Omit<Communication, 'id' | 'timestamp'>): Promise<Communication> => {
    const response = await apiClient.post<Communication>('/communications', {
      ...communication,
      timestamp: new Date().toISOString()
    })
    return response.data
  }
}

// Dashboard Metrics API
export const metricsApi = {
  getDashboardMetrics: async (timeRange?: string): Promise<DashboardMetrics> => {
    const queryParams = timeRange ? `?timeRange=${timeRange}` : ''
    const response = await apiClient.get<DashboardMetrics>(`/metrics/dashboard${queryParams}`)
    return response.data
  },

  getProjectMetrics: async (projectId: string): Promise<any> => {
    const response = await apiClient.get(`/metrics/projects/${projectId}`)
    return response.data
  },

  getFinancialMetrics: async (timeRange?: string): Promise<any> => {
    const queryParams = timeRange ? `?timeRange=${timeRange}` : ''
    const response = await apiClient.get(`/metrics/financial${queryParams}`)
    return response.data
  }
}

// Authentication API
export const authApi = {
  login: async (email: string, password: string): Promise<{ token: string, user: FreelancerProfile }> => {
    const response = await apiClient.post<{ token: string, user: FreelancerProfile }>(
      '/auth/login', { email, password }
    )
    
    if (response.data.token) {
      apiClient.setAuthToken(response.data.token)
    }
    
    return response.data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout', {})
    apiClient.clearAuthToken()
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post<{ token: string }>('/auth/refresh', {})
    
    if (response.data.token) {
      apiClient.setAuthToken(response.data.token)
    }
    
    return response.data
  },

  resetPassword: async (email: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>('/auth/reset-password', { email })
    return response.data
  }
}

// Search API
export const searchApi = {
  globalSearch: async (query: string, filters?: {
    types?: string[]
    limit?: number
  }): Promise<{
    results: any[]
    total: number
    categories: Record<string, number>
  }> => {
    const response = await apiClient.post<{
      results: any[]
      total: number
      categories: Record<string, number>
    }>('/search', { query, filters })
    
    return response.data
  }
}

// Export the API client for advanced usage
export { apiClient }

// Default export with all APIs
export default {
  freelancerProfile: freelancerProfileApi,
  projects: projectsApi,
  clients: clientsApi,
  payments: paymentsApi,
  invoices: invoicesApi,
  aiAgents: aiAgentsApi,
  notifications: notificationsApi,
  tasks: tasksApi,
  communications: communicationsApi,
  metrics: metricsApi,
  auth: authApi,
  search: searchApi
}