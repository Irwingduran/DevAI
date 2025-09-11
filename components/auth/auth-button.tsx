"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "./auth-modal"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Settings, LogOut, Sparkles } from "lucide-react"

interface AuthButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function AuthButton({ variant = "default", size = "default", className }: AuthButtonProps) {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authTab, setAuthTab] = useState<"login" | "signup">("login")
  
  // Safe auth hook usage for SSR
  let user = null
  let isAuthenticated = false
  let login = () => {}
  let logout = () => {}
  
  try {
    const auth = useAuth()
    user = auth.user
    isAuthenticated = auth.isAuthenticated
    login = auth.login
    logout = auth.logout
  } catch (error) {
    // Handle case where AuthProvider is not available (during SSR)
    // Default values already set above
  }

  const handleAuthSuccess = (userData: any) => {
    login(userData)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    logout()
  }

  const openLogin = () => {
    setAuthTab("login")
    setShowAuthModal(true)
  }

  const openSignup = () => {
    setAuthTab("signup")
    setShowAuthModal(true)
  }

  if (isAuthenticated && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
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
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size={size} onClick={openLogin} className={className}>
          Sign In
        </Button>
        <Button
          variant={variant}
          size={size}
          onClick={openSignup}
          className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white ${className}`}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Get Started
        </Button>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authTab}
        onSuccess={handleAuthSuccess}
      />
    </>
  )
}
