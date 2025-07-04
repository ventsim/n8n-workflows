"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Download, Star, Users, Clock } from "lucide-react"
import Image from "next/image"

interface WorkflowModalProps {
  isOpen: boolean
  onClose: () => void
  onRequestCustomization?: () => void
  workflow: {
    title: string
    description: string
    longDescription: string
    image: string
    tag?: string
    tagColor?: string
    link: string
    stats: {
      downloads: string
      rating: string
      users: string
    }
    features: string[]
    category: string
  }
}

export function WorkflowModal({ isOpen, onClose, onRequestCustomization, workflow }: WorkflowModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold mb-2 drop-shadow-sm">{workflow.title}</DialogTitle>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{workflow.category}</Badge>
                {workflow.tag && <Badge className={workflow.tagColor}>{workflow.tag}</Badge>}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
              <Image src={workflow.image || "/placeholder.svg"} alt={workflow.title} fill className="object-cover" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{workflow.stats.downloads}</span>
                <span className="text-xs text-muted-foreground">Downloads</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{workflow.stats.rating}</span>
                <span className="text-xs text-muted-foreground">Rating</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{workflow.stats.users}</span>
                <span className="text-xs text-muted-foreground">Users</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 drop-shadow-sm">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{workflow.longDescription}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 drop-shadow-sm">Key Features</h3>
              <ul className="space-y-2">
                {workflow.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
              >
                <a href={workflow.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on n8n Community
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent hover:bg-muted/80 transition-all duration-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                onClick={() => {
                  // This will be passed from the parent component
                  if (onRequestCustomization) {
                    onRequestCustomization()
                  }
                }}
              >
                <Clock className="mr-2 h-4 w-4" />
                Request Customization
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
