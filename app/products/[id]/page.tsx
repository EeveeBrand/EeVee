"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Heart, ShoppingBag, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import ProductCard, { type Product } from "@/components/product-card"

// Sample product data (same as in products page)
const allProducts: Product[] = [
  {
    id: 1,
    name: "Neon Dreams Tee",
    price: 89.99,
    image: "/placeholder.svg?height=600&width=400",
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Red"],
  },
  {
    id: 2,
    name: "Urban Flux Oversized",
    price: 99.99,
    image: "/placeholder.svg?height=600&width=400",
    badge: "Bestseller",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray"],
  },
  {
    id: 3,
    name: "Midnight Haze Tee",
    price: 79.99,
    image: "/placeholder.svg?height=600&width=400",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Blue"],
  },
  {
    id: 4,
    name: "Digital Nomad Tee",
    price: 89.99,
    image: "/placeholder.svg?height=600&width=400",
    badge: "Limited",
    sizes: ["M", "L", "XL"],
    colors: ["White", "Gray"],
  },
  {
    id: 5,
    name: "Cyber Punk Hoodie",
    price: 129.99,
    image: "/placeholder.svg?height=600&width=400",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Red"],
  },
  {
    id: 6,
    name: "Retro Wave Jacket",
    price: 149.99,
    image: "/placeholder.svg?height=600&width=400",
    badge: "Sale",
    sizes: ["S", "M", "L"],
    colors: ["Blue", "Black"],
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // Product images (would come from API in real app)
  const productImages = [
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600&text=Angle+2",
    "/placeholder.svg?height=800&width=600&text=Angle+3",
    "/placeholder.svg?height=800&width=600&text=Angle+4",
  ]

  // Related products
  const relatedProducts = allProducts.filter((p) => p.id !== Number(params.id)).slice(0, 4)

  useEffect(() => {
    // Simulate API call to fetch product details
    setLoading(true)

    setTimeout(() => {
      const foundProduct = allProducts.find((p) => p.id === Number(params.id))

      if (foundProduct) {
        setProduct(foundProduct)
        // Set default selections
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0])
        }
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0])
        }
      }

      setLoading(false)
    }, 500)
  }, [params.id])

  const handleAddToCart = () => {
    if (!product) return

    if (product.sizes && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      })
      return
    }

    if (product.colors && !selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      })
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size: selectedSize,
      color: selectedColor,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: product ? `${product.name} has been ${isFavorite ? "removed from" : "added to"} your wishlist` : "",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="aspect-[3/4] bg-muted animate-pulse rounded-md" />
            <div className="space-y-4">
              <div className="h-8 bg-muted animate-pulse rounded-md w-3/4" />
              <div className="h-6 bg-muted animate-pulse rounded-md w-1/4" />
              <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
              <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
              <div className="h-4 bg-muted animate-pulse rounded-md w-3/4" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container text-center py-12">
          <h1 className="text-2xl font-medium mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/products")}>Back to Products</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <ScrollReveal>
          <Button
            variant="ghost"
            className="mb-6 -ml-3 group flex items-center"
            onClick={() => router.push("/products")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Products
          </Button>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Product Images */}
          <ScrollReveal>
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted/50 rounded-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={productImages[currentImage] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {product.badge && (
                  <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground">
                    {product.badge}
                  </Badge>
                )}
              </div>

              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md ${
                      currentImage === index ? "ring-2 ring-primary" : "opacity-70"
                    }`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Product Details */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{product.name}</h1>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 mr-1" fill={i < 4 ? "currentColor" : "none"} />
                    ))}
                    <span className="text-sm ml-1">4.0 (24 reviews)</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-1">Free shipping on orders over $100</p>
              </div>

              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label htmlFor="size" className="text-base">
                      Size
                    </Label>
                    <Link href="/size-guide" className="text-sm text-primary hover:underline">
                      Size Guide
                    </Link>
                  </div>
                  <RadioGroup
                    id="size"
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                    className="flex flex-wrap gap-2"
                  >
                    {product.sizes.map((size) => (
                      <div key={size} className="flex items-center">
                        <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                        <Label
                          htmlFor={`size-${size}`}
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-muted bg-transparent peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary hover:bg-muted/50 transition-colors"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div className="space-y-3">
                  <Label htmlFor="color" className="text-base">
                    Color: <span className="font-medium">{selectedColor}</span>
                  </Label>
                  <RadioGroup
                    id="color"
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                    className="flex flex-wrap gap-2"
                  >
                    {product.colors.map((color) => (
                      <div key={color} className="flex items-center">
                        <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                        <Label
                          htmlFor={`color-${color}`}
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-muted overflow-hidden peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary"
                        >
                          <span
                            className="h-full w-full"
                            style={{
                              backgroundColor: color.toLowerCase(),
                              border: color.toLowerCase() === "white" ? "1px solid #e2e8f0" : "none",
                            }}
                          />
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="quantity" className="text-base">
                  Quantity
                </Label>
                <div className="flex items-center border rounded-md w-32">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 rounded-none group relative overflow-hidden"
                  onClick={handleAddToCart}
                >
                  <span className="relative z-10">Add to Cart</span>
                  <motion.span
                    className="absolute inset-0 bg-white z-0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <ShoppingBag className="ml-2 h-5 w-5 relative z-10 group-hover:text-primary transition-colors" />
                </Button>

                <Button size="lg" variant="outline" className="flex-1 rounded-none" onClick={handleToggleFavorite}>
                  <Heart className="mr-2 h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
                  Wishlist
                </Button>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center text-sm">
                  <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center text-sm">
                  <ShoppingBag className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Product Information Tabs */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 mb-6">
                <TabsTrigger
                  value="description"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary pb-3"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary pb-3"
                >
                  Details & Care
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary pb-3"
                >
                  Reviews (24)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-0">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p>
                    Introducing the {product.name}, a perfect blend of style and comfort for the modern individual. This
                    premium piece is crafted with meticulous attention to detail, ensuring a luxurious feel while
                    enhancing durability, making it a reliable choice for everyday wear.
                  </p>
                  <p>
                    The design of the {product.name} is as striking as it is comfortable. The piece features a modern
                    aesthetic that adds a contemporary and eye-catching touch to your ensemble. The colors are carefully
                    chosen to give a vibrant and dynamic appearance, making this item stand out in any crowd.
                  </p>
                  <p>
                    Whether you prefer a casual, sporty, or chic look, the {product.name}'s versatility allows you to
                    style it to match your individual fashion statement, making it a wardrobe essential for those who
                    appreciate fashion and comfort.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-0">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <h4>Materials</h4>
                  <p>60% combed ringspun cotton, 40% polyester</p>

                  <h4>Fit</h4>
                  <p>Regular fit, true to size</p>

                  <h4>Care Instructions</h4>
                  <ul>
                    <li>Machine wash cold with similar colors</li>
                    <li>Do not bleach</li>
                    <li>Tumble dry low</li>
                    <li>Cool iron if needed</li>
                    <li>Do not dry clean</li>
                  </ul>

                  <h4>Country of Origin</h4>
                  <p>Ethically made in Portugal</p>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Customer Reviews</h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 mr-1" fill={i < 4 ? "currentColor" : "none"} />
                        ))}
                        <span className="text-sm ml-1">Based on 24 reviews</span>
                      </div>
                    </div>
                    <Button>Write a Review</Button>
                  </div>

                  <Separator />

                  {/* Sample reviews */}
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{["Alex S.", "Jamie T.", "Morgan L."][i]}</h4>
                        <span className="text-sm text-muted-foreground">
                          {["March 15, 2025", "February 28, 2025", "January 10, 2025"][i]}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-4 h-4 mr-1" fill={j < [4, 5, 3][i] ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <p className="text-sm">
                        {
                          [
                            "Great quality and fit. The material is soft and comfortable. Highly recommend!",
                            "Absolutely love this! The design is unique and I've received many compliments. True to size and the color is exactly as shown.",
                            "Good product but the sizing runs a bit small. I would recommend sizing up. Otherwise, the quality is excellent.",
                          ][i]
                        }
                      </p>
                      <Separator />
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollReveal>

        {/* Related Products */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-editorial tracking-wide mb-8">You May Also Like</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 0.05}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

