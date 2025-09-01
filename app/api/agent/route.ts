import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userMessage, context } = await req.json();

    // Ejemplo: puedes inyectar contexto de tu sistema (usuarios, procesos, etc.)
    const systemPrompt = `
      Eres un agente AI que ayuda a gestionar consultas del sistema.
      - Usa la información del contexto cuando esté disponible.
      - Si algo requiere acción (ej: consultar BD, llamar API interna),
        indícalo claramente en tu respuesta con un formato JSON.
    `;

    // Construir mensajes con tipado estricto para evitar ensanchamiento de literales
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: String(userMessage) },
    ];
    if (context) {
      messages.push({
        role: "system",
        content: `Context: ${JSON.stringify(context)}`,
      });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // AI model to use
      messages,
    });

    return NextResponse.json({
      reply: response.choices[0].message?.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al procesar la consulta" }, { status: 500 });
  }
}
