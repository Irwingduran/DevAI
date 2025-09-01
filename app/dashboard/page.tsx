"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Bot,
  Blocks,
  Sparkles,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  ExternalLink,
  DollarSign,
  BarChart3,
  Zap,
  Rocket,
  BookOpen,
  Video,
  FileText,
  Code,
  FolderOpen,
  Search,
} from "lucide-react"

// Import new components
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { WelcomeMessage } from "@/components/dashboard/welcome-message"
import { CTACard } from "@/components/dashboard/cta-card"
import { EmptyState } from "@/components/dashboard/empty-state"
import { ToastSystem, useToast } from "@/components/dashboard/toast-system"
import { ExpertCTABanner } from "@/components/dashboard/expert-cta-banner"
import { ProductCard } from "@/components/marketplace/product-card"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { FeaturedProductBanner } from "@/components/marketplace/featured-product-banner"
import { ProHeroSection } from "@/components/pro/pro-hero-section"
import { ProBenefitsGrid } from "@/components/pro/pro-benefits-grid"
import { ProPricingCard } from "@/components/pro/pro-pricing-card"
import { ProUpgradeBanner } from "@/components/pro/pro-upgrade-banner"
import { ProjectCard } from "@/components/dashboard/projects/project-card"
import { ProjectsFilters } from "@/components/dashboard/projects/projects-filters"
import { SolutionFilters } from "@/components/dashboard/solutions/solution-filters"
import { MarketplaceCategories } from "@/components/marketplace/marketplace-categories"

// Keep existing interfaces and mock data from the original dashboard
interface Solution {
  id: string
  name: string
  type: "AI" | "Blockchain" | "Hybrid"
  status: "planning" | "in-progress" | "completed" | "paused"
  progress: number
  description: string
  estimatedTime: string
  complexity: "Beginner" | "Intermediate" | "Advanced"
  benefits: string[]
  nextSteps: string[]
  resources: { type: string; title: string; url: string }[]
  createdAt: string
  lastUpdated: string
  tags?: string[]
  wizardData?: any
}

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string
  solutionId: string
  estimatedHours: number
}

interface Metric {
  label: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}

// Add Project interface
interface Project {
  id: string
  name: string
  type: "AI" | "Blockchain" | "Hybrid"
  status: "planning" | "in-progress" | "completed" | "paused"
  progress: number
  lastUpdate: string
  description: string
  hasNewUpdate?: boolean
  estimatedCompletion?: string
  projectManager?: {
    name: string
    avatar?: string
  }
  dateStarted: string
  complexity: "Beginner" | "Intermediate" | "Advanced"
  steps: Array<{
    id: string
    title: string
    status: "completed" | "in-progress" | "pending"
    eta?: string
    comment?: string
  }>
  latestUpdate: {
    title: string
    summary: string
    date: string
    attachments?: Array<{
      name: string
      type: "pdf" | "image" | "link"
      url: string
    }>
  }
}

const mockSolutions: Solution[] = [
  {
    id: "1",
    name: "Smart Inbox AI",
    type: "AI",
    status: "in-progress",
    progress: 65,
    description: "AI-powered communication hub that manages all client interactions across channels",
    estimatedTime: "2-3 weeks",
    complexity: "Intermediate",
    benefits: [
      "Automatically categorize and prioritize messages",
      "Generate smart replies and follow-ups",
      "Track client sentiment and satisfaction",
      "Reduce response time by 70%",
      "Integrate with existing CRM systems",
    ],
    nextSteps: ["Set up email integration", "Configure AI response templates", "Train sentiment analysis model"],
    resources: [
      { type: "video", title: "Getting Started with Smart Inbox", url: "#" },
      { type: "doc", title: "API Integration Guide", url: "#" },
      { type: "template", title: "Response Templates", url: "#" },
      { type: "course", title: "AI Communication Mastery", url: "#" },
    ],
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-20",
    tags: ["AI", "Communication", "CRM"],
  },
  {
    id: "2",
    name: "Blockchain Certifier",
    type: "Blockchain",
    status: "planning",
    progress: 15,
    description: "Transparent financial tracking with blockchain-verified transactions",
    estimatedTime: "4-6 weeks",
    complexity: "Advanced",
    benefits: [
      "Immutable financial records",
      "Real-time cash flow insights",
      "Automated compliance reporting",
      "Reduce audit costs by 60%",
      "Enhanced security and transparency",
    ],
    nextSteps: ["Choose blockchain network", "Design smart contract architecture", "Set up development environment"],
    resources: [
      { type: "course", title: "Blockchain Fundamentals", url: "#" },
      { type: "code", title: "Smart Contract Templates", url: "#" },
      { type: "doc", title: "Security Best Practices", url: "#" },
      { type: "video", title: "Blockchain Implementation Guide", url: "#" },
    ],
    createdAt: "2024-01-10",
    lastUpdated: "2024-01-18",
    tags: ["Blockchain", "Finance", "Security"],
  },
  {
    id: "3",
    name: "Customer Journey AI",
    type: "AI",
    status: "completed",
    progress: 100,
    description: "Personalized customer experience optimization using machine learning",
    estimatedTime: "1-2 weeks",
    complexity: "Beginner",
    benefits: [
      "Increased conversion rates by 45%",
      "Better customer insights",
      "Automated personalization",
      "Improved customer satisfaction",
      "Reduced churn rate by 30%",
    ],
    nextSteps: ["Monitor performance", "Optimize algorithms", "Scale to new channels"],
    resources: [
      { type: "analytics", title: "Performance Dashboard", url: "#" },
      { type: "doc", title: "Optimization Guide", url: "#" },
      { type: "video", title: "Success Stories", url: "#" },
    ],
    createdAt: "2024-01-01",
    lastUpdated: "2024-01-19",
    tags: ["AI", "Marketing", "Analytics"],
  },
  {
    id: "4",
    name: "Supply Chain Tracker",
    type: "Hybrid",
    status: "in-progress",
    progress: 40,
    description: "AI-powered supply chain optimization with blockchain transparency",
    estimatedTime: "3-4 weeks",
    complexity: "Advanced",
    benefits: [
      "End-to-end supply chain visibility",
      "Predictive demand forecasting",
      "Automated vendor management",
      "Reduce supply chain costs by 25%",
      "Improve delivery times by 40%",
    ],
    nextSteps: ["Integrate IoT sensors", "Deploy smart contracts", "Train ML models"],
    resources: [
      { type: "doc", title: "Supply Chain Guide", url: "#" },
      { type: "template", title: "Smart Contract Templates", url: "#" },
      { type: "course", title: "Supply Chain Optimization", url: "#" },
    ],
    createdAt: "2024-01-12",
    lastUpdated: "2024-01-21",
    tags: ["Hybrid", "Supply Chain", "IoT"],
  },
  {
    id: "5",
    name: "Content Generator Pro",
    type: "AI",
    status: "paused",
    progress: 25,
    description: "Advanced AI content creation and optimization platform",
    estimatedTime: "2-3 weeks",
    complexity: "Intermediate",
    benefits: [
      "Generate high-quality content 10x faster",
      "SEO optimization built-in",
      "Multi-language support",
      "Brand voice consistency",
      "Content performance analytics",
    ],
    nextSteps: ["Resume development", "Integrate GPT-4", "Add content templates"],
    resources: [
      { type: "video", title: "Content Strategy Masterclass", url: "#" },
      { type: "template", title: "Content Templates Library", url: "#" },
      { type: "doc", title: "SEO Best Practices", url: "#" },
    ],
    createdAt: "2024-01-08",
    lastUpdated: "2024-01-16",
    tags: ["AI", "Content", "Marketing", "Paused"],
  },
]

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Set up email integration",
    description: "Connect Gmail and Outlook APIs to Smart Inbox AI",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-25",
    solutionId: "1",
    estimatedHours: 4,
  },
  {
    id: "2",
    title: "Configure AI response templates",
    description: "Create and customize automated response templates",
    status: "todo",
    priority: "medium",
    dueDate: "2024-01-28",
    solutionId: "1",
    estimatedHours: 2,
  },
  {
    id: "3",
    title: "Choose blockchain network",
    description: "Research and select appropriate blockchain for financial tracking",
    status: "todo",
    priority: "high",
    dueDate: "2024-01-30",
    solutionId: "2",
    estimatedHours: 6,
  },
  {
    id: "4",
    title: "Deploy smart contracts",
    description: "Deploy and test supply chain smart contracts",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-26",
    solutionId: "4",
    estimatedHours: 8,
  },
  {
    id: "5",
    title: "Train ML models",
    description: "Train demand forecasting models with historical data",
    status: "todo",
    priority: "medium",
    dueDate: "2024-02-02",
    solutionId: "4",
    estimatedHours: 12,
  },
]

const mockMetrics: Metric[] = [
  {
    label: "Active Solutions",
    value: "5",
    change: "+2 this month",
    trend: "up",
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    label: "Completion Rate",
    value: "67%",
    change: "+12% vs last month",
    trend: "up",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    label: "Time Saved",
    value: "156h",
    change: "This month",
    trend: "up",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    label: "ROI Estimate",
    value: "$45,200",
    change: "Projected annual",
    trend: "up",
    icon: <DollarSign className="w-5 h-5" />,
  },
]

// Add mock projects data
const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce AI Assistant",
    type: "AI",
    status: "in-progress",
    progress: 75,
    lastUpdate: "2 hours ago",
    description:
      "AI-powered customer service assistant for e-commerce platform with natural language processing and automated order management.",
    hasNewUpdate: true,
    estimatedCompletion: "Feb 15, 2025",
    projectManager: {
      name: "Sarah Johnson",
    },
    dateStarted: "Jan 5, 2025",
    complexity: "Intermediate",
    steps: [
      {
        id: "1",
        title: "Planning & Requirements",
        status: "completed",
        comment: "All requirements gathered and documented",
      },
      {
        id: "2",
        title: "AI Model Design",
        status: "completed",
        comment: "Custom NLP model architecture finalized",
      },
      {
        id: "3",
        title: "Integration Development",
        status: "in-progress",
        eta: "Jan 28, 2025",
        comment: "API integrations 80% complete",
      },
      {
        id: "4",
        title: "Testing & QA",
        status: "pending",
        eta: "Feb 5, 2025",
      },
      {
        id: "5",
        title: "Deployment",
        status: "pending",
        eta: "Feb 12, 2025",
      },
      {
        id: "6",
        title: "Training & Handover",
        status: "pending",
        eta: "Feb 15, 2025",
      },
    ],
    latestUpdate: {
      title: "Integration Progress Update",
      summary:
        "Completed the shopping cart integration and order status tracking. The AI assistant can now handle 90% of common customer inquiries automatically. Next week we'll focus on payment processing integration and advanced product recommendations.",
      date: "Jan 22, 2025",
      attachments: [
        {
          name: "Integration Test Results",
          type: "pdf",
          url: "#",
        },
        {
          name: "Demo Video",
          type: "link",
          url: "#",
        },
      ],
    },
  },
  {
    id: "2",
    name: "Supply Chain Blockchain",
    type: "Blockchain",
    status: "planning",
    progress: 25,
    lastUpdate: "1 day ago",
    description:
      "Blockchain-based supply chain tracking system for pharmaceutical products with immutable audit trails and compliance reporting.",
    estimatedCompletion: "Apr 30, 2025",
    projectManager: {
      name: "Michael Chen",
    },
    dateStarted: "Jan 15, 2025",
    complexity: "Advanced",
    steps: [
      {
        id: "1",
        title: "Planning & Requirements",
        status: "completed",
        comment: "Compliance requirements and technical specifications defined",
      },
      {
        id: "2",
        title: "Blockchain Architecture",
        status: "in-progress",
        eta: "Feb 10, 2025",
        comment: "Smart contract design in progress",
      },
      {
        id: "3",
        title: "Smart Contract Development",
        status: "pending",
        eta: "Mar 15, 2025",
      },
      {
        id: "4",
        title: "Integration & Testing",
        status: "pending",
        eta: "Apr 10, 2025",
      },
      {
        id: "5",
        title: "Security Audit",
        status: "pending",
        eta: "Apr 20, 2025",
      },
      {
        id: "6",
        title: "Deployment & Training",
        status: "pending",
        eta: "Apr 30, 2025",
      },
    ],
    latestUpdate: {
      title: "Architecture Review Complete",
      summary:
        "Completed the blockchain architecture review with the compliance team. Selected Ethereum as the base platform with custom smart contracts for product tracking. Security audit firm has been selected and preliminary discussions completed.",
      date: "Jan 21, 2025",
      attachments: [
        {
          name: "Architecture Diagram",
          type: "pdf",
          url: "#",
        },
      ],
    },
  },
  {
    id: "3",
    name: "Hybrid Analytics Platform",
    type: "Hybrid",
    status: "completed",
    progress: 100,
    lastUpdate: "3 days ago",
    description:
      "AI-powered analytics platform with blockchain-verified data integrity for financial reporting and predictive insights.",
    estimatedCompletion: "Completed",
    projectManager: {
      name: "Emily Rodriguez",
    },
    dateStarted: "Nov 1, 2024",
    complexity: "Advanced",
    steps: [
      {
        id: "1",
        title: "Planning & Requirements",
        status: "completed",
        comment: "Requirements finalized with stakeholders",
      },
      {
        id: "2",
        title: "AI Model Development",
        status: "completed",
        comment: "Predictive models trained and validated",
      },
      {
        id: "3",
        title: "Blockchain Integration",
        status: "completed",
        comment: "Data integrity verification implemented",
      },
      {
        id: "4",
        title: "Platform Development",
        status: "completed",
        comment: "Full platform built and tested",
      },
      {
        id: "5",
        title: "Testing & QA",
        status: "completed",
        comment: "All tests passed successfully",
      },
      {
        id: "6",
        title: "Deployment & Training",
        status: "completed",
        comment: "Successfully deployed and team trained",
      },
    ],
    latestUpdate: {
      title: "Project Successfully Completed",
      summary:
        "The hybrid analytics platform has been successfully deployed and is now live in production. All team members have been trained and the system is processing real-time data with 99.9% accuracy. Post-deployment support is now active.",
      date: "Jan 19, 2025",
      attachments: [
        {
          name: "Final Report",
          type: "pdf",
          url: "#",
        },
        {
          name: "User Manual",
          type: "pdf",
          url: "#",
        },
        {
          name: "Live Dashboard",
          type: "link",
          url: "#",
        },
      ],
    },
  },
  {
    id: "4",
    name: "Healthcare AI Diagnostics",
    type: "AI",
    status: "paused",
    progress: 45,
    lastUpdate: "1 week ago",
    description:
      "AI-powered diagnostic assistant for medical imaging analysis with FDA compliance and integration with existing hospital systems.",
    estimatedCompletion: "TBD",
    projectManager: {
      name: "Dr. James Wilson",
    },
    dateStarted: "Oct 15, 2024",
    complexity: "Advanced",
    steps: [
      {
        id: "1",
        title: "Planning & Compliance",
        status: "completed",
        comment: "FDA requirements and medical protocols established",
      },
      {
        id: "2",
        title: "AI Model Training",
        status: "completed",
        comment: "Initial model trained on 10K+ medical images",
      },
      {
        id: "3",
        title: "Clinical Validation",
        status: "in-progress",
        comment: "Paused pending additional regulatory approval",
      },
      {
        id: "4",
        title: "Hospital Integration",
        status: "pending",
      },
      {
        id: "5",
        title: "FDA Submission",
        status: "pending",
      },
      {
        id: "6",
        title: "Deployment",
        status: "pending",
      },
    ],
    latestUpdate: {
      title: "Project Temporarily Paused",
      summary:
        "Project has been temporarily paused pending additional regulatory approvals from the FDA. We're working with regulatory consultants to address new compliance requirements. Expected to resume in Q2 2025.",
      date: "Jan 15, 2025",
    },
  },
]

// Add this after the existing mock data
const mockProducts = [
  {
    id: "1",
    title: "AI-Powered CRM Template",
    type: "template" as const,
    category: "marketing",
    description: "Complete CRM system with AI automation, lead scoring, and customer insights dashboard.",
    fullDescription:
      "This comprehensive CRM template includes everything you need to manage customer relationships effectively. Built with modern design principles and AI-powered features, it helps you track leads, automate follow-ups, and gain valuable customer insights.",
    price: 49,
    originalPrice: 79,
    rating: 4.8,
    reviews: 127,
    downloads: 1250,
    isPremium: false,
    isFeatured: true,
    image: "/placeholder.svg",
    tags: ["CRM", "AI", "Automation", "Dashboard"],
    lastUpdated: "Dec 2024",
    features: [
      "AI-powered lead scoring",
      "Automated email sequences",
      "Advanced analytics dashboard",
      "Mobile-responsive design",
      "CRM integration",
      "Custom reporting",
    ],
    benefits: [
      "Complete customer management system",
      "AI-powered lead scoring",
      "Automated email sequences",
      "Advanced analytics dashboard",
      "Mobile-responsive design",
      "Easy customization",
    ],
    includes: [
      { name: "Setup Guide", description: "Step-by-step installation instructions" },
      { name: "CRM Template Files", description: "Complete template package" },
      { name: "Tutorial Videos", description: "3 hours of video tutorials" },
      { name: "Premium Support", description: "30 days of email support" },
    ],
  },
  {
    id: "2",
    title: "Blockchain Development Masterclass",
    type: "course" as const,
    category: "finance",
    description: "Learn to build decentralized applications from scratch with hands-on projects and expert guidance.",
    fullDescription:
      "Master blockchain development with this comprehensive course covering smart contracts, DApps, and real-world implementation strategies.",
    price: 199,
    rating: 4.9,
    reviews: 89,
    downloads: 450,
    duration: "12 hours",
    isPremium: true,
    image: "/placeholder.svg",
    tags: ["Blockchain", "Smart Contracts", "DApps", "Solidity"],
    lastUpdated: "Jan 2025",
    features: [
      "12+ hours of video content",
      "5 hands-on projects",
      "Smart contract templates",
      "Security best practices",
      "Job-ready skills",
      "Lifetime access",
    ],
    benefits: [
      "Build 5 real-world projects",
      "Master smart contract development",
      "Learn security best practices",
      "Get job-ready skills",
      "Lifetime access to updates",
    ],
    includes: [
      { name: "Course Videos", description: "12+ hours of HD video content" },
      { name: "Course Materials", description: "Downloadable resources and guides" },
      { name: "Private Community", description: "Access to exclusive Discord server" },
      { name: "Certificate", description: "Completion certificate" },
    ],
  },
  {
    id: "3",
    title: "Smart Analytics Dashboard",
    type: "tool" as const,
    category: "analytics",
    description:
      "AI-powered analytics tool that provides real-time insights and predictive analytics for your business.",
    fullDescription:
      "Transform your data into actionable insights with our smart analytics dashboard. Features machine learning algorithms for predictive analytics and automated reporting.",
    price: 0,
    rating: 4.6,
    reviews: 234,
    downloads: 2100,
    isPremium: false,
    image: "/placeholder.svg",
    tags: ["Analytics", "Dashboard", "AI", "Free"],
    lastUpdated: "Nov 2024",
    features: [
      "Real-time data visualization",
      "Predictive analytics",
      "Automated reporting",
      "Custom dashboards",
      "API integration",
      "Export capabilities",
    ],
    benefits: [
      "Real-time data visualization",
      "Predictive analytics",
      "Automated reporting",
      "Custom dashboards",
      "API integration",
    ],
    includes: [
      { name: "Dashboard Access", description: "Full access to analytics platform" },
      { name: "User Guide", description: "Complete user documentation" },
      { name: "API Documentation", description: "Integration guides and examples" },
    ],
  },
  {
    id: "4",
    title: "Complete Marketing Automation Suite",
    type: "solution" as const,
    category: "marketing",
    description:
      "End-to-end marketing automation platform with email campaigns, social media scheduling, and lead nurturing.",
    fullDescription:
      "A comprehensive marketing automation solution that streamlines your entire marketing workflow from lead generation to conversion.",
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviews: 156,
    downloads: 680,
    isPremium: true,
    image: "/placeholder.svg",
    tags: ["Marketing", "Automation", "Email", "Social Media"],
    lastUpdated: "Dec 2024",
    features: [
      "Multi-channel campaigns",
      "Advanced segmentation",
      "A/B testing tools",
      "ROI tracking",
      "Social media scheduling",
      "Lead scoring",
    ],
    benefits: [
      "Complete marketing workflow",
      "Multi-channel campaigns",
      "Advanced segmentation",
      "ROI tracking",
      "A/B testing tools",
    ],
    includes: [
      { name: "Platform Access", description: "Full platform with all features" },
      { name: "Training Course", description: "5-hour comprehensive training" },
      { name: "Strategy Guide", description: "Marketing automation playbook" },
      { name: "Priority Support", description: "Dedicated support channel" },
    ],
  },
  {
    id: "5",
    title: "AI Content Generator Pro",
    type: "tool" as const,
    category: "productivity",
    description:
      "Advanced AI writing assistant that creates high-quality content for blogs, social media, and marketing.",
    fullDescription:
      "Generate compelling content 10x faster with our AI-powered writing assistant. Perfect for marketers, bloggers, and content creators.",
    price: 79,
    originalPrice: 129,
    rating: 4.5,
    reviews: 312,
    downloads: 890,
    isPremium: false,
    isFeatured: true,
    image: "/placeholder.svg",
    tags: ["AI", "Content", "Writing", "Marketing"],
    lastUpdated: "Jan 2025",
    features: [
      "AI-powered content generation",
      "SEO optimization",
      "Multi-language support",
      "Brand voice training",
      "Content templates",
      "Plagiarism checker",
    ],
    benefits: [
      "Generate content 10x faster",
      "SEO-optimized writing",
      "Multiple content types",
      "Brand consistency",
      "Time-saving templates",
    ],
    includes: [
      { name: "AI Writing Tool", description: "Full access to content generator" },
      { name: "Content Templates", description: "50+ proven templates" },
      { name: "SEO Guide", description: "Content optimization strategies" },
      { name: "Brand Voice Setup", description: "Custom brand voice training" },
    ],
  },
  {
    id: "6",
    title: "Blockchain Security Audit Kit",
    type: "template" as const,
    category: "security",
    description: "Comprehensive security audit templates and checklists for blockchain projects and smart contracts.",
    fullDescription:
      "Professional-grade security audit templates used by top blockchain security firms. Includes automated testing scripts and compliance checklists.",
    price: 149,
    rating: 4.9,
    reviews: 67,
    downloads: 234,
    isPremium: true,
    image: "/placeholder.svg",
    tags: ["Blockchain", "Security", "Audit", "Smart Contracts"],
    lastUpdated: "Dec 2024",
    features: [
      "Security audit templates",
      "Automated testing scripts",
      "Compliance checklists",
      "Vulnerability database",
      "Report templates",
      "Best practices guide",
    ],
    benefits: [
      "Professional audit templates",
      "Automated security testing",
      "Compliance verification",
      "Risk assessment tools",
      "Detailed reporting",
    ],
    includes: [
      { name: "Audit Templates", description: "Complete security audit framework" },
      { name: "Testing Scripts", description: "Automated vulnerability testing" },
      { name: "Compliance Checklists", description: "Regulatory compliance guides" },
      { name: "Expert Consultation", description: "1-hour security review call" },
    ],
  },
]

const featuredProduct = mockProducts.find((p) => p.isFeatured) || mockProducts[0]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [solutions, setSolutions] = useState<Solution[]>(mockSolutions)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const [showExpertModal, setShowExpertModal] = useState(false)
  const [showExpertSuccess, setShowExpertSuccess] = useState(false)
  const [expertRequestType, setExpertRequestType] = useState("")
  const [expertContext, setExpertContext] = useState<{ solution?: string; type?: string }>({})

  // Add these state variables after the existing ones
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false)
  const [purchasedProduct, setPurchasedProduct] = useState<any>(null)
  const [marketplaceFilters, setMarketplaceFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    pricing: "all",
  })

  // Add these state variables after the existing marketplace state
  const [showSubscribeModal, setShowSubscribeModal] = useState(false)
  const [showProSuccess, setShowProSuccess] = useState(false)
  const [showSolutionLimit, setShowSolutionLimit] = useState(false)
  const [isProUser, setIsProUser] = useState(false) // This would come from user context/API
  const [userEmail] = useState("john@example.com") // This would come from user context

  // Add Solution Wizard state
  const [showSolutionWizard, setShowSolutionWizard] = useState(false)

  // Add Projects state
  const [projects] = useState<Project[]>(mockProjects)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectsFilters, setProjectsFilters] = useState({
    search: "",
    status: "all",
    type: "all",
  })

  // Add Solution filters state
  const [solutionFilters, setSolutionFilters] = useState({
    search: "",
    status: "all",
    type: "all",
    complexity: "all",
    sortBy: "recent",
  })

  // Add Marketplace state
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showComparisonModal, setShowComparisonModal] = useState(false)
  const [comparisonProducts, setComparisonProducts] = useState<any[]>([])

  const { toasts, removeToast, showSuccess, showError, showInfo } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "planning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "paused":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "AI":
        return "bg-blue-500"
      case "Blockchain":
        return "bg-purple-500"
      case "Hybrid":
        return "bg-gradient-to-r from-blue-500 to-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Enhanced solution filtering and sorting
  const filteredSolutions = solutions
    .filter((solution) => {
      const matchesSearch =
        solution.name.toLowerCase().includes(solutionFilters.search.toLowerCase()) ||
        solution.description.toLowerCase().includes(solutionFilters.search.toLowerCase())
      const matchesStatus = solutionFilters.status === "all" || solution.status === solutionFilters.status
      const matchesType = solutionFilters.type === "all" || solution.type === solutionFilters.type
      const matchesComplexity =
        solutionFilters.complexity === "all" || solution.complexity === solutionFilters.complexity
      return matchesSearch && matchesStatus && matchesType && matchesComplexity
    })
    .sort((a, b) => {
      switch (solutionFilters.sortBy) {
        case "progress":
          return b.progress - a.progress
        case "name":
          return a.name.localeCompare(b.name)
        case "status":
          return a.status.localeCompare(b.status)
        case "recent":
        default:
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      }
    })

  // Add filtered projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(projectsFilters.search.toLowerCase()) ||
      project.description.toLowerCase().includes(projectsFilters.search.toLowerCase())
    const matchesStatus = projectsFilters.status === "all" || project.status === projectsFilters.status
    const matchesType = projectsFilters.type === "all" || project.type === projectsFilters.type
    return matchesSearch && matchesStatus && matchesType
  })

  const activeProjectFiltersCount = Object.values(projectsFilters).filter(
    (value) => value !== "all" && value !== "",
  ).length

  const activeSolutionFiltersCount = Object.values(solutionFilters).filter(
    (value) => value !== "all" && value !== "" && value !== "recent",
  ).length

  const handleCreateSolution = (newSolution: Solution) => {
    if (!isProUser && solutions.length >= 3) {
      handleSolutionLimitReached()
      return
    }

    setSolutions((prev) => [...prev, newSolution])
    showSuccess("Solution created successfully!", `${newSolution.name} has been added to your dashboard.`)
  }

  const handleScheduleConsultation = () => {
    // Placeholder for Calendly integration
    showInfo("Opening consultation scheduler...", "You'll be redirected to our booking system.")
  }

  const shouldShowExpertCTA = () => {
    const incompleteSolutions = solutions.filter((s) => s.status !== "completed").length
    return incompleteSolutions >= 2 || solutions.length === 0
  }

  const handleExpertContact = (context?: { solution?: string; type?: string }) => {
    setExpertContext(context || {})
    setShowExpertModal(true)
  }

  const handleExpertSubmit = (data: any) => {
    setExpertRequestType(data.supportType)
    setShowExpertSuccess(true)
    showSuccess("Expert request sent!", "We'll contact you shortly to discuss your project.")
  }

  const handleBookInstantly = () => {
    // Placeholder for Calendly integration
    showInfo("Opening Calendly...", "You'll be redirected to our booking system.")
  }

  // Add these handlers after the existing ones
  const handleViewProduct = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId)
    setSelectedProduct(product)
  }

  const handlePurchaseProduct = (productId: string, priceOption: string) => {
    const product = mockProducts.find((p) => p.id === productId)
    if (product) {
      // Placeholder for Stripe/Gumroad integration
      console.log("Processing purchase:", { productId, priceOption, product })

      setPurchasedProduct(product)
      setSelectedProduct(null)
      setShowPurchaseSuccess(true)

      showSuccess("Purchase successful!", `You now have access to ${product.title}. Check your email for details.`)
    } else {
      showError("Product not found", "Unable to process purchase. Please try again.")
    }
  }

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(marketplaceFilters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(marketplaceFilters.search.toLowerCase())
    const matchesType = marketplaceFilters.type === "all" || product.type === marketplaceFilters.type
    const matchesCategory =
      marketplaceFilters.category === "all" ||
      product.category === marketplaceFilters.category ||
      selectedCategory === "all" ||
      product.category === selectedCategory
    const matchesPricing =
      marketplaceFilters.pricing === "all" ||
      (marketplaceFilters.pricing === "free" && product.price === 0) ||
      (marketplaceFilters.pricing === "paid" && product.price > 0) ||
      (marketplaceFilters.pricing === "premium" && product.isPremium)

    return matchesSearch && matchesType && matchesCategory && matchesPricing
  })

  const activeFiltersCount =
    Object.values(marketplaceFilters).filter((value) => value !== "all" && value !== "").length +
    (selectedCategory !== "all" ? 1 : 0)

  // Add these handlers after the existing marketplace handlers
  const handleUpgradeClick = () => {
    setShowSubscribeModal(true)
  }

  const handleSubscribe = (email: string) => {
    // Placeholder for Stripe integration
    console.log("Processing subscription for:", email)
    setIsProUser(true)
    setShowProSuccess(true)
    showSuccess("Welcome to PRO!", "You now have access to all premium features.")
  }

  const handleExploreProFeatures = () => {
    setActiveTab("marketplace") // Navigate to marketplace to show premium content
  }

  const handleSolutionLimitReached = () => {
    setShowSolutionLimit(true)
  }

  // Add project handlers
  const handleViewProjectDetails = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId)
    setSelectedProject(project || null)
  }

  const handleRequestUpdate = () => {
    showInfo("Update requested", "Your project manager will provide an update within 24 hours.")
  }

  const handleScheduleCall = () => {
    showInfo("Opening scheduler...", "You'll be redirected to book a call with your project manager.")
  }

  const handleAskQuestion = () => {
    showInfo("Opening chat...", "You'll be connected with your project team.")
  }

  // Add solution handlers
  const handleUpdateProgress = (solutionId: string, progress: number) => {
    setSolutions((prev) =>
      prev.map((solution) =>
        solution.id === solutionId
          ? { ...solution, progress, lastUpdated: new Date().toISOString().split("T")[0] }
          : solution,
      ),
    )
    showSuccess("Progress updated!", "Solution progress has been updated successfully.")
  }

  const handleAddNote = (solutionId: string, note: string) => {
    // In a real app, this would save to backend
    showSuccess("Note added!", "Your note has been saved to the solution.")
  }

  // Add marketplace handlers
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setMarketplaceFilters((prev) => ({ ...prev, category }))
  }

  const handleCompareProducts = (products: any[]) => {
    setComparisonProducts(products)
    setShowComparisonModal(true)
  }

  const handleSelectFromComparison = (productId: string) => {
    setShowComparisonModal(false)
    handleViewProduct(productId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      {/* Toast System */}
      <ToastSystem toasts={toasts} onRemoveToast={removeToast} />

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} className="flex-shrink-0" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Welcome Message */}
                <WelcomeMessage />

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockMetrics.map((metric, index) => (
                    <Card key={index} className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                            <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                            <p className="text-sm text-gray-500">{metric.change}</p>
                          </div>
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                            {metric.icon}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add this after the Metrics Cards in the overview tab */}
                {!isProUser && <ProUpgradeBanner onUpgradeClick={handleUpgradeClick} showDismiss={true} />}

                {/* Quick Actions */}
                <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button
                        className="h-auto p-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                        onClick={() => setShowSolutionWizard(true)}
                      >
                        <div className="text-center space-y-2">
                          <Plus className="w-8 h-8 mx-auto" />
                          <div>
                            <p className="font-semibold">New Solution</p>
                            <p className="text-sm opacity-90">Start building something new</p>
                          </div>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="h-auto p-6 bg-white/50 border-white/30 hover:bg-white/70"
                        onClick={handleScheduleConsultation}
                      >
                        <div className="text-center space-y-2">
                          <Calendar className="w-8 h-8 mx-auto text-purple-600" />
                          <div>
                            <p className="font-semibold">Schedule Consultation</p>
                          </div>
                        </div>
                      </Button>

                      <Button variant="outline" className="h-auto p-6 bg-white/50 border-white/30 hover:bg-white/70">
                        <div className="text-center space-y-2">
                          <BookOpen className="w-8 h-8 mx-auto text-green-600" />
                          <div>
                            <p className="font-semibold">Learning Center</p>
                            <p className="text-sm text-gray-600">Expand your knowledge</p>
                          </div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Expert CTA Banner - add this after the Quick Actions card */}
                <ExpertCTABanner onContactExpert={() => handleExpertContact()} showCondition={shouldShowExpertCTA()} />

                {/* CTA Card */}
                <CTACard onScheduleConsultation={handleScheduleConsultation} />
              </div>
            )}

            {/* Solutions Tab */}
            {activeTab === "solutions" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Solutions</h2>
                    <p className="text-gray-600">Manage your AI and Blockchain implementations</p>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={() => setShowSolutionWizard(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Solution
                  </Button>
                </div>

                {/* Solution Filters */}
                <SolutionFilters
                  searchQuery={solutionFilters.search}
                  onSearchChange={(search) => setSolutionFilters((prev) => ({ ...prev, search }))}
                  selectedStatus={solutionFilters.status}
                  onStatusChange={(status) => setSolutionFilters((prev) => ({ ...prev, status }))}
                  selectedType={solutionFilters.type}
                  onTypeChange={(type) => setSolutionFilters((prev) => ({ ...prev, type }))}
                  selectedComplexity={solutionFilters.complexity}
                  onComplexityChange={(complexity) => setSolutionFilters((prev) => ({ ...prev, complexity }))}
                  sortBy={solutionFilters.sortBy}
                  onSortChange={(sortBy) => setSolutionFilters((prev) => ({ ...prev, sortBy }))}
                  activeFiltersCount={activeSolutionFiltersCount}
                  onClearFilters={() => setSolutionFilters({ search: "", status: "all", type: "all", complexity: "all", sortBy: "recent" })}
                />

                {/* Solutions Grid or Empty State */}
                {filteredSolutions.length === 0 ? (
                  <EmptyState type="solutions" onCreateNew={() => setShowSolutionWizard(true)} />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredSolutions.map((solution) => (
                      <Card
                        key={solution.id}
                        className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        onClick={() => setSelectedSolution(solution)}
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-12 h-12 ${getTypeColor(solution.type)} rounded-xl flex items-center justify-center text-white`}
                              >
                                {solution.type === "AI" ? (
                                  <Bot className="w-6 h-6" />
                                ) : solution.type === "Blockchain" ? (
                                  <Blocks className="w-6 h-6" />
                                ) : (
                                  <Sparkles className="w-6 h-6" />
                                )}
                              </div>
                              <div>
                                <CardTitle className="text-lg">{solution.name}</CardTitle>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="outline">{solution.type}</Badge>
                                  <Badge variant="outline">{solution.complexity}</Badge>
                                  {solution.tags?.includes("Generated") && (
                                    <Badge className="bg-green-100 text-green-800 text-xs">Generated</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600">{solution.description}</p>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">{solution.progress}%</span>
                            </div>
                            <Progress value={solution.progress} className="h-2" />
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">Key Benefits:</p>
                            <div className="space-y-1">
                              {solution.benefits.slice(0, 2).map((benefit, index) => (
                                <p key={index} className="text-xs text-gray-600">• {benefit}</p>
                              ))}
                              {solution.benefits.length > 2 && (
                                <p className="text-xs text-blue-600">
                                  +{solution.benefits.length - 2} more benefits
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <Badge className={getStatusColor(solution.status)}>
                              {solution.status.replace("-", " ")}
                            </Badge>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{solution.estimatedTime}</span>
                            </div>
                          </div>

                          {/* Expert Help Option */}
                          {solution.status !== "completed" && (
                            <div className="pt-2 border-t border-white/20">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleExpertContact({
                                    solution: solution.name,
                                    type: "implementation",
                                  })
                                }}
                                className="w-full text-amber-600 border-amber-200 hover:bg-amber-50"
                              >
                                <Users className="w-4 h-4 mr-2" />
                                Get Expert Help
                              </Button>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2 border-t border-white/20">
                            <span className="text-xs text-gray-500">Updated {solution.lastUpdated}</span>
                            <Button size="sm" variant="ghost">
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Your Active Solutions</h2>
                    <p className="text-gray-600">Monitor real-time progress of your agency-managed projects</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {projects.length} Total Projects
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {projects.filter((p) => p.status === "in-progress").length} Active
                    </Badge>
                  </div>
                </div>

                {/* Filters */}
                <ProjectsFilters
                  searchQuery={projectsFilters.search}
                  onSearchChange={(search) => setProjectsFilters((prev) => ({ ...prev, search }))}
                  selectedStatus={projectsFilters.status}
                  onStatusChange={(status) => setProjectsFilters((prev) => ({ ...prev, status }))}
                  selectedType={projectsFilters.type}
                  onTypeChange={(type) => setProjectsFilters((prev) => ({ ...prev, type }))}
                  activeFiltersCount={activeProjectFiltersCount}
                  onClearFilters={() => setProjectsFilters({ search: "", status: "all", type: "all" })}
                />

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                  <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <FolderOpen className="w-16 h-16 text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
                      <p className="text-gray-600 mb-6">
                        {activeProjectFiltersCount > 0
                          ? "Try adjusting your filters to see more projects."
                          : "Your agency-managed projects will appear here once they're created."}
                      </p>
                      {activeProjectFiltersCount > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => setProjectsFilters({ search: "", status: "all", type: "all" })}
                        >
                          Clear Filters
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} onViewDetails={handleViewProjectDetails} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tasks Tab */}
            {activeTab === "tasks" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Task Management</h2>
                    <p className="text-gray-600">Track your implementation progress</p>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Task
                  </Button>
                </div>

                {mockTasks.length === 0 ? (
                  <EmptyState type="tasks" />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {["todo", "in-progress", "completed"].map((status) => (
                      <Card key={status} className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span className="capitalize">{status.replace("-", " ")}</span>
                            <Badge variant="outline">{mockTasks.filter((task) => task.status === status).length}</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {mockTasks
                            .filter((task) => task.status === status)
                            .map((task) => (
                              <Card key={task.id} className="bg-white/50 border border-white/20">
                                <CardContent className="p-4 space-y-3">
                                  <div className="flex items-start justify-between">
                                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-600">{task.description}</p>
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Due: {task.dueDate}</span>
                                    <span>{task.estimatedHours}h estimated</span>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    <span>Solution: {solutions.find(s => s.id === task.solutionId)?.name || "Unknown"}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === "resources" && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
                  <p className="text-gray-600">Expand your knowledge with curated content and tutorials</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      type: "course",
                      title: "AI Fundamentals for Business",
                      description: "Learn the basics of AI implementation",
                      duration: "2 hours",
                      level: "Beginner",
                      icon: <BookOpen className="w-6 h-6" />,
                      color: "from-blue-500 to-cyan-600",
                    },
                    {
                      type: "video",
                      title: "Blockchain in 30 Minutes",
                      description: "Quick overview of blockchain technology",
                      duration: "30 min",
                      level: "Beginner",
                      icon: <Video className="w-6 h-6" />,
                      color: "from-purple-500 to-pink-600",
                    },
                    {
                      type: "template",
                      title: "Smart Contract Templates",
                      description: "Ready-to-use smart contract code",
                      duration: "Download",
                      level: "Intermediate",
                      icon: <Code className="w-6 h-6" />,
                      color: "from-green-500 to-teal-600",
                    },
                    {
                      type: "guide",
                      title: "API Integration Guide",
                      description: "Step-by-step integration instructions",
                      duration: "1 hour",
                      level: "Intermediate",
                      icon: <FileText className="w-6 h-6" />,
                      color: "from-orange-500 to-red-600",
                    },
                    {
                      type: "webinar",
                      title: "AI Success Stories",
                      description: "Real-world implementation examples",
                      duration: "45 min",
                      level: "All levels",
                      icon: <Users className="w-6 h-6" />,
                      color: "from-indigo-500 to-purple-600",
                    },
                    {
                      type: "tool",
                      title: "ROI Calculator",
                      description: "Calculate your potential returns",
                      duration: "5 min",
                      level: "Beginner",
                      icon: <BarChart3 className="w-6 h-6" />,
                      color: "from-teal-500 to-blue-600",
                    },
                  ].map((resource, index) => (
                    <Card
                      key={index}
                      className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${resource.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                          >
                            {resource.icon}
                          </div>
                          <Badge variant="outline">{resource.level}</Badge>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                          <p className="text-sm text-gray-600">{resource.description}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/20">
                          <span className="text-sm text-gray-500">{resource.duration}</span>
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Marketplace Tab */}
            {activeTab === "marketplace" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">Premium Marketplace</h2>
                  <p className="text-xl text-gray-600">
                    Discover templates, courses, and tools to accelerate your success
                  </p>
                </div>

                {/* Categories */}
                <MarketplaceCategories onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />

                {/* Featured Product Banner */}
                <FeaturedProductBanner product={featuredProduct} onViewProduct={handleViewProduct} />

                {/* Filters */}
                <MarketplaceFilters
                  searchQuery={marketplaceFilters.search}
                  onSearchChange={(search) => setMarketplaceFilters((prev) => ({ ...prev, search }))}
                  selectedType={marketplaceFilters.type}
                  onTypeChange={(type) => setMarketplaceFilters((prev) => ({ ...prev, type }))}
                  selectedCategory={marketplaceFilters.category}
                  onCategoryChange={(category) => setMarketplaceFilters((prev) => ({ ...prev, category }))}
                  selectedPricing={marketplaceFilters.pricing}
                  onPricingChange={(pricing) => setMarketplaceFilters((prev) => ({ ...prev, pricing }))}
                  activeFiltersCount={activeFiltersCount}
                  onClearFilters={() => {
                    setMarketplaceFilters({ search: "", type: "all", category: "all", pricing: "all" })
                    setSelectedCategory("all")
                  }}
                />

                {/* Quick Actions */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handleCompareProducts(filteredProducts.slice(0, 3))}
                    className="bg-white/50 border-white/30"
                  >
                    Compare Products
                  </Button>
                  <div className="text-sm text-gray-600">
                    Showing {filteredProducts.length} of {mockProducts.length} products
                  </div>
                  <Button variant="outline" className="bg-white/50 border-white/30">
                    Advanced Filters
                  </Button>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                  <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                      <p className="text-gray-600 mb-6">
                        Try adjusting your filters or search terms to find what you're looking for.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setMarketplaceFilters({ search: "", type: "all", category: "all", pricing: "all" })
                        setSelectedCategory("all")
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onViewProduct={handleViewProduct} />
                  ))}
                </div>
              )}

              {/* Load More */}
              {filteredProducts.length > 0 && (
                <div className="text-center">
                  <Button variant="outline" className="bg-white/50 border-white/30">
                    Load More Products
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* PRO Tab */}
          {activeTab === "pro" && (
            <div className="space-y-12">
              {/* Hero Section */}
              <ProHeroSection onUpgradeClick={handleUpgradeClick} />

              {/* Benefits Grid */}
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to scale</h2>
                  <p className="text-xl text-gray-600">
                    Join thousands of entrepreneurs who've upgraded their business with PRO
                  </p>
                </div>
                <ProBenefitsGrid /> 
              </div>

              {/* Pricing Section */}
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
                  <p className="text-xl text-gray-600">Start your free trial today. No credit card required.</p>
                </div>
                <ProPricingCard onSubscribeClick={handleUpgradeClick} />
              </div>

              {/* FAQ or Testimonials could go here */}
              <div className="text-center py-12">
                <div className="max-w-3xl mx-auto space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Join 10,000+ entrepreneurs scaling with PRO</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        name: "Sarah K.",
                        role: "Marketing Agency",
                        quote: "PRO helped me automate my entire client workflow. Game changer!",
                      },
                      {
                        name: "Mike R.",
                        role: "E-commerce",
                        quote: "The AI recommendations saved me weeks of research. Worth every penny.",
                      },
                      {
                        name: "Lisa M.",
                        role: "Consultant",
                        quote: "Expert support is incredible. They helped me implement everything perfectly.",
                      },
                    ].map((testimonial, index) => (
                      <Card key={index} className="bg-white/70 backdrop-blur-md border border-white/20">
                        <CardContent className="p-6 text-center">
                          <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                          <p className="font-medium text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Final CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to transform your business?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Join PRO today and get access to all premium features, expert support, and exclusive resources.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    onClick={handleUpgradeClick}
                  >
                    Upgrade to PRO
                  </Button>
                  <Button variant="outline" className="text-white border-white hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  </div>
)
}
