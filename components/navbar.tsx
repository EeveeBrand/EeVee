"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingBag, User, X, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart-provider"
import CartDrawer from "@/components/cart-drawer"

const routes = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/drops", label: "Limited Drops" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [cartOpen, setCartOpen] = useState(false)
  const { cartItems } = useCart()

  const cartCount = cartItems.length

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          scrolled ? "bg-background/80 backdrop-blur-md border-b py-3" : "bg-transparent py-5",
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/" className="font-editorial text-3xl tracking-wider relative group">
            <span className="relative z-10">EeVee</span>
            <motion.span
              className="absolute -bottom-1 left-0 w-full h-px bg-primary"
              initial={{ scaleX: 0, originX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-primary relative group",
                  pathname === route.href ? "text-primary font-medium" : "text-muted-foreground",
                )}
              >
                {route.label}
                <motion.span
                  className={cn(
                    "absolute -bottom-1 left-0 w-full h-px bg-primary",
                    pathname === route.href ? "scale-x-100" : "scale-x-0",
                  )}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  animate={{ scaleX: pathname === route.href ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <AnimatePresence>
              {searchOpen && (
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "200px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                  onSubmit={handleSearch}
                >
                  <Input
                    placeholder="Search..."
                    className="pr-8"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setSearchOpen(false)}
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {!searchOpen && (
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            )}

            <ThemeToggle />

            <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground animate-pulse-glow"
                  variant="outline"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Link href="/account">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b">
                    <Link href="/" className="font-editorial text-2xl tracking-wider">
                      EeVee
                    </Link>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <div className="p-6 border-b">
                    <form onSubmit={handleSearch} className="flex space-x-2">
                      <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button type="submit" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                  <nav className="flex flex-col space-y-6 p-6 flex-1">
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          "text-lg tracking-wide transition-colors hover:text-primary",
                          pathname === route.href ? "text-primary font-medium" : "text-muted-foreground",
                        )}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="p-6 border-t mt-auto space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Switch theme</span>
                      <ThemeToggle />
                    </div>
                    <Link href="/account" className="block w-full">
                      <Button className="w-full" variant="default">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

