"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MessageSquare,
  Bell,
  Mail,
  Phone,
  Video,
  Send,
  Reply,
  Forward,
  Archive,
  Trash2,
  Star,
  Clock,
  Users,
  Search,
  Filter,
  Plus,
  Settings,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Info,
  Heart,
  Zap,
  Calendar,
  FileText,
  Bot,
  ExternalLink,
  Paperclip,
  Smile,
  MoreVertical,
  RefreshCw
} from "lucide-react"
import type { Notification, Communication, Client, Project, NotificationType } from "@/types/freelancer"

interface CommunicationCenterProps {
  notifications: Notification[]
  communications: Communication[]
  clients: Client[]
  projects: Project[]
  onNotificationUpdate: (notificationId: string, updates: Partial<Notification>) => void
  onSendMessage: (recipientId: string, message: string, type: "email" | "chat") => void
  onMarkAllRead: () => void
  className?: string
}

export function CommunicationCenter({ 
  notifications, 
  communications,
  clients,
  projects,
  onNotificationUpdate, 
  onSendMessage,
  onMarkAllRead,
  className = "" 
}: CommunicationCenterProps) {
  const [activeTab, setActiveTab] = useState<"notifications" | "messages" | "compose">("notifications")
  const [selectedPriority, setSelectedPriority] = useState<"all" | "urgent" | "high" | "medium" | "low">("all")
  const [selectedType, setSelectedType] = useState<NotificationType | "all">("all")
  const [selectedRecipient, setSelectedRecipient] = useState<string>("")
  const [messageType, setMessageType] = useState<"email" | "chat">("email")
  const [messageContent, setMessageContent] = useState("")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const notificationIcons = {
    payment_received: { icon: CheckCircle, color: "text-green-600" },
    payment_failed: { icon: AlertCircle, color: "text-red-600" },
    project_update: { icon: FileText, color: "text-blue-600" },
    task_assigned: { icon: Users, color: "text-purple-600" },
    milestone_due: { icon: Calendar, color: "text-yellow-600" },
    client_message: { icon: MessageSquare, color: "text-blue-600" },
    ai_completion: { icon: Bot, color: "text-green-600" },
    system_alert: { icon: Bell, color: "text-gray-600" },
    review_request: { icon: Star, color: "text-amber-600" }
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      urgent: "bg-red-100 text-red-800 border-red-200",
      high: "bg-orange-100 text-orange-800 border-orange-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-gray-100 text-gray-800 border-gray-200"
    }
    return colors[priority as keyof typeof colors] || colors.medium
  }

  const filteredNotifications = useMemo(() => {
    return notifications
      .filter(notification => {
        const matchesPriority = selectedPriority === "all" || notification.priority === selectedPriority
        const matchesType = selectedType === "all" || notification.type === selectedType
        const matchesRead = !showUnreadOnly || !notification.read
        return matchesPriority && matchesType && matchesRead
      })
      .sort((a, b) => {
        if (a.read !== b.read) return a.read ? 1 : -1
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
        return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - (priorityOrder[a.priority as keyof typeof priorityOrder] || 0)
      })
  }, [notifications, selectedPriority, selectedType, showUnreadOnly])

  const recentCommunications = useMemo(() => {
    return communications
      .filter(comm => !comm.isInternal)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)
  }, [communications])

  const notificationStats = useMemo(() => {
    const total = notifications.length
    const unread = notifications.filter(n => !n.read).length
    const urgent = notifications.filter(n => n.priority === "urgent").length
    const today = notifications.filter(n => 
      new Date(n.createdAt).toDateString() === new Date().toDateString()
    ).length
    
    return { total, unread, urgent, today }
  }, [notifications])

  const markAsRead = (notificationId: string) => {
    onNotificationUpdate(notificationId, { read: true, readAt: new Date().toISOString() })
  }

  const markAsUnread = (notificationId: string) => {
    onNotificationUpdate(notificationId, { read: false, readAt: undefined })
  }

  const handleSendMessage = () => {
    if (selectedRecipient && messageContent.trim()) {
      onSendMessage(selectedRecipient, messageContent, messageType)
      setMessageContent("")
      setSelectedRecipient("")
    }
  }

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell, badge: notificationStats.unread },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: recentCommunications.length },
    { id: "compose", label: "Compose", icon: Plus, badge: null }
  ]

  const priorityOptions = [
    { value: "all" as const, label: "All Priorities", count: notifications.length },
    { value: "urgent" as const, label: "Urgent", count: notifications.filter(n => n.priority === "urgent").length },
    { value: "high" as const, label: "High", count: notifications.filter(n => n.priority === "high").length },
    { value: "medium" as const, label: "Medium", count: notifications.filter(n => n.priority === "medium").length },
    { value: "low" as const, label: "Low", count: notifications.filter(n => n.priority === "low").length }
  ]

  const typeOptions = [
    { value: "all" as const, label: "All Types", count: notifications.length },
    { value: "client_message" as const, label: "Client Messages", count: notifications.filter(n => n.type === "client_message").length },
    { value: "payment_received" as const, label: "Payments", count: notifications.filter(n => n.type === "payment_received").length },
    { value: "project_update" as const, label: "Projects", count: notifications.filter(n => n.type === "project_update").length },
    { value: "ai_completion" as const, label: "AI Updates", count: notifications.filter(n => n.type === "ai_completion").length }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Communication Center</h2>
          <p className="text-gray-600">Manage notifications and client communications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={onMarkAllRead}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Total Notifications</p>
                <p className="text-2xl font-bold text-blue-900">{notificationStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-red-700">Unread</p>
                <p className="text-2xl font-bold text-red-900">{notificationStats.unread}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-yellow-700">Urgent</p>
                <p className="text-2xl font-bold text-yellow-900">{notificationStats.urgent}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-700">Today</p>
                <p className="text-2xl font-bold text-green-900">{notificationStats.today}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge && tab.badge > 0 && (
                    <Badge className="bg-red-100 text-red-800 text-xs">
                      {tab.badge}
                    </Badge>
                  )}
                </div>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          {/* Filters */}
          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Priority Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Priority:</span>
                  <div className="flex items-center space-x-1">
                    {priorityOptions.slice(0, 3).map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedPriority(option.value)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          selectedPriority === option.value
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option.label} ({option.count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* View Options */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                      showUnreadOnly ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {showUnreadOnly ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span className="text-sm">Unread Only</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const { icon: NotificationIcon, color } = notificationIcons[notification.type] || notificationIcons.system_alert
              const timeSince = Math.floor((new Date().getTime() - new Date(notification.createdAt).getTime()) / (1000 * 60))
              
              return (
                <Card 
                  key={notification.id} 
                  className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
                    notification.read 
                      ? "bg-white/50 backdrop-blur-md border-white/20" 
                      : "bg-white/80 backdrop-blur-md border-blue/30 shadow-sm"
                  }`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        notification.read ? "bg-gray-100" : "bg-blue-100"
                      }`}>
                        <NotificationIcon className={`w-5 h-5 ${notification.read ? "text-gray-500" : color}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className={`font-medium ${notification.read ? "text-gray-700" : "text-gray-900"}`}>
                                {notification.title}
                              </h3>
                              <Badge className={getPriorityColor(notification.priority)}>
                                {notification.priority}
                              </Badge>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                            </div>
                            <p className={`text-sm ${notification.read ? "text-gray-500" : "text-gray-600"}`}>
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>{timeSince < 60 ? `${timeSince}m ago` : `${Math.floor(timeSince / 60)}h ago`}</span>
                              <span>•</span>
                              <span className="capitalize">{notification.type.replace("_", " ")}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {notification.actionUrl && (
                              <Button variant="outline" size="sm" className="text-blue-600">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                {notification.actionLabel || "View"}
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                notification.read ? markAsUnread(notification.id) : markAsRead(notification.id)
                              }}
                            >
                              {notification.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <Card className="bg-white/70 backdrop-blur-md border border-white/20">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {showUnreadOnly ? "No unread notifications" : "No notifications found"}
                </h3>
                <p className="text-gray-600">
                  {showUnreadOnly 
                    ? "You're all caught up! Check back later for new updates." 
                    : "Notifications will appear here when they arrive."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === "messages" && (
        <div className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle>Recent Communications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCommunications.map((comm) => {
                const client = clients.find(c => comm.participants.includes(c.id))
                const project = projects.find(p => p.id === comm.projectId)
                
                return (
                  <div key={comm.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{client?.name || "Unknown Client"}</span>
                          {project && (
                            <Badge variant="outline" className="text-xs">
                              {project.name}
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(comm.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">{comm.content}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={`text-xs ${
                          comm.type === "email" ? "bg-blue-100 text-blue-800" :
                          comm.type === "chat" ? "bg-green-100 text-green-800" :
                          "bg-purple-100 text-purple-800"
                        }`}>
                          {comm.type}
                        </Badge>
                        {comm.aiGenerated && (
                          <Badge className="bg-orange-100 text-orange-800 text-xs">
                            AI Generated
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              
              {recentCommunications.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No recent communications</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Compose Tab */}
      {activeTab === "compose" && (
        <div className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle>Compose Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
                  <select
                    value={selectedRecipient}
                    onChange={(e) => setSelectedRecipient(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a client...</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name} ({client.email})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setMessageType("email")}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        messageType === "email" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </button>
                    <button
                      onClick={() => setMessageType("chat")}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        messageType === "chat" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Type your message here..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="w-4 h-4 mr-1" />
                    Attach
                  </Button>
                  <Button variant="outline" size="sm">
                    <Smile className="w-4 h-4 mr-1" />
                    Emoji
                  </Button>
                </div>
                
                <Button 
                  onClick={handleSendMessage}
                  disabled={!selectedRecipient || !messageContent.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}