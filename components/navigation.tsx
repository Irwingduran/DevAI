"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-purple-500/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            DevAI
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("home")} className="hover:text-purple-400 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="hover:text-purple-400 transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-purple-400 transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("case-studies")} className="hover:text-purple-400 transition-colors">
              Case Studies
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="hover:text-purple-400 transition-colors">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("availability")} className="hover:text-purple-400 transition-colors">
              Availability
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-purple-500/20">
            <div className="flex flex-col space-y-4 mt-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left hover:text-purple-400 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left hover:text-purple-400 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left hover:text-purple-400 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("case-studies")}
                className="text-left hover:text-purple-400 transition-colors"
              >
                Case Studies
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="text-left hover:text-purple-400 transition-colors"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("availability")}
                className="text-left hover:text-purple-400 transition-colors"
              >
                Availability
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 w-fit"
              >
                Contact
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
