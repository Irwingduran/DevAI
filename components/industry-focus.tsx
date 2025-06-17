import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Building2, Heart, GraduationCap, Banknote, Factory } from "lucide-react"

const industries = [
  {
    icon: Banknote,
    name: "Financial Services",
    description: "DeFi platforms, trading bots, risk management, and regulatory compliance solutions",
    projects: 12,
    expertise: ["Smart Contracts", "DeFi Protocols", "Risk Analytics", "Compliance Automation"],
    compliance: ["SOX", "PCI DSS", "GDPR"],
  },
  {
    icon: ShoppingCart,
    name: "E-commerce & Retail",
    description: "AI-powered recommendations, inventory optimization, and customer analytics",
    projects: 15,
    expertise: ["Recommendation Systems", "Inventory AI", "Customer Analytics", "Supply Chain"],
    compliance: ["PCI DSS", "CCPA"],
  },
  {
    icon: Heart,
    name: "Healthcare & MedTech",
    description: "Medical AI diagnostics, patient data management, and telemedicine platforms",
    projects: 8,
    expertise: ["Medical AI", "Data Privacy", "Diagnostic Tools", "Patient Management"],
    compliance: ["HIPAA", "FDA", "GDPR"],
  },
  {
    icon: Factory,
    name: "Manufacturing",
    description: "IoT integration, predictive maintenance, and supply chain transparency",
    projects: 10,
    expertise: ["IoT Integration", "Predictive Analytics", "Quality Control", "Supply Chain"],
    compliance: ["ISO 9001", "ISO 27001"],
  },
  {
    icon: Building2,
    name: "Real Estate & PropTech",
    description: "Property tokenization, smart contracts for transactions, and market analytics",
    projects: 7,
    expertise: ["Property Tokens", "Smart Contracts", "Market Analysis", "Investment Platforms"],
    compliance: ["Real Estate Law", "Securities"],
  },
  {
    icon: GraduationCap,
    name: "Education & EdTech",
    description: "Personalized learning AI, credential verification, and educational platforms",
    projects: 6,
    expertise: ["Learning AI", "Credential Systems", "Student Analytics", "Content Delivery"],
    compliance: ["FERPA", "COPPA"],
  },
]

const complianceStandards = [
  { name: "GDPR", description: "General Data Protection Regulation" },
  { name: "HIPAA", description: "Health Insurance Portability and Accountability Act" },
  { name: "SOX", description: "Sarbanes-Oxley Act" },
  { name: "PCI DSS", description: "Payment Card Industry Data Security Standard" },
  { name: "ISO 27001", description: "Information Security Management" },
  { name: "FDA", description: "Food and Drug Administration Compliance" },
]

export function IndustryFocus() {
  return (
    <section id="industry-focus" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Industry Focus & Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Deep domain knowledge across multiple industries with compliance expertise and regulatory understanding
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {industries.map((industry, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group hover:transform hover:scale-105"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <industry.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                  {industry.name}
                </CardTitle>
                <CardDescription className="text-gray-400">{industry.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Projects Completed</span>
                  <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                    {industry.projects}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Core Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {industry.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Compliance</h4>
                  <div className="flex flex-wrap gap-1">
                    {industry.compliance.map((comp, compIndex) => (
                      <Badge key={compIndex} variant="outline" className="text-xs border-green-500/50 text-green-300">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Compliance Standards */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Compliance & Regulatory Expertise</CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Extensive knowledge of industry regulations and compliance requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {complianceStandards.map((standard, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/20"
                >
                  <h4 className="text-white font-semibold mb-1">{standard.name}</h4>
                  <p className="text-gray-400 text-sm">{standard.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
