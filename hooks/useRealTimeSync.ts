"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import type { Notification, Payment, Project, AIAgent, Task } from "@/types/freelancer"

interface RealTimeEvent {
  type: 'notification' | 'payment' | 'project_update' | 'ai_completion' | 'task_update' | 'client_message'
  data: any
  timestamp: string
  userId: string
}

interface RealTimeConfig {
  userId: string
  onNotification?: (notification: Notification) => void
  onPaymentUpdate?: (payment: Payment) => void
  onProjectUpdate?: (project: Partial<Project> & { id: string }) => void
  onAICompletion?: (agent: AIAgent, task: Task) => void
  onTaskUpdate?: (task: Task) => void
  onClientMessage?: (message: any) => void
  onConnectionChange?: (connected: boolean) => void
}

interface ConnectionStatus {
  connected: boolean
  lastPing: Date | null
  reconnectAttempts: number
  error: string | null
}

export function useRealTimeSync(config: RealTimeConfig) {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    connected: false,
    lastPing: null,
    reconnectAttempts: 0,
    error: null
  })

  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const configRef = useRef(config)

  useEffect(() => {
    configRef.current = config
  }, [config])

  const handleEvent = useCallback((event: RealTimeEvent) => {
    const currentConfig = configRef.current

    switch (event.type) {
      case 'notification':
        currentConfig.onNotification?.(event.data as Notification)
        break
      case 'payment':
        currentConfig.onPaymentUpdate?.(event.data as Payment)
        break
      case 'project_update':
        currentConfig.onProjectUpdate?.(event.data as Partial<Project> & { id: string })
        break
      case 'ai_completion':
        currentConfig.onAICompletion?.(event.data.agent as AIAgent, event.data.task as Task)
        break
      case 'task_update':
        currentConfig.onTaskUpdate?.(event.data as Task)
        break
      case 'client_message':
        currentConfig.onClientMessage?.(event.data)
        break
    }
  }, [])

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return
    }

    try {
      // In a real implementation, this would be your WebSocket server URL
      // For demo purposes, we'll simulate WebSocket behavior
      const wsUrl = process.env.NODE_ENV === 'production' 
        ? 'wss://api.your-domain.com/ws' 
        : 'ws://localhost:3002/ws'

      // Simulate WebSocket connection
      const mockWebSocket = {
        readyState: 1, // OPEN
        send: (data: string) => console.log('Mock WS send:', data),
        close: () => console.log('Mock WS close'),
        addEventListener: (event: string, handler: Function) => {
          if (event === 'open') {
            setTimeout(() => {
              setConnectionStatus(prev => ({
                ...prev,
                connected: true,
                reconnectAttempts: 0,
                error: null
              }))
              configRef.current.onConnectionChange?.(true)
              handler({ type: 'open' })
            }, 1000)
          }
        },
        removeEventListener: () => {}
      } as unknown as WebSocket

      wsRef.current = mockWebSocket

      // Simulate receiving real-time events
      const simulateEvents = () => {
        const events: RealTimeEvent[] = [
          {
            type: 'notification',
            data: {
              id: `notif-${Date.now()}`,
              userId: config.userId,
              type: 'ai_completion',
              title: 'AI Task Completed',
              message: 'Your AI agent has completed the code review task',
              priority: 'medium',
              read: false,
              createdAt: new Date().toISOString()
            } as Notification,
            timestamp: new Date().toISOString(),
            userId: config.userId
          },
          {
            type: 'payment',
            data: {
              id: `pay-${Date.now()}`,
              projectId: 'proj-1',
              clientId: 'client-1',
              type: 'milestone',
              amount: 2500,
              currency: 'USD',
              status: 'completed',
              method: { id: 'stripe-1', type: 'stripe', details: {}, isDefault: true },
              dueDate: new Date().toISOString(),
              paidDate: new Date().toISOString(),
              description: 'Real-time payment update'
            } as Payment,
            timestamp: new Date().toISOString(),
            userId: config.userId
          }
        ]

        // Simulate random events
        const randomEvent = events[Math.floor(Math.random() * events.length)]
        setTimeout(() => {
          if (wsRef.current && connectionStatus.connected) {
            handleEvent(randomEvent)
          }
        }, Math.random() * 10000 + 5000) // Random delay between 5-15 seconds
      }

      // Start simulating events after connection
      setTimeout(simulateEvents, 2000)

      // Setup ping interval
      pingIntervalRef.current = setInterval(() => {
        if (wsRef.current) {
          setConnectionStatus(prev => ({
            ...prev,
            lastPing: new Date()
          }))
        }
      }, 30000) // Ping every 30 seconds

    } catch (error) {
      console.error('WebSocket connection error:', error)
      setConnectionStatus(prev => ({
        ...prev,
        connected: false,
        error: error instanceof Error ? error.message : 'Connection failed'
      }))
      scheduleReconnect()
    }
  }, [config.userId, connectionStatus.connected, handleEvent])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current)
      pingIntervalRef.current = null
    }

    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }

    setConnectionStatus(prev => ({
      ...prev,
      connected: false,
      lastPing: null
    }))

    configRef.current.onConnectionChange?.(false)
  }, [])

  const scheduleReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) return

    setConnectionStatus(prev => ({
      ...prev,
      reconnectAttempts: prev.reconnectAttempts + 1
    }))

    const delay = Math.min(1000 * Math.pow(2, connectionStatus.reconnectAttempts), 30000)
    
    reconnectTimeoutRef.current = setTimeout(() => {
      reconnectTimeoutRef.current = null
      connect()
    }, delay)
  }, [connectionStatus.reconnectAttempts, connect])

  const sendMessage = useCallback((type: string, data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message = {
        type,
        data,
        timestamp: new Date().toISOString(),
        userId: config.userId
      }
      wsRef.current.send(JSON.stringify(message))
    } else {
      console.warn('WebSocket not connected, cannot send message')
    }
  }, [config.userId])

  const markNotificationRead = useCallback((notificationId: string) => {
    sendMessage('mark_notification_read', { notificationId })
  }, [sendMessage])

  const updateProjectStatus = useCallback((projectId: string, status: string) => {
    sendMessage('update_project_status', { projectId, status })
  }, [sendMessage])

  const sendClientMessage = useCallback((clientId: string, message: string, type: 'email' | 'chat') => {
    sendMessage('client_message', { clientId, message, type })
  }, [sendMessage])

  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  // Reconnect on window focus if disconnected
  useEffect(() => {
    const handleFocus = () => {
      if (!connectionStatus.connected) {
        connect()
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !connectionStatus.connected) {
        connect()
      }
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [connectionStatus.connected, connect])

  return {
    connectionStatus,
    connect,
    disconnect,
    sendMessage,
    markNotificationRead,
    updateProjectStatus,
    sendClientMessage,
    isConnected: connectionStatus.connected,
    lastPing: connectionStatus.lastPing,
    reconnectAttempts: connectionStatus.reconnectAttempts,
    error: connectionStatus.error
  }
}