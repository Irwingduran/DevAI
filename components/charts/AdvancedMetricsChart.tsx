"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  RefreshCw,
  Download,
  Maximize2
} from "lucide-react"

interface MetricData {
  label: string
  value: number | string
  previousValue?: number
  change?: number
  trend: "up" | "down" | "neutral"
  format: "number" | "currency" | "percentage" | "time"
  target?: number
  chartData?: { time: string; value: number }[]
  color?: string
}

interface AdvancedMetricsChartProps {
  metrics: MetricData[]
  title?: string
  timeRange?: "24h" | "7d" | "30d" | "90d"
  onTimeRangeChange?: (range: string) => void
  className?: string
}

export function AdvancedMetricsChart({ 
  metrics, 
  title = "Key Performance Metrics",
  timeRange = "30d",
  onTimeRangeChange,
  className = "" 
}: AdvancedMetricsChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const formatValue = (value: number | string, format: MetricData["format"]) => {
    if (typeof value === "string") return value
    
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value)
      case "percentage":
        return `${value}%`
      case "time":
        return `${value}h`
      default:
        return value.toLocaleString()
    }
  }

  const getChangeColor = (trend: string, change?: number) => {
    if (!change) return "text-gray-500"
    if (trend === "up") return "text-green-600"
    if (trend === "down") return "text-red-600"
    return "text-gray-500"
  }

  const getChangeIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="w-4 h-4" />
      case "down":
        return <ArrowDownRight className="w-4 h-4" />
      default:
        return <MoreHorizontal className="w-4 h-4" />
    }
  }

  const MiniSparkline = ({ data, color = "#3B82F6" }: { data: { time: string; value: number }[], color?: string }) => {
    const width = 100
    const height = 30
    
    const minValue = Math.min(...data.map(d => d.value))
    const maxValue = Math.max(...data.map(d => d.value))
    const range = maxValue - minValue || 1
    
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((d.value - minValue) / range) * height
      return `${x},${y}`
    }).join(' ')

    return (
      <svg width={width} height={height} className="inline-block">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        <defs>
          <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: color, stopOpacity: 0.3}} />
            <stop offset="100%" style={{stopColor: color, stopOpacity: 0}} />
          </linearGradient>
        </defs>
        <polygon
          fill="url(#sparklineGradient)"
          points={`0,${height} ${points} ${width},${height}`}
        />
      </svg>
    )
  }

  const timeRanges = [
    { value: "24h", label: "24h" },
    { value: "7d", label: "7d" },
    { value: "30d", label: "30d" },
    { value: "90d", label: "90d" }
  ]

  return (
    <Card className={`bg-white/70 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CardTitle className="text-xl">{title}</CardTitle>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Live Data
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            {/* Time Range Selector */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => onTimeRangeChange?.(range.value)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    timeRange === range.value
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Download className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className={`grid gap-4 transition-all duration-300 ${
          isExpanded 
            ? "grid-cols-1 md:grid-cols-2" 
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        }`}>
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                selectedMetric === metric.label
                  ? "border-blue-300 bg-blue-50/50 shadow-md"
                  : "border-transparent bg-white/60 hover:bg-white/80 hover:shadow-sm"
              }`}
              onClick={() => setSelectedMetric(selectedMetric === metric.label ? null : metric.label)}
            >
              {/* Main Metric */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <div className={`flex items-center space-x-1 text-sm ${getChangeColor(metric.trend, metric.change)}`}>
                    {getChangeIcon(metric.trend)}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatValue(metric.value, metric.format)}
                  </p>
                  
                  {metric.change !== undefined && (
                    <p className={`text-sm ${getChangeColor(metric.trend, metric.change)}`}>
                      {metric.change > 0 ? "+" : ""}{formatValue(metric.change, metric.format)} vs last period
                    </p>
                  )}
                </div>

                {/* Target Progress */}
                {metric.target && typeof metric.value === "number" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress to target</span>
                      <span>{Math.round((metric.value / metric.target) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((metric.value / metric.target) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Mini Sparkline */}
                {metric.chartData && metric.chartData.length > 0 && (
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{timeRange} trend</span>
                    <MiniSparkline 
                      data={metric.chartData} 
                      color={metric.color || (metric.trend === "up" ? "#10B981" : metric.trend === "down" ? "#EF4444" : "#3B82F6")}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Detail View */}
        {selectedMetric && isExpanded && (
          <div className="mt-6 p-4 bg-white/60 rounded-xl border border-white/30">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {metrics.find(m => m.label === selectedMetric)?.label} - Detailed Analysis
              </h4>
              
              {/* This would contain a larger, more detailed chart */}
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <TrendingUp className="w-12 h-12 text-blue-500 mx-auto" />
                  <p className="text-gray-600">Detailed chart view would appear here</p>
                  <p className="text-sm text-gray-500">Interactive time-series analysis, drill-down capabilities</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary Insights */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-green-900">AI-Powered Insights</h4>
              <p className="text-sm text-green-700">
                Your metrics show strong upward trends across key performance indicators. 
                Revenue growth is 23% above target, and operational efficiency has improved by 18% this quarter.
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge className="bg-green-100 text-green-800">
                  Performance: Excellent
                </Badge>
                <Badge className="bg-blue-100 text-blue-800">  
                  Trend: Positive
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}