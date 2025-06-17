import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Clock, Star } from "lucide-react"

const stats = [
  { icon: Award, label: "Projects Completed", value: "50+" },
  { icon: Users, label: "Happy Clients", value: "30+" },
  { icon: Clock, label: "Years Experience", value: "5+" },
  { icon: Star, label: "Client Rating", value: "4.9/5" },
]

export function About() {
  return (
    <section id="about" className="py-20 px-4 bg-gray-900/30">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                I'm a passionate developer specializing in the intersection of artificial intelligence and blockchain
                technology. With years of experience in both domains, I help businesses leverage cutting-edge
                technologies to solve complex problems and create innovative solutions.
              </p>
              <p>
                My expertise spans from developing sophisticated machine learning models to building secure, scalable
                blockchain applications. I believe in the transformative power of technology and am committed to
                delivering solutions that drive real business value.
              </p>
              <p>
                Whether you're looking to implement AI-driven automation, develop a blockchain-based platform, or need
                strategic guidance on digital transformation, I'm here to turn your vision into reality.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border-purple-500/20 text-center p-6"
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
