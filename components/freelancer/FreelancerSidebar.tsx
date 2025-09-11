"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  CheckSquare,
  CreditCard,
  TrendingUp,
  MessageSquare,
  FileText,
  Bot,
  BarChart3,
  Settings,
  Crown,
  Bell,
  ChevronLeft,
  ChevronRight,
  Plus,
  Zap,
  DollarSign
} from "lucide-react"
import type { FreelancerProfile, Notification } from "@/types/freelancer"

interface FreelancerSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  freelancerProfile: FreelancerProfile | null
  notifications: Notification[]
}

export function FreelancerSidebar({ 
  activeTab, 
  onTabChange, 
  freelancerProfile,
  notifications 
}: FreelancerSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigation = [
    {
      id: "overview",
      name: "Overview",
      icon: LayoutDashboard,
      badge: null,
      description: "Dashboard overview"
    },
    {
      id: "projects",
      name: "Projects",
      icon: FolderOpen,
      badge: "3",
      description: "Active projects"
    },
    {
      id: "clients",
      name: "Clients", 
      icon: Users,
      badge: null,
      description: "Client management"
    },
    {
      id: "tasks",
      name: "Tasks",
      icon: CheckSquare,
      badge: "12",
      description: "Task management"
    },
    {
      id: "payments",
      name: "Payments",
      icon: CreditCard,
      badge: "2",
      description: "Payment tracking"
    },
    {
      id: "finances",
      name: "Finances",
      icon: TrendingUp,
      badge: null,
      description: "Financial overview"
    },
    {
      id: "communications",
      name: "Messages",
      icon: MessageSquare,
      badge: notifications.filter(n => n.type === "client_message").length.toString(),
      description: "Client communications"
    },
    {
      id: "invoices",
      name: "Invoices",
      icon: FileText,
      badge: null,
      description: "Invoice management"
    },
    {
      id: "ai-agents",
      name: "AI Agents",
      icon: Bot,
      badge: "Working",
      badgeColor: "bg-green-100 text-green-800",
      description: "AI assistant status"
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: BarChart3,
      badge: "PRO",
      badgeColor: "bg-purple-100 text-purple-800",
      description: "Business analytics"
    }
  ]

  const secondaryNavigation = [
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      description: "Account settings"
    }
  ]

  const quickActions = [
    {
      id: "new-project",
      name: "New Project",
      icon: Plus,
      action: () => console.log("New project")
    },
    {
      id: "ai-assist",
      name: "AI Assist",
      icon: Zap,
      action: () => console.log("AI assist")
    },
    {
      id: "invoice",
      name: "Create Invoice",
      icon: DollarSign,
      action: () => console.log("Create invoice")
    }
  ]

  const getNotificationCount = () => {
    return notifications.length
  }

  return (
    <div
      className={`bg-white/80 backdrop-blur-md border-r border-white/20 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col h-screen sticky top-0`}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-gray-900">AI Agency</span>
                <p className="text-xs text-gray-600">Freelancer Dashboard</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Profile Summary */}
      {!isCollapsed && freelancerProfile && (
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {freelancerProfile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {freelancerProfile.name}
              </p>
              <p className="text-xs text-gray-600">
                ${freelancerProfile.hourlyRate}/hr • {freelancerProfile.rating}⭐
              </p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-blue-50 rounded-lg p-2 text-center">
              <p className="text-xs text-blue-600 font-medium">Active</p>
              <p className="text-sm font-bold text-blue-900">3</p>
            </div>
            <div className="bg-green-50 rounded-lg p-2 text-center">
              <p className="text-xs text-green-600 font-medium">Completed</p>
              <p className="text-sm font-bold text-green-900">{freelancerProfile.completedProjects}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`group flex items-center w-full px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                title={isCollapsed ? item.name : item.description}
              >
                <Icon
                  className={`flex-shrink-0 w-5 h-5 ${
                    isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {!isCollapsed && (
                  <>
                    <span className="ml-3 flex-1 text-left">{item.name}</span>
                    {item.badge && (
                      <Badge
                        className={`ml-2 text-xs ${
                          item.badgeColor || "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </button>
            )
          })}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <>
            <div className="my-4 px-4">
              <div className="border-t border-gray-200" />
            </div>
            <div className="px-4 mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quick Actions</p>
            </div>
            <nav className="space-y-1 px-2">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <Icon className="flex-shrink-0 w-4 h-4 text-gray-400 group-hover:text-gray-500" />
                    <span className="ml-3 flex-1 text-left">{action.name}</span>
                  </button>
                )
              })}
            </nav>
          </>
        )}

        {/* Divider */}
        <div className="my-4 px-4">
          <div className="border-t border-gray-200" />
        </div>

        {/* Secondary Navigation */}
        <nav className="space-y-1 px-2">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                title={isCollapsed ? item.name : item.description}
              >
                <Icon className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
                {!isCollapsed && (
                  <span className="ml-3 flex-1 text-left">{item.name}</span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Notifications Badge */}
      {!isCollapsed && getNotificationCount() > 0 && (
        <div className="p-4 border-t border-white/20">
          <Card className="bg-blue-50 border-blue-200">
            <div className="p-3 flex items-center space-x-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">
                  {getNotificationCount()} New Notifications
                </p>
                <p className="text-xs text-blue-700">
                  Click to view all updates
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* PRO Upgrade Banner */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/20">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-900">Upgrade to PRO</span>
            </div>
            <p className="text-sm text-purple-700 mb-3">
              Unlock unlimited projects and advanced AI features
            </p>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm">
              Upgrade Now
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}