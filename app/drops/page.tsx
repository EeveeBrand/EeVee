"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import CountdownTimer from "@/components/countdown-timer"
import { useToast } from "@/components/ui/use-toast"

// Sample drops data
const upcomingDrops = [
  {
    id: 1,
    name: "Chrome Series",
    description: "Futuristic designs with reflective elements",
    date: new Date("2025-04-15T00:00:00"),
    image: "/placeholder.svg?height=800&width=600&text=Chrome+Series",
    status: "upcoming",
  },
  {
    id: 2,
    name: "Neon Nights",
    description: "Glow-in-the-dark streetwear essentials",
    date: new Date("2025-05-20T00:00:00"),
    image: "/placeholder.svg?height=800&width=600&text=Neon+Nights",
    status: "upcoming",
  },
]

const pastDrops = [
  {
    id: 3,
    name: "Urban Flux",
    description: "City-inspired oversized collection",
    date: new Date("2025-01-10T00:00:00"),
    image: "/placeholder.svg?height=800&width=600&text=Urban+Flux",
    status: "sold out",
  },
  {
    id: 4,
    name: "Digital Nomad",
    description: "Tech-integrated apparel for the modern traveler",
    date: new Date("2024-11-05T00:00:00"),
    image: "/placeholder.svg?height=800&width=600&text=Digital+Nomad",
    status: "sold out",
  },
  {
    id: 5,
    name: "Midnight Haze",
    description: "Dark monochrome essentials with a twist",
    date: new Date("2024-09-15T00:00:00"),
    image: "/placeholder.svg?height=800&width=600&text=Midnight+Haze",
    status: "sold out",
  },
]

export default function DropsPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [subscribedDrops, setSubscribedDrops] = useState<number[]>([])

  const handleSubscribe = (dropId: number, e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setSubscribedDrops((prev) => [...prev, dropId])
    toast({
      title: "Notification set",
      description: "You'll be notified when this drop goes live",
    })
    setEmail("")
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="/placeholder.svg?height=1080&width=1920&text=Limited+Drops"
          alt="Limited Drops Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-editorial tracking-wider mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              LIMITED DROPS
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Exclusive, limited-edition releases available for a short time only
            </motion.p>
          </div>
        </div>
      </div>

      {/* Upcoming Drops */}
      <div className="container py-20">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-editorial tracking-wider mb-12">UPCOMING DROPS</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingDrops.map((drop, index) => (
              <ScrollReveal key={drop.id} delay={index * 0.1}>
                <div className="border p-6 space-y-6 group hover:border-primary transition-colors">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={drop.image || "/placeholder.svg"}
                      alt={drop.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">COMING SOON</Badge>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-2">{drop.name}</h3>
                    <p className="text-muted-foreground mb-4">{drop.description}</p>

                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground mb-2">Dropping in:</p>
                      <CountdownTimer targetDate={drop.date} />
                    </div>

                    <form onSubmit={(e) => handleSubscribe(drop.id, e)} className="space-y-4">
                      <p className="text-sm">Get notified when this drop goes live:</p>
                      <div className="flex space-x-2">
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={subscribedDrops.includes(drop.id)}
                          className="rounded-none"
                        />
                        <Button type="submit" className="rounded-none" disabled={subscribedDrops.includes(drop.id)}>
                          {subscribedDrops.includes(drop.id) ? (
                            <>
                              <Bell className="mr-2 h-4 w-4" />
                              Notified
                            </>
                          ) : (
                            "Notify Me"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* How It Works */}
        <ScrollReveal>
          <div className="mt-32 text-center">
            <h2 className="text-3xl md:text-4xl font-editorial tracking-wider mb-8">HOW LIMITED DROPS WORK</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our limited drops are exclusive collections released in small quantities for a short time only. Here's how
              to make sure you don't miss out.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                  1
                </div>
                <h3 className="text-xl font-medium">Subscribe</h3>
                <p className="text-muted-foreground">
                  Sign up for notifications to be alerted when new drops are announced and when they go live.
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                  2
                </div>
                <h3 className="text-xl font-medium">Be Ready</h3>
                <p className="text-muted-foreground">
                  Mark your calendar and set reminders. Limited drops sell out quickly, so be online when they launch.
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                  3
                </div>
                <h3 className="text-xl font-medium">Shop Fast</h3>
                <p className="text-muted-foreground">
                  Once a drop is live, add your favorite items to cart quickly and check out to secure your pieces.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Past Drops */}
        <ScrollReveal>
          <div className="mt-32">
            <h2 className="text-3xl md:text-4xl font-editorial tracking-wider mb-12">PAST DROPS</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {pastDrops.map((drop, index) => (
                <ScrollReveal key={drop.id} delay={index * 0.1}>
                  <div className="group">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={drop.image || "/placeholder.svg"}
                        alt={drop.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[30%]"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Badge className="bg-white/80 text-black text-lg px-4 py-2">SOLD OUT</Badge>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-xl font-medium">{drop.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        Released on{" "}
                        {drop.date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Newsletter Section */}
        <ScrollReveal>
          <div className="mt-32 bg-primary text-primary-foreground p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-editorial tracking-wider mb-4">NEVER MISS A DROP</h2>
              <p className="text-primary-foreground/80 mb-8">
                Subscribe to our newsletter to get early access to all drops and exclusive offers.
              </p>

              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Your email address"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 rounded-none"
                />
                <Button variant="secondary" className="rounded-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

