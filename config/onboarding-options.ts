import { 
  Repeat, 
  Settings, 
  MessageCircle, 
  DollarSign, 
  Compass,
  Clock,
  TrendingUp,
  Workflow,
  BarChart3,
  Eye,
  Scale,
  Users2,
  Shield,
  AlertTriangle,
  Target,
  Truck,
  Wifi,
  GraduationCap,
  Calendar,
  FileText,
  Package,
  CreditCard,
  Users,
  Stethoscope,
  Palette,
  Star,
  CheckCircle2,
  XCircle,
  Zap
} from "lucide-react"

export const businessTypes = [
  "Services (Consulting, Legal, etc.)",
  "E-commerce & Retail",
  "Healthcare & Wellness",
  "Education & Training",
  "Creative & Design",
  "Manufacturing",
  "Real Estate",
  "Other",
]

export const teamSizes = [
  "Just me", 
  "2-5 people", 
  "6-20 people", 
  "21-50 people", 
  "50+ people"
]

export const painPointOptions = [
  {
    id: "manual-tasks",
    title: "Too many manual tasks",
    description: "Repetitive work eating up your time",
    icon: Repeat,
    category: "operations"
  },
  {
    id: "organization",
    title: "Lack of organization",
    description: "Hard to keep track of everything",
    icon: Settings,
    category: "operations"
  },
  {
    id: "client-overload",
    title: "Client message overload",
    description: "Too many channels, missed messages",
    icon: MessageCircle,
    category: "communication"
  },
  {
    id: "finance-tracking",
    title: "Hard to track finances",
    description: "Cash flow and expense management",
    icon: DollarSign,
    category: "financial"
  },
  {
    id: "scaling-operations",
    title: "Struggling to scale operations",
    description: "Growth is limited by current processes",
    icon: Scale,
    category: "growth"
  },
  {
    id: "team-collaboration",
    title: "Poor team collaboration",
    description: "Team members work in silos",
    icon: Users2,
    category: "operations"
  },
  {
    id: "data-security",
    title: "Data security concerns",
    description: "Worried about protecting sensitive information",
    icon: Shield,
    category: "security"
  },
  {
    id: "compliance-issues",
    title: "Compliance & regulatory challenges",
    description: "Struggling to meet industry requirements",
    icon: AlertTriangle,
    category: "compliance"
  },
  {
    id: "customer-retention",
    title: "Poor customer retention",
    description: "Customers aren't staying loyal",
    icon: Target,
    category: "customer"
  },
  {
    id: "supply-chain",
    title: "Supply chain inefficiencies",
    description: "Inventory and logistics problems",
    icon: Truck,
    category: "operations"
  },
  {
    id: "remote-work",
    title: "Remote work challenges",
    description: "Difficult to manage distributed teams",
    icon: Wifi,
    category: "operations"
  },
  {
    id: "not-sure",
    title: "I'm not sure yet",
    description: "Still exploring possibilities",
    icon: Compass,
    category: "exploration"
  },
]

export const priorityOptions = [
  { id: "save-time", label: "Save time", icon: Clock },
  { id: "increase-sales", label: "Increase sales", icon: TrendingUp },
  { id: "automate-workflows", label: "Automate workflows", icon: Workflow },
  { id: "better-insights", label: "Gain better insights", icon: BarChart3 },
  { id: "exploring", label: "Just exploring", icon: Eye },
]

// New business context options
export const revenueRanges = [
  "Under $100k",
  "$100k - $500k", 
  "$500k - $1M",
  "$1M - $5M",
  "$5M+",
  "Prefer not to say"
]

export const businessAges = [
  "Less than 1 year",
  "1-3 years",
  "3-5 years", 
  "5-10 years",
  "10+ years"
]

export const growthStages = [
  { id: "startup", label: "Startup", description: "Building foundation and finding market fit" },
  { id: "growth", label: "Growth", description: "Scaling rapidly and expanding" },
  { id: "established", label: "Established", description: "Stable operations, optimizing efficiency" },
  { id: "mature", label: "Mature", description: "Market leader, focusing on innovation" }
]

export const budgetRanges = [
  "Under $5k",
  "$5k - $15k",
  "$15k - $50k", 
  "$50k - $100k",
  "$100k+",
  "Need to understand value first"
]

export const implementationTimelines = [
  "ASAP (within 1 month)",
  "Next quarter (1-3 months)",
  "This year (3-6 months)", 
  "Next year (6-12 months)",
  "Just planning ahead"
]

export const techSavviness = [
  { id: "beginner", label: "Beginner", description: "Prefer simple, guided setup" },
  { id: "intermediate", label: "Intermediate", description: "Comfortable with some technical setup" },
  { id: "advanced", label: "Advanced", description: "Can handle complex implementations" },
  { id: "developer", label: "Developer/IT Team", description: "Full technical capabilities" }
]

// Industry-specific pain points
export const industryPainPoints = {
  "Services (Consulting, Legal, etc.)": [
    {
      id: "client-scheduling",
      title: "Complex client scheduling",
      description: "Managing appointments and availability across team members",
      icon: Calendar,
      category: "operations"
    },
    {
      id: "document-management",
      title: "Document management chaos",
      description: "Version control and secure client document handling",
      icon: FileText,
      category: "operations"
    },
    {
      id: "billing-complexity",
      title: "Complex billing & time tracking",
      description: "Tracking billable hours and project costs accurately",
      icon: Clock,
      category: "financial"
    },
    {
      id: "client-communication",
      title: "Client communication gaps",
      description: "Maintaining consistent communication throughout projects",
      icon: MessageCircle,
      category: "communication"
    }
  ],
  "E-commerce & Retail": [
    {
      id: "inventory-management",
      title: "Inventory management issues",
      description: "Stock levels, reordering, and multichannel sync",
      icon: Package,
      category: "operations"
    },
    {
      id: "payment-processing",
      title: "Payment processing complexity",
      description: "Multiple payment methods and fraud protection",
      icon: CreditCard,
      category: "financial"
    },
    {
      id: "customer-support",
      title: "Customer support overload",
      description: "Managing returns, inquiries, and support tickets",
      icon: Users,
      category: "customer"
    },
    {
      id: "marketing-roi",
      title: "Poor marketing ROI tracking",
      description: "Difficulty measuring advertising effectiveness",
      icon: Target,
      category: "marketing"
    }
  ],
  "Healthcare & Wellness": [
    {
      id: "patient-scheduling",
      title: "Patient scheduling conflicts",
      description: "Managing appointments, cancellations, and no-shows",
      icon: Calendar,
      category: "operations"
    },
    {
      id: "compliance-reporting",
      title: "Compliance & reporting burden",
      description: "HIPAA compliance and medical record management",
      icon: Shield,
      category: "compliance"
    },
    {
      id: "billing-insurance",
      title: "Insurance & billing complexity",
      description: "Insurance claims, copays, and payment processing",
      icon: DollarSign,
      category: "financial"
    },
    {
      id: "patient-communication",
      title: "Patient communication gaps",
      description: "Appointment reminders and follow-up care",
      icon: Stethoscope,
      category: "communication"
    }
  ],
  "Education & Training": [
    {
      id: "student-engagement",
      title: "Low student engagement",
      description: "Keeping learners motivated and participating",
      icon: GraduationCap,
      category: "operations"
    },
    {
      id: "content-creation",
      title: "Content creation overhead",
      description: "Developing and updating course materials",
      icon: FileText,
      category: "operations"
    },
    {
      id: "progress-tracking",
      title: "Student progress tracking",
      description: "Monitoring learning outcomes and performance",
      icon: BarChart3,
      category: "analytics"
    },
    {
      id: "certification-management",
      title: "Certification & credential management",
      description: "Issuing and verifying certificates and badges",
      icon: Star,
      category: "compliance"
    }
  ],
  "Creative & Design": [
    {
      id: "project-management",
      title: "Creative project chaos",
      description: "Managing multiple projects and client revisions",
      icon: Palette,
      category: "operations"
    },
    {
      id: "asset-management",
      title: "Digital asset management",
      description: "Organizing and sharing creative files and resources",
      icon: FileText,
      category: "operations"
    },
    {
      id: "client-approval",
      title: "Slow client approval process",
      description: "Getting feedback and approvals on creative work",
      icon: CheckCircle2,
      category: "communication"
    },
    {
      id: "pricing-projects",
      title: "Project pricing challenges",
      description: "Estimating time and costs for creative work",
      icon: DollarSign,
      category: "financial"
    }
  ]
}

// Common tools by industry for competitive intelligence
export const industryTools = {
  "Services (Consulting, Legal, etc.)": [
    "Calendly", "Acuity Scheduling", "DocuSign", "Dropbox", "Google Drive", 
    "QuickBooks", "FreshBooks", "Slack", "Microsoft Teams", "Zoom", 
    "Clio", "MyCase", "PracticePanther", "HubSpot", "Salesforce"
  ],
  "E-commerce & Retail": [
    "Shopify", "WooCommerce", "Magento", "BigCommerce", "Square", 
    "Stripe", "PayPal", "Inventory Management", "ShipStation", "Mailchimp", 
    "Klaviyo", "Google Analytics", "Facebook Ads", "Amazon Seller Central", "Etsy"
  ],
  "Healthcare & Wellness": [
    "Epic", "Cerner", "athenahealth", "SimplePractice", "TherapyNotes", 
    "TheraNest", "Kareo", "DrChrono", "NextGen", "eClinicalWorks",
    "Teladoc", "Doxy.me", "Zoom for Healthcare", "HIPAA Chat", "Secure Email"
  ],
  "Education & Training": [
    "Canvas", "Blackboard", "Moodle", "Google Classroom", "Coursera", 
    "Udemy", "Teachable", "Thinkific", "Zoom", "Microsoft Teams",
    "Kahoot", "Padlet", "Flipgrid", "Gradebook", "Student Information Systems"
  ],
  "Creative & Design": [
    "Adobe Creative Suite", "Figma", "Sketch", "Canva", "InVision", 
    "Monday.com", "Asana", "Trello", "Basecamp", "Slack",
    "Dropbox", "Google Drive", "Frame.io", "ReviewBoard", "ProofHQ"
  ]
}

// Tool satisfaction and competitive intelligence options
export const toolSatisfactionLevels = [
  { id: "love", label: "Love it", description: "Works perfectly for us", icon: Star },
  { id: "like", label: "Like it", description: "Generally good with minor issues", icon: CheckCircle2 },
  { id: "neutral", label: "It's okay", description: "Gets the job done but not ideal", icon: Settings },
  { id: "dislike", label: "Don't like it", description: "Frequent issues or limitations", icon: XCircle },
  { id: "hate", label: "Hate it", description: "Major problems, looking to replace", icon: AlertTriangle }
]

export const previousSolutionOutcomes = [
  { id: "successful", label: "Very successful", description: "Exceeded expectations", icon: Star },
  { id: "somewhat-successful", label: "Somewhat successful", description: "Some benefits but had issues", icon: CheckCircle2 },
  { id: "failed", label: "Failed", description: "Didn't work out, had to abandon", icon: XCircle },
  { id: "too-complex", label: "Too complex", description: "Too difficult to implement or use", icon: AlertTriangle },
  { id: "no-previous", label: "No previous attempts", description: "This is our first time", icon: Zap }
]