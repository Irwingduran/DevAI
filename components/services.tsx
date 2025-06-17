import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Blocks, Lightbulb, Code, Database, Shield } from "lucide-react"

const services = [
  {
    icon: Brain,
    title: "AI Development",
    description: "Custom AI solutions, machine learning models, and intelligent automation systems.",
    features: ["Machine Learning Models", "Natural Language Processing", "Computer Vision", "Predictive Analytics"],
  },
  {
    icon: Blocks,
    title: "Blockchain Development",
    description: "Secure, scalable blockchain applications and smart contract development.",
    features: ["Smart Contracts", "DeFi Applications", "NFT Platforms", "Web3 Integration"],
  },
  {
    icon: Lightbulb,
    title: "AI Strategy Consulting",
    description: "Strategic guidance on AI implementation and digital transformation.",
    features: ["AI Roadmapping", "Technology Assessment", "Implementation Planning", "ROI Analysis"],
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "End-to-end development of AI-powered and blockchain-integrated applications.",
    features: ["Frontend Development", "Backend APIs", "Database Design", "Cloud Deployment"],
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Data pipeline development and infrastructure for AI and analytics.",
    features: ["Data Pipelines", "ETL Processes", "Data Warehousing", "Real-time Analytics"],
  },
  {
    icon: Shield,
    title: "Security & Auditing",
    description: "Security audits for smart contracts and AI systems.",
    features: ["Smart Contract Audits", "Security Testing", "Vulnerability Assessment", "Compliance Review"],
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Services & Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive AI and blockchain solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group hover:transform hover:scale-105"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-400">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
