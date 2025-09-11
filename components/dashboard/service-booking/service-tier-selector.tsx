"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PaymentModal } from "../../payments/payment-modal"
import {
  CheckCircle,
  Clock,
  Users,
  Zap,
  Star,
  Calendar,
  MessageSquare,
  Code,
  Rocket,
  Shield,
  ArrowRight,
} from "lucide-react"

interface ServiceTier {
  id: string
  name: string
  price: number
  timeline: string
  description: string
  features: string[]
  deliverables: string[]
  support: string
  popular?: boolean
  bestFor: string[]
  process: string[]
}

const serviceTiers: ServiceTier[] = [
  {
    id: "consultation",
    name: "Expert Consultation",
    price: 0,
    timeline: "1 hour",
    description: "Free strategy session to discuss your needs and provide recommendations",
    features: [
      "1-on-1 video call with specialist",
      "Solution assessment and recommendations",
      "Implementation roadmap",
      "Resource recommendations",
      "Follow-up email with action items",
    ],
    deliverables: [
      "Strategy session recording",
      "Custom recommendation report",
      "Implementation timeline",
      "Resource list and next steps",
    ],
    support: "Email follow-up included",
    bestFor: ["New to AI/Blockchain", "Need strategic guidance", "Exploring options"],
    process: [
      "Book 1-hour consultation call",
      "Discuss your business and challenges",
      "Receive personalized recommendations",
      "Get implementation roadmap",
      "Optional: Upgrade to implementation",
    ],
  },
  {
    id: "guided-implementation",
    name: "Guided Implementation",
    price: 2499,
    timeline: "2-4 weeks",
    description: "Expert-guided setup with hands-on support throughout the implementation process",
    features: [
      "Weekly 1-on-1 coaching calls",
      "Step-by-step implementation guide",
      "Code review and feedback",
      "Troubleshooting support",
      "Performance optimization",
      "30 days post-launch support",
    ],
    deliverables: [
      "Custom implementation plan",
      "Weekly progress reviews",
      "Code templates and examples",
      "Testing and QA checklist",
      "Documentation package",
    ],
    support: "Weekly calls + email/slack support",
    popular: true,
    bestFor: ["Want to learn while building", "Have some technical skills", "Need guidance"],
    process: [
      "Kick-off call and requirement gathering",
      "Receive custom implementation plan",
      "Weekly coaching and progress reviews",
      "Build solution with expert guidance",
      "Launch and 30-day support period",
    ],
  },
  {
    id: "done-for-you",
    name: "Done-For-You",
    price: 7499,
    timeline: "4-8 weeks",
    description: "Complete hands-off implementation with our team building everything for you",
    features: [
      "Complete solution development",
      "Custom design and branding",
      "Full testing and QA",
      "Deployment and setup",
      "Training and documentation",
      "90 days support and maintenance",
      "Performance guarantees",
    ],
    deliverables: [
      "Fully built and tested solution",
      "Source code and documentation",
      "Training materials and videos",
      "Deployment guide",
      "3 months of updates and support",
    ],
    support: "Dedicated project manager + 90 days full support",
    bestFor: ["Want it done professionally", "Limited time/technical skills", "Need guarantees"],
    process: [
      "Detailed requirements gathering",
      "Solution architecture and approval",
      "Development and regular updates",
      "Testing, review, and refinements",
      "Launch and comprehensive training",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Package",
    price: 15000,
    timeline: "8-16 weeks",
    description: "Complete enterprise solution with custom development and ongoing support",
    features: [
      "Custom solution architecture",
      "Enterprise-grade security",
      "Integration with existing systems",
      "Dedicated development team",
      "Priority support and SLA",
      "Ongoing maintenance and updates",
      "Training for your team",
    ],
    deliverables: [
      "Enterprise-grade solution",
      "Complete integration package",
      "Security audit and compliance",
      "Team training program",
      "1 year of premium support",
    ],
    support: "Dedicated team + priority support with SLA",
    bestFor: ["Large organizations", "Complex integrations", "Compliance requirements"],
    process: [
      "Enterprise consultation and scoping",
      "Custom architecture and planning",
      "Dedicated team development",
      "Enterprise testing and security audit",
      "Deployment and team training",
    ],
  },
]

interface ServiceTierSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelectTier: (tier: ServiceTier) => void
  solutionContext?: {
    name: string
    type: string
    complexity: string
  }
}

export function ServiceTierSelector({ isOpen, onClose, onSelectTier, solutionContext }: ServiceTierSelectorProps) {
  const [selectedTier, setSelectedTier] = useState<ServiceTier | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedTierForPayment, setSelectedTierForPayment] = useState<any>(null)

  const handleSelectTier = (tier: ServiceTier) => {
    setSelectedTier(tier)
    setShowDetails(true)
  }

  const handleConfirmSelection = () => {
    if (selectedTier) {
      if (selectedTier.id === "consultation") {
        // Free consultation - proceed directly
        onSelectTier(selectedTier)
      } else {
        // Paid service - show payment modal
        setSelectedTierForPayment(selectedTier)
        setShowPaymentModal(true)
      }
    }
  }

  const handlePaymentComplete = (paymentData: any) => {
    setShowPaymentModal(false)
    onSelectTier({
      ...selectedTierForPayment,
      paymentData,
      paid: true,
    })
  }

  const handlePaymentCancel = () => {
    setShowPaymentModal(false)
    setSelectedTierForPayment(null)
  }

  const getTierIcon = (tierId: string) => {
    switch (tierId) {
      case "consultation":
        return <MessageSquare className="w-6 h-6" />
      case "guided-implementation":
        return <Users className="w-6 h-6" />
      case "done-for-you":
        return <Rocket className="w-6 h-6" />
      case "enterprise":
        return <Shield className="w-6 h-6" />
      default:
        return <Zap className="w-6 h-6" />
    }
  }

  const getTierColor = (tierId: string) => {
    switch (tierId) {
      case "consultation":
        return "from-green-500 to-emerald-600"
      case "guided-implementation":
        return "from-blue-500 to-indigo-600"
      case "done-for-you":
        return "from-purple-500 to-pink-600"
      case "enterprise":
        return "from-gray-700 to-gray-900"
      default:
        return "from-blue-500 to-purple-600"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Choose Your Implementation Path</DialogTitle>
          {solutionContext && (
            <div className="text-center mt-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-800">
                {solutionContext.name} • {solutionContext.type} • {solutionContext.complexity}
              </Badge>
            </div>
          )}
        </DialogHeader>

        {!showDetails ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {serviceTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  tier.popular
                    ? "border-blue-400 shadow-xl bg-gradient-to-b from-blue-50 to-white"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
                onClick={() => handleSelectTier(tier)}
              >
                {tier.popular && (
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-2 text-sm font-medium rounded-t-lg">
                    <Star className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                )}

                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${getTierColor(tier.id)} rounded-2xl flex items-center justify-center text-white mx-auto`}
                    >
                      {getTierIcon(tier.id)}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                      <p className="text-gray-600 text-sm mt-2">{tier.description}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-gray-900">
                        {tier.price === 0 ? "Free" : `$${tier.price.toLocaleString()}`}
                      </div>
                      <div className="flex items-center justify-center text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{tier.timeline}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <p className="text-xs font-medium text-gray-700 mb-2">Key Features:</p>
                      {tier.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-start text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {tier.features.length > 3 && (
                        <p className="text-xs text-blue-600">+{tier.features.length - 3} more features</p>
                      )}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                      {tier.price === 0 ? "Book Free Call" : "Learn More"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          selectedTier && (
            <div className="space-y-6 mt-8">
              <div className="text-center">
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${getTierColor(selectedTier.id)} rounded-2xl flex items-center justify-center text-white mx-auto mb-4`}
                >
                  {getTierIcon(selectedTier.id)}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedTier.name}</h2>
                <p className="text-gray-600 mt-2">{selectedTier.description}</p>

                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {selectedTier.price === 0 ? "Free" : `$${selectedTier.price.toLocaleString()}`}
                    </div>
                    <div className="text-sm text-gray-600">Total Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedTier.timeline}</div>
                    <div className="text-sm text-gray-600">Timeline</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">What's Included</h3>
                      <div className="space-y-3">
                        {selectedTier.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Perfect For</h3>
                      <div className="space-y-2">
                        {selectedTier.bestFor.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Deliverables</h3>
                      <div className="space-y-3">
                        {selectedTier.deliverables.map((deliverable, index) => (
                          <div key={index} className="flex items-start">
                            <Code className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Our Process</h3>
                      <div className="space-y-3">
                        {selectedTier.process.map((step, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-gray-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <Button variant="outline" onClick={() => setShowDetails(false)} className="bg-transparent">
                  Back to Options
                </Button>
                <div className="space-x-3">
                  <Button variant="outline" className="bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ask Questions
                  </Button>
                  <Button
                    onClick={handleConfirmSelection}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8"
                  >
                    {selectedTier.price === 0 ? (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Free Call
                      </>
                    ) : (
                      <>
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )
        )}
      </DialogContent>
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handlePaymentCancel}
        serviceDetails={{
          id: selectedTierForPayment?.id || "",
          name: selectedTierForPayment?.name || "",
          price: selectedTierForPayment?.price || 0,
          description: selectedTierForPayment?.description || "",
          timeline: selectedTierForPayment?.timeline || "",
          features: selectedTierForPayment?.features || [],
        }}
        clientInfo={
          solutionContext
            ? {
                name: "",
                email: "",
                company: "",
              }
            : undefined
        }
        onPaymentComplete={handlePaymentComplete}
      />
    </Dialog>
  )
}
