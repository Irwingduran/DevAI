import { z } from 'zod'

const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Application
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  
  // Authentication
  JWT_SECRET: z.string().min(32),
  AUTH_SESSION_EXPIRY: z.string().default('7d'),
  
  // Database
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
  
  // OpenAI / LangChain
  OPENAI_API_KEY: z.string().startsWith('sk-').optional(),
  LANGCHAIN_TRACING_V2: z.string().optional(),
  LANGCHAIN_API_KEY: z.string().optional(),
  LANGCHAIN_PROJECT: z.string().optional(),
  
  // Stripe
  STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_').optional(),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_').optional(),
  
  // Email
  EMAIL_FROM: z.string().email().optional(),
  EMAIL_API_KEY: z.string().optional(),
  
  // Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_VERCEL_ANALYTICS_ID: z.string().optional(),
  
  // Monitoring
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  
  // Rate Limiting
  RATE_LIMIT_API_REQUESTS: z.string().transform(Number).default('100'),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('60000'),
})

type Env = z.infer<typeof envSchema>

// Validate environment variables at build time
const parseEnv = () => {
  const parsed = envSchema.safeParse(process.env)
  
  if (!parsed.success) {
    console.error('❌ Invalid environment variables:')
    console.error(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2))
    throw new Error('Invalid environment variables')
  }
  
  return parsed.data
}

// Export validated environment variables
export const env = process.env.NODE_ENV === 'production' 
  ? parseEnv() 
  : envSchema.parse(process.env)

// Type-safe environment variable access
export type { Env }