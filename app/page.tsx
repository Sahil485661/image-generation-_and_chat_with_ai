import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, ImageIcon, Sparkles, Zap, Users, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Studio
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/chat" className="text-gray-600 hover:text-purple-600 transition-colors">
              Chat
            </Link>
            <Link href="/generate" className="text-gray-600 hover:text-purple-600 transition-colors">
              Generate
            </Link>
            <Button asChild>
              <Link href="/chat">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
            Create & Chat with AI
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Unleash your creativity with our powerful AI tools. Generate stunning images and have intelligent
            conversations powered by Google Gemini.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/chat">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chatting
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/generate">
                <ImageIcon className="mr-2 h-5 w-5" />
                Generate Images
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Powerful AI Features</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the future of AI with our cutting-edge tools designed for creators, developers, and innovators.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <MessageCircle className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Intelligent Chat</CardTitle>
              <CardDescription>
                Have natural conversations with Google Gemini AI. Get answers, brainstorm ideas, and solve problems.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <ImageIcon className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>AI Image Generation</CardTitle>
              <CardDescription>
                Create stunning, unique images from text descriptions using advanced AI models.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Zap className="h-12 w-12 text-teal-600 mb-4" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Get instant responses and generate images in seconds with our optimized AI infrastructure.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>User Friendly</CardTitle>
              <CardDescription>
                Intuitive interface designed for everyone, from beginners to AI experts.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>Secure & Private</CardTitle>
              <CardDescription>
                Your data is protected with enterprise-grade security and privacy measures.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Sparkles className="h-12 w-12 text-pink-600 mb-4" />
              <CardTitle>Creative Tools</CardTitle>
              <CardDescription>
                Unlock your creativity with AI-powered tools for content creation and ideation.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90">Join thousands of users creating amazing content with AI</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/chat">Start Chatting Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              <Link href="/generate">Generate Your First Image</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="h-6 w-6 text-purple-400" />
              <span className="text-xl font-bold">AI Studio</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/chat" className="hover:text-purple-400 transition-colors">
                Chat
              </Link>
              <Link href="/generate" className="hover:text-purple-400 transition-colors">
                Generate
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Studio. Powered by Google Gemini & Fal AI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
