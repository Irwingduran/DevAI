"use client"

import { Badge } from "@/components/ui/badge"
import { Crown } from "lucide-react"

interface ProBadgeProps {
  variant?: "default" | "compact" | "icon-only"
  className?: string
}

export function ProBadge({ variant = "default", className = "" }: ProBadgeProps) {
  if (variant === "icon-only") {
    return (
      <div
        className={`w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center ${className}`}
      >
        <Crown className="w-3 h-3 text-white" />
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <Badge className={`bg-gradient-to-r from-purple-600 to-blue-600 text-white ${className}`}>
        <Crown className="w-3 h-3 mr-1" />
        PRO
      </Badge>
    )
  }

  return (
    <Badge className={`bg-gradient-to-r from-purple-600 to-blue-600 text-white ${className}`}>
      <Crown className="w-3 h-3 mr-1" />
      PRO Member
    </Badge>
  )
}
