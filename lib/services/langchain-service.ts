import { ChatOpenAI } from "@langchain/openai"
import { ConversationChain } from "langchain/chains"
import { BufferMemory } from "langchain/memory"
import { PromptTemplate } from "@langchain/core/prompts"
import { conversationDb } from "./conversation-service"

interface LangChainConfig {
  model: string
  temperature: number
  maxTokens: number
  streaming: boolean
}

interface ConversationContext {
  conversationId: string
  userId?: string
  anonymousId?: string
  systemPrompt?: string
}

class LangChainService {
  private llm: ChatOpenAI
  private config: LangChainConfig
  private conversationMemories: Map<string, BufferMemory> = new Map()

  constructor(config: Partial<LangChainConfig> = {}) {
    this.config = {
      model: config.model || "gpt-4o-mini",
      temperature: config.temperature || 0.7,
      maxTokens: config.maxTokens || 2000,
      streaming: config.streaming || true,
    }

    this.llm = new ChatOpenAI({
      modelName: this.config.model,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
      streaming: this.config.streaming,
      openAIApiKey: process.env.OPENAI_API_KEY,
    })
  }

  private getSystemPrompt(): string {
    return `You are an AI assistant specializing in AI and Blockchain solutions for businesses. You help users:

1. Understand AI and Blockchain technologies
2. Identify opportunities for automation and optimization
3. Design custom solutions for their specific needs
4. Provide implementation guidance and best practices
5. Troubleshoot technical challenges

Key Guidelines:
- Be helpful, professional, and solution-oriented
- Ask clarifying questions when needed
- Provide practical, actionable advice
- Consider business context and constraints
- Suggest both AI and Blockchain solutions when appropriate
- Focus on ROI and business value

Current conversation context: You're helping a user explore AI and Blockchain solutions for their business needs.`
  }

  private async getOrCreateMemory(conversationId: string): Promise<BufferMemory> {
    if (this.conversationMemories.has(conversationId)) {
      return this.conversationMemories.get(conversationId)!
    }

    // Load conversation history from database
    const messages = await conversationDb.getMessagesByConversationId(conversationId)

    const memory = new BufferMemory({
      returnMessages: true,
      memoryKey: "history",
    })

    // Populate memory with existing conversation history
    for (const message of messages) {
      if (message.role === "user") {
        await memory.chatHistory.addUserMessage(message.content)
      } else if (message.role === "assistant") {
        await memory.chatHistory.addAIChatMessage(message.content)
      }
    }

    this.conversationMemories.set(conversationId, memory)
    return memory
  }

  async generateResponse(
    userMessage: string,
    context: ConversationContext,
  ): Promise<{
    response: string
    metadata: Record<string, any>
  }> {
    try {
      const memory = await this.getOrCreateMemory(context.conversationId)

      const prompt = PromptTemplate.fromTemplate(`
${context.systemPrompt || this.getSystemPrompt()}

Current conversation:
{history}`)

      const conversationChain = new ConversationChain({
        llm: this.llm,
        memory: memory,
      })

      const response = await conversationChain.call({
        input: userMessage,
      })

      return {
        response: response.response,
        metadata: {},
      }
    } catch (error) {
      console.error("Error generating response:", error)
      throw error
    }
  }
}
