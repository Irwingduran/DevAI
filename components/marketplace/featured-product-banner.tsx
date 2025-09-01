"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Crown, Clock } from "lucide-react"

interface FeaturedProductBannerProps {
  product: {
    id: string
    title: string
    description: string
    price: number
    originalPrice?: number
    rating: number
    type: string
    image: string
    isLimitedTime?: boolean
  }
  onViewProduct: (productId: string) => void
}

export function FeaturedProductBanner({ product, onViewProduct }: FeaturedProductBannerProps) {
  const isOnSale = product.originalPrice && product.originalPrice > product.price
  const discount = isOnSale ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

  return (
    <Card className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-amber-200 shadow-xl mb-8">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4 flex-1">
            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Featured Product
              </Badge>
              {product.isLimitedTime && (
                <Badge variant="outline" className="border-red-400 text-red-600">
                  <Clock className="w-3 h-3 mr-1" />
                  Limited Time
                </Badge>
              )}
              {isOnSale && <Badge className="bg-red-500 text-white">{discount}% OFF</Badge>}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h2>
              <p className="text-gray-600 text-lg max-w-2xl">{product.description}</p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500">rating</span>
              </div>

              <div className="flex items-center space-x-3">
                {isOnSale && <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>}
                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => onViewProduct(product.id)}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold"
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {product.isLimitedTime && <div className="text-sm text-red-600 font-medium">⏰ Offer ends in 2 days</div>}
            </div>
          </div>

          <div className="hidden lg:block ml-8">
            <div className="w-32 h-32 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl opacity-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
