"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

import Preloader from "@/components/preloader"
import SplitScroll from "@/components/split-scroll"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState(0) // Track active section

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  if (loading) {
    return <Preloader />
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#f8f5f0]">
      {/* Logo */}
      <div
        className={cn(
          "absolute left-1/2 top-8 z-50 -translate-x-1/2 transform transition-all duration-500",
          // Mobile scaling: "scale-6" (0.06) as per your comment, very small. Adjusted top.
          "scale-[0.6] top-2",
          // Desktop/MD screens: significantly smaller than before, and shrinks further on scroll.
          scrolled
            ? "md:scale-[0.4] md:top-2" // e.g., 40% scale when scrolled
            : "md:scale-[0.5] md:top-4", // e.g., 50% scale when not scrolled
        )}
      >
        <Image
          src="/images/ulvik-logo.svg"
          alt="Ulvik Frukt & Cideri"
          width={128} // Base width, actual size controlled by scale
          height={42} // Base height, actual size controlled by scale
          className={cn(
            "relative h-auto w-auto transition-all duration-500 hover:scale-102",
            // Invert logo when in dark mode (sections 3-4: Opplevingar and Alle produkta)
            activeSection >= 3 && activeSection <= 4 ? "filter invert brightness-0 contrast-100" : "",
          )}
          priority
        />
      </div>

      {/* Menu button - simplified */}
      <Button
        variant="ghost"
        className="absolute right-8 top-8 z-50 h-12 w-12 rounded-full p-0 transition-all duration-300 hover:scale-110 hidden md:block"
        onClick={toggleMenu}
      >
        <div className="relative">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</div>
      </Button>

      {/* Sidebar - simplified animations */}
      <div
        className={cn(
          "fixed right-0 top-0 z-40 h-full w-80 transform bg-white transition-transform duration-300 ease-out",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="relative p-8 pt-24">
          <nav className="flex flex-col space-y-8">
            {["Heim", "Tradisjon", "Garden", "Opplevingar", "Alle Produkta", "Kontakt"].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="group relative text-xl font-light transition-all duration-300 hover:text-amber-700 hover:translate-x-2"
                onClick={() => setMenuOpen(false)}
              >
                <span className="relative z-10">{item}</span>
                <div className="absolute left-0 top-1/2 h-0.5 w-0 bg-amber-700 transition-all duration-300 group-hover:w-8 transform -translate-y-1/2"></div>
              </a>
            ))}
          </nav>

          <div className="absolute bottom-8 left-8 right-8 text-center text-sm text-gray-500">
            <p>Sider frå Hardanger</p>
            <p className="text-xs mt-1">Familiebedrift på Hakastad</p>
            <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-30 transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <SplitScroll onSectionChange={setActiveSection} />
    </main>
  )
}
