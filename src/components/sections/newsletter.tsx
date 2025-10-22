"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubscribed(true)
    setIsLoading(false)
    setEmail("")
  }

  if (isSubscribed) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-secondary mx-auto" />
            <h3 className="text-2xl font-bold">Thank you for subscribing!</h3>
            <p className="text-muted-foreground">You'll receive our latest updates and exclusive offers.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Mail className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-2xl sm:text-3xl font-bold text-balance">Stay in the Loop</h3>
            <p className="text-muted-foreground text-pretty">
              Subscribe to our newsletter for exclusive deals, new arrivals, and style tips.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" disabled={isLoading} className="sm:w-auto">
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
