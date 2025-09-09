import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { z } from 'zod'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const regenerateSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  section: z.string().min(1, 'Section is required'),
  prompt: z.string().min(1, 'Prompt is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, section, prompt } = regenerateSchema.parse(body)

    const systemPrompt = `You are an expert web developer and designer. You will receive HTML/CSS/JS code and need to improve or regenerate a specific section based on the user's request.

IMPORTANT RULES:
1. Return ONLY the complete HTML file with all improvements
2. Maintain the overall structure and functionality
3. Ensure the code is clean, modern, and responsive
4. Use modern CSS best practices
5. Include proper semantic HTML
6. Ensure cross-browser compatibility
7. Add smooth animations and transitions where appropriate
8. Focus specifically on improving the "${section}" section as requested

The user wants to: ${prompt}

Please analyze the existing code and regenerate it with the requested improvements, focusing on the ${section} section while maintaining the overall design consistency.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Here's the current website code that needs the ${section} section improved:\n\n${code}\n\nPlease regenerate the complete HTML with the ${section} section improved based on this request: ${prompt}`,
        },
      ],
      max_tokens: 4000,
      temperature: 0.7,
    })

    const generatedCode = completion.choices[0]?.message?.content

    if (!generatedCode) {
      return NextResponse.json(
        { error: 'Failed to generate code' },
        { status: 500 }
      )
    }

    // Clean the generated code (remove markdown formatting if present)
    const cleanedCode = generatedCode
      .replace(/^```html\n/gm, '')
      .replace(/^```\n/gm, '')
      .replace(/```$/gm, '')
      .trim()

    return NextResponse.json({
      code: cleanedCode,
      message: `${section} section regenerated successfully`,
    })
  } catch (error) {
    console.error('Error in regenerate API:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}