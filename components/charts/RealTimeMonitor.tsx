"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Activity, 
  Zap, 
  Users, 
  Server,
  Wifi,
  WifiOff,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react"

interface MetricPoint {
  timestamp: number
  value: number
}

interface RealTimeMetric {
  id: string
  name: string
  unit: string
  currentValue: number
  data: MetricPoint[]
  threshold?: { warning: number; critical: number }
  color: string
  icon: React.ReactNode
  status: "healthy" | "warning" | "critical" | "offline"
}

interface RealTimeMonitorProps {
  className?: string
  updateInterval?: number
  maxDataPoints?: number
}

export function RealTimeMonitor({ 
  className = "",
  updateInterval = 2000,
  maxDataPoints = 50
}: RealTimeMonitorProps) {
  const [isConnected, setIsConnected] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [metrics, setMetrics] = useState<RealTimeMetric[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize metrics
  useEffect(() => {
    const initialMetrics: RealTimeMetric[] = [
      {
        id: "active-users",
        name: "Active Users",
        unit: "",
        currentValue: 1247,
        data: [],
        color: "#10B981",
        icon: <Users className="w-4 h-4" />,
        status: "healthy"
      },
      {
        id: "response-time",
        name: "Response Time",
        unit: "ms",
        currentValue: 145,
        data: [],
        threshold: { warning: 300, critical: 500 },
        color: "#3B82F6",
        icon: <Zap className="w-4 h-4" />,
        status: "healthy"
      },
      {
        id: "cpu-usage",
        name: "CPU Usage",
        unit: "%",
        currentValue: 34,
        data: [],
        threshold: { warning: 70, critical: 90 },
        color: "#F59E0B",
        icon: <Server className="w-4 h-4" />,
        status: "healthy"
      },
      {
        id: "error-rate",
        name: "Error Rate",
        unit: "%",
        currentValue: 0.12,
        data: [],
        threshold: { warning: 1, critical: 5 },
        color: "#EF4444",
        icon: <AlertTriangle className="w-4 h-4" />,
        status: "healthy"
      }
    ]

    // Generate initial data points
    const now = Date.now()
    initialMetrics.forEach(metric => {
      metric.data = Array.from({ length: maxDataPoints }, (_, i) => ({
        timestamp: now - (maxDataPoints - i) * updateInterval,
        value: generateRealisticValue(metric.id, metric.currentValue)
      }))
    })

    setMetrics(initialMetrics)
  }, [maxDataPoints, updateInterval])

  // Simulate real-time data updates
  useEffect(() => {
    if (isPaused || !isConnected) return

    intervalRef.current = setInterval(() => {
      setMetrics(prevMetrics => {
        return prevMetrics.map(metric => {
          const newValue = generateRealisticValue(metric.id, metric.currentValue)
          const newDataPoint: MetricPoint = {
            timestamp: Date.now(),
            value: newValue
          }

          // Keep only the latest data points
          const newData = [...metric.data.slice(1), newDataPoint]

          // Determine status based on thresholds
          let status: RealTimeMetric["status"] = "healthy"
          if (metric.threshold) {
            if (newValue >= metric.threshold.critical) {
              status = "critical"
            } else if (newValue >= metric.threshold.warning) {
              status = "warning"
            }
          }

          return {
            ...metric,
            currentValue: newValue,
            data: newData,
            status: Math.random() > 0.95 ? "offline" : status // Simulate occasional offline status
          }
        })
      })
    }, updateInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, isConnected, updateInterval])

  // Generate realistic values based on metric type
  const generateRealisticValue = (metricId: string, currentValue: number): number => {
    const variation = 0.1 // 10% variation
    const randomFactor = (Math.random() - 0.5) * 2 * variation

    switch (metricId) {
      case "active-users":
        // Simulate user activity patterns
        const hour = new Date().getHours()
        const baseActivity = hour >= 9 && hour <= 17 ? 1.2 : 0.8 // Higher during work hours
        return Math.max(0, Math.floor(currentValue * (1 + randomFactor) * baseActivity))
      
      case "response-time":
        // Response time with occasional spikes
        const spike = Math.random() > 0.9 ? 2 : 1
        return Math.max(50, Math.floor(currentValue * (1 + randomFactor) * spike))
      
      case "cpu-usage":
        // CPU usage with constraints
        const newCpu = currentValue * (1 + randomFactor)
        return Math.max(10, Math.min(95, newCpu))
      
      case "error-rate":
        // Error rate (usually low, occasional spikes)
        const errorSpike = Math.random() > 0.95 ? 5 : 1
        return Math.max(0, currentValue * (1 + randomFactor) * errorSpike)
      
      default:
        return currentValue * (1 + randomFactor)
    }
  }

  const getStatusColor = (status: RealTimeMetric["status"]) => {
    switch (status) {
      case "healthy": return "text-green-600"
      case "warning": return "text-yellow-600"
      case "critical": return "text-red-600"
      case "offline": return "text-gray-400"
      default: return "text-gray-600"
    }
  }

  const getStatusIcon = (status: RealTimeMetric["status"]) => {
    switch (status) {
      case "healthy": return <CheckCircle className="w-4 h-4 text-green-500" />
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "critical": return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "offline": return <WifiOff className="w-4 h-4 text-gray-400" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const RealTimeChart = ({ data, color, height = 80 }: { data: MetricPoint[], color: string, height?: number }) => {
    if (data.length < 2) return <div className="h-20 bg-gray-100 rounded animate-pulse" />

    const width = 200
    const minValue = Math.min(...data.map(d => d.value))
    const maxValue = Math.max(...data.map(d => d.value))
    const range = maxValue - minValue || 1

    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((d.value - minValue) / range) * height
      return `${x},${y}`
    }).join(' ')

    return (
      <div className="relative">
        <svg width={width} height={height} className="w-full">
          {/* Grid lines */}
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: color, stopOpacity: 0.6}} />
              <stop offset="100%" style={{stopColor: color, stopOpacity: 0.1}} />
            </linearGradient>
          </defs>
          
          {/* Grid */}
          {[0.25, 0.5, 0.75].map((ratio) => (
            <line
              key={ratio}
              x1="0"
              y1={height * ratio}
              x2={width}
              y2={height * ratio}
              stroke="#E5E7EB"
              strokeWidth="0.5"
              opacity="0.5"
            />
          ))}
          
          {/* Area fill */}
          <polygon
            fill={`url(#gradient-${color})`}
            points={`0,${height} ${points} ${width},${height}`}
          />
          
          {/* Line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
            className={isPaused ? "opacity-50" : "opacity-100"}
          />
          
          {/* Current value indicator */}
          {!isPaused && (
            <circle
              cx={width}
              cy={height - ((data[data.length - 1].value - minValue) / range) * height}
              r="3"
              fill={color}
              className="animate-pulse"
            />
          )}
        </svg>
        
        {/* Live indicator */}
        {!isPaused && isConnected && (
          <div className="absolute top-1 right-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    )
  }

  const formatValue = (value: number, unit: string) => {
    if (unit === "%") return `${value.toFixed(1)}%`
    if (unit === "ms") return `${Math.round(value)}ms`
    if (unit === "") return value.toLocaleString()
    return `${value.toFixed(2)}${unit}`
  }

  const criticalAlerts = metrics.filter(m => m.status === "critical").length
  const warningAlerts = metrics.filter(m => m.status === "warning").length
  const offlineMetrics = metrics.filter(m => m.status === "offline").length

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Real-Time Performance Monitor</CardTitle>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1 text-sm">
                    {isConnected ? <Wifi className="w-3 h-3 text-green-500" /> : <WifiOff className="w-3 h-3 text-red-500" />}
                    <span className={isConnected ? "text-green-600" : "text-red-600"}>
                      {isConnected ? "Connected" : "Offline"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Updates every {updateInterval/1000}s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              {/* Alert summary */}
              <div className="flex items-center space-x-2 mr-4">
                {criticalAlerts > 0 && (
                  <Badge className="bg-red-100 text-red-800">
                    {criticalAlerts} Critical
                  </Badge>
                )}
                {warningAlerts > 0 && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {warningAlerts} Warning
                  </Badge>
                )}
                {offlineMetrics > 0 && (
                  <Badge className="bg-gray-100 text-gray-800">
                    {offlineMetrics} Offline
                  </Badge>
                )}
                {criticalAlerts === 0 && warningAlerts === 0 && offlineMetrics === 0 && (
                  <Badge className="bg-green-100 text-green-800">
                    All Systems Healthy
                  </Badge>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
                className={isPaused ? "text-green-600" : "text-orange-600"}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Reset all data
                  setMetrics(prev => prev.map(metric => ({
                    ...metric,
                    data: [],
                    status: "healthy" as const
                  })))
                }}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card
            key={metric.id}
            className={`bg-white/70 backdrop-blur-md border shadow-lg transition-all duration-300 ${
              metric.status === "critical" 
                ? "border-red-300 bg-red-50/50" 
                : metric.status === "warning"
                ? "border-yellow-300 bg-yellow-50/50"
                : metric.status === "offline"
                ? "border-gray-300 bg-gray-50/50"
                : "border-white/20 hover:shadow-xl"
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    metric.status === "critical" ? "bg-red-100" :
                    metric.status === "warning" ? "bg-yellow-100" :
                    metric.status === "offline" ? "bg-gray-100" : "bg-blue-100"
                  }`}>
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{metric.name}</p>
                  </div>
                </div>
                {getStatusIcon(metric.status)}
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Current Value */}
              <div className="space-y-1">
                <p className={`text-2xl font-bold transition-colors ${getStatusColor(metric.status)}`}>
                  {formatValue(metric.currentValue, metric.unit)}
                </p>
                
                {metric.threshold && (
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>Warning: {formatValue(metric.threshold.warning, metric.unit)}</span>
                    <span>•</span>
                    <span>Critical: {formatValue(metric.threshold.critical, metric.unit)}</span>
                  </div>
                )}
              </div>

              {/* Real-time Chart */}
              <div className="mt-3">
                <RealTimeChart data={metric.data} color={metric.color} />
              </div>

              {/* Status */}
              <div className="flex items-center justify-between pt-2 border-t border-white/30">
                <span className={`text-xs font-medium capitalize ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </span>
                <span className="text-xs text-gray-500">
                  {isPaused ? "Paused" : "Live"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Connection Status Footer */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          {isPaused ? "Monitoring paused" : `Last updated: ${new Date().toLocaleTimeString()}`}
        </p>
      </div>
    </div>
  )
}