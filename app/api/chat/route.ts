import { google } from "@ai-sdk/google"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 })
    }

    const result = streamText({
      model: google("gemini-1.5-flash"),
      messages,
      system: `You are a helpful AI assistant powered by Google Gemini. You are knowledgeable, creative, and friendly. 
      Help users with their questions, provide detailed explanations, assist with creative tasks, and engage in meaningful conversations.
      Always be respectful and provide accurate information to the best of your ability.`,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}

