"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Workflow } from "lucide-react"
import { scrollToSection } from "./keyboard-nav"
import { useScrollSpy } from "./scroll-spy"

const sections = [
  { id: "free-workflows", label: "Free Workflows" },
  { id: "professional-workflows", label: "Professional Solutions" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const activeSection = useScrollSpy(
    sections.map((s) => s.id),
    150,
  )

  const handleLinkClick = (sectionId: string) => {
    setOpen(false)
    // Small delay to allow sheet to close before scrolling
    setTimeout(() => {
      scrollToSection(sectionId, 100)
    }, 100)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 hover:bg-muted/80"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col space-y-4 mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Workflow className="h-6 w-6 text-purple-500" />
              <span className="text-lg font-bold text-slate-200">Ventsislav Minev</span>
            </div>
          </div>

          <nav className="flex flex-col space-y-4">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`text-lg font-medium transition-all duration-200 py-2 text-left rounded-md px-2 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 hover:bg-muted/50 ${
                  activeSection === section.id
                    ? "text-orange-500 font-semibold bg-orange-50 dark:bg-orange-950/20"
                    : "text-muted-foreground hover:text-orange-500"
                }`}
                onClick={() => handleLinkClick(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-4 border-t text-xs text-muted-foreground">
            <p>Keyboard shortcuts:</p>
            <p>↑/↓ or j/k to navigate</p>
            <p>Home/End for first/last section</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
