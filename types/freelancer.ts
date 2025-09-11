// Scalable Type Definitions for Freelancer Agency Platform

export interface FreelancerProfile {
  id: string
  email: string
  name: string
  avatar?: string
  skills: Skill[]
  hourlyRate: number
  availability: Availability
  rating: number
  completedProjects: number
  totalEarnings: number
  stripeAccountId?: string
  paymentMethods: PaymentMethod[]
  timezone: string
  languages: string[]
  certifications: Certification[]
  portfolio: PortfolioItem[]
  createdAt: string
  updatedAt: string
}

export interface Client {
  id: string
  name: string
  email: string
  company?: string
  avatar?: string
  timezone: string
  communicationPreference: "email" | "chat" | "video"
  projects: string[] // Project IDs
  totalSpent: number
  rating: number
  status: "active" | "inactive" | "potential"
  notes: string
  contractedRate?: number
  paymentTerms: PaymentTerms
  createdAt: string
  lastContact: string
}

export interface Project {
  id: string
  clientId: string
  name: string
  description: string
  status: ProjectStatus
  phase: ProjectPhase
  type: ProjectType
  budget: Budget
  timeline: Timeline
  requirements: Requirement[]
  deliverables: Deliverable[]
  milestones: Milestone[]
  tasks: Task[]
  team: TeamMember[]
  aiAgents: AIAgent[]
  documents: Document[]
  communications: Communication[]
  payments: Payment[]
  risks: Risk[]
  metrics: ProjectMetrics
  createdAt: string
  updatedAt: string
  startDate: string
  endDate: string
  actualEndDate?: string
}

export type ProjectStatus = 
  | "draft"
  | "proposal"
  | "negotiation"
  | "active"
  | "paused"
  | "completed"
  | "cancelled"
  | "maintenance"

export type ProjectPhase = 
  | "discovery"
  | "planning"
  | "design"
  | "development"
  | "testing"
  | "deployment"
  | "review"
  | "support"

export type ProjectType = 
  | "web-app"
  | "mobile-app"
  | "api"
  | "website"
  | "ecommerce"
  | "saas"
  | "blockchain"
  | "ai-ml"
  | "consulting"
  | "other"

export interface Budget {
  type: "fixed" | "hourly" | "retainer" | "milestone"
  amount: number
  currency: string
  spent: number
  remaining: number
  estimates: {
    optimistic: number
    realistic: number
    pessimistic: number
  }
}

export interface Timeline {
  estimatedDuration: number // in days
  actualDuration?: number
  phases: {
    phase: ProjectPhase
    startDate: string
    endDate: string
    status: "pending" | "in-progress" | "completed"
  }[]
  buffer: number // in days
  criticalPath: string[] // Task IDs
}

export interface Milestone {
  id: string
  name: string
  description: string
  dueDate: string
  completedDate?: string
  status: "pending" | "in-progress" | "completed" | "overdue"
  payment?: {
    amount: number
    status: PaymentStatus
    invoiceId?: string
  }
  deliverables: string[] // Deliverable IDs
  approval: {
    required: boolean
    approvedBy?: string
    approvedAt?: string
    comments?: string
  }
}

export interface Task {
  id: string
  title: string
  description: string
  assignee: string // TeamMember ID or AIAgent ID
  status: "todo" | "in-progress" | "review" | "done" | "blocked"
  priority: "low" | "medium" | "high" | "critical"
  estimatedHours: number
  actualHours: number
  dependencies: string[] // Task IDs
  subtasks: Task[]
  aiGenerated: boolean
  aiAssisted: boolean
  completedAt?: string
  blockers?: string[]
  comments: Comment[]
}

export interface AIAgent {
  id: string
  type: AIAgentType
  name: string
  status: "idle" | "working" | "completed" | "error"
  tasksCompleted: number
  tasksInProgress: number
  efficiency: number // percentage
  costSaved: number
  timesSaved: number // in hours
  currentTask?: string
  capabilities: string[]
  configuration: Record<string, any>
}

export type AIAgentType = 
  | "project-manager"
  | "developer"
  | "designer"
  | "qa-engineer"
  | "devops"
  | "content-writer"
  | "data-analyst"
  | "customer-support"

export interface Payment {
  id: string
  projectId: string
  clientId: string
  type: "deposit" | "milestone" | "final" | "recurring" | "expense"
  amount: number
  currency: string
  status: PaymentStatus
  method: PaymentMethod
  invoiceId?: string
  transactionId?: string
  dueDate: string
  paidDate?: string
  description: string
  breakdown?: {
    hours?: number
    rate?: number
    items?: { description: string; amount: number }[]
  }
  fees?: {
    platform: number
    processing: number
    tax: number
  }
}

export type PaymentStatus = 
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded"
  | "disputed"
  | "cancelled"

export interface PaymentMethod {
  id: string
  type: "stripe" | "paypal" | "bank" | "crypto" | "other"
  details: Record<string, any>
  isDefault: boolean
}

export interface Invoice {
  id: string
  number: string
  projectId: string
  clientId: string
  status: "draft" | "sent" | "viewed" | "paid" | "overdue" | "cancelled"
  issueDate: string
  dueDate: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  currency: string
  notes?: string
  terms?: string
  paymentInstructions?: string
  attachments: string[]
  sentAt?: string
  viewedAt?: string
  paidAt?: string
  reminders: {
    sentAt: string
    type: "email" | "sms" | "in-app"
  }[]
}

export interface InvoiceItem {
  description: string
  quantity: number
  rate: number
  amount: number
  type: "service" | "expense" | "product" | "other"
  taskId?: string
  milestoneId?: string
}

export interface ProjectMetrics {
  progress: number // percentage
  health: "healthy" | "at-risk" | "critical"
  velocity: number
  burnRate: number
  clientSatisfaction: number
  aiUtilization: number
  profitMargin: number
  hoursTracked: number
  hoursSaved: number
  tasksCompleted: number
  bugsFound: number
  codeQuality: number
  testCoverage: number
}

export interface Communication {
  id: string
  projectId: string
  type: "email" | "chat" | "video" | "comment" | "note"
  participants: string[]
  subject?: string
  content: string
  attachments?: string[]
  timestamp: string
  aiGenerated: boolean
  sentiment?: "positive" | "neutral" | "negative"
  actionItems?: string[]
  isInternal: boolean
}

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  priority: "low" | "medium" | "high" | "urgent"
  read: boolean
  actionUrl?: string
  actionLabel?: string
  metadata?: Record<string, any>
  createdAt: string
  readAt?: string
}

export type NotificationType = 
  | "payment_received"
  | "payment_failed"
  | "project_update"
  | "task_assigned"
  | "milestone_due"
  | "client_message"
  | "ai_completion"
  | "system_alert"
  | "review_request"

export interface DashboardMetrics {
  revenue: {
    current: number
    previous: number
    growth: number
    projection: number
  }
  projects: {
    active: number
    completed: number
    pipeline: number
    successRate: number
  }
  clients: {
    active: number
    total: number
    retention: number
    satisfaction: number
  }
  ai: {
    tasksAutomated: number
    timeSaved: number
    costSaved: number
    efficiency: number
  }
  financial: {
    outstanding: number
    collected: number
    expenses: number
    profit: number
  }
}

// Additional type definitions for scalability

export interface TeamMember {
  id: string
  userId: string
  role: "lead" | "developer" | "designer" | "qa" | "support"
  allocation: number // percentage
  hourlyRate: number
  hoursLogged: number
}

export interface Skill {
  name: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
  yearsOfExperience: number
  verified: boolean
}

export interface Availability {
  hoursPerWeek: number
  schedule: {
    [key: string]: { start: string; end: string }[]
  }
  vacations: { start: string; end: string }[]
}

export interface Certification {
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  verificationUrl?: string
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  url?: string
  images: string[]
  technologies: string[]
  clientName?: string
  completedDate: string
}

export interface PaymentTerms {
  netDays: number
  lateFeePercentage: number
  acceptedMethods: PaymentMethod["type"][]
  currency: string
  requiresDeposit: boolean
  depositPercentage?: number
}

export interface Requirement {
  id: string
  category: "functional" | "technical" | "design" | "performance"
  description: string
  priority: "must-have" | "should-have" | "nice-to-have"
  status: "pending" | "approved" | "implemented" | "tested"
  acceptanceCriteria: string[]
}

export interface Deliverable {
  id: string
  name: string
  type: "code" | "design" | "document" | "deployment" | "other"
  description: string
  status: "pending" | "in-progress" | "delivered" | "accepted"
  files: string[]
  deliveryDate: string
  acceptedDate?: string
}

export interface Risk {
  id: string
  description: string
  probability: "low" | "medium" | "high"
  impact: "low" | "medium" | "high"
  mitigation: string
  status: "identified" | "mitigating" | "resolved" | "accepted"
  owner: string
}

export interface Document {
  id: string
  name: string
  type: "contract" | "proposal" | "specification" | "design" | "report" | "other"
  url: string
  version: string
  uploadedBy: string
  uploadedAt: string
  size: number
}

export interface Comment {
  id: string
  authorId: string
  content: string
  timestamp: string
  edited?: boolean
  editedAt?: string
}