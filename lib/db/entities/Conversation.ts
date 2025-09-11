import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm'
import { User } from './User'
import { Message } from './Message'

@Entity('conversations')
@Index(['userId'])
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  title: string

  @Column({ nullable: true })
  userId: string

  @Column({ nullable: true })
  anonymousId: string

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: 'timestamp', nullable: true })
  lastMessageAt: Date

  // Relations
  @ManyToOne(() => User, (user) => user.conversations, { nullable: true })
  user: User

  @OneToMany(() => Message, (message) => message.conversation, { cascade: true })
  messages: Message[]
}