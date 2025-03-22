"use client"

import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <ScrollReveal>
            <div className="md:col-span-2">
              <Link href="/" className="font-editorial text-3xl tracking-wider">
                EeVee
              </Link>
              <p className="mt-4 text-muted-foreground max-w-md">
                Premium streetwear for the fashion-forward. Limited drops, exclusive designs, and cutting-edge style.
              </p>
              <div className="flex space-x-4 mt-6">
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Instagram className="h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Twitter className="h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Facebook className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <h3 className="font-medium text-lg mb-4">Shop</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/products"
                    className="text-muted-foreground hover:text-primary transition-colors inline-block"
                  >
                    All Products
                    <span className="block h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lookbook"
                    className="text-muted-foreground hover:text-primary transition-colors inline-block"
                  >
                    Lookbook
                  </Link>
                </li>
                <li>
                  <Link
                    href="/drops"
                    className="text-muted-foreground hover:text-primary transition-colors inline-block"
                  >
                    Limited Drops
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections"
                    className="text-muted-foreground hover:text-primary transition-colors inline-block"
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sizing"
                    className="text-muted-foreground hover:text-primary transition-colors inline-block"
                  >
                    Sizing Guide
                  </Link>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <h3 className="font-medium text-lg mb-4">Stay Updated</h3>
              <p className="text-muted-foreground mb-4">Subscribe to get exclusive access to drops and promotions.</p>
              <div className="flex space-x-2">
                <Input placeholder="Your email" className="max-w-[220px] rounded-none" />
                <Button className="rounded-none">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                By subscribing you agree to our Terms and Privacy Policy.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} EeVee. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Shipping
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}

