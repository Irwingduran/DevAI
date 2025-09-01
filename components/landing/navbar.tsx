"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Rocket, 
  Sparkles, 
  BrainCircuit, 
  LayoutDashboard,
  Menu,
  X,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { LeadCaptureModal } from "../forms/lead-capture-modal"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: "Producto", icon: <Rocket className="w-4 h-4" />, href: "#features" },
    { name: "Cómo funciona", icon: <BrainCircuit className="w-4 h-4" />, href: "#how-it-works" },
    { name: "Plantillas", icon: <LayoutDashboard className="w-4 h-4" />, href: "#templates" },
    { name: "Precios", icon: <Sparkles className="w-4 h-4" />, href: "#pricing" },
  ]

  return (
    <>
      {/* Navbar Desktop */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo con efecto holográfico */}
            <Link href="#" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BrainCircuit className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
              </div>
              <span className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${scrolled ? "hidden sm:block" : "block"}`}>
                NeuroBuild
              </span>
            </Link>

            {/* Navegación principal con efecto de onda */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {item.icon}
                    {item.name}
                  </span>
                  
                  {hoveredItem === item.name && (
                    <motion.span
                      layoutId="navHover"
                      className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-full"
                      transition={{ type: "spring", bounce: 0.25 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA + Menú móvil */}
            <div className="flex items-center gap-2">
              <LeadCaptureModal
                triggerText="Comenzar"
                formOrigin="Navbar CTA"
                trigger={
                  <Button 
                    size="sm" 
                    className="hidden sm:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    Comenzar
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                }
              />

              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden rounded-full"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Menú móvil con animación */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-white shadow-lg"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              ))}
              
              <LeadCaptureModal
                triggerText="Comenzar Ahora"
                formOrigin="Mobile Nav CTA"
                trigger={
                  <Button 
                    size="sm" 
                    className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    Comenzar Ahora
                  </Button>
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}