"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"

const timeSlots = [
  { time: "9:00 AM", available: true, timezone: "EST" },
  { time: "11:00 AM", available: false, timezone: "EST" },
  { time: "2:00 PM", available: true, timezone: "EST" },
  { time: "4:00 PM", available: true, timezone: "EST" },
  { time: "6:00 PM", available: false, timezone: "EST" },
]

const projectTimelines = [
  {
    type: "AI Consultation",
    duration: "1-2 weeks",
    description: "Initial assessment and strategy development",
    availability: "Available",
  },
  {
    type: "MVP Development",
    duration: "4-8 weeks",
    description: "Minimum viable product with core features",
    availability: "Available",
  },
  {
    type: "Full Platform",
    duration: "3-6 months",
    description: "Complete solution with advanced features",
    availability: "Limited slots",
  },
  {
    type: "Enterprise Solution",
    duration: "6-12 months",
    description: "Large-scale implementation with custom requirements",
    availability: "Q2 2024",
  },
]

export function Availability() {
  const [selectedDate, setSelectedDate] = useState("2024-01-15")

  return (
    <section id="availability" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Availability & Booking
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Schedule a consultation or check project timelines to start your AI and blockchain journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Consultation Booking */}
          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-purple-400" />
                Book a Consultation
              </CardTitle>
              <CardDescription className="text-gray-400">
                Schedule a free 30-minute consultation to discuss your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Available Time Slots</h4>
                <div className="space-y-2">
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        slot.available ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {slot.available ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        )}
                        <span className="text-white font-medium">{slot.time}</span>
                        <Badge variant="outline" className="text-xs">
                          {slot.timezone}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        disabled={!slot.available}
                        className={
                          slot.available
                            ? "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                            : ""
                        }
                      >
                        {slot.available ? "Book" : "Booked"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <Clock className="w-4 h-4" />
                  <span>All times shown in Eastern Standard Time</span>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Project Timelines */}
          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Clock className="w-6 h-6 mr-3 text-cyan-400" />
                Project Timelines
              </CardTitle>
              <CardDescription className="text-gray-400">
                Estimated timelines for different types of projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectTimelines.map((project, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white">{project.type}</h4>
                    <Badge
                      variant="outline"
                      className={
                        project.availability === "Available"
                          ? "border-green-500/50 text-green-300"
                          : project.availability === "Limited slots"
                            ? "border-yellow-500/50 text-yellow-300"
                            : "border-purple-500/50 text-purple-300"
                      }
                    >
                      {project.availability}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{project.description}</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300 font-medium">{project.duration}</span>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400 mb-4">
                  <p>• Timelines may vary based on project complexity</p>
                  <p>• Rush projects available with premium pricing</p>
                  <p>• All projects include post-launch support</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Discuss Your Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
