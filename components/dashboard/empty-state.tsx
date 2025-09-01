"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Sparkles } from "lucide-react"

interface EmptyStateProps {
  type: "solutions" | "tasks" | "resources"
  onCreateNew?: () => void
}

const emptyStateConfig = {
  solutions: {
    title: "No solutions yet",
    description: "Start your digital transformation journey by creating your first AI or Blockchain solution.",
    buttonText: "Create New Solution",
    icon: Sparkles,
  },
  tasks: {
    title: "No tasks yet",
    description: "Stay organized by creating tasks to track your solution implementation progress.",
    buttonText: "Create New Task",
    icon: Plus,
  },
  resources: {
    title: "No resources found",
    description: "Explore our learning resources to expand your knowledge of AI and Blockchain technologies.",
    buttonText: "Browse Resources",
    icon: Plus,
  },
}

export function EmptyState({ type, onCreateNew }: EmptyStateProps) {
  const config = emptyStateConfig[type]
  const Icon = config.icon

  return (
    <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
      <CardContent className="p-12 text-center">
        <div className="space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto">
            <Icon className="w-10 h-10 text-gray-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">{config.title}</h3>
            <p className="text-gray-600 max-w-md mx-auto">{config.description}</p>
          </div>

          {onCreateNew && (
            <Button
              onClick={onCreateNew}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              {config.buttonText}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
