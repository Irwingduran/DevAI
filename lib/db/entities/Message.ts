import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm'
import { Conversation } from './Conversation'

@Entity('messages')
@Index(['conversationId'])
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  conversationId: string

  @Column()
  role: 'user' | 'assistant' | 'system'

  @Column('text')
  content: string

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>

  @Column({ nullable: true })
  model: string

  @Column({ nullable: true })
  promptTokens: number

  @Column({ nullable: true })
  completionTokens: number

  @CreateDateColumn()
  createdAt: Date

  // Relations
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation
}