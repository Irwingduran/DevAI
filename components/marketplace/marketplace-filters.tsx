"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"

interface MarketplaceFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedType: string
  onTypeChange: (type: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedPricing: string
  onPricingChange: (pricing: string) => void
  activeFiltersCount: number
  onClearFilters: () => void
}

const productTypes = [
  { value: "all", label: "All Types" },
  { value: "template", label: "Templates" },
  { value: "course", label: "Courses" },
  { value: "tool", label: "AI Tools" },
  { value: "solution", label: "Solutions" },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "marketing", label: "Marketing" },
  { value: "finance", label: "Finance" },
  { value: "automation", label: "Automation" },
  { value: "analytics", label: "Analytics" },
  { value: "productivity", label: "Productivity" },
]

const pricingOptions = [
  { value: "all", label: "All Prices" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
  { value: "premium", label: "Premium" },
]

export function MarketplaceFilters({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
  selectedPricing,
  onPricingChange,
  activeFiltersCount,
  onClearFilters,
}: MarketplaceFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search templates, courses, tools..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white/50 border-white/30 focus:bg-white/70"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-40 bg-white/50 border-white/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {productTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-40 bg-white/50 border-white/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedPricing} onValueChange={onPricingChange}>
          <SelectTrigger className="w-32 bg-white/50 border-white/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pricingOptions.map((pricing) => (
              <SelectItem key={pricing.value} value={pricing.value}>
                {pricing.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {activeFiltersCount > 0 && (
          <Button variant="outline" size="sm" onClick={onClearFilters} className="bg-white/50 border-white/30">
            <X className="w-4 h-4 mr-2" />
            Clear ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedType !== "all" && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {productTypes.find((t) => t.value === selectedType)?.label}
            </Badge>
          )}
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {categories.find((c) => c.value === selectedCategory)?.label}
            </Badge>
          )}
          {selectedPricing !== "all" && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              {pricingOptions.find((p) => p.value === selectedPricing)?.label}
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
