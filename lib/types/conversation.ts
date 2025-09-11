export interface User {
  id: string
  email: string
  password_hash: string
  name?: string
  createdAt: Date
  updatedAt: Date
}

export interface AnonymousUser {
  id: string
  cookie_id: string
  createdAt: Date
  migrated?: boolean
  migratedAt?: Date
}

export interface Conversation {
  id: string
  title?: string
  userId?: string
  anonymousId?: string
  createdAt: Date
  updatedAt: Date
  lastMessageAt: Date
}

export interface Message {
  id: string
  conversationId: string
  role: "user" | "assistant" | "system"
  content: string
  metadata?: Record<string, any>
  createdAt: Date
}

export interface ConversationWithMessages extends Conversation {
  messages: Message[]
  messageCount: number
}
