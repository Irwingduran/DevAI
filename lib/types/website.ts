export interface WebsiteProject {
  id: string
  title: string
  description: string
  code: string
  template: string
  userId?: string
  anonymousId?: string
  deploymentUrl?: string
  isDeployed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface WebsiteProjectCreateData {
  title: string
  description: string
  code: string
  template: string
  userId?: string
  anonymousId?: string
}

export interface WebsiteProjectUpdateData {
  title?: string
  description?: string
  code?: string
  deploymentUrl?: string
  isDeployed?: boolean
}

export interface DeploymentInfo {
  url: string
  provider: 'vercel' | 'netlify'
  siteName: string
  deployedAt: Date
}

export interface WebsiteGenerationRequest {
  prompt: string
  template?: string
  userId?: string
  anonymousId?: string
}