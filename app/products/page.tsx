"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import ProductCard, { type Product } from "@/components/product-card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Sample product data
const allProducts: Product[] = [
  {
    id: 1,
    name: "Neon Dreams Tee",
    price: 89.99,
    image: "/placeholder.svg?height=600&width=400",
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Red"]
  },
  {
    id: 2,
    name: "Urban Flux Oversized",
    price: 99.99,
    image: "/placeholder.svg?height=600&width=400",
    badge: "Bestseller",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray"]
  },
  {
    id: 3,
    name: "Midnight Haze Tee",
    price: 79.99,
    image: "/placeholder.svg?height=600&width=400",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Blue"]
  },
  {
    id: 4,
    name: "Digital Nomad Tee",
    price: 89.99,
    image: "/placeholder.svg?height=600&width=400",
    badge: "Limited",
    sizes: ["M", "L", "XL"],
    colors: ["White", "Gray"]
  },
  {
    id: 5,
    name: "Cyber Punk Hoodie",\
    price:  "XL\"],
    colors: ["White", "Gray"]
  },
  {
    id: 5,
    name: "Cyber Punk Hoodie",
    price: 129.99,
    image: "/placeholder.svg?height=600&width=400",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Red"]
  },
  {
    id: 6,
    name: "Retro Wave Jacket",
    price: 149.99,
    image: "/placeholder.svg?height=600&width=400",
    badge: "Sale",
    sizes: ["S", "M", "L"],
    colors: ["Blue", "Black"]
  },
  {
    id: 7,
    name: "Future Fade Tee",
    price: 69.99,
    image: "/placeholder.svg?height=600&width=400",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Gray", "Black"]
  },
  {
    id: 8,
    name: "Neon Lights Sweatshirt",
    price: 119.99,
    image: "/placeholder.svg?height=600&width=400",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray"]
  },
  {
    id: 9,
    name: "Urban Stealth Tee",
    price: 79.99,
    image: "/placeholder.svg?height=600&width=400",
    sizes: ["S", "M", "L"],
    colors: ["Black", "White"]
  },
  {
    id: 10,
    name: "Glitch Art Hoodie",
    price: 139.99,
    image: "/placeholder.svg?height=600&width=400",
    badge: "Limited",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Red"]
  },
  {
    id: 11,
    name: "Synthwave Tee",
    price: 84.99,
    image: "/placeholder.svg?height=600&width=400",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Purple", "Black"]
  },
  {
    id: 12,
    name: "Dystopian Dreams Jacket",
    price: 159.99,
    image: "/placeholder.svg?height=600&width=400",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Gray"]
  }
]

// Filter options
const categories = ["T-Shirts", "Hoodies", "Jackets", "Accessories"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
const colors = ["Black", "White", "Gray", "Red", "Blue", "Purple"]
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search")
  const categoryParam = searchParams.get("category")

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam.toLowerCase()] : [],
  )
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [sortBy, setSortBy] = useState("featured")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Mobile filter drawer state
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Products state
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts)
  const [isLoading, setIsLoading] = useState(true)

  // Apply filters
  useEffect(() => {
    setIsLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      let filtered = [...allProducts]

      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
      }

      // Apply category filter (simplified for demo)
      if (selectedCategories.length > 0) {
        // In a real app, products would have a category field
        // This is just a simulation
        if (selectedCategories.includes("t-shirts")) {
          filtered = filtered.filter((p) => p.name.toLowerCase().includes("tee"))
        }
        if (selectedCategories.includes("hoodies")) {
          filtered = filtered.filter((p) => p.name.toLowerCase().includes("hoodie"))
        }
        if (selectedCategories.includes("jackets")) {
          filtered = filtered.filter((p) => p.name.toLowerCase().includes("jacket"))
        }
      }

      // Apply size filter
      if (selectedSizes.length > 0) {
        filtered = filtered.filter((product) => product.sizes?.some((size) => selectedSizes.includes(size)))
      }

      // Apply color filter
      if (selectedColors.length > 0) {
        filtered = filtered.filter((product) => product.colors?.some((color) => selectedColors.includes(color)))
      }

      // Apply price range filter
      filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

      // Apply sorting
      switch (sortBy) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price)
          break
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price)
          break
        case "newest":
          // In a real app, products would have a date field
          // This is just a simulation - reverse the array to simulate "newest"
          filtered.reverse()
          break
        default:
          // "featured" - no specific sorting
          break
      }

      setFilteredProducts(filtered)
      setIsLoading(false)

      // Update active filters for display
      const newActiveFilters: string[] = []
      if (selectedCategories.length) {
        selectedCategories.forEach((cat) => newActiveFilters.push(cat))
      }
      if (selectedSizes.length) {
        selectedSizes.forEach((size) => newActiveFilters.push(size))
      }
      if (selectedColors.length) {
        selectedColors.forEach((color) => newActiveFilters.push(color))
      }
      if (priceRange[0] > 0 || priceRange[1] < 200) {
        newActiveFilters.push(`$${priceRange[0]}-$${priceRange[1]}`)
      }
      setActiveFilters(newActiveFilters)
    }, 500) // Simulate network delay
  }, [searchQuery, selectedCategories, selectedSizes, selectedColors, priceRange, sortBy])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const removeFilter = (filter: string) => {
    // Remove from categories
    if (selectedCategories.includes(filter)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== filter))
    }
    // Remove from sizes
    else if (selectedSizes.includes(filter)) {
      setSelectedSizes((prev) => prev.filter((s) => s !== filter))
    }
    // Remove from colors
    else if (selectedColors.includes(filter)) {
      setSelectedColors((prev) => prev.filter((c) => c !== filter))
    }
    // Remove price range
    else if (filter.startsWith("$")) {
      setPriceRange([0, 200])
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedColors([])
    setPriceRange([0, 200])
    setSortBy("featured")
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <ScrollReveal>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-editorial tracking-wide mb-2">
                {searchQuery ? `Search: "${searchQuery}"` : categoryParam ? `${categoryParam}` : "All Products"}
              </h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="md:hidden flex items-center gap-2"
                onClick={() => setFiltersOpen(true)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              <div className="flex items-center space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  {filter}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                    onClick={() => removeFilter(filter)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground" onClick={clearAllFilters}>
                Clear all
              </Button>
            </div>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          {/* Desktop Filters */}
          <ScrollReveal delay={0.2} className="hidden md:block">
            <div className="space-y-6">
              <Accordion type="multiple" defaultValue={["category", "size", "color", "price"]}>
                <AccordionItem value="category">
                  <AccordionTrigger>Category</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category.toLowerCase())}
                            onCheckedChange={() => toggleCategory(category.toLowerCase())}
                          />
                          <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="size">
                  <AccordionTrigger>Size</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-3 gap-2">
                      {sizes.map((size) => (
                        <Button
                          key={size}
                          variant={selectedSizes.includes(size) ? "default" : "outline"}
                          size="sm"
                          className="text-sm"
                          onClick={() => toggleSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="color">
                  <AccordionTrigger>Color</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {colors.map((color) => (
                        <div key={color} className="flex items-center space-x-2">
                          <Checkbox
                            id={`color-${color}`}
                            checked={selectedColors.includes(color)}
                            onCheckedChange={() => toggleColor(color)}
                          />
                          <Label htmlFor={`color-${color}`} className="text-sm cursor-pointer flex items-center">
                            <span
                              className="inline-block w-4 h-4 rounded-full mr-2"
                              style={{
                                backgroundColor: color.toLowerCase(),
                                border: color.toLowerCase() === "white" ? "1px solid #e2e8f0" : "none",
                              }}
                            />
                            {color}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                  <AccordionTrigger>Price</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <div className="flex space-x-4">
                        <Input
                          type="number"
                          min={0}
                          max={priceRange[1]}
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-20"
                        />
                        <span className="text-muted-foreground">to</span>
                        <Input
                          type="number"
                          min={priceRange[0]}
                          max={200}
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-20"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ScrollReveal>

          {/* Mobile Filters */}
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetContent side="left" className="w-full sm:max-w-md p-0 flex flex-col">
              <SheetHeader className="p-6 border-b">
                <SheetTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-auto">
                <Accordion type="multiple" defaultValue={["category", "size", "color", "price"]} className="p-6">
                  <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-category-${category}`}
                              checked={selectedCategories.includes(category.toLowerCase())}
                              onCheckedChange={() => toggleCategory(category.toLowerCase())}
                            />
                            <Label htmlFor={`mobile-category-${category}`} className="text-sm cursor-pointer">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="size">
                    <AccordionTrigger>Size</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-3 gap-2">
                        {sizes.map((size) => (
                          <Button
                            key={size}
                            variant={selectedSizes.includes(size) ? "default" : "outline"}
                            size="sm"
                            className="text-sm"
                            onClick={() => toggleSize(size)}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="color">
                    <AccordionTrigger>Color</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {colors.map((color) => (
                          <div key={color} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-color-${color}`}
                              checked={selectedColors.includes(color)}
                              onCheckedChange={() => toggleColor(color)}
                            />
                            <Label
                              htmlFor={`mobile-color-${color}`}
                              className="text-sm cursor-pointer flex items-center"
                            >
                              <span
                                className="inline-block w-4 h-4 rounded-full mr-2"
                                style={{
                                  backgroundColor: color.toLowerCase(),
                                  border: color.toLowerCase() === "white" ? "1px solid #e2e8f0" : "none",
                                }}
                              />
                              {color}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                        <div className="flex space-x-4">
                          <Input
                            type="number"
                            min={0}
                            max={priceRange[1]}
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="w-20"
                          />
                          <span className="text-muted-foreground">to</span>
                          <Input
                            type="number"
                            min={priceRange[0]}
                            max={200}
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="w-20"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <SheetFooter className="p-6 border-t">
                <div className="flex space-x-2 w-full">
                  <Button variant="outline" className="flex-1" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                  <SheetClose asChild>
                    <Button className="flex-1">Apply Filters</Button>
                  </SheetClose>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Products Grid */}
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="space-y-4">
                    <div className="aspect-[3/4] bg-muted animate-pulse rounded-md" />
                    <div className="space-y-2">
                      <div className="h-4 bg-muted animate-pulse rounded-md w-3/4" />
                      <div className="h-4 bg-muted animate-pulse rounded-md w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search query.</p>
                <Button onClick={clearAllFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {filteredProducts.map((product, index) => (
                  <ScrollReveal key={product.id} delay={index * 0.05}>
                    <ProductCard product={product} />
                  </ScrollReveal>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

