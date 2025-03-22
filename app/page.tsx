"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight, ShoppingBag } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProductCard from "@/components/product-card"
import CountdownTimer from "@/components/countdown-timer"
import ParallaxText from "@/components/parallax-text"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const featuredProducts = [
  {
    id: 1,
    name: "Neon Dreams Tee",
    price: 89.99,
    image: "/placeholder.svg?height=600&width=400",
    badge: "New",
  },
  {
    id: 2,
    name: "Urban Flux Oversized",
    price: 99.99,
    image: "/placeholder.svg?height=600&width=400",
    badge: "Bestseller",
  },
  {
    id: 3,
    name: "Midnight Haze Tee",
    price: 79.99,
    image: "/placeholder.svg?height=600&width=400",
  },
  {
    id: 4,
    name: "Digital Nomad Tee",
    price: 89.99,
    image: "/placeholder.svg?height=600&width=400",
    badge: "Limited",
  },
]

const categories = [
  { name: "Tees", count: 24 },
  { name: "Hoodies", count: 16 },
  { name: "Accessories", count: 12 },
  { name: "Limited Editions", count: 8 },
]

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const position = useTransform(scrollYProgress, (pos) => {
    return `${pos * 50}% 50%`
  })

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const heroSlides = [
    {
      title: "FUTURE FORWARD",
      subtitle: "Exclusive, limited-edition streetwear for the fashion-forward",
      image: "/placeholder.svg?height=1080&width=1920",
    },
    {
      title: "URBAN AESTHETICS",
      subtitle: "Bold designs that redefine contemporary streetwear",
      image: "/placeholder.svg?height=1080&width=1920",
    },
    {
      title: "DIGITAL NOMAD",
      subtitle: "Where technology meets fashion in perfect harmony",
      image: "/placeholder.svg?height=1080&width=1920",
    },
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <motion.div
        ref={targetRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        <AnimatePresence mode="wait">
          {heroSlides.map(
            (slide, index) =>
              activeSlide === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: `calc(50% + ${mousePosition.x * 20}px) calc(50% + ${mousePosition.y * 20}px)`,
                  }}
                />
              ),
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />

        <div className="container relative z-20 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-4"
              >
                <Badge
                  className="bg-primary/80 backdrop-blur-sm text-primary-foreground px-4 py-1 text-sm tracking-wider"
                  variant="outline"
                >
                  SS25 COLLECTION
                </Badge>
              </motion.div>

              <h1 className="font-editorial text-5xl md:text-7xl lg:text-8xl tracking-wider text-white mb-6 relative">
                <span className="relative inline-block">
                  {heroSlides[activeSlide].title.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.05 * i }}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </span>
              </h1>

              <motion.p
                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {heroSlides[activeSlide].subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button size="lg" className="rounded-none group relative overflow-hidden">
                  <span className="relative z-10">SHOP THE COLLECTION</span>
                  <motion.span
                    className="absolute inset-0 bg-white z-0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:text-primary transition-colors" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none text-white border-white/60 hover:bg-white/10"
                >
                  EXPLORE LOOKBOOK
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={cn("w-12 h-1 transition-all duration-300", activeSlide === index ? "bg-white" : "bg-white/30")}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-8 z-20 hidden md:flex items-center text-white/80 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="h-16 w-px bg-white/40 mr-4"
          />
          <span className="tracking-wider rotate-90 origin-left translate-y-1/4">SCROLL</span>
        </motion.div>
      </motion.div>

      {/* Marquee Text */}
      <div className="bg-primary py-3 overflow-hidden">
        <ParallaxText baseVelocity={-3}>
          PREMIUM STREETWEAR • EXCLUSIVE DESIGNS • LIMITED EDITIONS • PREMIUM STREETWEAR • EXCLUSIVE DESIGNS • LIMITED
          EDITIONS
        </ParallaxText>
      </div>

      {/* Featured Collection */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-background to-transparent pointer-events-none" />

        <div className="container">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div>
                <h2 className="font-editorial text-3xl md:text-5xl tracking-wide mb-3 relative inline-block">
                  FEATURED COLLECTION
                  <motion.span
                    className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Explore our latest designs that blend streetwear aesthetics with premium craftsmanship.
                </p>
              </div>
              <Link
                href="/products"
                className="group flex items-center mt-4 md:mt-0 text-primary hover:text-primary/80 transition-colors"
              >
                <span className="relative">
                  View All
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </span>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </motion.div>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.1}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <Link
                  key={category.name}
                  href={`/products?category=${category.name.toLowerCase()}`}
                  className="group relative overflow-hidden"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=400&width=400&text=${category.name}`}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                      <h3 className="font-editorial text-xl md:text-2xl tracking-wider mb-1">{category.name}</h3>
                      <p className="text-sm text-white/80">{category.count} products</p>
                      <motion.div
                        className="mt-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ArrowRight className="h-4 w-4 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Video Section */}
      <ScrollReveal>
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-with-a-cold-and-serious-look-39880-large.mp4"
              type="video/mp4"
            />
          </video>

          <div className="container relative z-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-editorial text-4xl md:text-6xl text-white mb-6">CRAFTED FOR THE BOLD</h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Our designs are for those who dare to stand out. Premium materials, exceptional craftsmanship, and
                uncompromising style.
              </p>
              <Button size="lg" variant="outline" className="rounded-none text-white border-white hover:bg-white/10">
                OUR STORY
              </Button>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Limited Drop Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <ScrollReveal>
              <div>
                <Badge className="bg-primary text-primary-foreground px-4 py-1 mb-6">EXCLUSIVE</Badge>
                <h2 className="font-editorial text-3xl md:text-5xl tracking-wide mb-6">LIMITED DROP INCOMING</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Our most exclusive collection yet. Limited quantities, available for a short time only.
                </p>
                <CountdownTimer targetDate={new Date("2025-04-15T00:00:00")} />

                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Input placeholder="Your email address" className="rounded-none" />
                    <Button className="rounded-none">Get Notified</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Be the first to know when our limited drop goes live. No spam, just exclusive updates.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="Limited Drop Preview"
                    width={600}
                    height={800}
                    className="object-cover w-full"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2">COMING SOON</div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div>
                      <h3 className="text-white text-2xl font-editorial mb-2">CHROME SERIES</h3>
                      <p className="text-white/80">Futuristic designs with reflective elements</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <ScrollReveal>
            <h2 className="font-editorial text-3xl md:text-5xl tracking-wide mb-4 text-center">THE LOOKBOOK</h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
              Explore our latest collection through the lens of urban aesthetics and digital innovation.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {[1, 2, 3].map((item, index) => (
              <ScrollReveal key={item} delay={index * 0.1}>
                <Card className="bg-muted/30 border-0 overflow-hidden group">
                  <CardContent className="p-0 relative">
                    <div className="overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=800&width=600"
                        alt={`Lookbook Image ${item}`}
                        width={600}
                        height={800}
                        className="object-cover w-full aspect-[3/4] transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <div>
                        <h3 className="text-white text-xl font-medium mb-2">
                          {index === 0 ? "Urban Aesthetics" : index === 1 ? "Digital Nomad" : "Neon Dreams"}
                        </h3>
                        <p className="text-white/80">
                          {index === 0 ? "Spring" : index === 1 ? "Summer" : "Fall"} 2025 Collection
                        </p>
                        <motion.div
                          initial={{ scaleX: 0, originX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="h-px w-full bg-white/60 mt-4"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="rounded-none group relative overflow-hidden">
                <span className="relative z-10">VIEW FULL LOOKBOOK</span>
                <motion.span
                  className="absolute inset-0 bg-primary z-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <ArrowRight className="ml-2 h-4 w-4 relative z-10" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Instagram Feed */}
      <ScrollReveal>
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="font-editorial text-2xl md:text-3xl tracking-wide mb-8 text-center">@EEVEE_OFFICIAL</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {[...Array(6)].map((_, index) => (
                <Link href="#" key={index} className="group relative overflow-hidden">
                  <div className="aspect-square">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=Instagram+${index + 1}`}
                      alt={`Instagram post ${index + 1}`}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <ShoppingBag className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Newsletter Section */}
      <ScrollReveal>
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-10 mix-blend-overlay" />

          <div className="container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-editorial text-3xl md:text-5xl tracking-wide mb-4">JOIN THE MOVEMENT</h2>
              <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">
                Subscribe to get early access to drops, exclusive offers, and behind-the-scenes content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  placeholder="Your email address"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 rounded-none"
                />
                <Button variant="secondary" className="rounded-none">
                  Subscribe
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {["Exclusive Access", "Limited Drops", "Special Offers", "No Spam"].map((item, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-transparent border-primary-foreground/30 text-primary-foreground/80 px-4 py-1"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-background to-transparent" />
        </section>
      </ScrollReveal>
    </div>
  )
}

