import { DataSource, DataSourceOptions } from 'typeorm'
import { User } from './entities/User'
import { Conversation } from './entities/Conversation'
import { Message } from './entities/Message'
import { Payment } from './entities/Payment'

// Database configuration
const getDatabaseConfig = (): DataSourceOptions => {
  const isProduction = process.env.NODE_ENV === 'production'
  
  // For development, use in-memory SQLite
  if (!isProduction && !process.env.DATABASE_URL) {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [User, Conversation, Message, Payment],
      migrations: [],
      subscribers: [],
    }
  }
  
  // For production or when DATABASE_URL is provided
  const databaseUrl = process.env.DATABASE_URL
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is required in production')
  }
  
  return {
    type: 'postgres',
    url: databaseUrl,
    synchronize: !isProduction, // Disable in production
    logging: process.env.NODE_ENV === 'development',
    entities: [User, Conversation, Message, Payment],
    migrations: ['lib/db/migrations/*.ts'],
    subscribers: [],
    ssl: isProduction ? { rejectUnauthorized: false } : false,
    extra: {
      max: 10, // Connection pool size
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    },
  }
}

// Singleton pattern for database connection
class Database {
  private static instance: Database
  private dataSource: DataSource | null = null
  
  private constructor() {}
  
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
  
  async connect(): Promise<DataSource> {
    if (this.dataSource?.isInitialized) {
      return this.dataSource
    }
    
    try {
      const config = getDatabaseConfig()
      this.dataSource = new DataSource(config)
      await this.dataSource.initialize()
      
      console.log('✅ Database connected successfully')
      
      // Run migrations in production
      if (process.env.NODE_ENV === 'production') {
        await this.dataSource.runMigrations()
        console.log('✅ Migrations completed')
      }
      
      return this.dataSource
    } catch (error) {
      console.error('❌ Database connection failed:', error)
      throw error
    }
  }
  
  async disconnect(): Promise<void> {
    if (this.dataSource?.isInitialized) {
      await this.dataSource.destroy()
      this.dataSource = null
      console.log('Database disconnected')
    }
  }
  
  getDataSource(): DataSource {
    if (!this.dataSource?.isInitialized) {
      throw new Error('Database not connected. Call connect() first.')
    }
    return this.dataSource
  }
  
  // Helper methods for common operations
  async transaction<T>(
    operation: (manager: any) => Promise<T>
  ): Promise<T> {
    const dataSource = this.getDataSource()
    return await dataSource.transaction(operation)
  }
  
  // Repository getters
  getUserRepository() {
    return this.getDataSource().getRepository(User)
  }
  
  getConversationRepository() {
    return this.getDataSource().getRepository(Conversation)
  }
  
  getMessageRepository() {
    return this.getDataSource().getRepository(Message)
  }
  
  getPaymentRepository() {
    return this.getDataSource().getRepository(Payment)
  }
}

// Export singleton instance
export const db = Database.getInstance()

// Export entity types
export { User, Conversation, Message, Payment }

// Initialize database connection (for Next.js API routes)
let initialized = false

export async function initializeDatabase() {
  if (!initialized) {
    try {
      await db.connect()
      initialized = true
    } catch (error) {
      console.error('Failed to initialize database:', error)
      // In development, continue without database
      if (process.env.NODE_ENV === 'development') {
        console.warn('Running without database connection')
      } else {
        throw error
      }
    }
  }
  return db
}