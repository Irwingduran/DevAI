"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Download, Users, Clock, Lock, Crown } from "lucide-react"

interface ProductCardProps {
  product: {
    id: string
    title: string
    type: "template" | "course" | "tool" | "solution"
    category: string
    description: string
    price: number
    originalPrice?: number
    rating: number
    downloads: number
    duration?: string
    isPremium: boolean
    isFeatured?: boolean
    image: string
    tags: string[]
  }
  onViewProduct: (productId: string) => void
}

const typeColors = {
  template: "bg-blue-100 text-blue-800",
  course: "bg-green-100 text-green-800",
  tool: "bg-purple-100 text-purple-800",
  solution: "bg-orange-100 text-orange-800",
}

const typeIcons = {
  template: Download,
  course: Users,
  tool: Star,
  solution: Crown,
}

export function ProductCard({ product, onViewProduct }: ProductCardProps) {
  const TypeIcon = typeIcons[product.type]
  const isOnSale = product.originalPrice && product.originalPrice > product.price

  return (
    <Card
      className={`bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group relative ${
        product.isFeatured ? "ring-2 ring-amber-400 ring-opacity-50" : ""
      }`}
      onClick={() => onViewProduct(product.id)}
    >
      {product.isFeatured && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">Featured</Badge>
        </div>
      )}

      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <TypeIcon className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <Badge className={typeColors[product.type]} variant="secondary">
                {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
              </Badge>
            </div>
          </div>
          {product.isPremium && (
            <div className="flex items-center space-x-1">
              <Lock className="w-4 h-4 text-amber-600" />
              <span className="text-xs text-amber-600 font-medium">PRO</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {product.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{product.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>{product.downloads}</span>
            </div>
            {product.duration && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{product.duration}</span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center space-x-2">
            {product.price === 0 ? (
              <span className="text-lg font-bold text-green-600">Free</span>
            ) : (
              <>
                <span className="text-lg font-bold text-gray-900">${product.price}</span>
                {isOnSale && <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>}
              </>
            )}
            {product.isPremium && product.price > 0 && (
              <Badge variant="outline" className="text-xs text-amber-600 border-amber-200">
                Free with PRO
              </Badge>
            )}
          </div>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
            {product.price === 0 ? "Get Free" : "View Details"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
