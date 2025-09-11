"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Clock, Search, Edit2, Plus } from "lucide-react"
import type { ConversationWithMessages } from "@/lib/types/conversation"

interface ConversationHistoryProps {
  onSelectConversation?: (conversationId: string) => void
  onNewConversation?: () => void
}

export function ConversationHistory({ onSelectConversation, onNewConversation }: ConversationHistoryProps) {
  const [conversations, setConversations] = useState<ConversationWithMessages[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      const response = await fetch("/api/conversation/history")
      const data = await response.json()

      if (data.success) {
        setConversations(data.conversations)
      }
    } catch (error) {
      console.error("Error fetching conversations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditTitle = async (conversationId: string, newTitle: string) => {
    try {
      const response = await fetch(`/api/conversation/${conversationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      })

      if (response.ok) {
        setConversations((prev) =>
          prev.map((conv) => (conv.id === conversationId ? { ...conv, title: newTitle } : conv)),
        )
        setEditingId(null)
        setEditTitle("")
      }
    } catch (error) {
      console.error("Error updating conversation title:", error)
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.messages.some((msg) => msg.content.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    } else if (diffInHours < 168) {
      // 7 days
      return new Date(date).toLocaleDateString([], {
        weekday: "short",
      })
    } else {
      return new Date(date).toLocaleDateString([], {
        month: "short",
        day: "numeric",
      })
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Conversation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            History
          </div>
          <Button size="sm" onClick={onNewConversation} className="flex items-center gap-1">
            <Plus className="w-4 h-4" />
            New
          </Button>
        </CardTitle>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-96">
          {filteredConversations.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              {searchTerm ? "No conversations found" : "No conversations yet"}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 group"
                  onClick={() => onSelectConversation?.(conversation.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      {editingId === conversation.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleEditTitle(conversation.id, editTitle)
                              } else if (e.key === "Escape") {
                                setEditingId(null)
                                setEditTitle("")
                              }
                            }}
                            className="text-sm"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditTitle(conversation.id, editTitle)
                            }}
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <h4 className="font-medium text-sm truncate">
                          {conversation.title || "Untitled Conversation"}
                        </h4>
                      )}

                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {conversation.messageCount} messages
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {formatDate(conversation.lastMessageAt)}
                        </div>
                      </div>

                      {conversation.messages.length > 0 && (
                        <p className="text-xs text-gray-600 mt-2 truncate">
                          {conversation.messages[conversation.messages.length - 1].content}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingId(conversation.id)
                          setEditTitle(conversation.title || "")
                        }}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
