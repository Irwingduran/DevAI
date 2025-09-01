"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Eye, Download, Crown, TrendingUp, Zap, Shield, BarChart3 } from "lucide-react"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { MarketplaceCategories } from "@/components/marketplace/marketplace-categories"
import { ProductDetailModal } from "@/components/marketplace/product-detail-modal"
import { ProductComparisonModal } from "@/components/marketplace/product-comparison-modal"
import { FeaturedProductBanner } from "@/components/marketplace/featured-product-banner"

interface Product {
  id: string
  title: string
  description: string
  thumbnail: string
  type: "AI" | "Blockchain" | "Hybrid"
  category: string
  tags: string[]
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  downloads: number
  isPro: boolean
  isPopular: boolean
  isFeatured: boolean
  author: string
  lastUpdated: string
  features: string[]
}

const mockProducts: Product[] = [
  {
    id: "1",
    title: "Smart Customer Service Bot",
    description: "AI-powered chatbot template with natural language processing and sentiment analysis",
    thumbnail: "/placeholder.svg?height=200&width=300",
    type: "AI",
    category: "customer-service",
    tags: ["NLP", "Chatbot", "Customer Support", "Automation"],
    price: 49,
    originalPrice: 79,
    rating: 4.8,
    reviews: 124,
    downloads: 1250,
    isPro: false,
    isPopular: true,
    isFeatured: true,
    author: "AI Solutions Inc",
    lastUpdated: "2024-01-15",
    features: ["Multi-language support", "Sentiment analysis", "Integration APIs", "Custom training"],
  },
  {
    id: "2",
    title: "Supply Chain Tracker Pro",
    description: "Blockchain-based supply chain management with real-time tracking and verification",
    thumbnail: "/placeholder.svg?height=200&width=300",
    type: "Blockchain",
    category: "supply-chain",
    tags: ["Supply Chain", "Tracking", "Verification", "Transparency"],
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    reviews: 89,
    downloads: 567,
    isPro: true,
    isPopular: true,
    isFeatured: false,
    author: "BlockChain Experts",
    lastUpdated: "2024-01-10",
    features: ["Real-time tracking", "Smart contracts", "Multi-party verification", "Analytics dashboard"],
  },
  {
    id: "3",
    title: "Predictive Analytics Suite",
    description: "Machine learning toolkit for business forecasting and predictive modeling",
    thumbnail: "/placeholder.svg?height=200&width=300",
    type: "AI",
    category: "analytics",
    tags: ["Machine Learning", "Forecasting", "Analytics", "Business Intelligence"],
    price: 129,
    rating: 4.7,
    reviews: 203,
    downloads: 890,
    isPro: false,
    isPopular: false,
    isFeatured: false,
    author: "DataScience Pro",
    lastUpdated: "2024-01-08",
    features: ["Multiple ML models", "Data visualization", "API integration", "Custom reports"],
  },
  {
    id: "4",
    title: "Crypto Payment Gateway",
    description: "Secure cryptocurrency payment processing with multi-chain support",
    thumbnail: "/placeholder.svg?height=200&width=300",
    type: "Blockchain",
    category: "payments",
    tags: ["Payments", "Cryptocurrency", "Security", "Multi-chain"],
    price: 299,
    originalPrice: 399,
    rating: 4.6,
    reviews: 156,
    downloads: 445,
    isPro: true,
    isPopular: false,
    isFeatured: true,
    author: "CryptoTech Solutions",
    lastUpdated: "2024-01-12",
    features: ["Multi-chain support", "Instant settlements", "Security protocols", "Transaction monitoring"],
  },
  {
    id: "5",
    title: "AI Content Generator",
    description: "Advanced content creation tool with GPT integration and brand voice training",
    thumbnail: "/placeholder.svg?height=200&width=300",
    type: "AI",
    category: "marketing",
    tags: ["Content Creation", "GPT", "Marketing", "Brand Voice"],
    price: 79,
    originalPrice: 119,
    rating: 4.5,
    reviews: 312,
    downloads: 1890,
    isPro: false,
    isPopular: true,
    isFeatured: false,
    author: "ContentAI Labs",
    lastUpdated: "2024-01-14",
    features: ["Brand voice training", "Multiple content types", "SEO optimization", "Bulk generation"],
  },
  {
    id: "6",
    title: "Smart Contract Auditor",
    description: "Automated smart contract security analysis with AI-powered vulnerability detection",
    thumbnail: "/placeholder.svg?height=200&width=300",
    type: "Hybrid",
    category: "security",
    tags: ["Smart Contracts", "Security", "Audit", "AI Analysis"],
    price: 399,
    originalPrice: 599,
    rating: 4.9,
    reviews: 67,
    downloads: 234,
    isPro: true,
    isPopular: false,
    isFeatured: true,
    author: "SecureChain AI",
    lastUpdated: "2024-01-11",
    features: ["AI vulnerability detection", "Automated reports", "Code optimization", "Compliance checking"],
  },
]

export default function MarketplacePage() {
  const [products] = useState<Product[]>(mockProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPricing, setSelectedPricing] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || product.type === selectedType
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesPricing =
      selectedPricing === "all" ||
      (selectedPricing === "free" && product.price === 0) ||
      (selectedPricing === "paid" && product.price > 0 && product.price < 200) ||
      (selectedPricing === "premium" && product.price >= 200)

    return matchesSearch && matchesType && matchesCategory && matchesPricing
  })

  const activeFiltersCount = [selectedType, selectedCategory, selectedPricing].filter((f) => f !== "all").length

  const clearFilters = () => {
    setSelectedType("all")
    setSelectedCategory("all")
    setSelectedPricing("all")
    setSearchQuery("")
  }

  const addToComparison = (product: Product) => {
    if (comparisonProducts.length < 3 && !comparisonProducts.find((p) => p.id === product.id)) {
      setComparisonProducts([...comparisonProducts, product])
    }
  }

  const removeFromComparison = (productId: string) => {
    setComparisonProducts(comparisonProducts.filter((p) => p.id !== productId))
  }

  const featuredProduct = products.find((p) => p.isFeatured)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-1">Discover AI & Blockchain solutions for your business</p>
        </div>
        <div className="flex items-center space-x-3">
          {comparisonProducts.length > 0 && (
            <Button variant="outline" onClick={() => setShowComparison(true)} className="bg-white/60 backdrop-blur-sm">
              Compare ({comparisonProducts.length})
            </Button>
          )}
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <Crown className="w-3 h-3 mr-1" />
            PRO Member
          </Badge>
        </div>
      </div>

      {/* Featured Product Banner */}
      {featuredProduct && (
        <FeaturedProductBanner product={featuredProduct} onViewDetails={() => setSelectedProduct(featuredProduct)} />
      )}

      {/* Categories */}
      <MarketplaceCategories />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Solutions</p>
                <p className="text-2xl font-bold text-purple-600">{products.filter((p) => p.type === "AI").length}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Blockchain</p>
                <p className="text-2xl font-bold text-blue-600">
                  {products.filter((p) => p.type === "Blockchain").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Popular</p>
                <p className="text-2xl font-bold text-green-600">{products.filter((p) => p.isPopular).length}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <MarketplaceFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedPricing={selectedPricing}
        onPricingChange={setSelectedPricing}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={clearFilters}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-200 group overflow-hidden"
          >
            <div className="relative">
              <img
                src={product.thumbnail || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              {product.isPro && (
                <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <Crown className="w-3 h-3 mr-1" />
                  PRO
                </Badge>
              )}
              {product.isPopular && (
                <Badge className="absolute top-2 left-2 bg-orange-100 text-orange-800">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {product.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={`text-xs ${
                    product.type === "AI"
                      ? "bg-purple-100 text-purple-800"
                      : product.type === "Blockchain"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800"
                  }`}
                >
                  {product.type}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </div>

              {/* Rating and Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews})</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{product.downloads}</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                  <span className="text-lg font-bold text-gray-900">
                    {product.price === 0 ? "Free" : `$${product.price}`}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToComparison(product)}
                    disabled={
                      comparisonProducts.length >= 3 ||
                      comparisonProducts.find((p) => p.id === product.id) !== undefined
                    }
                  >
                    Compare
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setSelectedProduct(product)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
          <Button onClick={clearFilters} variant="outline">
            Clear Filters
          </Button>
        </div>
      )}

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {showComparison && (
        <ProductComparisonModal
          products={comparisonProducts}
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
          onRemoveProduct={removeFromComparison}
        />
      )}
    </div>
  )
}
