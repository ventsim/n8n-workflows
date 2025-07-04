"use client"

import { useScrollSpy } from "./scroll-spy"

const sections = [
  { id: "hero", label: "Home" },
  { id: "free-workflows", label: "Free Workflows" },
  { id: "professional-workflows", label: "Professional Solutions" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
]

export function BreadcrumbNav() {
  const activeSection = useScrollSpy(
    sections.map((s) => s.id),
    150,
  )
  const currentSection = sections.find((s) => s.id === activeSection)

  if (!currentSection) return null

  return (
    <div className="hidden md:flex items-center text-sm text-muted-foreground">
      <span>You are here:</span>
      <span className="mx-2">•</span>
      <span className="text-orange-500 font-medium">{currentSection.label}</span>
    </div>
  )
}
