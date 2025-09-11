"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Maximize2,
  Target,
  Users,
  DollarSign,
  Clock
} from "lucide-react"

interface ChartData {
  id: string
  name: string
  type: "line" | "bar" | "pie" | "area" | "funnel" | "heatmap"
  data: any[]
  color?: string
  description?: string
  insights?: string[]
}

interface AnalyticsDashboardProps {
  industry?: string
  timeRange?: "24h" | "7d" | "30d" | "90d" | "1y"
  className?: string
}

export function AnalyticsDashboard({ 
  industry = "General Business",
  timeRange = "30d",
  className = ""
}: AnalyticsDashboardProps) {
  const [selectedChart, setSelectedChart] = useState<string | null>(null)
  const [activeTimeRange, setActiveTimeRange] = useState(timeRange)

  // Generate industry-specific sample data
  const generateChartData = useMemo(() => {
    const baseData = {
      revenue: Array.from({ length: 12 }, (_, i) => ({
        month: `Month ${i + 1}`,
        value: Math.floor(Math.random() * 50000) + 20000,
        target: 45000
      })),
      conversion: [
        { name: "Visitors", value: 10000, color: "#3B82F6" },
        { name: "Leads", value: 2500, color: "#10B981" },
        { name: "Customers", value: 750, color: "#8B5CF6" },
        { name: "Churned", value: 150, color: "#EF4444" }
      ],
      performance: Array.from({ length: 30 }, (_, i) => ({
        date: `Day ${i + 1}`,
        efficiency: Math.floor(Math.random() * 30) + 70,
        satisfaction: Math.floor(Math.random() * 20) + 80,
        productivity: Math.floor(Math.random() * 25) + 75
      })),
      regionData: [
        { region: "North America", value: 45, growth: 12 },
        { region: "Europe", value: 30, growth: 8 },
        { region: "Asia Pacific", value: 20, growth: 25 },
        { region: "Others", value: 5, growth: 15 }
      ]
    }

    // Adjust data based on industry
    if (industry.toLowerCase().includes("healthcare")) {
      return {
        ...baseData,
        conversion: [
          { name: "Patient Inquiries", value: 5000, color: "#10B981" },
          { name: "Appointments Scheduled", value: 3000, color: "#3B82F6" },
          { name: "Appointments Completed", value: 2800, color: "#8B5CF6" },
          { name: "Follow-up Required", value: 500, color: "#F59E0B" }
        ]
      }
    }

    if (industry.toLowerCase().includes("e-commerce")) {
      return {
        ...baseData,
        conversion: [
          { name: "Website Visitors", value: 50000, color: "#3B82F6" },
          { name: "Product Views", value: 15000, color: "#10B981" },
          { name: "Add to Cart", value: 5000, color: "#8B5CF6" },
          { name: "Purchases", value: 1200, color: "#F59E0B" }
        ]
      }
    }

    return baseData
  }, [industry])

  const charts: ChartData[] = [
    {
      id: "revenue",
      name: "Revenue Trends",
      type: "line",
      data: generateChartData.revenue,
      color: "#3B82F6",
      description: "Monthly revenue performance vs targets",
      insights: [
        "Revenue is trending 15% above target",
        "Strongest growth in Q4",
        "Projected to exceed annual goals by 8%"
      ]
    },
    {
      id: "conversion",
      name: "Conversion Funnel", 
      type: "funnel",
      data: generateChartData.conversion,
      description: "Customer journey conversion rates",
      insights: [
        "7.5% overall conversion rate",
        "Drop-off highest at lead qualification",
        "Customer satisfaction: 94%"
      ]
    },
    {
      id: "performance",
      name: "Operational Performance",
      type: "area",
      data: generateChartData.performance,
      color: "#10B981",
      description: "Daily operational metrics",
      insights: [
        "Efficiency improved 23% this month",
        "Peak performance on weekdays",
        "Satisfaction scores trending up"
      ]
    },
    {
      id: "regions",
      name: "Regional Analysis",
      type: "pie",
      data: generateChartData.regionData,
      description: "Performance by geographic region",
      insights: [
        "Asia Pacific showing fastest growth",
        "North America remains largest market",
        "Europe showing steady performance"
      ]
    }
  ]

  // Custom chart renderers using SVG and CSS
  const LineChart = ({ data, color = "#3B82F6" }: { data: any[], color?: string }) => {
    const width = 300
    const height = 180
    const padding = 40
    
    const maxValue = Math.max(...data.map(d => d.value))
    const minValue = Math.min(...data.map(d => d.value))
    const range = maxValue - minValue || 1

    const points = data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2)
      const y = padding + (1 - (d.value - minValue) / range) * (height - padding * 2)
      return `${x},${y}`
    }).join(' ')

    const targetLine = data[0]?.target ? padding + (1 - (data[0].target - minValue) / range) * (height - padding * 2) : null

    return (
      <div className="relative">
        <svg width={width} height={height} className="w-full h-auto">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#E5E7EB" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: color, stopOpacity: 0.4}} />
              <stop offset="100%" style={{stopColor: color, stopOpacity: 0.1}} />
            </linearGradient>
          </defs>
          
          <rect width={width} height={height} fill="url(#grid)" opacity="0.5" />
          
          {/* Target line */}
          {targetLine && (
            <line
              x1={padding}
              y1={targetLine}
              x2={width - padding}
              y2={targetLine}
              stroke="#EF4444"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.7"
            />
          )}
          
          {/* Area fill */}
          <polygon
            fill={`url(#gradient-${color})`}
            points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
          />
          
          {/* Line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
          
          {/* Data points */}
          {data.map((d, i) => {
            const x = padding + (i / (data.length - 1)) * (width - padding * 2)
            const y = padding + (1 - (d.value - minValue) / range) * (height - padding * 2)
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                stroke="white"
                strokeWidth="2"
                className="hover:r-6 transition-all cursor-pointer"
              />
            )
          })}
        </svg>
        
        {/* Legend */}
        <div className="absolute top-2 right-2 bg-white/80 rounded px-2 py-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: color }}></div>
            <span>Actual</span>
            {targetLine && (
              <>
                <div className="w-3 h-0.5 bg-red-500 opacity-70"></div>
                <span>Target</span>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  const FunnelChart = ({ data }: { data: any[] }) => {
    const width = 300
    const height = 200
    const maxValue = Math.max(...data.map(d => d.value))

    return (
      <div className="relative">
        <svg width={width} height={height} className="w-full h-auto">
          {data.map((item, index) => {
            const barWidth = (item.value / maxValue) * (width - 40)
            const barHeight = 35
            const y = index * 45 + 10
            
            return (
              <g key={index}>
                {/* Background bar */}
                <rect
                  x="20"
                  y={y}
                  width={width - 40}
                  height={barHeight}
                  fill="#F3F4F6"
                  rx="4"
                />
                {/* Value bar */}
                <rect
                  x="20"
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={item.color}
                  rx="4"
                  className="transition-all duration-500"
                />
                {/* Label */}
                <text
                  x="25"
                  y={y + 22}
                  className="text-xs font-medium fill-gray-700"
                >
                  {item.name}: {item.value.toLocaleString()}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    )
  }

  const PieChart = ({ data }: { data: any[] }) => {
    const size = 200
    const radius = 80
    const centerX = size / 2
    const centerY = size / 2
    
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let currentAngle = 0

    const slices = data.map((item) => {
      const angle = (item.value / total) * 2 * Math.PI
      const startAngle = currentAngle
      const endAngle = currentAngle + angle
      currentAngle += angle

      const largeArcFlag = angle > Math.PI ? 1 : 0
      const x1 = centerX + radius * Math.cos(startAngle)
      const y1 = centerY + radius * Math.sin(startAngle)
      const x2 = centerX + radius * Math.cos(endAngle)
      const y2 = centerY + radius * Math.sin(endAngle)

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ')

      return {
        ...item,
        pathData,
        percentage: Math.round((item.value / total) * 100)
      }
    })

    return (
      <div className="flex items-center space-x-4">
        <svg width={size} height={size} className="flex-shrink-0">
          {slices.map((slice, index) => (
            <path
              key={index}
              d={slice.pathData}
              fill={slice.color || `hsl(${index * 60}, 70%, 50%)`}
              stroke="white"
              strokeWidth="2"
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          ))}
          {/* Center circle for donut effect */}
          <circle
            cx={centerX}
            cy={centerY}
            r="30"
            fill="white"
            stroke="#E5E7EB"
            strokeWidth="2"
          />
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dy="0.3em"
            className="text-sm font-bold fill-gray-700"
          >
            Total
          </text>
        </svg>
        
        {/* Legend */}
        <div className="space-y-2">
          {slices.map((slice, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded"
                style={{ backgroundColor: slice.color || `hsl(${index * 60}, 70%, 50%)` }}
              ></div>
              <span className="text-gray-700">{slice.region || slice.name}</span>
              <span className="text-gray-500">({slice.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderChart = (chart: ChartData) => {
    switch (chart.type) {
      case "line":
      case "area":
        return <LineChart data={chart.data} color={chart.color} />
      case "funnel":
      case "bar":
        return <FunnelChart data={chart.data} />
      case "pie":
        return <PieChart data={chart.data} />
      default:
        return <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Chart type: {chart.type}</p>
        </div>
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Advanced Analytics Dashboard</CardTitle>
                <p className="text-sm text-gray-600">{industry} • Interactive Data Visualization</p>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                {["24h", "7d", "30d", "90d", "1y"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setActiveTimeRange(range as any)}
                    className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                      activeTimeRange === range
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart) => (
          <Card
            key={chart.id}
            className={`bg-white/70 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              selectedChart === chart.id ? "ring-2 ring-blue-300" : ""
            }`}
            onClick={() => setSelectedChart(selectedChart === chart.id ? null : chart.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{chart.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{chart.description}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Chart */}
              <div className="flex justify-center">
                {renderChart(chart)}
              </div>

              {/* Insights */}
              {chart.insights && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Key Insights:</h4>
                  <div className="space-y-1">
                    {chart.insights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Analytics */}
      <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-white/20 shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">+23%</p>
              <p className="text-sm text-gray-600">Growth Rate</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">94%</p>
              <p className="text-sm text-gray-600">Goal Achievement</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">8.2k</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">97.8%</p>
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}