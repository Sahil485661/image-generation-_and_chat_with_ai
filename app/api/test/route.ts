export async function GET() {
  return Response.json({
    message: "API is working",
    timestamp: new Date().toISOString(),
    env: {
      hasGoogleKey: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      nodeEnv: process.env.NODE_ENV,
    },
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    return Response.json({
      message: "POST request received",
      receivedData: body,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return Response.json(
      {
        error: "Failed to parse JSON",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    )
  }
}
