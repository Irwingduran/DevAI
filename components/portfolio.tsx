import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "AI-Powered Trading Bot",
    description:
      "Intelligent cryptocurrency trading bot using machine learning algorithms for market prediction and automated trading strategies.",
    tech: ["Python", "TensorFlow", "Blockchain APIs", "Real-time Analytics"],
    category: "AI + Blockchain",
  },
  {
    title: "DeFi Lending Platform",
    description: "Decentralized lending platform with smart contracts, yield farming, and liquidity mining features.",
    tech: ["Solidity", "Web3.js", "React", "IPFS"],
    category: "Blockchain",
  },
  {
    title: "Computer Vision Analytics",
    description:
      "Real-time object detection and analytics system for retail environments using advanced computer vision.",
    tech: ["PyTorch", "OpenCV", "FastAPI", "Docker"],
    category: "AI",
  },
  {
    title: "NFT Marketplace",
    description: "Full-featured NFT marketplace with minting, trading, and royalty distribution capabilities.",
    tech: ["Solidity", "Next.js", "IPFS", "MetaMask"],
    category: "Blockchain",
  },
  {
    title: "Predictive Maintenance AI",
    description: "IoT-integrated AI system for predicting equipment failures and optimizing maintenance schedules.",
    tech: ["Machine Learning", "IoT", "Time Series Analysis", "Cloud"],
    category: "AI",
  },
  {
    title: "DAO Governance Platform",
    description: "Decentralized autonomous organization platform with voting mechanisms and treasury management.",
    tech: ["Solidity", "Governance Tokens", "Multi-sig", "Web3"],
    category: "Blockchain",
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of innovative AI and blockchain solutions I've developed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group hover:transform hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.category === "AI"
                        ? "bg-purple-500/20 text-purple-300"
                        : project.category === "Blockchain"
                          ? "bg-cyan-500/20 text-cyan-300"
                          : "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-300"
                    }`}
                  >
                    {project.category}
                  </span>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-gray-400">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 flex-1"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 flex-1"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
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
