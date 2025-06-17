"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

const processSteps = [
  {
    title: "Business Analysis",
    description: "We start by understanding your business model, goals, and current digital infrastructure.",
    features: ["Current state assessment", "Goal identification", "Technology audit", "ROI potential analysis"],
  },
  {
    title: "Solution Design",
    description: "Custom AI and blockchain solutions tailored to your specific business needs and objectives.",
    features: ["Architecture planning", "Technology selection", "Integration strategy", "Scalability planning"],
  },
  {
    title: "Implementation",
    description: "Agile development and deployment with continuous testing and optimization.",
    features: ["Iterative development", "Quality assurance", "Performance optimization", "Security implementation"],
  },
  {
    title: "Support & Growth",
    description: "Ongoing support, monitoring, and enhancement to ensure long-term success.",
    features: ["24/7 monitoring", "Performance analytics", "Continuous improvement", "Training & documentation"],
  },
]

export function Process() {
  return (
    <section id="process" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              My Process & Methodology
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A systematic approach to implementing AI and blockchain solutions that drive real business value
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Flowchart */}
          <div className="order-2 lg:order-1">
            <Card className="bg-gray-900/50 border-purple-500/20 p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-white mb-2">AI & Blockchain Implementation Flowchart</CardTitle>
                <CardDescription className="text-gray-400">
                  Interactive decision tree to determine the best AI and blockchain solutions for your business
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-white rounded-lg p-4 mb-4">
                  <img
                    src="/images/ai-blockchain-flowchart.png"
                    alt="AI and Blockchain Implementation Flowchart"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Business Assessment:</strong> Evaluate your current digital state and business goals
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>AI Solutions:</strong> Intelligent automation, customer service, and analytics
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Blockchain Integration:</strong> Security, transparency, and tokenization systems
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Custom Implementation:</strong> Tailored solutions for your specific use case
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Process Steps */}
          <div className="order-1 lg:order-2 space-y-6">
            {processSteps.map((step, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-xl text-white">{step.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400 ml-14">{step.description}</CardDescription>
                </CardHeader>
                <CardContent className="ml-14">
                  <ul className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <div className="pt-6">
              <Button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 text-lg group w-full"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
