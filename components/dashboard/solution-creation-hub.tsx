"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Wand2,
  FileText,
  Target,
  Bot,
  Blocks,
  Sparkles,
  TrendingUp,
  Clock,
  Users,
  ArrowRight,
  Search,
  Filter,
  Star,
  Download,
  Play,
  BookOpen,
  Lightbulb,
  Zap,
} from "lucide-react"

interface SolutionCreationHubProps {
  onCreateSolution: (solution: any) => void
  onContactExpert: (context: any) => void
  solutionCount: number
  isProUser: boolean
}

const quickTemplates = [
  {
    id: "ai-chatbot",
    name: "AI Customer Support",
    description: "Automated customer service with natural language processing",
    type: "AI",
    complexity: "Intermediate",
    estimatedTime: "2-3 weeks",
    popularity: 95,
    icon: <Bot className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-600",
    benefits: ["24/7 availability", "80% faster responses", "Cost reduction"],
    tags: ["Popular", "Quick Setup"],
  },
  {
    id: "blockchain-supply",
    name: "Supply Chain Tracker",
    description: "Transparent supply chain with blockchain verification",
    type: "Blockchain",
    complexity: "Advanced",
    estimatedTime: "4-6 weeks",
    popularity: 87,
    icon: <Blocks className="w-5 h-5" />,
    color: "from-purple-500 to-pink-600",
    benefits: ["Full transparency", "Fraud prevention", "Compliance automation"],
    tags: ["Enterprise", "Security"],
  },
  {
    id: "hybrid-analytics",
    name: "Smart Analytics Platform",
    description: "AI-powered analytics with blockchain data integrity",
    type: "Hybrid",
    complexity: "Advanced",
    estimatedTime: "6-8 weeks",
    popularity: 92,
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-indigo-500 to-purple-600",
    benefits: ["Predictive insights", "Data integrity", "Automated reports"],
    tags: ["Trending", "Advanced"],
  },
  {
    id: "ai-content",
    name: "Content Generator",
    description: "AI-powered content creation and optimization",
    type: "AI",
    complexity: "Beginner",
    estimatedTime: "1-2 weeks",
    popularity: 89,
    icon: <FileText className="w-5 h-5" />,
    color: "from-green-500 to-teal-600",
    benefits: ["10x faster content", "SEO optimized", "Brand consistency"],
    tags: ["Beginner Friendly", "Marketing"],
  },
]

const creationMethods = [
  {
    id: "wizard",
    title: "Smart Solution Wizard",
    description: "AI-powered guided process that creates personalized solutions",
    icon: <Wand2 className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-600",
    features: ["AI-powered recommendations", "Step-by-step guidance", "Personalized solutions"],
    badge: "Recommended",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    id: "template",
    title: "Solution Templates",
    description: "Start with proven templates and customize for your needs",
    icon: <FileText className="w-8 h-8" />,
    color: "from-purple-500 to-pink-600",
    features: ["Pre-built solutions", "Quick customization", "Proven frameworks"],
    badge: "Quick Start",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "manual",
    title: "Custom Solution",
    description: "Build a completely custom solution from scratch",
    icon: <Target className="w-8 h-8" />,
    color: "from-indigo-500 to-purple-600",
    features: ["Full customization", "Advanced options", "Complete control"],
    badge: "Advanced",
    badgeColor: "bg-purple-100 text-purple-800",
  },
]

const recentActivity = [
  {
    type: "template",
    name: "AI Chatbot Template",
    downloads: 1250,
    rating: 4.8,
    updated: "2 days ago",
  },
  {
    type: "solution",
    name: "Blockchain Voting System",
    downloads: 890,
    rating: 4.9,
    updated: "1 week ago",
  },
  {
    type: "template",
    name: "Smart Contract Audit Kit",
    downloads: 567,
    rating: 4.7,
    updated: "3 days ago",
  },
]

export function SolutionCreationHub({
  onCreateSolution,
  onContactExpert,
  solutionCount,
  isProUser,
}: SolutionCreationHubProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAllTemplates, setShowAllTemplates] = useState(false)

  const handleTemplateSelect = (template: any) => {
    const newSolution = {
      id: Date.now().toString(),
      name: template.name,
      description: template.description,
      type: template.type,
      complexity: template.complexity,
      estimatedTime: template.estimatedTime,
      status: "planning" as const,
      progress: 0,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      benefits: template.benefits,
      nextSteps: [
        "Review solution requirements",
        "Set up development environment",
        "Begin implementation",
        "Test and optimize",
      ],
      tags: ["Template", ...template.tags],
      timeSaved: "0 hrs/week",
      automationLevel: 0,
      resources: [],
      notes: [],
    }

    onCreateSolution(newSolution)
  }

  const handleWizardStart = () => {
    // This would trigger the wizard modal
    console.log("Starting solution wizard...")
  }

  const handleManualCreate = () => {
    // This would open the manual creation form
    console.log("Opening manual creation form...")
  }

  const filteredTemplates = quickTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.type.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Lightbulb className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Solution Creation Hub</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose how you'd like to create your next AI or Blockchain solution
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4" />
            <span>{solutionCount} solutions created</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>95% success rate</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Avg. 2-4 weeks to complete</span>
          </div>
        </div>
      </div>

      {/* Creation Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creationMethods.map((method) => (
          <Card
            key={method.id}
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-blue-500"
            onClick={() => {
              if (method.id === "wizard") handleWizardStart()
              else if (method.id === "manual") handleManualCreate()
              else setShowAllTemplates(true)
            }}
          >
            <CardContent className="p-6 text-center space-y-4">
              <div
                className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto text-white`}
              >
                {method.icon}
              </div>
              <div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <h3 className="font-semibold text-lg">{method.title}</h3>
                  <Badge className={method.badgeColor}>{method.badge}</Badge>
                </div>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
              <div className="space-y-2">
                {method.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Templates Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Popular Templates</h2>
            <p className="text-gray-600">Get started quickly with proven solution templates</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          {["all", "ai", "blockchain", "hybrid"].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === "all" ? "All Types" : category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group"
              onClick={() => handleTemplateSelect(template)}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center text-white`}
                  >
                    {template.icon}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-500">{template.popularity}%</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">{template.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Timeline:</span>
                    <span className="font-medium">{template.estimatedTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Complexity:</span>
                    <Badge variant="outline" className="text-xs">
                      {template.complexity}
                    </Badge>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500 mb-2">Key Benefits:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {template.benefits.slice(0, 2).map((benefit, index) => (
                      <li key={index}>• {benefit}</li>
                    ))}
                    {template.benefits.length > 2 && (
                      <li className="text-blue-600">+{template.benefits.length - 2} more</li>
                    )}
                  </ul>
                </div>

                <Button className="w-full" size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {!showAllTemplates && (
          <div className="text-center">
            <Button variant="outline" onClick={() => setShowAllTemplates(true)}>
              View All Templates
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Trending Solutions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentActivity.map((item, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <Badge variant="outline" className="text-xs capitalize">
                    {item.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Download className="w-3 h-3" />
                      <span>{item.downloads}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                  <span>{item.updated}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Expert Help CTA */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">Need Expert Help?</h3>
                <p className="text-gray-600">Get personalized guidance from our AI and Blockchain specialists</p>
              </div>
            </div>
            <Button
              onClick={() => onContactExpert({ source: "creation-hub" })}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Contact Expert
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Learning Resources */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Learning Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "AI Implementation Guide", type: "Guide", duration: "15 min read" },
            { title: "Blockchain Basics", type: "Course", duration: "2 hours" },
            { title: "Solution Planning Workshop", type: "Video", duration: "45 min" },
            { title: "Best Practices Checklist", type: "Checklist", duration: "5 min" },
          ].map((resource, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <Badge variant="outline" className="text-xs">
                    {resource.type}
                  </Badge>
                </div>
                <h4 className="font-medium text-sm mb-1">{resource.title}</h4>
                <p className="text-xs text-gray-500">{resource.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
