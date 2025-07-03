"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Workflow } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  const handleLinkClick = (sectionId: string) => {
    setOpen(false)
    // Small delay to allow sheet to close before scrolling
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col space-y-4 mt-8">
          <div className="flex items-center space-x-2 mb-6">
            <Workflow className="h-6 w-6 text-purple-500" />
            <span className="text-lg font-bold">Ventsislav Minev</span>
          </div>

          <nav className="flex flex-col space-y-4">
            <button
              className="text-lg font-medium text-muted-foreground hover:text-purple-500 transition-colors py-2 text-left"
              onClick={() => handleLinkClick("free-workflows")}
            >
              Free Workflows
            </button>
            <button
              className="text-lg font-medium text-muted-foreground hover:text-purple-500 transition-colors py-2 text-left"
              onClick={() => handleLinkClick("professional-workflows")}
            >
              Professional Solutions
            </button>
            <button
              className="text-lg font-medium text-muted-foreground hover:text-purple-500 transition-colors py-2 text-left"
              onClick={() => handleLinkClick("about")}
            >
              About
            </button>
            <button className="text-lg font-medium text-muted-foreground hover:text-purple-500 transition-colors py-2 text-left">
              Contact
            </button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
