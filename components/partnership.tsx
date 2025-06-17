"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Handshake, Users, Award, ArrowRight, Star, Building, Code, Zap } from "lucide-react"

const partnershipTypes = [
  {
    icon: Building,
    title: "Development Agencies",
    description: "Partner with agencies to expand AI and blockchain capabilities for their clients",
    benefits: ["White-label solutions", "Technical expertise", "Scalable resources", "Revenue sharing"],
    commitment: "Long-term partnership",
  },
  {
    icon: Code,
    title: "Technology Partners",
    description: "Collaborate with tech companies to integrate AI/blockchain into existing platforms",
    benefits: ["API integrations", "Joint development", "Technical support", "Co-marketing"],
    commitment: "Strategic alliance",
  },
  {
    icon: Users,
    title: "Referral Program",
    description: "Earn commissions by referring clients who need AI and blockchain solutions",
    benefits: ["15% commission", "Marketing support", "Lead tracking", "Monthly payouts"],
    commitment: "Flexible engagement",
  },
  {
    icon: Zap,
    title: "Startup Accelerators",
    description: "Provide technical mentorship and development services to portfolio companies",
    benefits: ["Equity partnerships", "Technical mentorship", "Rapid prototyping", "Investor relations"],
    commitment: "Program duration",
  },
]

const collaborationAreas = [
  {
    area: "Joint Ventures",
    description: "Co-develop innovative AI and blockchain products",
    icon: Handshake,
  },
  {
    area: "Research & Development",
    description: "Collaborate on cutting-edge technology research",
    icon: Award,
  },
  {
    area: "Training & Workshops",
    description: "Provide technical training and educational content",
    icon: Users,
  },
  {
    area: "Consulting Services",
    description: "Offer specialized expertise to your clients",
    icon: Star,
  },
]

const partnerBenefits = [
  "Access to cutting-edge AI and blockchain expertise",
  "Flexible engagement models and pricing",
  "Dedicated partner support and account management",
  "Co-marketing opportunities and joint case studies",
  "Priority access to new technologies and services",
  "Comprehensive technical documentation and resources",
]

export function Partnership() {
  return (
    <section id="partnership" className="py-20 px-4 bg-gray-900/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Partnership & Collaboration
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join forces to deliver exceptional AI and blockchain solutions. Let's grow together through strategic
            partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {partnershipTypes.map((partnership, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                  <partnership.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">{partnership.title}</CardTitle>
                <CardDescription className="text-gray-400">{partnership.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Key Benefits</h4>
                  <ul className="space-y-1">
                    {partnership.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="outline" className="border-cyan-500/50 text-cyan-300">
                    {partnership.commitment}
                  </Badge>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Collaboration Areas */}
          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Collaboration Opportunities</CardTitle>
              <CardDescription className="text-gray-400">
                Multiple ways to work together and create value
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {collaborationAreas.map((collab, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-purple-900/20 to-cyan-900/20"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <collab.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{collab.area}</h4>
                      <p className="text-gray-400 text-sm">{collab.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Partner Benefits */}
          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Why Partner With Me?</CardTitle>
              <CardDescription className="text-gray-400">
                Comprehensive benefits for all partnership types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {partnerBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-lg bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">Ready to Partner?</div>
                  <p className="text-gray-400 text-sm mb-4">
                    Let's discuss how we can work together to deliver exceptional results
                  </p>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 group"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Start Partnership Discussion
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
