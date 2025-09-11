import { NextResponse } from 'next/server'

// Custom error classes
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: any
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details)
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR')
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR')
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND')
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT')
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED')
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, originalError?: any) {
    super(
      `External service error: ${service}`,
      503,
      'EXTERNAL_SERVICE_ERROR',
      originalError
    )
  }
}

// Error handler for API routes
export function handleApiError(error: unknown) {
  console.error('API Error:', error)

  // Handle known errors
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: {
          message: error.message,
          code: error.code,
          details: error.details,
        },
      },
      { status: error.statusCode }
    )
  }

  // Handle Zod validation errors
  if (error && typeof error === 'object' && 'name' in error) {
    if (error.name === 'ZodError') {
      const zodError = error as any
      return NextResponse.json(
        {
          error: {
            message: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: zodError.errors,
          },
        },
        { status: 400 }
      )
    }
  }

  // Handle database errors
  if (error && typeof error === 'object' && 'code' in error) {
    const dbError = error as any
    
    // Unique constraint violation
    if (dbError.code === '23505') {
      return NextResponse.json(
        {
          error: {
            message: 'Resource already exists',
            code: 'DUPLICATE_ERROR',
          },
        },
        { status: 409 }
      )
    }
    
    // Foreign key constraint violation
    if (dbError.code === '23503') {
      return NextResponse.json(
        {
          error: {
            message: 'Referenced resource does not exist',
            code: 'REFERENCE_ERROR',
          },
        },
        { status: 400 }
      )
    }
  }

  // Handle unknown errors
  const message = 
    process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : error instanceof Error
      ? error.message
      : 'Unknown error'

  return NextResponse.json(
    {
      error: {
        message,
        code: 'INTERNAL_ERROR',
      },
    },
    { status: 500 }
  )
}

// Async error wrapper for API routes
export function asyncHandler<T extends (...args: any[]) => Promise<any>>(
  handler: T
): T {
  return (async (...args) => {
    try {
      return await handler(...args)
    } catch (error) {
      return handleApiError(error)
    }
  }) as T
}

// Client-side error handler
export function handleClientError(error: unknown): string {
  if (error instanceof AppError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'An unexpected error occurred'
}

// Error logging utility
export function logError(error: unknown, context?: Record<string, any>) {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    ...context,
  }

  if (error instanceof Error) {
    console.error('Error:', {
      ...errorInfo,
      name: error.name,
      message: error.message,
      stack: error.stack,
    })
  } else {
    console.error('Error:', {
      ...errorInfo,
      error,
    })
  }

  // In production, send to error tracking service
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    // TODO: Send to Sentry or other error tracking service
  }
}