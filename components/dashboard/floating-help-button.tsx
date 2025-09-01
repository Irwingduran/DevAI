"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Users } from "lucide-react"

interface FloatingHelpButtonProps {
  onContactExpert: () => void
  show?: boolean
}

export function FloatingHelpButton({ onContactExpert, show = true }: FloatingHelpButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!show) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="mb-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs animate-in slide-in-from-bottom duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-gray-900">Need help?</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)} className="p-1 h-auto">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-3">Get expert guidance on your AI & Blockchain solutions</p>
          <Button
            onClick={() => {
              onContactExpert()
              setIsExpanded(false)
            }}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm"
          >
            Talk to Expert
          </Button>
        </div>
      )}

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        {isExpanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  )
}
