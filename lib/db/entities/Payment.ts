import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm'
import { User } from './User'

@Entity('payments')
@Index(['userId'])
@Index(['stripePaymentIntentId'], { unique: true })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  userId: string

  @Column({ unique: true })
  stripePaymentIntentId: string

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number

  @Column()
  currency: string

  @Column()
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'cancelled'

  @Column({ nullable: true })
  description: string

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>

  @CreateDateColumn()
  createdAt: Date

  // Relations
  @ManyToOne(() => User, (user) => user.payments)
  user: User
}