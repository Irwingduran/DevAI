"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Download, CheckCircle, Crown, FileText, Video, LinkIcon, Package, CreditCard, Gift } from "lucide-react"

interface ProductDetailModalProps {
  isOpen: boolean
  onClose: () => void
  product: any
  onPurchase: (productId: string, priceOption: string) => void
}

const includesIcons = {
  pdf: FileText,
  video: Video,
  link: LinkIcon,
  template: Package,
  access: Crown,
}

export function ProductDetailModal({ isOpen, onClose, product, onPurchase }: ProductDetailModalProps) {
  const [selectedPricing, setSelectedPricing] = useState("standard")

  if (!product) return null

  const pricingOptions = [
    {
      id: "standard",
      name: "Standard License",
      price: product.price,
      description: "Personal and commercial use",
      features: ["Lifetime access", "Email support", "Free updates for 1 year"],
    },
    {
      id: "extended",
      name: "Extended License",
      price: product.price * 2,
      description: "Resell rights included",
      features: ["Everything in Standard", "Resell rights", "Priority support", "Lifetime updates"],
      popular: true,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-100 text-blue-800">
                  {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                </Badge>
                {product.isPremium && (
                  <Badge className="bg-amber-100 text-amber-800">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-2xl">{product.title}</DialogTitle>
              <DialogDescription className="text-lg">{product.description}</DialogDescription>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Download className="w-4 h-4" />
                <span>{product.downloads} downloads</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="includes">What's Included</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Hero Image Placeholder */}
                <Card className="bg-gradient-to-br from-gray-100 to-gray-200">
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Package className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-600">Product preview image</p>
                  </CardContent>
                </Card>

                {/* Full Description */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">About this {product.type}</h3>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Key Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.benefits?.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Quick Purchase */}
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center">
                      {product.price === 0 ? (
                        <div className="space-y-2">
                          <span className="text-3xl font-bold text-green-600">Free</span>
                          <p className="text-sm text-gray-600">No payment required</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice && (
                            <p className="text-sm text-gray-500">
                              <span className="line-through">${product.originalPrice}</span>
                              <span className="text-green-600 ml-2">Save ${product.originalPrice - product.price}</span>
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {product.isPremium && product.price > 0 && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Gift className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-medium text-amber-800">PRO Member Benefit</span>
                        </div>
                        <p className="text-xs text-amber-700">Get this free with your PRO subscription</p>
                      </div>
                    )}

                    <Button
                      onClick={() => onPurchase(product.id, "standard")}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      {product.price === 0 ? "Get Free Access" : "Purchase Now"}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">30-day money-back guarantee • Instant access</p>
                  </CardContent>
                </Card>

                {/* Product Stats */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h4 className="font-semibold text-gray-900">Product Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Category</span>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Last Updated</span>
                        <span className="font-medium">{product.lastUpdated}</span>
                      </div>
                      {product.duration && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-medium">{product.duration}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Language</span>
                        <span className="font-medium">English</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="includes" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.includes?.map((item: any, index: number) => {
                    const Icon = includesIcons[item.type as keyof typeof includesIcons] || FileText
                    return (
                      <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all ${
                    selectedPricing === option.id ? "border-blue-400 bg-blue-50 shadow-md" : "hover:border-gray-300"
                  } ${option.popular ? "ring-2 ring-amber-400 ring-opacity-50" : ""}`}
                  onClick={() => setSelectedPricing(option.id)}
                >
                  <CardContent className="p-6">
                    {option.popular && <Badge className="bg-amber-500 text-white mb-4">Most Popular</Badge>}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">{option.name}</h3>
                        <p className="text-gray-600">{option.description}</p>
                      </div>
                      <div className="text-3xl font-bold">${option.price}</div>
                      <div className="space-y-2">
                        {option.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button
                onClick={() => onPurchase(product.id, selectedPricing)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              >
                Purchase {pricingOptions.find((p) => p.id === selectedPricing)?.name}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-4">
              {[1, 2, 3].map((review) => (
                <Card key={review}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        U{review}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">User {review}</span>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">
                          Great {product.type}! Really helped me streamline my workflow. Highly recommended for anyone
                          looking to improve their productivity.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">2 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
