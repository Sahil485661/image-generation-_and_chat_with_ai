"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Sparkles, Home } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error:", response.status, errorText)
        throw new Error(`API Error: ${response.status} - ${errorText}`)
      }

      if (!response.body) {
        throw new Error("No response body received")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      }

      setMessages((prev) => [...prev, assistantMessage])

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })

          // For text stream, we just append the chunk directly
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, content: msg.content + chunk } : msg)),
          )
        }
      } finally {
        reader.releaseLock()
      }
    } catch (error) {
      console.error("Chat Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = (exampleText: string) => {
    setInput(exampleText)
  }

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
              <Link href="/generate">Generate Images</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-purple-600" />
              <span>Chat with Gemini AI</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full p-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <Bot className="h-16 w-16 text-purple-600 opacity-50" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Start a conversation</h3>
                    <p className="text-gray-500 max-w-md">
                      Ask me anything! I'm powered by Google Gemini and ready to help with questions, creative tasks,
                      problem-solving, and more.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 w-full max-w-2xl">
                    <Button
                      variant="outline"
                      className="h-auto p-4 text-left justify-start bg-transparent"
                      onClick={() => handleExampleClick("Explain quantum computing in simple terms")}
                    >
                      <div>
                        <div className="font-medium">Explain quantum computing</div>
                        <div className="text-sm text-gray-500">in simple terms</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 text-left justify-start bg-transparent"
                      onClick={() => handleExampleClick("Write a creative story about a robot learning to paint")}
                    >
                      <div>
                        <div className="font-medium">Write a creative story</div>
                        <div className="text-sm text-gray-500">about a robot learning to paint</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 text-left justify-start bg-transparent"
                      onClick={() => handleExampleClick("Help me plan a healthy meal prep for the week")}
                    >
                      <div>
                        <div className="font-medium">Plan healthy meal prep</div>
                        <div className="text-sm text-gray-500">for the week</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 text-left justify-start bg-transparent"
                      onClick={() => handleExampleClick("Explain the latest developments in AI technology")}
                    >
                      <div>
                        <div className="font-medium">Latest AI developments</div>
                        <div className="text-sm text-gray-500">and technology trends</div>
                      </div>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <Avatar className={`${message.role === "user" ? "bg-purple-600" : "bg-blue-600"}`}>
                        <AvatarFallback className="text-white">
                          {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`flex-1 rounded-lg p-4 ${
                          message.role === "user" ? "bg-purple-600 text-white ml-12" : "bg-gray-100 text-gray-900 mr-12"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start space-x-3">
                      <Avatar className="bg-blue-600">
                        <AvatarFallback className="text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 rounded-lg p-4 bg-gray-100 text-gray-900 mr-12">
                        <div className="flex items-center space-x-2">
                          <div className="animate-pulse">Thinking...</div>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>
          </CardContent>

          <div className="border-t p-6">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
