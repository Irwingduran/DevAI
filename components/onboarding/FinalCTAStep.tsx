"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import {  
  Users, 
  Calendar, 
  Mail, 
  Loader2,
  CheckCircle,
  Clock,
  DollarSign,
  Zap,
  Star,
  TrendingUp,
  Shield,
  Rocket,
  Bot,
  Blocks,
  Sparkles,
  ArrowRight,
  Phone,
  MessageCircle,
  FileText,
  Award
} from "lucide-react"
import { Solution } from "@/types/onboarding"

interface FinalCTAStepProps {
  email: string
  onEmailChange: (email: string) => void
  onAIBuilder: () => void
  onPersonalizedService: () => void
  onSendEmail: () => void
  isProcessing?: boolean
  solution: Solution
  userData: any
}

export function FinalCTAStep({ 
  email, 
  onEmailChange, 
  onAIBuilder, 
  onPersonalizedService,
  onSendEmail,
  isProcessing = false,
  solution,
  userData
}: FinalCTAStepProps) {
  const [emailSending, setEmailSending] = useState(false)
  const [selectedPath, setSelectedPath] = useState<'diy' | 'expert' | null>(null)

  const handleSendEmail = async () => {
    setEmailSending(true)
    await onSendEmail()
    setEmailSending(false)
  }

  // Calculate personalized metrics
  const estimatedValue = userData.revenueRange?.includes("$1M") ? "$25,000" : 
                        userData.revenueRange?.includes("$5M") ? "$50,000" : "$15,000"
  const timeSaved = userData.teamSize?.includes("50+") ? "40" : 
                   userData.teamSize?.includes("20") ? "25" : "15"
  const complexity = userData.techSavviness === "developer" ? "Advanced" : 
                    userData.techSavviness === "beginner" ? "Beginner-Friendly" : "Intermediate"
  
  const implementationTime = userData.implementationTimeline?.includes("ASAP") ? "2-4 weeks" :
                           userData.implementationTimeline?.includes("quarter") ? "1-2 months" : "2-4 months"
  
  // Get solution icon
  const SolutionIcon = solution.type === "AI" ? Bot : solution.type === "Blockchain" ? Blocks : Sparkles

  // Calculate ROI timeline
  const roiTimeline = userData.budgetRange?.includes("$100k") ? "3 months" : "6 months"

  // Get industry-specific success metrics
  const getIndustryMetrics = () => {
    const businessType = userData.businessType || ""
    if (businessType.includes("Healthcare")) {
      return ["95% HIPAA compliance", "60% faster patient processing", "40% reduction in no-shows"]
    } else if (businessType.includes("E-commerce")) {
      return ["80% inventory accuracy", "45% faster order processing", "30% increase in conversions"]
    } else if (businessType.includes("Services")) {
      return ["70% faster client onboarding", "50% reduction in manual tasks", "85% client satisfaction"]
    } else {
      return ["60% time savings", "40% cost reduction", "90% automation rate"]
    }
  }

  const industryMetrics = getIndustryMetrics()

  return (
    <div className="space-y-8 py-8">
      {/* Celebration Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-3xl opacity-20 animate-pulse" />
          </div>
        </div>
        <h2 className="text-5xl font-bold text-gray-900">Your Solution is Ready!</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Based on your {userData.businessType} business, we've created a personalized roadmap to transform your operations
        </p>
      </div>

      {/* Solution Summary Card */}
      <Card className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 border-2 border-blue-200 shadow-2xl max-w-4xl mx-auto">
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl ${
              solution.type === "AI" ? "bg-gradient-to-r from-blue-500 to-cyan-600" :
              solution.type === "Blockchain" ? "bg-gradient-to-r from-purple-500 to-indigo-600" :
              "bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600"
            } text-white`}>
              <SolutionIcon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">{solution.name}</h3>
              <p className="text-lg text-gray-600">{solution.description}</p>
              <div className="flex items-center space-x-3 mt-2">
                <Badge className="bg-blue-100 text-blue-800">{solution.type} Solution</Badge>
                <Badge className="bg-green-100 text-green-800">{complexity}</Badge>
                <Badge className="bg-purple-100 text-purple-800">{implementationTime}</Badge>
              </div>
            </div>
          </div>

          {/* Projected Impact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-blue-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white mx-auto mb-2">
                <DollarSign className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{estimatedValue}</p>
              <p className="text-sm text-gray-600">Projected Annual Value</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mx-auto mb-2">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{timeSaved}hrs/week</p>
              <p className="text-sm text-gray-600">Time Saved Weekly</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white mx-auto mb-2">
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{roiTimeline}</p>
              <p className="text-sm text-gray-600">ROI Break-Even</p>
            </div>
          </div>

          {/* Industry Success Metrics */}
          <div className="space-y-3 pt-4 border-t border-blue-200">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-600" />
              Expected Results for {userData.businessType} Businesses
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {industryMetrics.map((metric, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/60 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-800">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Paths */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Implementation Path</h3>
          <p className="text-xl text-gray-600">Based on your technical comfort level: {complexity}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* DIY Path */}
          <Card className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
            selectedPath === 'diy' 
              ? 'border-2 border-blue-500 shadow-2xl scale-105' 
              : 'border-2 border-blue-200 hover:border-blue-300 hover:scale-102 shadow-lg'
          } bg-gradient-to-br from-blue-50 to-cyan-50`}
          onClick={() => setSelectedPath('diy')}>
            <CardContent className="p-6 space-y-4">
              {userData.techSavviness === "developer" && (
                <Badge className="absolute top-4 right-4 bg-green-100 text-green-800">
                  <Star className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              )}
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <Rocket className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">AI-Guided Builder</h3>
                  <p className="text-gray-600">Build with smart templates & guidance</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Step-by-step AI guidance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Pre-built templates for {userData.businessType}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Integration with your current tools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">24/7 support and tutorials</span>
                </div>
              </div>

              <div className="bg-white/60 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Timeline:</span>
                  <span className="text-sm font-bold text-blue-600">{implementationTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Cost:</span>
                  <span className="text-sm font-bold text-green-600">
                    {userData.budgetRange?.includes("Under $5k") ? "$299/month" : "$599/month"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Success Rate:</span>
                  <span className="text-sm font-bold text-purple-600">89%</span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg py-3 rounded-xl shadow-lg"
                onClick={onAIBuilder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Launching Builder...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Start Building Now
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Expert Path */}
          <Card className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
            selectedPath === 'expert' 
              ? 'border-2 border-purple-500 shadow-2xl scale-105' 
              : 'border-2 border-purple-200 hover:border-purple-300 hover:scale-102 shadow-lg'
          } bg-gradient-to-br from-purple-50 to-pink-50`}
          onClick={() => setSelectedPath('expert')}>
            <CardContent className="p-6 space-y-4">
              {(userData.techSavviness === "beginner" || userData.budgetRange?.includes("$100k")) && (
                <Badge className="absolute top-4 right-4 bg-green-100 text-green-800">
                  <Star className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              )}
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Expert Implementation</h3>
                  <p className="text-gray-600">Full-service custom development</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Dedicated project team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Custom solution for your exact needs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Full training and handover</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">6-month support guarantee</span>
                </div>
              </div>

              <div className="bg-white/60 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Timeline:</span>
                  <span className="text-sm font-bold text-purple-600">{implementationTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Investment:</span>
                  <span className="text-sm font-bold text-green-600">
                    {userData.budgetRange?.includes("$100k") ? "$75k-$150k" : "$25k-$75k"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Success Rate:</span>
                  <span className="text-sm font-bold text-purple-600">97%</span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-3 rounded-xl shadow-lg"
                onClick={onPersonalizedService}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Project...
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Consultation
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Options */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Need More Information?</h3>
          <p className="text-gray-600">Our team is here to answer your questions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="flex items-center justify-center space-x-2 p-4 h-auto">
            <Phone className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <div className="font-medium">Schedule Call</div>
              <div className="text-xs text-gray-500">15-min consultation</div>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center justify-center space-x-2 p-4 h-auto">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <div className="text-left">
              <div className="font-medium">Live Chat</div>
              <div className="text-xs text-gray-500">Instant support</div>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center justify-center space-x-2 p-4 h-auto">
            <FileText className="w-5 h-5 text-purple-600" />
            <div className="text-left">
              <div className="font-medium">Case Studies</div>
              <div className="text-xs text-gray-500">See results</div>
            </div>
          </Button>
        </div>
      </div>

      {/* Email Capture - Enhanced */}
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-white via-green-50 to-teal-50 border-2 border-green-200 shadow-xl">
        <CardContent className="p-6 space-y-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center text-white mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Get Your Complete Solution Report</h3>
            <p className="text-gray-600">
              Receive a detailed PDF with implementation roadmaps, cost breakdowns, and timeline for your {solution.name}
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your business email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="flex-1 bg-white border-green-200 focus:border-green-500 h-12"
              />
              <Button 
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 h-12"
                onClick={handleSendEmail}
                disabled={!email || emailSending}
              >
                {emailSending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send Report
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Detailed implementation plan</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>ROI calculations & projections</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Integration requirements</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Success metrics & KPIs</span>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-center text-gray-500 border-t pt-3">
            <Shield className="w-3 h-3 inline mr-1" />
            We respect your privacy. Unsubscribe anytime.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}