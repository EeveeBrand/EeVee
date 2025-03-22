"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

export interface Product {
  id: number
  name: string
  price: number
  image: string
  badge?: string
  sizes?: string[]
  colors?: string[]
}

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.sizes ? product.sizes[0] : undefined,
      color: product.colors ? product.colors[0] : undefined,
    })
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: isFavorite
        ? `${product.name} has been removed from your wishlist`
        : `${product.name} has been added to your wishlist`,
    })
  }

  return (
    <motion.div
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted/50">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {product.badge && (
          <Badge className="absolute top-3 left-3 z-20 bg-primary text-primary-foreground">{product.badge}</Badge>
        )}

        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 z-10"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-3">
            <Link href={`/products/${product.id}`}>
              <Button size="sm" className="rounded-none min-w-[120px]">
                Quick View
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="absolute right-3 top-3 z-20 flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full bg-white/90 text-black hover:bg-white"
                  onClick={handleFavorite}
                >
                  <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{isFavorite ? "Remove from wishlist" : "Add to wishlist"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </div>

      <div className="mt-4 flex justify-between items-start">
        <Link href={`/products/${product.id}`} className="group/name">
          <div>
            <h3 className="font-medium group-hover/name:text-primary transition-colors">{product.name}</h3>
            <p className="text-muted-foreground">${product.price}</p>
          </div>
        </Link>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Add to cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  )
}

