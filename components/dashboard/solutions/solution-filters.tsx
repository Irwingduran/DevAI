"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Filter, X, SortAsc } from "lucide-react"

interface SolutionFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedStatus: string
  onStatusChange: (status: string) => void
  selectedType: string
  onTypeChange: (type: string) => void
  selectedComplexity: string
  onComplexityChange: (complexity: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  activeFiltersCount: number
  onClearFilters: () => void
}

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "planning", label: "Planning" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "paused", label: "Paused" },
]

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "AI", label: "AI Solutions" },
  { value: "Blockchain", label: "Blockchain" },
  { value: "Hybrid", label: "Hybrid" },
]

const complexityOptions = [
  { value: "all", label: "All Levels" },
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
]

const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "progress", label: "Progress" },
  { value: "name", label: "Name A-Z" },
  { value: "status", label: "Status" },
]

export function SolutionFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedType,
  onTypeChange,
  selectedComplexity,
  onComplexityChange,
  sortBy,
  onSortChange,
  activeFiltersCount,
  onClearFilters,
}: SolutionFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search solutions..."
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

        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-36 bg-white/50 border-white/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-36 bg-white/50 border-white/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedComplexity} onValueChange={onComplexityChange}>
          <SelectTrigger className="w-32 bg-white/50 border-white/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {complexityOptions.map((complexity) => (
              <SelectItem key={complexity.value} value={complexity.value}>
                {complexity.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <SortAsc className="w-4 h-4 text-gray-500" />
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-32 bg-white/50 border-white/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((sort) => (
                <SelectItem key={sort.value} value={sort.value}>
                  {sort.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
          {selectedStatus !== "all" && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {statusOptions.find((s) => s.value === selectedStatus)?.label}
            </Badge>
          )}
          {selectedType !== "all" && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {typeOptions.find((t) => t.value === selectedType)?.label}
            </Badge>
          )}
          {selectedComplexity !== "all" && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              {complexityOptions.find((c) => c.value === selectedComplexity)?.label}
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
