"use client"

import { useState } from "react"
import { ConversationHistory } from "@/components/conversation/conversation-history"
import { ChatInterface } from "@/components/conversation/chat-interface"

export default function ConversationsPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>()

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId)
  }

  const handleNewConversation = () => {
    setSelectedConversationId(undefined)
  }

  const handleConversationCreated = (conversationId: string) => {
    setSelectedConversationId(conversationId)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Conversations</h1>
        <p className="text-gray-600 mt-2">Chat with AI and manage your conversation history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ConversationHistory
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </div>

        <div className="lg:col-span-2">
          <ChatInterface conversationId={selectedConversationId} onConversationCreated={handleConversationCreated} />
        </div>
      </div>
    </div>
  )
}
