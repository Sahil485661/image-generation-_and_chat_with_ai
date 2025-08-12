"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Sparkles, Home, Download, Wand2, ImageIcon, Loader2, CheckCircle, Zap, Bot, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface GenerationResult {
  imageUrl: string
  provider?: string
  isPlaceholder?: boolean
  isAIVisualization?: boolean
  revisedPrompt?: string
  fallbackReason?: string
  debug?: any
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<GenerationResult | null>(null)
  const [success, setSuccess] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setSuccess(false)

    try {
      console.log("Sending generation request with prompt:", prompt)

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()
      console.log("Received response:", data)

      if (!response.ok) {
        console.error("API request failed:", response.status, data)
        return
      }

      if (!data.imageUrl) {
        console.error("No imageUrl in response:", data)
        return
      }

      console.log(`Successfully received image from ${data.provider || "unknown provider"}`)
      setGeneratedImage(data)
      setSuccess(true)
    } catch (err) {
      console.error("Generation error:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async () => {
    if (generatedImage?.imageUrl) {
      try {
        const link = document.createElement("a")
        link.href = generatedImage.imageUrl
        const extension = generatedImage.provider === "openai-dalle3" ? "png" : "svg"
        const filename = `ai-image-${Date.now()}.${extension}`
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error("Download failed:", error)
      }
    }
  }

  const examplePrompts = [
    "A futuristic cyberpunk city at night with neon lights, flying cars, and holographic advertisements, ultra detailed, 8K",
    "A magical enchanted forest with glowing mushrooms, fairy lights, and mystical creatures, fantasy art style, vibrant colors",
    "A steampunk mechanical dragon with brass gears and copper wings, Victorian era background, detailed metalwork",
    "An underwater coral city with bioluminescent plants, tropical fish, and ancient ruins, photorealistic, cinematic lighting",
    "A space station orbiting Saturn with detailed rings, stars in background, sci-fi concept art, high resolution",
    "A cozy mountain cabin in winter with snow, warm lights in windows, smoke from chimney, peaceful atmosphere",
    "A portrait of a wise wizard with long beard, magical staff, flowing robes, fantasy character art, detailed",
    "A modern minimalist living room with natural lighting, plants, clean lines, architectural photography style",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Studio
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/chat">Chat with AI</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Image Generator
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create stunning images with OpenAI's DALL-E 3 or our advanced AI visualization system. Get
            professional-quality results with intelligent fallback for maximum reliability.
          </p>
        </div>

        <Alert className="mb-8 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <Bot className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-800">
            <div className="space-y-2">
              <div>
                <strong>OpenAI DALL-E 3 Integration:</strong> Primary generation with OpenAI's most advanced image
                model, with intelligent fallback to our sophisticated visualization system for 100% reliability.
              </div>
              <p className="text-sm">
                🤖 DALL-E 3 Primary • 🎨 AI Visualization Fallback • 🌈 Smart Theming • ✨ Professional Quality • 💎
                Always Delivers
              </p>
            </div>
          </AlertDescription>
        </Alert>

        {/* Success Alert */}
        {success && (
          <Alert
            className={`mb-8 ${generatedImage?.provider === "openai-dalle3" ? "border-green-200 bg-green-50" : generatedImage?.fallbackReason ? "border-yellow-200 bg-yellow-50" : "border-green-200 bg-green-50"}`}
          >
            {generatedImage?.provider === "openai-dalle3" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : generatedImage?.fallbackReason ? (
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
            <AlertDescription
              className={
                generatedImage?.provider === "openai-dalle3"
                  ? "text-green-800"
                  : generatedImage?.fallbackReason
                    ? "text-yellow-800"
                    : "text-green-800"
              }
            >
              <div className="space-y-2">
                {generatedImage?.provider === "openai-dalle3" ? (
                  <div>
                    <strong>✨ Generated with OpenAI DALL-E 3!</strong> Your image has been created using OpenAI's most
                    advanced image generation model.
                    {generatedImage.revisedPrompt && (
                      <div className="mt-2 text-sm">
                        <strong>Enhanced Prompt:</strong> {generatedImage.revisedPrompt}
                      </div>
                    )}
                  </div>
                ) : generatedImage?.fallbackReason ? (
                  <div>
                    <strong>🎨 AI Visualization Generated!</strong> Used our advanced visualization system due to:{" "}
                    {generatedImage.fallbackReason}
                  </div>
                ) : (
                  <div>
                    <strong>🎨 AI Visualization Complete!</strong> Your prompt has been analyzed and transformed into a
                    sophisticated visual concept.
                  </div>
                )}
                <div className="text-xs space-x-4">
                  {generatedImage?.provider && <span>Provider: {generatedImage.provider}</span>}
                  {generatedImage?.debug?.promptAnalysis && (
                    <details className="inline">
                      <summary className="cursor-pointer">Analysis Details</summary>
                      <pre className="mt-1 text-xs bg-opacity-20 bg-black p-2 rounded">
                        {JSON.stringify(generatedImage.debug.promptAnalysis, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wand2 className="h-6 w-6 text-purple-600" />
                <span>Create Your Image</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="prompt" className="text-sm font-medium text-gray-700">
                  Describe your image
                </Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A beautiful landscape with mountains and a lake at sunrise, photorealistic, high quality, 8K, detailed..."
                  className="min-h-[120px] mt-2"
                  disabled={isGenerating}
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 Be specific and detailed for best DALL-E 3 results. Include style keywords like "cyberpunk",
                  "fantasy", "cosmic" for themed fallback visualizations.
                </p>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating with AI...
                  </>
                ) : (
                  <>
                    <Bot className="mr-2 h-4 w-4" />
                    Generate Image
                  </>
                )}
              </Button>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Try these example prompts:</h3>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((example, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors text-xs"
                      onClick={() => setPrompt(example)}
                    >
                      {example.length > 60 ? `${example.substring(0, 60)}...` : example}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Result Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-6 w-6 text-blue-600" />
                  <span>Generated Image</span>
                </div>
                {generatedImage && (
                  <Button onClick={handleDownload} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {isGenerating ? (
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">Generating your image...</p>
                    <p className="text-sm text-gray-500 mt-2">Trying OpenAI DALL-E 3 first</p>
                  </div>
                ) : generatedImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={generatedImage.imageUrl || "/placeholder.svg"}
                      alt="AI Generated image"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-black bg-opacity-50 text-white text-xs p-2 rounded backdrop-blur-sm">
                        {generatedImage.provider === "openai-dalle3" ? "🤖 OpenAI DALL-E 3" : "🎨 AI Visualization"} •
                        Professional Quality
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <Bot className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Your generated image will appear here</p>
                    <p className="text-sm mt-2">Enter a prompt to create with OpenAI DALL-E 3</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🤖 Dual AI Image Generation System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">🤖 OpenAI DALL-E 3 Primary</h4>
                <p className="text-gray-600">
                  Uses OpenAI's most advanced image generation model for photorealistic, artistic, and creative images
                  with enhanced prompt understanding.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">🎨 Intelligent Fallback</h4>
                <p className="text-gray-600">
                  Advanced AI visualization system with theme detection, smart color schemes, and professional SVG
                  output when primary fails.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">✨ 100% Reliability</h4>
                <p className="text-gray-600">
                  Never fails to deliver results. Primary system for best quality, fallback system ensures you always
                  get something beautiful.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">🔍 Enhanced Prompts</h4>
                <p className="text-gray-600">
                  DALL-E 3 often enhances your prompts for better results, while our fallback analyzes themes and
                  keywords for perfect styling.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">🎯 Multiple Formats</h4>
                <p className="text-gray-600">
                  DALL-E 3 generates PNG images, while our visualization system creates scalable SVG files perfect for
                  any use case.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">💎 Professional Quality</h4>
                <p className="text-gray-600">
                  Both systems deliver professional-grade results - photorealistic images from DALL-E 3 or sophisticated
                  themed visualizations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-800 font-medium flex items-center">
                  <Bot className="h-4 w-4 mr-2" />
                  OpenAI DALL-E 3 + AI Visualization System
                </p>
                <p className="text-purple-600 text-sm">
                  Best-in-class generation • Intelligent fallback • Always available • Professional quality
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <span className="text-purple-800 font-semibold">Dual AI Power</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
