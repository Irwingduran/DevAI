"use client"

import { Bot } from "lucide-react"

interface AssistantAvatarProps {
  visible: boolean
}

export function AssistantAvatar({ visible }: AssistantAvatarProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm animate-pulse">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <div className="absolute -top-12 right-0 bg-white/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg border border-white/20 whitespace-nowrap">
          <p className="text-sm text-gray-700">I'm here to help! 👋</p>
        </div>
      </div>
    </div>
  )
}