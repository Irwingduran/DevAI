"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LeadCaptureForm } from "@/components/forms/lead-capture-form"
import { LeadCaptureModal } from "@/components/forms/lead-capture-modal"
import {
  ArrowRight,
  Sparkles,
  Shield,
  TrendingUp,
  CheckCircle,
  Star,
  Play,
  MessageSquare,
  BarChart3,
  Clock,
  Rocket,
  Heart,
  Brain,
  Target,
  Eye,
  Headphones,
} from "lucide-react"

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const steps = [
    {
      icon: MessageSquare,
      title: "Describe your business",
      description: "Tell us about your challenges and goals",
    },
    {
      icon: Target,
      title: "Choose your priorities",
      description: "Select what matters most to your success",
    },
    {
      icon: Brain,
      title: "Get a custom smart solution",
      description: "AI generates your personalized roadmap",
    },
    {
      icon: Rocket,
      title: "Build it yourself or let us do it",
      description: "Choose your implementation path",
    },
  ]

  const userTypes = [
    {
      emoji: "👩‍🎤",
      role: "Entrepreneurs",
      useCase: "Automate client messages and lead generation",
    },
    {
      emoji: "👨‍⚕️",
      role: "Small Business Owners",
      useCase: "Track orders with blockchain transparency",
    },
    {
      emoji: "📚",
      role: "Educators",
      useCase: "Create AI-powered learning experiences",
    },
    {
      emoji: "💼",
      role: "Freelancers",
      useCase: "Streamline project management workflows",
    },
  ]

  const templates = [
    {
      title: "AI Customer Support",
      description: "24/7 intelligent chat assistant",
      price: "$29",
      category: "AI",
    },
    {
      title: "Blockchain Inventory",
      description: "Transparent supply chain tracking",
      price: "$49",
      category: "Blockchain",
    },
    {
      title: "Smart Analytics",
      description: "AI-powered business insights",
      price: "$39",
      category: "AI",
    },
    {
      title: "Secure Payments",
      description: "Blockchain payment processing",
      price: "$59",
      category: "Blockchain",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "E-commerce Owner",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      quote: "Increased customer satisfaction by 40% with AI chat support",
      result: "40% boost in satisfaction",
    },
    {
      name: "Marcus Rodriguez",
      role: "Restaurant Chain",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      quote: "Blockchain inventory cut food waste by 60% across all locations",
      result: "60% less food waste",
    },
    {
      name: "Emily Watson",
      role: "Consulting Firm",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      quote: "AI analytics helped us identify $2M in cost savings opportunities",
      result: "$2M in savings identified",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-6">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                No Code Required
              </Badge>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Turn your business ideas into{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  smart AI-powered solutions
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                No code. No tech skills. Just tell us your pain points — we do the rest.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <LeadCaptureModal
                triggerText="Start Free"
                formOrigin="Hero CTA"
                trigger={
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                }
              />

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg rounded-full transition-all duration-300 bg-transparent"
                onClick={() => scrollToSection("how-it-works")}
              >
                <Play className="mr-2 w-5 h-5" />
                How it works
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-600">Solutions Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Expert Support</div>
              </div>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="relative">
              <img
                src="/placeholder.svg?height=600&width=800&text=Futuristic+AI+Assistant+Interface"
                alt="AI Assistant Interface"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Simple Process</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From idea to implementation in just 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === index

              return (
                <Card
                  key={index}
                  className={`relative transition-all duration-500 hover:shadow-lg ${
                    isActive ? "ring-2 ring-blue-500 shadow-lg scale-105" : ""
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <LeadCaptureModal
              triggerText="Try the guided experience"
              formOrigin="How It Works CTA"
              trigger={
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full"
                >
                  Try the guided experience
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              }
            />
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-700 mb-4">Perfect For</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Who It's For</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed for ambitious professionals ready to embrace smart technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userTypes.map((user, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {user.emoji}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{user.role}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{user.useCase}</p>
                  <div className="mt-4 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Tracker Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-green-100 text-green-700 mb-4">Real-Time Tracking</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Watch Your Solution Come to Life</h2>
              <p className="text-xl text-gray-600 mb-8">
                Full transparency with real-time project updates and expert communication
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Eye,
                    title: "See your solution come to life step by step",
                    description: "Live progress tracking with detailed milestones",
                  },
                  {
                    icon: BarChart3,
                    title: "Transparent development updates",
                    description: "Real-time notifications and status changes",
                  },
                  {
                    icon: Headphones,
                    title: "Built-in communication with experts",
                    description: "Direct chat with your dedicated solution team",
                  },
                ].map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="relative">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">AI Customer Support Bot</h3>
                    <Badge className="bg-green-100 text-green-700">In Progress</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Requirements gathering completed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">AI model training in progress</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">Integration testing - 2 days remaining</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* PRO Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-4">Go PRO</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Unlock Full Potential</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get unlimited access to advanced features and priority support
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2 border-gray-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Free</h3>
                  <div className="text-4xl font-bold mb-4">
                    $0<span className="text-lg text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600">Perfect for getting started</p>
                </div>

                <div className="space-y-3 mb-8">
                  {["3 solutions per month", "Basic templates", "Community support", "Standard processing time"].map(
                    (feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ),
                  )}
                </div>

                <LeadCaptureModal
                  triggerText="Get Started Free"
                  formOrigin="Free Plan CTA"
                  trigger={
                    <Button variant="outline" className="w-full bg-transparent">
                      Get Started Free
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            {/* PRO Plan */}
            <Card className="border-2 border-purple-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-semibold">
                Most Popular
              </div>

              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">PRO</h3>
                  <div className="text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      $49
                    </span>
                    <span className="text-lg text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600">For serious entrepreneurs</p>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    "Unlimited solutions",
                    "Premium templates & marketplace",
                    "Priority expert support",
                    "Advanced AI recommendations",
                    "Custom integrations",
                    "White-label options",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500" />
                      <span className="text-sm">{feature}</span>
                      {index >= 3 && <Badge className="bg-purple-100 text-purple-700 text-xs ml-auto">PRO</Badge>}
                    </div>
                  ))}
                </div>

                <LeadCaptureModal
                  triggerText="Try 7 Days Free"
                  formOrigin="PRO Plan CTA"
                  trigger={
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Try 7 Days Free
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates/Marketplace Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-700 mb-4">Ready-to-Use</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Plug-and-play tools to go faster</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Skip the setup with our pre-built solutions and templates
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      className={`${
                        template.category === "AI" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {template.category}
                    </Badge>
                    <div className="text-lg font-bold text-gray-900">{template.price}</div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all bg-transparent"
                  >
                    Preview & Install
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full bg-transparent"
            >
              Browse All Resources
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 mb-4">Success Stories</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Real Results from Real Businesses</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">See how our platform transformed these businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-gray-700 mb-6 italic">"{testimonial.quote}"</blockquote>

                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Badge className="bg-green-100 text-green-700">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {testimonial.result}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section with Embedded Form */}
      <section id="wizard" className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - CTA Content */}
            <div className="text-white">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                Ready to start building{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  smarter?
                </span>
              </h2>

              <p className="text-xl mb-8 opacity-90 max-w-2xl">
                Join thousands of entrepreneurs who've already transformed their businesses with AI and blockchain
                solutions
              </p>

              <div className="flex flex-wrap gap-8 text-sm opacity-75 mb-8">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  5-minute setup
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Cancel anytime
                </div>
              </div>

              <div className="lg:hidden mb-8">
                <LeadCaptureModal
                  triggerText="Get My Smart Solution"
                  formOrigin="Final CTA Mobile"
                  trigger={
                    <Button
                      size="lg"
                      className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                    >
                      <Rocket className="mr-2 w-5 h-5" />
                      Get My Smart Solution
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Right side - Embedded Form (Desktop only) */}
            <div className="hidden lg:block">
              <LeadCaptureForm formOrigin="Final CTA Embedded" className="shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SmartSolutions</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering businesses with AI and blockchain solutions, no technical knowledge required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>How it works</div>
                <div>Templates</div>
                <div>Pricing</div>
                <div>Enterprise</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>Expert Support</div>
                <div>Status</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            © 2024 SmartSolutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
