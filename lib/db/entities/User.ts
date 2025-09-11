import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import { Conversation } from './Conversation'
import { Payment } from './Payment'
import * as bcrypt from 'bcryptjs'

@Entity('users')
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column({ select: false }) // Don't select password by default
  password: string

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  avatar: string

  @Column({ default: 'free' })
  plan: 'free' | 'pro' | 'enterprise'

  @Column({ nullable: true })
  stripeCustomerId: string

  @Column({ nullable: true })
  stripeSubscriptionId: string

  @Column({ default: false })
  emailVerified: boolean

  @Column({ nullable: true })
  emailVerificationToken: string

  @Column({ nullable: true })
  resetPasswordToken: string

  @Column({ nullable: true, type: 'timestamp' })
  resetPasswordExpires: Date

  @Column({ default: 0 })
  apiRequestsCount: number

  @Column({ default: 100 })
  apiRequestsLimit: number

  @Column({ nullable: true, type: 'timestamp' })
  lastLoginAt: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // Relations
  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversations: Conversation[]

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[]

  // Methods
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2')) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password)
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this
    return userWithoutPassword
  }
}