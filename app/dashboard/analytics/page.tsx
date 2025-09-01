"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Clock, Zap, Crown, DollarSign, Target, Activity } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("monthly")
  const [isPro] = useState(false) // Mock user subscription status

  const ProOverlay = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">
      {children}
      {!isPro && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">PRO Feature</h3>
            <p className="text-gray-600 mb-4">Upgrade to unlock advanced analytics</p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to PRO
            </Button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <Crown className="w-3 h-3 mr-1" />
              PRO
            </Badge>
          </div>
          <p className="text-gray-600 mt-1">Track your solution performance and ROI</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 bg-white/60 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ProOverlay>
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Time Saved</p>
                  <p className="text-2xl font-bold text-green-600">245 hrs</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15% vs last month
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </ProOverlay>

        <ProOverlay>
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Solutions Deployed</p>
                  <p className="text-2xl font-bold text-blue-600">12</p>
                  <p className="text-xs text-blue-500 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3 this month
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </ProOverlay>

        <ProOverlay>
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">ROI Estimation</p>
                  <p className="text-2xl font-bold text-purple-600">$45,200</p>
                  <p className="text-xs text-purple-500 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +22% growth
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </ProOverlay>

        <ProOverlay>
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Most Used Module</p>
                  <p className="text-lg font-bold text-orange-600">AI Chatbot</p>
                  <p className="text-xs text-orange-500 flex items-center mt-1">
                    <Activity className="w-3 h-3 mr-1" />
                    85% usage rate
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </ProOverlay>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Solution Activity</TabsTrigger>
          <TabsTrigger value="usage">AI vs Manual</TabsTrigger>
          <TabsTrigger value="adoption">Adoption Rate</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          <ProOverlay>
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Solution Activity Over Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Interactive chart showing solution usage patterns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ProOverlay>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProOverlay>
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>AI vs Manual Intervention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                    <div className="text-center">
                      <div className="w-24 h-24 border-8 border-green-200 border-t-green-500 rounded-full mx-auto mb-4 animate-spin"></div>
                      <p className="text-gray-500">Donut chart showing automation ratio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ProOverlay>

            <ProOverlay>
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Efficiency Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">AI Automation</span>
                      <span className="font-semibold text-green-600">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Manual Tasks</span>
                      <span className="font-semibold text-orange-600">13%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "13%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ProOverlay>
          </div>
        </TabsContent>

        <TabsContent value="adoption" className="space-y-6">
          <ProOverlay>
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Solution Adoption Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Line chart showing adoption trends over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ProOverlay>
        </TabsContent>
      </Tabs>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProOverlay>
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Top Performing Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Customer Support AI", efficiency: 92, timeSaved: "45 hrs/week" },
                  { name: "Supply Chain Tracker", efficiency: 88, timeSaved: "32 hrs/week" },
                  { name: "Payment Processor", efficiency: 85, timeSaved: "28 hrs/week" },
                  { name: "Inventory Manager", efficiency: 78, timeSaved: "22 hrs/week" },
                ].map((solution, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{solution.name}</p>
                      <p className="text-sm text-gray-600">{solution.timeSaved}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{solution.efficiency}%</p>
                      <p className="text-xs text-gray-500">efficiency</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ProOverlay>

        <ProOverlay>
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Cost Savings Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Labor Costs", amount: "$18,500", percentage: 41 },
                  { category: "Process Efficiency", amount: "$12,300", percentage: 27 },
                  { category: "Error Reduction", amount: "$8,900", percentage: 20 },
                  { category: "Time Optimization", amount: "$5,500", percentage: 12 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{item.category}</span>
                      <span className="font-semibold text-gray-900">{item.amount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ProOverlay>
      </div>
    </div>
  )
}
