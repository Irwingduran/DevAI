"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Rocket,
  ShoppingBag,
  Crown,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Bot,
  BarChart3,
  Users,
  Calendar,
  MessageCircle,
  Folder,
} from "lucide-react"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/dashboard",
    },
    {
      name: "My Projects",
      href: "/dashboard/projects",
      icon: Folder,
      current: pathname === "/dashboard/projects",
      badge: "3",
    },
    {
      name: "Solutions",
      href: "/dashboard/solutions",
      icon: Rocket,
      current: pathname === "/dashboard/solutions",
    },
    {
      name: "Marketplace",
      href: "/dashboard/marketplace",
      icon: ShoppingBag,
      current: pathname === "/dashboard/marketplace",
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      current: pathname === "/dashboard/analytics",
      badge: "PRO",
      badgeVariant: "premium" as const,
    },
    {
      name: "Team",
      href: "/dashboard/team",
      icon: Users,
      current: pathname === "/dashboard/team",
      badge: "PRO",
      badgeVariant: "premium" as const,
    },
  ]

  const secondaryNavigation = [
    {
      name: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
      current: pathname === "/dashboard/calendar",
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: MessageCircle,
      current: pathname === "/dashboard/messages",
      badge: "2",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname === "/dashboard/settings",
    },
    {
      name: "Help & Support",
      href: "/dashboard/help",
      icon: HelpCircle,
      current: pathname === "/dashboard/help",
    },
  ]

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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">SmartSolutions</span>
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

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`flex-shrink-0 w-5 h-5 ${
                      item.current ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3 flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge
                          variant={item.badgeVariant === "premium" ? "default" : "secondary"}
                          className={`ml-2 text-xs ${
                            item.badgeVariant === "premium"
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.badgeVariant === "premium" && <Crown className="w-3 h-3 mr-1" />}
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Divider */}
        <div className="my-4 px-4">
          <div className="border-t border-gray-200" />
        </div>

        {/* Secondary Navigation */}
        <nav className="space-y-1 px-2">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`flex-shrink-0 w-5 h-5 ${
                      item.current ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3 flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-2 text-xs bg-red-100 text-red-800">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* PRO Upgrade Banner */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/20">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-900">Upgrade to PRO</span>
            </div>
            <p className="text-sm text-purple-700 mb-3">Unlock unlimited projects and advanced features</p>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm">
              Upgrade Now
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
