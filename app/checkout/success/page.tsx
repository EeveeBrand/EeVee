"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function CheckoutSuccessPage() {
  // Generate a random order number
  const orderNumber = `EV-${Math.floor(100000 + Math.random() * 900000)}`

  // Simulate confetti effect
  useEffect(() => {
    const confetti = () => {
      // This would be a real confetti effect in a production app
      console.log("Confetti effect triggered")
    }

    confetti()
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="container max-w-2xl">
        <ScrollReveal>
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mx-auto"
            >
              <CheckCircle className="h-20 w-20 text-primary mx-auto" />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-editorial tracking-wider">ORDER CONFIRMED</h1>

            <p className="text-muted-foreground max-w-md mx-auto">
              Thank you for your purchase! Your order has been confirmed and will be shipped shortly.
            </p>

            <div className="bg-muted/30 p-6 rounded-md">
              <h2 className="text-xl font-medium mb-4">Order Details</h2>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Number:</span>
                  <span className="font-medium">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>A confirmation email has been sent</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/products">
                <Button className="rounded-none">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/account">
                <Button variant="outline" className="rounded-none">
                  View Order History
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

