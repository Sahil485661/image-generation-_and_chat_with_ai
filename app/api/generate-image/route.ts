import { type NextRequest, NextResponse } from "next/server"
import { generateAdvancedAIVisualization } from "./utils"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    console.log("=== RUNWARE IMAGE GENERATION ===")
    console.log("Prompt received:", prompt)

    const runwareApiKey = "ypCfmZ3IwpVe2P7uOuxDCnwQVYyTOVGH"
    console.log("Using provided API key")

    try {
      console.log("Attempting Runware API generation...")

      const requestBody = {
        taskType: "imageInference",
        taskUUID: uuidv4(),
        positivePrompt: prompt,
        model: "runware:100@1",
        numberResults: 1,
        height: 1024,
        width: 1024,
        steps: 20,
        CFGScale: 7,
        seed: Math.floor(Math.random() * 1000000),
        outputFormat: "JPG",
      }

      console.log("Request body:", JSON.stringify(requestBody, null, 2))

      const response = await fetch("https://api.runware.ai/v1", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${runwareApiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify([requestBody]),
      })

      console.log("Runware response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.log("❌ Runware API error:", response.status, errorText)
        throw new Error(`Runware API failed: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      console.log("✅ Runware API response:", JSON.stringify(data, null, 2))

      if (data && Array.isArray(data) && data.length > 0) {
        const result = data[0]
        console.log("First result object:", JSON.stringify(result, null, 2))

        // Check multiple possible field names for the image URL
        const imageUrl =
          result.imageURL ||
          result.imageUrl ||
          result.image_url ||
          result.url ||
          result.outputURL ||
          result.outputUrl ||
          result.data?.imageURL ||
          result.data?.imageUrl

        if (imageUrl) {
          console.log("✅ Found image URL:", imageUrl)
          return NextResponse.json({
            success: true,
            imageUrl: imageUrl,
            provider: "Runware AI",
            originalPrompt: prompt,
            style: "Runware AI generation",
            taskUUID: result.taskUUID || result.taskId || result.id,
          })
        } else {
          console.log("❌ No image URL found in result. Available fields:", Object.keys(result))
        }
      } else if (data && data.data && Array.isArray(data.data)) {
        console.log("Checking nested data array...")
        const result = data.data[0]
        if (result) {
          console.log("Nested result object:", JSON.stringify(result, null, 2))
          const imageUrl =
            result.imageURL || result.imageUrl || result.image_url || result.url || result.outputURL || result.outputUrl

          if (imageUrl) {
            console.log("✅ Found image URL in nested data:", imageUrl)
            return NextResponse.json({
              success: true,
              imageUrl: imageUrl,
              provider: "Runware AI",
              originalPrompt: prompt,
              style: "Runware AI generation",
              taskUUID: result.taskUUID || result.taskId || result.id,
            })
          }
        }
      }

      console.log("❌ No valid image URL found in any expected location")
      console.log("Full response structure:", JSON.stringify(data, null, 2))
      throw new Error("No image URL returned from Runware")
    } catch (runwareError) {
      console.error("❌ Runware generation error:", runwareError)
    }

    console.log("🎨 Using AI visualization fallback")
    const advancedVisualization = generateAdvancedAIVisualization(prompt)

    return NextResponse.json({
      success: true,
      imageUrl: advancedVisualization.imageUrl,
      provider: "AI Vision Generator (Fallback)",
      isPlaceholder: false,
      isAIVisualization: true,
      fallbackReason: "Runware API unavailable",
      style: "Advanced artistic visualization",
      debug: {
        message: "Using fallback AI visualization",
        promptAnalysis: advancedVisualization.analysis,
        visualElements: advancedVisualization.elements,
        originalPrompt: prompt,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("❌ Image generation error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate image",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
