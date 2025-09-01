"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Star, Download, Crown, Eye } from "lucide-react"

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

interface ProductComparisonModalProps {
  products: Product[]
  isOpen: boolean
  onClose: () => void
  onRemoveProduct: (productId: string) => void
}

export function ProductComparisonModal({ products, isOpen, onClose, onRemoveProduct }: ProductComparisonModalProps) {
  const allFeatures = Array.from(new Set(products.flatMap((p) => p.features)))

  const hasFeature = (product: Product, feature: string) => {
    return product.features.includes(feature)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Compare Products ({products.length})</DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveProduct(product.id)}
                  className="absolute top-2 right-2 z-10"
                >
                  <X className="w-4 h-4" />
                </Button>

                <CardHeader className="pb-3">
                  <div className="relative">
                    <img
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {product.isPro && (
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        PRO
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 mt-3">{product.title}</CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Type and Category */}
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

                  {/* Rating and Downloads */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Download className="w-4 h-4" />
                        <span className="text-sm">{product.downloads}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="border-t pt-3">
                    <div className="flex items-center space-x-2">
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                      <span className="text-xl font-bold text-gray-900">
                        {product.price === 0 ? "Free" : `$${product.price}`}
                      </span>
                    </div>
                    {product.originalPrice && (
                      <div className="text-xs text-green-600 font-medium">
                        Save ${product.originalPrice - product.price} (
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% off)
                      </div>
                    )}
                  </div>

                  {/* Author and Updated */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>By {product.author}</div>
                    <div>Updated {new Date(product.lastUpdated).toLocaleDateString()}</div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Comparison Table */}
          {allFeatures.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Features</th>
                      {products.map((product) => (
                        <th key={product.id} className="text-center py-3 px-4 font-medium text-gray-900 min-w-[200px]">
                          {product.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allFeatures.map((feature, index) => (
                      <tr key={feature} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                        <td className="py-3 px-4 font-medium text-gray-700">{feature}</td>
                        {products.map((product) => (
                          <td key={product.id} className="text-center py-3 px-4">
                            {hasFeature(product, feature) ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Comparison Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-800">Most Affordable:</span>
                <span className="ml-2 text-blue-700">
                  {products.reduce((min, p) => (p.price < min.price ? p : min)).title}
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-800">Highest Rated:</span>
                <span className="ml-2 text-blue-700">
                  {products.reduce((max, p) => (p.rating > max.rating ? p : max)).title}
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-800">Most Popular:</span>
                <span className="ml-2 text-blue-700">
                  {products.reduce((max, p) => (p.downloads > max.downloads ? p : max)).title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
