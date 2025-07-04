"use client"

import { useEffect } from "react"

const sections = ["free-workflows", "professional-workflows", "about", "contact"]

export function scrollToSection(sectionId: string, offset = 0) {
  const element = document.getElementById(sectionId)
  if (element) {
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }
}

export function useKeyboardNavigation() {
  useEffect(() => {
    let currentSectionIndex = 0

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }

      switch (event.key) {
        case "ArrowUp":
        case "k":
          event.preventDefault()
          currentSectionIndex = Math.max(0, currentSectionIndex - 1)
          scrollToSection(sections[currentSectionIndex], 100)
          break
        case "ArrowDown":
        case "j":
          event.preventDefault()
          currentSectionIndex = Math.min(sections.length - 1, currentSectionIndex + 1)
          scrollToSection(sections[currentSectionIndex], 100)
          break
        case "Home":
          event.preventDefault()
          currentSectionIndex = 0
          scrollToSection(sections[0], 100)
          break
        case "End":
          event.preventDefault()
          currentSectionIndex = sections.length - 1
          scrollToSection(sections[sections.length - 1], 100)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])
}
