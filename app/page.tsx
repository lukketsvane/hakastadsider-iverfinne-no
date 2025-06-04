"use client"

import { useEffect, useState } from "react"
import { Menu, X, Instagram, Facebook } from "lucide-react"

import Preloader from "@/components/preloader"
import SplitScroll from "@/components/split-scroll"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SectionChangeData {
  activeSectionIndex: number
  currentLabelColor: string | null
  isDarkSection: boolean
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // State for logo styling based on SplitScroll
  const [activeLabelColor, setActiveLabelColor] = useState<string | null>(null)
  const [isDarkSection, setIsDarkSection] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    const handleWindowScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleWindowScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleWindowScroll)
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleSectionChange = (data: SectionChangeData) => {
    setActiveLabelColor(data.currentLabelColor)
    setIsDarkSection(data.isDarkSection)
  }

  if (loading) {
    return <Preloader />
  }

  const logoBaseColor = "#000000"
  const logoColor = activeLabelColor ? activeLabelColor : isDarkSection ? "#FFFFFF" : logoBaseColor

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#f8f5f0]">
      {/* Logo */}
      <div
        className={cn(
          "absolute left-1/2 top-2 z-50 -translate-x-1/2 transform transition-all duration-500",
          "scale-[0.24] md:scale-[2.0]",
          scrolled && "md:scale-[1.6]",
        )}
      >
        <div
          className="h-[42px] w-[128px] transition-all duration-500 hover:opacity-80"
          style={{
            backgroundColor: logoColor,
            maskImage: "url(/images/ulvik-logo.svg)",
            WebkitMaskImage: "url(/images/ulvik-logo.svg)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
          aria-label="Ulvik Frukt & Cideri Logo"
        />
      </div>

      {/* Menu button - larger and no background */}
      <Button
        variant="ghost"
        className="absolute right-8 top-8 z-50 h-16 w-16 rounded-full p-0 transition-all duration-300 hover:scale-110 hidden md:block bg-transparent hover:bg-transparent"
        onClick={toggleMenu}
      >
        <div className="relative">
          {menuOpen ? (
            <X className={cn("h-8 w-8", isDarkSection ? "text-white" : "text-black")} />
          ) : (
            <Menu className={cn("h-8 w-8", isDarkSection ? "text-white" : "text-black")} />
          )}
        </div>
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 z-40 h-full w-80 transform bg-white transition-transform duration-300 ease-out",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="relative p-8 pt-24 h-full flex flex-col">
          <nav className="flex flex-col space-y-8">
            {[
              "Heim",
              "Tradisjon",
              "Garden",
              "Opplevingar",
              "Var-Tradisjon-Sider",
              "Var-Gravenstein-Sider",
              "Alle-Produkta",
              "Kontakt",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative text-xl font-light transition-all duration-300 hover:text-amber-700 hover:translate-x-2"
                onClick={() => setMenuOpen(false)}
              >
                <span className="relative z-10">{item}</span>
                <div className="absolute left-0 top-1/2 h-0.5 w-0 bg-amber-700 transition-all duration-300 group-hover:w-8 transform -translate-y-1/2"></div>
              </a>
            ))}
          </nav>

          <div className="mt-auto pb-8">
            <div className="flex justify-center space-x-6 my-8">
              <a
                href="https://www.instagram.com/ulvikfruktogcideri/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ulvik Frukt & Cideri Instagram"
                className="text-gray-600 hover:text-amber-700 transition-colors"
              >
                <Instagram size={28} />
              </a>
              <a
                href="https://www.facebook.com/UlvikFruktogCideri/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ulvik Frukt & Cideri Facebook"
                className="text-gray-600 hover:text-amber-700 transition-colors"
              >
                <Facebook size={28} />
              </a>
            </div>
            <div className="text-center text-sm text-gray-500">
              <p>Sider frå Hardanger</p>
              <p className="text-xs mt-1">Familiebedrift på Hakastad</p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-30 transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Fixed Footer with Social Media Icons */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 flex space-x-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
        <a
          href="https://www.instagram.com/ulvikfruktogcideri/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ulvik Frukt & Cideri Instagram"
          className="text-gray-600 hover:text-amber-700 transition-colors"
        >
          <Instagram size={24} />
        </a>
        <a
          href="https://www.facebook.com/UlvikFruktogCideri/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ulvik Frukt & Cideri Facebook"
          className="text-gray-600 hover:text-amber-700 transition-colors"
        >
          <Facebook size={24} />
        </a>
      </div>

      <SplitScroll onSectionChange={handleSectionChange} />
    </main>
  )
}
