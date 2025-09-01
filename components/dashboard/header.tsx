"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Bell, Settings, User, LogOut, Sparkles } from "lucide-react"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  notificationCount?: number
  isProUser?: boolean
}

export function Header({ searchQuery, onSearchChange, notificationCount = 3, isProUser = false }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  const mockNotifications = [
    {
      id: 1,
      title: "Solution completed",
      message: "Smart Inbox AI is now ready to use",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "New resource available",
      message: "Blockchain fundamentals course added",
      time: "1 day ago",
      unread: true,
    },
    {
      id: 3,
      title: "Task reminder",
      message: "Email integration setup due tomorrow",
      time: "2 days ago",
      unread: false,
    },
  ]

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Mobile Only */}
          <div className="flex items-center space-x-3 md:hidden">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">FutureFlow</span>
            {isProUser && <Badge className="bg-green-500 text-white text-xs ml-2">PRO</Badge>}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search solutions, tasks, resources..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-white/50 border-white/30 focus:bg-white/70"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative bg-white/50 hover:bg-white/70">
                  <Bell className="w-4 h-4" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end">
                <div className="p-4 border-b">
                  <h4 className="font-semibold">Notifications</h4>
                  <p className="text-sm text-gray-600">{notificationCount} unread</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {mockNotifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="p-4 cursor-pointer">
                      <div className="flex items-start space-x-3 w-full">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? "bg-blue-500" : "bg-gray-300"}`}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <div className="p-2 border-t">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-600">john@example.com</p>
                    </div>
                    {isProUser && <Badge className="bg-green-500 text-white text-xs">PRO</Badge>}
                  </div>
                </div>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
