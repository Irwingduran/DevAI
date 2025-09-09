import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { z } from 'zod'
import { handleApiError, ValidationError } from '@/lib/errors'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const generateSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters long'),
  requirements: z.array(z.string()).optional(),
  style: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, requirements = [], style = 'modern' } = generateSchema.parse(body)

    // Create a comprehensive system prompt for website generation
    const systemPrompt = `You are an expert web developer and designer. Generate a complete, functional website based on the user's requirements.

IMPORTANT INSTRUCTIONS:
- Create a COMPLETE, functional HTML page with embedded CSS and JavaScript
- Use modern web standards (HTML5, CSS3, ES6+)
- Make it fully responsive and mobile-friendly
- Include proper semantic HTML structure
- Use modern CSS techniques (flexbox, grid, CSS variables)
- Add interactive JavaScript where appropriate
- Include proper meta tags for SEO
- Use a ${style} design aesthetic
- Make it production-ready and polished
- Include placeholder content that makes sense for the use case

ADDITIONAL REQUIREMENTS: ${requirements.join(', ')}

STRUCTURE YOUR RESPONSE AS:
Return only the complete HTML code with embedded CSS and JS. No explanations, just the code.

The HTML should be self-contained and ready to save as an .html file.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      max_tokens: 4000,
      temperature: 0.7,
    })

    const generatedCode = completion.choices[0]?.message?.content

    if (!generatedCode) {
      throw new Error('Failed to generate website code')
    }

    // Clean up the generated code (remove markdown formatting if present)
    let cleanCode = generatedCode
    if (cleanCode.includes('```html')) {
      cleanCode = cleanCode.replace(/```html\n?/g, '').replace(/```$/g, '')
    }
    if (cleanCode.includes('```')) {
      cleanCode = cleanCode.replace(/```\n?/g, '').replace(/```$/g, '')
    }

    // Create a preview URL (you can implement this to save to a temp file/service)
    const previewUrl = await createPreviewUrl(cleanCode)

    return NextResponse.json({
      success: true,
      code: cleanCode,
      previewUrl,
      tokensUsed: completion.usage?.total_tokens || 0,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

// Helper function to create preview URL
// In a real implementation, you might save to a temp file service or use a sandboxing service
async function createPreviewUrl(html: string): Promise<string> {
  try {
    // For now, return a data URL that can be used in iframe
    // In production, you might want to save to a temp file or use a service like CodeSandbox
    const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`
    return dataUrl
  } catch (error) {
    console.error('Failed to create preview URL:', error)
    return ''
  }
}

// Alternative endpoint for getting website templates
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const templates = {
    ecommerce: {
      name: 'E-commerce Store',
      description: 'Modern online store with product catalog and shopping cart',
      prompt: 'Create a modern e-commerce website for selling handmade jewelry. Include a product catalog with filtering, shopping cart, checkout process, and customer reviews. Use a clean, minimalist design with warm colors.',
    },
    saas: {
      name: 'SaaS Landing Page',
      description: 'Professional SaaS landing page with pricing tiers',
      prompt: 'Build a SaaS landing page for a project management tool. Include hero section, features showcase, pricing tiers (Basic, Pro, Enterprise), testimonials, and CTA buttons. Use a professional blue and white color scheme.',
    },
    portfolio: {
      name: 'Portfolio Website',
      description: 'Creative portfolio with project showcase',
      prompt: 'Design a creative portfolio website for a graphic designer. Include about section, portfolio gallery with project details, services offered, client testimonials, and contact form. Use modern typography and creative layout.',
    },
    restaurant: {
      name: 'Restaurant Website',
      description: 'Restaurant site with menu and reservations',
      prompt: 'Create a restaurant website with menu display, online reservation system, location info with map, photo gallery, and chef bio. Use warm colors and appetizing food imagery.',
    },
    blog: {
      name: 'Blog Website',
      description: 'Modern blog with article listing and reading experience',
      prompt: 'Build a modern blog website with article listing, individual article pages, author profiles, categories, and search. Use clean typography and excellent readability.',
    },
  }

  if (category && templates[category as keyof typeof templates]) {
    return NextResponse.json(templates[category as keyof typeof templates])
  }

  return NextResponse.json(Object.values(templates))
}