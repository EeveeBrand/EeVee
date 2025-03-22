"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="/placeholder.svg?height=1080&width=1920&text=About+Us"
          alt="About Us Hero"
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
              OUR STORY
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Crafting premium streetwear for the fashion-forward since 2020
            </motion.p>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="container py-20" ref={containerRef}>
        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-12 items-center mb-32">
            <motion.div className="flex-1" style={{ y: y1 }}>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/placeholder.svg?height=800&width=800&text=Our+Story"
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-editorial tracking-wider mb-6">THE BEGINNING</h2>
              <div className="space-y-4 text-lg">
                <p>
                  EeVee was born from a vision to create streetwear that blends premium quality with forward-thinking
                  design. Founded in 2020 by a collective of designers and fashion enthusiasts, we set out to challenge
                  the conventions of traditional streetwear.
                </p>
                <p>
                  Our journey began in a small studio in downtown Los Angeles, where we experimented with fabrics, cuts,
                  and innovative techniques to create pieces that stand out in both quality and aesthetic.
                </p>
                <p>
                  What started as a passion project quickly evolved into a movement, attracting a community of
                  individuals who share our appreciation for exceptional craftsmanship and distinctive style.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center mb-32">
            <motion.div className="flex-1" style={{ y: y2 }}>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/placeholder.svg?height=800&width=800&text=Our+Mission"
                  alt="Our Mission"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-editorial tracking-wider mb-6">OUR MISSION</h2>
              <div className="space-y-4 text-lg">
                <p>
                  At EeVee, we believe that clothing is more than just fabric—it's a form of self-expression, a
                  statement of identity, and a reflection of culture.
                </p>
                <p>
                  Our mission is to create premium streetwear that empowers individuals to express their unique style
                  while maintaining the highest standards of quality and sustainability.
                </p>
                <p>
                  We're committed to pushing boundaries, challenging norms, and continuously evolving our craft to
                  deliver exceptional pieces that stand the test of time.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Values Section */}
        <ScrollReveal>
          <div className="mb-32">
            <h2 className="text-3xl md:text-4xl font-editorial tracking-wider mb-12 text-center">OUR VALUES</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4 text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium">Quality</h3>
                <p className="text-muted-foreground">
                  We're obsessed with quality, from the fabrics we source to the finishing touches on each piece. Every
                  item is crafted to last and designed to impress.
                </p>
              </div>

              <div className="space-y-4 text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-lightbulb"
                  >
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium">Innovation</h3>
                <p className="text-muted-foreground">
                  We constantly push the boundaries of design and technology, exploring new techniques and materials to
                  create unique, forward-thinking pieces.
                </p>
              </div>

              <div className="space-y-4 text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-leaf"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to responsible production practices, minimizing our environmental impact while
                  maximizing the longevity and quality of our products.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Team Section */}
        <ScrollReveal>
          <div className="mb-32">
            <h2 className="text-3xl md:text-4xl font-editorial tracking-wider mb-12 text-center">THE TEAM</h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="text-center">
                  <div className="relative aspect-square overflow-hidden mb-4">
                    <Image
                      src={`/placeholder.svg?height=400&width=400&text=Team+Member+${index + 1}`}
                      alt={`Team member ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-medium">
                    {["Alex Morgan", "Jamie Chen", "Taylor Kim", "Jordan Smith"][index]}
                  </h3>
                  <p className="text-muted-foreground">
                    {
                      ["Founder & Creative Director", "Head of Design", "Production Manager", "Marketing Director"][
                        index
                      ]
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Join Us CTA */}
        <ScrollReveal>
          <div className="bg-primary text-primary-foreground p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-editorial tracking-wider mb-6">JOIN THE MOVEMENT</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Be part of our journey as we continue to redefine streetwear and push the boundaries of fashion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button variant="secondary" size="lg" className="rounded-none">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="rounded-none text-white border-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

