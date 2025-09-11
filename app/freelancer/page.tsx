"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Users, 
  Bot, 
  Bell,
  Calendar,
  FileText,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Plus,
  MessageSquare,
  BarChart3,
  Settings,
  Zap,
  Search,
  Wifi,
  WifiOff,
  RefreshCw
} from "lucide-react"

// Import enhanced components and hooks
import { FreelancerSidebar } from "@/components/freelancer/FreelancerSidebar"
import { ProjectsOverview } from "@/components/freelancer/ProjectsOverview"
import { PaymentCenter } from "@/components/freelancer/PaymentCenter"
import { AIAgentPanel } from "@/components/freelancer/AIAgentPanel"
import { ClientManagement } from "@/components/freelancer/ClientManagement"
import { FinancialTracker } from "@/components/freelancer/FinancialTracker"
import { CommunicationCenter } from "@/components/freelancer/CommunicationCenter"
import { AdvancedMetricsChart } from "@/components/charts/AdvancedMetricsChart"
import { GlobalSearch } from "@/components/freelancer/GlobalSearch"
import { AdvancedAnalytics } from "@/components/freelancer/AdvancedAnalytics"

// Import enhanced hooks
import { useFreelancerDashboard } from "@/hooks/useFreelancerDashboard"
import { useRealTimeSync } from "@/hooks/useRealTimeSync"

// Import types
import type { 
  FreelancerProfile, 
  Project, 
  Client, 
  DashboardMetrics, 
  Payment,
  AIAgent,
  Notification,
  Invoice,
  Communication,
  Task
} from "@/types/freelancer"

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export default function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showGlobalSearch, setShowGlobalSearch] = useState(false)
  
  // Use enhanced custom hook for dashboard state management
  const {
    freelancerProfile,
    projects,
    clients,
    metrics,
    aiAgents,
    notifications,
    payments,
    invoices,
    communications,
    tasks,
    isLoading,
    error,
    refreshData,
    updateProject,
    updateClient,
    updateAgent,
    updatePayment,
    updateInvoice,
    updateNotification,
    markAllNotificationsRead,
    searchEntities
  } = useFreelancerDashboard()

  // Real-time synchronization
  const {
    isConnected,
    connectionStatus,
    sendMessage,
    updateProjectStatus,
    sendClientMessage
  } = useRealTimeSync({
    userId: freelancerProfile?.id || '',
    onNotification: (notification: Notification) => {
      console.log('Real-time notification:', notification)
      // Notifications are already handled by the hook
    },
    onPaymentUpdate: (payment: Payment) => {
      console.log('Real-time payment update:', payment)
      updatePayment(payment.id, payment)
    },
    onProjectUpdate: (projectUpdate) => {
      console.log('Real-time project update:', projectUpdate)
      updateProject(projectUpdate.id, projectUpdate)
    },
    onAICompletion: (agent: AIAgent, task: Task) => {
      console.log('AI task completed:', agent, task)
      updateAgent(agent.id, agent)
    },
    onConnectionChange: (connected: boolean) => {
      console.log('Connection status:', connected)
    }
  })

  // Enhanced handlers for global search
  const handleSearchResult = useCallback((result: any) => {
    setShowGlobalSearch(false)
    
    switch (result.type) {
      case 'project':
        setActiveTab('projects')
        break
      case 'client':
        setActiveTab('clients')
        break
      case 'payment':
        setActiveTab('payments')
        break
      case 'invoice':
        setActiveTab('finances')
        break
      case 'task':
        setActiveTab('tasks')
        break
      case 'communication':
        setActiveTab('communications')
        break
      default:
        setActiveTab('overview')
    }
  }, [])

  // Keyboard shortcut for global search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setShowGlobalSearch(true)
      }
      if (event.key === 'Escape' && showGlobalSearch) {
        setShowGlobalSearch(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showGlobalSearch])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading your agency dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-900">Error Loading Dashboard</h2>
            <p className="text-gray-600">{error}</p>
            <Button onClick={initializeDashboard}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      {/* Sidebar */}
      <FreelancerSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        freelancerProfile={freelancerProfile}
        notifications={notifications.filter(n => !n.read)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <div className="bg-white/70 backdrop-blur-md border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "projects" && "Projects"}
                {activeTab === "clients" && "Clients"}
                {activeTab === "tasks" && "Tasks"}
                {activeTab === "payments" && "Payments"}
                {activeTab === "finances" && "Finances"}
                {activeTab === "communications" && "Communications"}
                {activeTab === "invoices" && "Invoices"}
                {activeTab === "ai-agents" && "AI Agents"}
                {activeTab === "analytics" && "Analytics"}
                {activeTab === "settings" && "Settings"}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {freelancerProfile && (
                  <span>Welcome back, {freelancerProfile.name}</span>
                )}
                <div className="flex items-center space-x-1">
                  {isConnected ? (
                    <>
                      <Wifi className="w-4 h-4 text-green-500" />
                      <span className="text-green-600">Connected</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-4 h-4 text-red-500" />
                      <span className="text-red-600">Offline</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Global Search Button */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowGlobalSearch(true)}
                className="text-gray-600"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
                <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 rounded">
                  {navigator?.platform?.includes('Mac') ? '⌘' : 'Ctrl'} K
                </kbd>
              </Button>
              
              {/* Refresh Button */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => refreshData()}
                disabled={isLoading}
                className="text-gray-600"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>

              {/* Notifications */}
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                {notifications.filter(n => !n.read).length}
              </Button>
              
              {/* Settings */}
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Global Search Modal */}
        {showGlobalSearch && (
          <GlobalSearch
            projects={projects}
            clients={clients}
            tasks={tasks}
            communications={communications}
            payments={payments}
            invoices={invoices}
            onResultClick={handleSearchResult}
            onClose={() => setShowGlobalSearch(false)}
          />
        )}

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Welcome Section */}
                <div className="text-center space-y-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back, {freelancerProfile?.name}! 👋
                  </h1>
                  <p className="text-gray-600">
                    Your AI-powered agency is running smoothly. Here's what's happening today.
                  </p>
                </div>

                {/* Key Metrics */}
                {metrics && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                            <p className="text-3xl font-bold text-gray-900">
                              ${metrics.revenue.current.toLocaleString()}
                            </p>
                            <p className="text-sm text-green-600">
                              +{metrics.revenue.growth}% from last month
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-green-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Active Projects</p>
                            <p className="text-3xl font-bold text-gray-900">{metrics.projects.active}</p>
                            <p className="text-sm text-blue-600">
                              {metrics.projects.pipeline} in pipeline
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">AI Time Saved</p>
                            <p className="text-3xl font-bold text-gray-900">{metrics.ai.timeSaved}h</p>
                            <p className="text-sm text-purple-600">
                              ${metrics.ai.costSaved.toLocaleString()} saved
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Bot className="w-6 h-6 text-purple-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Client Satisfaction</p>
                            <p className="text-3xl font-bold text-gray-900">{metrics.clients.satisfaction}/5</p>
                            <p className="text-sm text-orange-600">
                              {metrics.clients.active} active clients
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-orange-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* AI Agents Status */}
                <AIAgentPanel 
                  aiAgents={aiAgents} 
                  tasks={tasks}
                  onAgentUpdate={updateAgent}
                  onCreateAgent={() => console.log("Create agent")}
                  onAssignTask={(agentId, taskId) => console.log("Assign task", agentId, taskId)}
                />

                {/* Recent Projects */}
                <ProjectsOverview 
                  projects={projects.slice(0, 3)} 
                  onProjectUpdate={updateProject}
                  onCreateProject={() => console.log("Create project")}
                />

                {/* Payment Summary */}
                <PaymentCenter 
                  payments={payments.slice(0, 5)}
                  onPaymentUpdate={updatePayment}
                  onCreatePayment={() => console.log("Create payment")}
                  onProcessPayment={(paymentId) => console.log("Process payment", paymentId)}
                />
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === "projects" && (
              <ProjectsOverview 
                projects={projects} 
                onProjectUpdate={(projectId, updates) => {
                  setProjects(prev => prev.map(project => 
                    project.id === projectId ? { ...project, ...updates } : project
                  ))
                }}
                onCreateProject={() => console.log("Create project")}
              />
            )}

            {/* Clients Tab */}
            {activeTab === "clients" && (
              <ClientManagement 
                clients={clients}
                projects={projects}
                onClientUpdate={(clientId, updates) => {
                  setClients(prev => prev.map(client => 
                    client.id === clientId ? { ...client, ...updates } : client
                  ))
                }}
                onCreateClient={() => console.log("Create client")}
                onContactClient={(clientId, method) => console.log("Contact client", clientId, method)}
              />
            )}

            {/* Tasks Tab */}
            {activeTab === "tasks" && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">Task Management</h2>
                  <p className="text-gray-600">Track and manage tasks across all your projects</p>
                </div>
                <Card className="bg-white/70 backdrop-blur-md border border-white/20">
                  <CardContent className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Task Dashboard</h3>
                    <p className="text-gray-600">Advanced task management features coming soon</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <PaymentCenter 
                payments={payments}
                onPaymentUpdate={(paymentId, updates) => {
                  setPayments(prev => prev.map(payment => 
                    payment.id === paymentId ? { ...payment, ...updates } : payment
                  ))
                }}
                onCreatePayment={() => console.log("Create payment")}
                onProcessPayment={(paymentId) => console.log("Process payment", paymentId)}
              />
            )}

            {/* Finances Tab */}
            {activeTab === "finances" && (
              <FinancialTracker 
                invoices={invoices}
                payments={payments}
                projects={projects}
                clients={clients}
                onInvoiceUpdate={(invoiceId, updates) => {
                  setInvoices(prev => prev.map(invoice => 
                    invoice.id === invoiceId ? { ...invoice, ...updates } : invoice
                  ))
                }}
                onCreateInvoice={() => console.log("Create invoice")}
                onSendInvoice={(invoiceId) => console.log("Send invoice", invoiceId)}
              />
            )}

            {/* Communications Tab */}
            {activeTab === "communications" && (
              <CommunicationCenter 
                notifications={notifications}
                communications={communications}
                clients={clients}
                projects={projects}
                onNotificationUpdate={(notificationId, updates) => {
                  setNotifications(prev => prev.map(notification => 
                    notification.id === notificationId ? { ...notification, ...updates } : notification
                  ))
                }}
                onSendMessage={(recipientId, message, type) => console.log("Send message", recipientId, message, type)}
                onMarkAllRead={() => {
                  setNotifications(prev => prev.map(n => ({ ...n, read: true })))
                }}
              />
            )}

            {/* Invoices Tab */}
            {activeTab === "invoices" && (
              <FinancialTracker 
                invoices={invoices}
                payments={payments}
                projects={projects}
                clients={clients}
                onInvoiceUpdate={(invoiceId, updates) => {
                  setInvoices(prev => prev.map(invoice => 
                    invoice.id === invoiceId ? { ...invoice, ...updates } : invoice
                  ))
                }}
                onCreateInvoice={() => console.log("Create invoice")}
                onSendInvoice={(invoiceId) => console.log("Send invoice", invoiceId)}
              />
            )}

            {/* AI Agents Tab */}
            {activeTab === "ai-agents" && (
              <AIAgentPanel 
                aiAgents={aiAgents}
                tasks={tasks}
                onAgentUpdate={(agentId, updates) => {
                  setAiAgents(prev => prev.map(agent => 
                    agent.id === agentId ? { ...agent, ...updates } : agent
                  ))
                }}
                onCreateAgent={() => console.log("Create agent")}
                onAssignTask={(agentId, taskId) => console.log("Assign task", agentId, taskId)}
              />
            )}

            {/* Enhanced Analytics Tab */}
            {activeTab === "analytics" && metrics && (
              <AdvancedAnalytics 
                data={{
                  projects,
                  clients,
                  payments,
                  aiAgents,
                  metrics
                }}
              />
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
                  <p className="text-gray-600">Manage your account and preferences</p>
                </div>
                <Card className="bg-white/70 backdrop-blur-md border border-white/20">
                  <CardContent className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Settings className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings Panel</h3>
                    <p className="text-gray-600">Account settings and configuration options coming soon</p>
                  </CardContent>
                </Card>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}