import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, Clock, ArrowUpRight } from "lucide-react"

const caseStudies = [
  {
    title: "E-commerce AI Recommendation Engine",
    client: "Global Retail Chain",
    industry: "E-commerce",
    challenge: "Low conversion rates and poor customer engagement",
    solution: "Implemented ML-powered recommendation system with real-time personalization",
    results: [
      { metric: "Conversion Rate", value: "+45%", icon: TrendingUp },
      { metric: "Customer Engagement", value: "+67%", icon: Users },
      { metric: "Revenue Increase", value: "+$2.3M", icon: DollarSign },
      { metric: "Implementation Time", value: "8 weeks", icon: Clock },
    ],
    technologies: ["Python", "TensorFlow", "AWS", "React", "Node.js"],
  },
  {
    title: "DeFi Lending Platform",
    client: "FinTech Startup",
    industry: "Financial Services",
    challenge: "Need for transparent, automated lending without traditional intermediaries",
    solution: "Built decentralized lending platform with smart contracts and yield optimization",
    results: [
      { metric: "Total Value Locked", value: "$15M+", icon: DollarSign },
      { metric: "Active Users", value: "5,000+", icon: Users },
      { metric: "Transaction Volume", value: "+300%", icon: TrendingUp },
      { metric: "Security Audits", value: "100% Pass", icon: ArrowUpRight },
    ],
    technologies: ["Solidity", "Web3.js", "React", "IPFS", "Ethereum"],
  },
  {
    title: "Supply Chain Transparency System",
    client: "Manufacturing Company",
    industry: "Manufacturing",
    challenge: "Lack of transparency and traceability in global supply chain",
    solution: "Blockchain-based tracking system with IoT integration and AI analytics",
    results: [
      { metric: "Traceability", value: "100%", icon: ArrowUpRight },
      { metric: "Fraud Reduction", value: "-85%", icon: TrendingUp },
      { metric: "Cost Savings", value: "$500K/year", icon: DollarSign },
      { metric: "Partner Adoption", value: "95%", icon: Users },
    ],
    technologies: ["Hyperledger", "IoT Sensors", "Python", "React", "MongoDB"],
  },
]

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 px-4 bg-gray-900/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Case Studies & Results
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-world success stories showcasing measurable impact and transformative results
          </p>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2">{study.title}</CardTitle>
                    <div className="flex items-center gap-4 text-gray-400">
                      <span>Client: {study.client}</span>
                      <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                        {study.industry}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-purple-300 mb-2">Challenge</h4>
                    <p className="text-gray-300">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2">Solution</h4>
                    <p className="text-gray-300">{study.solution}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Key Results</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {study.results.map((result, resultIndex) => (
                      <div
                        key={resultIndex}
                        className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-lg p-4 text-center"
                      >
                        <result.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">{result.value}</div>
                        <div className="text-sm text-gray-400">{result.metric}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-gray-800 text-gray-300 hover:bg-gray-700"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
