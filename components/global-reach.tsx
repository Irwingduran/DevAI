import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Clock, MapPin, Users, Wifi, Shield } from "lucide-react"

const regions = [
  {
    region: "North America",
    countries: ["United States", "Canada", "Mexico"],
    timezone: "EST/PST",
    clients: 15,
    availability: "24/7",
  },
  {
    region: "Europe",
    countries: ["United Kingdom", "Germany", "France", "Netherlands", "Spain"],
    timezone: "GMT/CET",
    clients: 12,
    availability: "Business Hours",
  },
  {
    region: "Asia Pacific",
    countries: ["Australia", "Singapore", "Japan", "South Korea"],
    timezone: "AEST/JST",
    clients: 8,
    availability: "Extended Hours",
  },
  {
    region: "Latin America",
    countries: ["Brazil", "Argentina", "Chile", "Colombia"],
    timezone: "BRT/ART",
    clients: 6,
    availability: "Business Hours",
  },
]

const capabilities = [
  {
    icon: Wifi,
    title: "100% Remote Work",
    description: "Fully equipped for remote collaboration with cutting-edge tools and processes",
  },
  {
    icon: Clock,
    title: "Flexible Time Zones",
    description: "Adaptable schedule to work across multiple time zones for seamless communication",
  },
  {
    icon: Shield,
    title: "Secure Collaboration",
    description: "Enterprise-grade security for all communications and project data",
  },
  {
    icon: Users,
    title: "Cultural Adaptability",
    description: "Experience working with diverse teams and understanding local business practices",
  },
]

export function GlobalReach() {
  return (
    <section id="global-reach" className="py-20 px-4 bg-gray-900/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Global Reach & Coverage
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Serving clients worldwide with 24/7 availability and cross-timezone collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* World Map Representation */}
          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Globe className="w-6 h-6 mr-3 text-purple-400" />
                Global Presence
              </CardTitle>
              <CardDescription className="text-gray-400">
                Active clients and projects across 4 continents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regions.map((region, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/20"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">{region.region}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                          {region.clients} clients
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            region.availability === "24/7"
                              ? "border-green-500/50 text-green-300"
                              : "border-cyan-500/50 text-cyan-300"
                          }
                        >
                          {region.availability}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{region.countries.join(", ")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-400 mt-2">
                      <Clock className="w-4 h-4" />
                      <span>Primary timezone: {region.timezone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Remote Work Capabilities */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Remote Work Excellence</CardTitle>
                <CardDescription className="text-gray-400">
                  Proven track record of successful remote collaboration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {capabilities.map((capability, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-gray-800/50">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <capability.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{capability.title}</h4>
                        <p className="text-gray-400 text-sm">{capability.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border-purple-500/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-gray-400 mb-4">International Projects Completed</div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-400">15+</div>
                      <div className="text-xs text-gray-400">Countries</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">24/7</div>
                      <div className="text-xs text-gray-400">Support</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">99%</div>
                      <div className="text-xs text-gray-400">Uptime</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
