import { v4 as uuidv4 } from "uuid"
import type { User, AnonymousUser, Conversation, Message, ConversationWithMessages } from "@/lib/types/conversation"

// Mock database - replace with your actual database implementation
class ConversationDatabase {
  private users: Map<string, User> = new Map()
  private anonymousUsers: Map<string, AnonymousUser> = new Map()
  private conversations: Map<string, Conversation> = new Map()
  private messages: Map<string, Message> = new Map()

  // User operations
  async createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const user: User = {
      id: uuidv4(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.users.set(user.id, user)
    return user
  }

  async getUserByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) return user
    }
    return null
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null
  }

  // Anonymous user operations
  async createAnonymousUser(cookieId: string): Promise<AnonymousUser> {
    const anonymousUser: AnonymousUser = {
      id: uuidv4(),
      cookie_id: cookieId,
      createdAt: new Date(),
    }
    this.anonymousUsers.set(anonymousUser.id, anonymousUser)
    return anonymousUser
  }

  async getAnonymousUserByCookieId(cookieId: string): Promise<AnonymousUser | null> {
    for (const user of this.anonymousUsers.values()) {
      if (user.cookie_id === cookieId && !user.migrated) return user
    }
    return null
  }

  async markAnonymousUserAsMigrated(anonymousId: string): Promise<void> {
    const user = this.anonymousUsers.get(anonymousId)
    if (user) {
      user.migrated = true
      user.migratedAt = new Date()
      this.anonymousUsers.set(anonymousId, user)
    }
  }

  // Conversation operations
  async createConversation(data: {
    userId?: string
    anonymousId?: string
    title?: string
  }): Promise<Conversation> {
    const conversation: Conversation = {
      id: uuidv4(),
      title: data.title,
      userId: data.userId,
      anonymousId: data.anonymousId,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastMessageAt: new Date(),
    }
    this.conversations.set(conversation.id, conversation)
    return conversation
  }

  async getConversationById(id: string): Promise<Conversation | null> {
    return this.conversations.get(id) || null
  }

  async getConversationsByUserId(userId: string): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .filter((conv) => conv.userId === userId)
      .sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime())
  }

  async getConversationsByAnonymousId(anonymousId: string): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .filter((conv) => conv.anonymousId === anonymousId)
      .sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime())
  }

  async migrateConversationsToUser(anonymousId: string, userId: string): Promise<number> {
    let migratedCount = 0
    for (const [id, conversation] of this.conversations.entries()) {
      if (conversation.anonymousId === anonymousId) {
        conversation.userId = userId
        conversation.anonymousId = undefined
        conversation.updatedAt = new Date()
        this.conversations.set(id, conversation)
        migratedCount++
      }
    }
    return migratedCount
  }

  async updateConversationTitle(id: string, title: string): Promise<void> {
    const conversation = this.conversations.get(id)
    if (conversation) {
      conversation.title = title
      conversation.updatedAt = new Date()
      this.conversations.set(id, conversation)
    }
  }

  // Message operations
  async createMessage(data: {
    conversationId: string
    role: "user" | "assistant" | "system"
    content: string
    metadata?: Record<string, any>
  }): Promise<Message> {
    const message: Message = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
    }
    this.messages.set(message.id, message)

    // Update conversation's lastMessageAt
    const conversation = this.conversations.get(data.conversationId)
    if (conversation) {
      conversation.lastMessageAt = new Date()
      conversation.updatedAt = new Date()
      this.conversations.set(data.conversationId, conversation)
    }

    return message
  }

  async getMessagesByConversationId(conversationId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter((msg) => msg.conversationId === conversationId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  }

  async getConversationsWithMessages(userId?: string, anonymousId?: string): Promise<ConversationWithMessages[]> {
    let conversations: Conversation[]

    if (userId) {
      conversations = await this.getConversationsByUserId(userId)
    } else if (anonymousId) {
      conversations = await this.getConversationsByAnonymousId(anonymousId)
    } else {
      return []
    }

    const conversationsWithMessages: ConversationWithMessages[] = []

    for (const conversation of conversations) {
      const messages = await this.getMessagesByConversationId(conversation.id)
      conversationsWithMessages.push({
        ...conversation,
        messages,
        messageCount: messages.length,
      })
    }

    return conversationsWithMessages
  }
}

export const conversationDb = new ConversationDatabase()
