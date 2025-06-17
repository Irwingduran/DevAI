"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Code, Info, Briefcase, Calendar } from "lucide-react"
import AIBlockchainLabsLogo from "./logo"

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
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-black/80 backdrop-blur-xl shadow-lg border-b border-purple-500/30 py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Botón menú móvil */}
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-600 text-white shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-transform hover:scale-125 focus:outline-none animate-pulse"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>

            {/* Menú izquierdo (3 items) */}
            <div className="hidden md:flex items-center space-x-4">
              {[
                { label: "Home", id: "home", icon: <Home className="w-4 h-4" /> },
                { label: "Services", id: "services", icon: <Code className="w-4 h-4" /> },
                { label: "About", id: "about", icon: <Info className="w-4 h-4" /> },
              ].map(({ label, id, icon }) => (
                <Button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-white hover:text-cyan-400 transition-colors group relative"
                >
                  <span className="mr-1">{icon}</span>
                  <span className="relative z-10">{label}</span>
                </Button>
              ))}
            </div>

            {/* Logo centrado */}
            <div className="md:flex hidden justify-center absolute left-1/2 transform -translate-x-1/2">
              <AIBlockchainLabsLogo />
            </div>

            {/* Menú derecho (3 items) */}
            <div className="hidden md:flex items-center space-x-4">
              {[
                { label: "Portfolio", id: "portfolio", icon: <Briefcase className="w-4 h-4" /> },
                { label: "Availability", id: "availability", icon: <Calendar className="w-4 h-4" /> },
              ].map(({ label, id, icon }) => (
                <Button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-white hover:text-cyan-400 transition-colors group relative"
                >
                  <span className="mr-1">{icon}</span>
                  <span className="relative z-10">{label}</span>
                </Button>
              ))}

              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-md px-4 py-2 text-sm font-semibold transition-transform hover:scale-105 shadow-md"
              >
                Contact
              </Button>
            </div>
          </div>

          {/* Menú móvil */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 pt-2 border-t border-purple-500/40 animate-fadeIn">
              <div className="flex flex-col space-y-3 text-base font-medium text-white px-2">
                {[
                  { name: "Home", id: "home", icon: <Home className="w-5 h-5" /> },
                  { name: "Services", id: "services", icon: <Code className="w-5 h-5" /> },
                  { name: "About", id: "about", icon: <Info className="w-5 h-5" /> },
                  { name: "Portfolio", id: "portfolio", icon: <Briefcase className="w-5 h-5" /> },
                  { name: "Availability", id: "availability", icon: <Calendar className="w-5 h-5" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-2 text-left hover:text-purple-400 transition-colors py-2 px-2 rounded-md hover:bg-white/5"
                  >
                    {item.icon} {item.name}
                  </button>
                ))}
                <div className="pt-2">
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-md py-2 font-semibold"
                  >
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
