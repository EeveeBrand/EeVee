"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function LookbookPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])

  const lookbookSections = [
    {
      title: "URBAN AESTHETICS",
      description: "Spring 2025 Collection",
      image: "/placeholder.svg?height=800&width=600&text=Urban+Aesthetics",
      link: "/products?collection=urban-aesthetics",
    },
    {
      title: "DIGITAL NOMAD",
      description: "Summer 2025 Collection",
      image: "/placeholder.svg?height=800&width=600&text=Digital+Nomad",
      link: "/products?collection=digital-nomad",
    },
    {
      title: "NEON DREAMS",
      description: "Fall 2025 Collection",
      image: "/placeholder.svg?height=800&width=600&text=Neon+Dreams",
      link: "/products?collection=neon-dreams",
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src="/placeholder.svg?height=1080&width=1920&text=Lookbook"
          alt="Lookbook Hero"
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
              THE LOOKBOOK
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore our latest collections through the lens of urban aesthetics and digital innovation
            </motion.p>
          </div>
        </div>
      </div>

      {/* Lookbook Content */}
      <div className="container py-20" ref={containerRef}>
        {lookbookSections.map((section, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <div className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 mb-32`}>
              <motion.div className="flex-1" style={{ y: index % 2 === 0 ? y1 : y2 }}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={section.image || "/placeholder.svg"} alt={section.title} fill className="object-cover" />
                </div>
              </motion.div>

              <div className="flex-1 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-5xl font-editorial tracking-wider mb-4">{section.title}</h2>
                  <p className="text-muted-foreground mb-8 max-w-md">{section.description}</p>
                  <Link href={section.link}>
                    <Button className="rounded-none group relative overflow-hidden">
                      <span className="relative z-10">EXPLORE COLLECTION</span>
                      <motion.span
                        className="absolute inset-0 bg-white z-0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                      <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:text-primary transition-colors" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        ))}

        {/* Editorial Grid */}
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-editorial tracking-wider mb-12 text-center">EDITORIAL SHOTS</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                className={`relative ${index % 3 === 0 ? "md:col-span-2 md:row-span-2" : ""} aspect-square overflow-hidden`}
                style={{ y: index % 2 === 0 ? y3 : y2 }}
              >
                <Image
                  src={`/placeholder.svg?height=600&width=600&text=Editorial+${index + 1}`}
                  alt={`Editorial image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Behind the Scenes */}
        <ScrollReveal>
          <div className="mt-32 text-center">
            <h2 className="text-3xl md:text-5xl font-editorial tracking-wider mb-6">BEHIND THE SCENES</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              Get a glimpse into our creative process and the making of our latest collections
            </p>

            <div className="aspect-video relative overflow-hidden rounded-md">
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                <Button size="lg" className="rounded-full h-16 w-16 text-xl">
                  ▶
                </Button>
              </div>
              <Image
                src="/placeholder.svg?height=720&width=1280&text=Behind+The+Scenes+Video"
                alt="Behind the scenes video"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

