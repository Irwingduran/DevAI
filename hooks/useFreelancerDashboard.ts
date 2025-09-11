"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import type { 
  FreelancerProfile, 
  Project, 
  Client, 
  DashboardMetrics, 
  Payment,
  AIAgent,
  Notification,
  Invoice,
  Communication,
  Task
} from "@/types/freelancer"

interface DashboardState {
  freelancerProfile: FreelancerProfile | null
  projects: Project[]
  clients: Client[]
  metrics: DashboardMetrics | null
  aiAgents: AIAgent[]
  notifications: Notification[]
  payments: Payment[]
  invoices: Invoice[]
  communications: Communication[]
  tasks: Task[]
  isLoading: boolean
  error: string | null
}

interface DashboardActions {
  refreshData: () => Promise<void>
  updateProject: (projectId: string, updates: Partial<Project>) => void
  updateClient: (clientId: string, updates: Partial<Client>) => void
  updateAgent: (agentId: string, updates: Partial<AIAgent>) => void
  updatePayment: (paymentId: string, updates: Partial<Payment>) => void
  updateInvoice: (invoiceId: string, updates: Partial<Invoice>) => void
  updateNotification: (notificationId: string, updates: Partial<Notification>) => void
  markAllNotificationsRead: () => void
  addProject: (project: Omit<Project, "id">) => void
  addClient: (client: Omit<Client, "id">) => void
  addPayment: (payment: Omit<Payment, "id">) => void
  addInvoice: (invoice: Omit<Invoice, "id">) => void
  filterProjects: (filters: ProjectFilters) => Project[]
  filterClients: (filters: ClientFilters) => Client[]
  searchEntities: (query: string) => SearchResults
}

interface ProjectFilters {
  status?: string
  phase?: string
  clientId?: string
  dateRange?: { start: string; end: string }
}

interface ClientFilters {
  status?: string
  communicationPreference?: string
  rating?: number
}

interface SearchResults {
  projects: Project[]
  clients: Client[]
  tasks: Task[]
  communications: Communication[]
  total: number
}

export function useFreelancerDashboard(): DashboardState & DashboardActions {
  const [state, setState] = useState<DashboardState>({
    freelancerProfile: null,
    projects: [],
    clients: [],
    metrics: null,
    aiAgents: [],
    notifications: [],
    payments: [],
    invoices: [],
    communications: [],
    tasks: [],
    isLoading: true,
    error: null
  })

  const loadFreelancerProfile = useCallback(async (): Promise<FreelancerProfile> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      id: "freelancer-1",
      email: "developer@agency.com",
      name: "Alex Johnson",
      avatar: "/api/placeholder/120/120",
      skills: [
        { name: "React", level: "expert", yearsOfExperience: 5, verified: true },
        { name: "Node.js", level: "expert", yearsOfExperience: 4, verified: true },
        { name: "TypeScript", level: "advanced", yearsOfExperience: 3, verified: true }
      ],
      hourlyRate: 85,
      availability: {
        hoursPerWeek: 40,
        schedule: {
          monday: [{ start: "09:00", end: "17:00" }],
          tuesday: [{ start: "09:00", end: "17:00" }],
          wednesday: [{ start: "09:00", end: "17:00" }],
          thursday: [{ start: "09:00", end: "17:00" }],
          friday: [{ start: "09:00", end: "15:00" }]
        },
        vacations: []
      },
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
    }
  }, [])

  const loadProjects = useCallback(async (): Promise<Project[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return [
      {
        id: "proj-1",
        clientId: "client-1",
        name: "E-commerce Platform Redesign",
        description: "Complete redesign and development of modern e-commerce platform",
        status: "active",
        phase: "development",
        type: "web-app",
        budget: {
          type: "fixed",
          amount: 15000,
          currency: "USD",
          spent: 8500,
          remaining: 6500,
          estimates: { optimistic: 14000, realistic: 15000, pessimistic: 17000 }
        },
        timeline: {
          estimatedDuration: 45,
          phases: [
            { phase: "discovery", startDate: "2024-01-01", endDate: "2024-01-07", status: "completed" },
            { phase: "design", startDate: "2024-01-08", endDate: "2024-01-21", status: "completed" },
            { phase: "development", startDate: "2024-01-22", endDate: "2024-02-28", status: "in-progress" }
          ],
          buffer: 5,
          criticalPath: ["task-1", "task-3", "task-7"]
        },
        requirements: [],
        deliverables: [],
        milestones: [],
        tasks: [],
        team: [],
        aiAgents: [],
        documents: [],
        communications: [],
        payments: [],
        risks: [],
        metrics: {
          progress: 67,
          health: "healthy",
          velocity: 8.5,
          burnRate: 340,
          clientSatisfaction: 95,
          aiUtilization: 73,
          profitMargin: 28,
          hoursTracked: 125,
          hoursSaved: 23,
          tasksCompleted: 34,
          bugsFound: 7,
          codeQuality: 94,
          testCoverage: 87
        },
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: new Date().toISOString(),
        startDate: "2024-01-01",
        endDate: "2024-03-15"
      },
      {
        id: "proj-2",
        clientId: "client-2",
        name: "Mobile Banking App",
        description: "Secure mobile banking application with biometric authentication",
        status: "active",
        phase: "testing",
        type: "mobile-app",
        budget: {
          type: "milestone",
          amount: 25000,
          currency: "USD",
          spent: 18750,
          remaining: 6250,
          estimates: { optimistic: 23000, realistic: 25000, pessimistic: 28000 }
        },
        timeline: {
          estimatedDuration: 60,
          phases: [
            { phase: "discovery", startDate: "2023-11-01", endDate: "2023-11-14", status: "completed" },
            { phase: "design", startDate: "2023-11-15", endDate: "2023-12-15", status: "completed" },
            { phase: "development", startDate: "2023-12-16", endDate: "2024-02-15", status: "completed" },
            { phase: "testing", startDate: "2024-02-16", endDate: "2024-03-01", status: "in-progress" }
          ],
          buffer: 7,
          criticalPath: ["task-mobile-1", "task-mobile-5"]
        },
        requirements: [],
        deliverables: [],
        milestones: [],
        tasks: [],
        team: [],
        aiAgents: [],
        documents: [],
        communications: [],
        payments: [],
        risks: [],
        metrics: {
          progress: 85,
          health: "healthy",
          velocity: 9.2,
          burnRate: 520,
          clientSatisfaction: 92,
          aiUtilization: 68,
          profitMargin: 31,
          hoursTracked: 180,
          hoursSaved: 34,
          tasksCompleted: 67,
          bugsFound: 12,
          codeQuality: 96,
          testCoverage: 91
        },
        createdAt: "2023-11-01T00:00:00Z",
        updatedAt: new Date().toISOString(),
        startDate: "2023-11-01",
        endDate: "2024-03-15"
      }
    ]
  }, [])

  const loadClients = useCallback(async (): Promise<Client[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return [
      {
        id: "client-1",
        name: "Sarah Mitchell",
        email: "sarah@techcorp.com",
        company: "TechCorp Solutions",
        avatar: "/api/placeholder/80/80",
        timezone: "UTC-5",
        communicationPreference: "email",
        projects: ["proj-1"],
        totalSpent: 45000,
        rating: 5,
        status: "active",
        notes: "Prefers detailed weekly updates. Very responsive to messages.",
        paymentTerms: {
          netDays: 30,
          lateFeePercentage: 1.5,
          acceptedMethods: ["stripe", "bank"],
          currency: "USD",
          requiresDeposit: true,
          depositPercentage: 25
        },
        createdAt: "2023-08-15T00:00:00Z",
        lastContact: "2024-01-20T14:30:00Z"
      },
      {
        id: "client-2",
        name: "Marcus Rodriguez",
        email: "marcus@financeapp.io",
        company: "FinanceApp Inc",
        timezone: "UTC-8",
        communicationPreference: "chat",
        projects: ["proj-2"],
        totalSpent: 78000,
        rating: 5,
        status: "active",
        notes: "Technical background. Appreciates detailed technical discussions.",
        paymentTerms: {
          netDays: 15,
          lateFeePercentage: 2,
          acceptedMethods: ["stripe", "paypal"],
          currency: "USD",
          requiresDeposit: false
        },
        createdAt: "2023-05-10T00:00:00Z",
        lastContact: "2024-01-21T10:15:00Z"
      }
    ]
  }, [])

  const calculateDashboardMetrics = useCallback(async (projects: Project[], clients: Client[]): Promise<DashboardMetrics> => {
    const activeProjects = projects.filter(p => p.status === "active").length
    const completedProjects = projects.filter(p => p.status === "completed").length
    const totalRevenue = projects.reduce((sum, p) => sum + p.budget.spent, 0)
    
    return {
      revenue: {
        current: totalRevenue,
        previous: totalRevenue * 0.85,
        growth: 15,
        projection: totalRevenue * 1.2
      },
      projects: {
        active: activeProjects,
        completed: completedProjects,
        pipeline: 3,
        successRate: 96
      },
      clients: {
        active: clients.filter(c => c.status === "active").length,
        total: clients.length,
        retention: 94,
        satisfaction: 4.8
      },
      ai: {
        tasksAutomated: 156,
        timeSaved: 47,
        costSaved: 8750,
        efficiency: 73
      },
      financial: {
        outstanding: 12500,
        collected: 89300,
        expenses: 15600,
        profit: 73700
      }
    }
  }, [])

  const loadAIAgents = useCallback(async (): Promise<AIAgent[]> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return [
      {
        id: "ai-pm",
        type: "project-manager",
        name: "Project Manager AI",
        status: "working",
        tasksCompleted: 23,
        tasksInProgress: 3,
        efficiency: 89,
        costSaved: 3200,
        timesSaved: 18,
        currentTask: "Generating weekly progress report",
        capabilities: ["Task planning", "Progress tracking", "Risk assessment", "Client updates"],
        configuration: {}
      },
      {
        id: "ai-dev",
        type: "developer",
        name: "Developer AI",
        status: "working",
        tasksCompleted: 45,
        tasksInProgress: 2,
        efficiency: 76,
        costSaved: 4800,
        timesSaved: 29,
        currentTask: "Code review and optimization",
        capabilities: ["Code generation", "Bug fixing", "Code review", "Documentation"],
        configuration: {}
      }
    ]
  }, [])

  const loadNotifications = useCallback(async (): Promise<Notification[]> => {
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return [
      {
        id: "notif-1",
        userId: "freelancer-1",
        type: "payment_received",
        title: "Payment Received",
        message: "Payment of $5,000 received from TechCorp Solutions",
        priority: "medium",
        read: false,
        actionUrl: "/freelancer/payments",
        actionLabel: "View Payment",
        createdAt: "2024-01-21T15:30:00Z"
      },
      {
        id: "notif-2",
        userId: "freelancer-1",
        type: "ai_completion",
        title: "AI Task Completed",
        message: "Developer AI completed code review for e-commerce platform",
        priority: "low",
        read: false,
        actionUrl: "/freelancer/projects/proj-1",
        actionLabel: "View Project",
        createdAt: "2024-01-21T14:45:00Z"
      }
    ]
  }, [])

  const loadPayments = useCallback(async (): Promise<Payment[]> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return [
      {
        id: "pay-1",
        projectId: "proj-1",
        clientId: "client-1",
        type: "milestone",
        amount: 5000,
        currency: "USD",
        status: "completed",
        method: { id: "stripe-1", type: "stripe", details: {}, isDefault: true },
        dueDate: "2024-01-15",
        paidDate: "2024-01-14",
        description: "Milestone 2: Design Phase Completion"
      },
      {
        id: "pay-2",
        projectId: "proj-2",
        clientId: "client-2",
        type: "milestone",
        amount: 7500,
        currency: "USD",
        status: "pending",
        method: { id: "stripe-2", type: "stripe", details: {}, isDefault: true },
        dueDate: "2024-02-01",
        description: "Milestone 3: Development Phase Completion"
      }
    ]
  }, [])

  const loadInvoices = useCallback(async (): Promise<Invoice[]> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return [
      {
        id: "inv-1",
        number: "INV-2024-001",
        projectId: "proj-1",
        clientId: "client-1",
        status: "paid",
        issueDate: "2024-01-10",
        dueDate: "2024-02-09",
        items: [
          {
            description: "Design Phase Completion",
            quantity: 1,
            rate: 5000,
            amount: 5000,
            type: "service"
          }
        ],
        subtotal: 5000,
        tax: 450,
        discount: 0,
        total: 5450,
        currency: "USD",
        paidAt: "2024-01-14T10:30:00Z",
        reminders: []
      },
      {
        id: "inv-2",
        number: "INV-2024-002",
        projectId: "proj-2",
        clientId: "client-2",
        status: "sent",
        issueDate: "2024-01-20",
        dueDate: "2024-02-19",
        items: [
          {
            description: "Development Phase - Mobile App",
            quantity: 1,
            rate: 7500,
            amount: 7500,
            type: "service"
          }
        ],
        subtotal: 7500,
        tax: 675,
        discount: 0,
        total: 8175,
        currency: "USD",
        sentAt: "2024-01-20T09:00:00Z",
        reminders: []
      }
    ]
  }, [])

  const loadCommunications = useCallback(async (): Promise<Communication[]> => {
    await new Promise(resolve => setTimeout(resolve, 150))
    
    return [
      {
        id: "comm-1",
        projectId: "proj-1",
        type: "email",
        participants: ["client-1", "freelancer-1"],
        subject: "Design Review Feedback",
        content: "Hi Alex, I've reviewed the latest design mockups and they look fantastic! The user flow is much improved. Just a few minor adjustments needed...",
        timestamp: "2024-01-21T14:30:00Z",
        aiGenerated: false,
        isInternal: false
      },
      {
        id: "comm-2", 
        projectId: "proj-2",
        type: "chat",
        participants: ["client-2", "freelancer-1"],
        content: "Quick update: The authentication module is now complete and ready for testing. Can we schedule a call tomorrow to walk through it?",
        timestamp: "2024-01-21T11:15:00Z",
        aiGenerated: false,
        isInternal: false
      }
    ]
  }, [])

  const loadTasks = useCallback(async (): Promise<Task[]> => {
    await new Promise(resolve => setTimeout(resolve, 150))
    
    return [
      {
        id: "task-1",
        title: "Implement payment gateway integration",
        description: "Integrate Stripe payment processing for the e-commerce platform",
        assignee: "ai-dev",
        status: "in-progress",
        priority: "high",
        estimatedHours: 8,
        actualHours: 3,
        dependencies: [],
        subtasks: [],
        aiGenerated: true,
        aiAssisted: true,
        comments: []
      },
      {
        id: "task-2",
        title: "Design user authentication flow",
        description: "Create wireframes and mockups for the login/registration process",
        assignee: "freelancer-1",
        status: "completed",
        priority: "medium",
        estimatedHours: 4,
        actualHours: 4,
        dependencies: [],
        subtasks: [],
        aiGenerated: false,
        aiAssisted: false,
        completedAt: "2024-01-20T16:00:00Z",
        comments: []
      }
    ]
  }, [])

  const refreshData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const [
        profile,
        projectsData,
        clientsData,
        agentsData,
        notificationsData,
        paymentsData,
        invoicesData,
        communicationsData,
        tasksData
      ] = await Promise.all([
        loadFreelancerProfile(),
        loadProjects(),
        loadClients(),
        loadAIAgents(),
        loadNotifications(),
        loadPayments(),
        loadInvoices(),
        loadCommunications(),
        loadTasks()
      ])
      
      const metricsData = await calculateDashboardMetrics(projectsData, clientsData)
      
      setState({
        freelancerProfile: profile,
        projects: projectsData,
        clients: clientsData,
        metrics: metricsData,
        aiAgents: agentsData,
        notifications: notificationsData,
        payments: paymentsData,
        invoices: invoicesData,
        communications: communicationsData,
        tasks: tasksData,
        isLoading: false,
        error: null
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to load dashboard data"
      }))
    }
  }, [
    loadFreelancerProfile,
    loadProjects,
    loadClients,
    calculateDashboardMetrics,
    loadAIAgents,
    loadNotifications,
    loadPayments,
    loadInvoices,
    loadCommunications,
    loadTasks
  ])

  const updateProject = useCallback((projectId: string, updates: Partial<Project>) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === projectId ? { ...project, ...updates } : project
      )
    }))
  }, [])

  const updateClient = useCallback((clientId: string, updates: Partial<Client>) => {
    setState(prev => ({
      ...prev,
      clients: prev.clients.map(client => 
        client.id === clientId ? { ...client, ...updates } : client
      )
    }))
  }, [])

  const updateAgent = useCallback((agentId: string, updates: Partial<AIAgent>) => {
    setState(prev => ({
      ...prev,
      aiAgents: prev.aiAgents.map(agent => 
        agent.id === agentId ? { ...agent, ...updates } : agent
      )
    }))
  }, [])

  const updatePayment = useCallback((paymentId: string, updates: Partial<Payment>) => {
    setState(prev => ({
      ...prev,
      payments: prev.payments.map(payment => 
        payment.id === paymentId ? { ...payment, ...updates } : payment
      )
    }))
  }, [])

  const updateInvoice = useCallback((invoiceId: string, updates: Partial<Invoice>) => {
    setState(prev => ({
      ...prev,
      invoices: prev.invoices.map(invoice => 
        invoice.id === invoiceId ? { ...invoice, ...updates } : invoice
      )
    }))
  }, [])

  const updateNotification = useCallback((notificationId: string, updates: Partial<Notification>) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(notification => 
        notification.id === notificationId ? { ...notification, ...updates } : notification
      )
    }))
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, read: true, readAt: new Date().toISOString() }))
    }))
  }, [])

  const addProject = useCallback((project: Omit<Project, "id">) => {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setState(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
  }, [])

  const addClient = useCallback((client: Omit<Client, "id">) => {
    const newClient: Client = {
      ...client,
      id: `client-${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString()
    }
    setState(prev => ({
      ...prev,
      clients: [...prev.clients, newClient]
    }))
  }, [])

  const addPayment = useCallback((payment: Omit<Payment, "id">) => {
    const newPayment: Payment = {
      ...payment,
      id: `pay-${Date.now()}`
    }
    setState(prev => ({
      ...prev,
      payments: [...prev.payments, newPayment]
    }))
  }, [])

  const addInvoice = useCallback((invoice: Omit<Invoice, "id">) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: `inv-${Date.now()}`
    }
    setState(prev => ({
      ...prev,
      invoices: [...prev.invoices, newInvoice]
    }))
  }, [])

  const filterProjects = useCallback((filters: ProjectFilters): Project[] => {
    return state.projects.filter(project => {
      if (filters.status && project.status !== filters.status) return false
      if (filters.phase && project.phase !== filters.phase) return false
      if (filters.clientId && project.clientId !== filters.clientId) return false
      if (filters.dateRange) {
        const projectDate = new Date(project.startDate)
        const startDate = new Date(filters.dateRange.start)
        const endDate = new Date(filters.dateRange.end)
        if (projectDate < startDate || projectDate > endDate) return false
      }
      return true
    })
  }, [state.projects])

  const filterClients = useCallback((filters: ClientFilters): Client[] => {
    return state.clients.filter(client => {
      if (filters.status && client.status !== filters.status) return false
      if (filters.communicationPreference && client.communicationPreference !== filters.communicationPreference) return false
      if (filters.rating && client.rating < filters.rating) return false
      return true
    })
  }, [state.clients])

  const searchEntities = useCallback((query: string): SearchResults => {
    const lowerQuery = query.toLowerCase()
    
    const projects = state.projects.filter(project => 
      project.name.toLowerCase().includes(lowerQuery) ||
      project.description.toLowerCase().includes(lowerQuery)
    )
    
    const clients = state.clients.filter(client =>
      client.name.toLowerCase().includes(lowerQuery) ||
      client.email.toLowerCase().includes(lowerQuery) ||
      (client.company && client.company.toLowerCase().includes(lowerQuery))
    )
    
    const tasks = state.tasks.filter(task =>
      task.title.toLowerCase().includes(lowerQuery) ||
      task.description.toLowerCase().includes(lowerQuery)
    )
    
    const communications = state.communications.filter(comm =>
      comm.content.toLowerCase().includes(lowerQuery) ||
      (comm.subject && comm.subject.toLowerCase().includes(lowerQuery))
    )
    
    return {
      projects,
      clients,
      tasks,
      communications,
      total: projects.length + clients.length + tasks.length + communications.length
    }
  }, [state.projects, state.clients, state.tasks, state.communications])

  const memoizedState = useMemo(() => state, [state])
  const memoizedActions = useMemo(() => ({
    refreshData,
    updateProject,
    updateClient,
    updateAgent,
    updatePayment,
    updateInvoice,
    updateNotification,
    markAllNotificationsRead,
    addProject,
    addClient,
    addPayment,
    addInvoice,
    filterProjects,
    filterClients,
    searchEntities
  }), [
    refreshData,
    updateProject,
    updateClient,
    updateAgent,
    updatePayment,
    updateInvoice,
    updateNotification,
    markAllNotificationsRead,
    addProject,
    addClient,
    addPayment,
    addInvoice,
    filterProjects,
    filterClients,
    searchEntities
  ])

  useEffect(() => {
    refreshData()
  }, [refreshData])

  return {
    ...memoizedState,
    ...memoizedActions
  }
}