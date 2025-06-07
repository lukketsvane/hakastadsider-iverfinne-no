// FILE: app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Menu, X, Instagram, Facebook } from "lucide-react";

import Preloader from "@/components/preloader";
import SplitScroll from "@/components/split-scroll";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SectionChangeData {
  activeSectionIndex: number;
  currentLabelColor: string | null;
  isDarkSection: boolean;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLabelColor, setActiveLabelColor] = useState<string | null>(null);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    const handleWindowScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSectionChange = (data: SectionChangeData) => {
    setActiveLabelColor(data.currentLabelColor);
    setIsDarkSection(data.isDarkSection);
    setActiveSectionIndex(data.activeSectionIndex);
  };

  if (loading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  const logoBaseColor = "#000000";
  const logoColor = activeLabelColor
    ? activeLabelColor
    : isDarkSection
      ? "#FFFFFF"
      : logoBaseColor;

  // Determine if hamburger menu should be faded (after 2nd section = index 1)
  const shouldFadeMenu = activeSectionIndex > 1;

  return (
    <main className="relative h-screen w-full overflow-hidden bg-brandBeige font-haboro">
      <div
        className={cn(
          "absolute left-1/2 top-10 z-50 -translate-x-1/2 transform transition-all duration-500",
          "scale-[1.0] md:scale-[1.5]",
          scrolled && "md:scale-[1.2]",
        )}
      >
        <div
          className="h-[57px] w-[245px] pb-[33px] transition-all duration-500 hover:opacity-80"
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

      {/* Hamburger Menu Button - Updated with larger size and fade animation */}
      <Button
        variant="ghost"
        className={cn(
          "absolute right-6 top-6 z-50 h-20 w-20 rounded-full p-0 transition-all duration-[3000ms] hover:scale-105 hidden md:flex items-center justify-center bg-transparent hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-opacity-50",
          shouldFadeMenu ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
        onClick={toggleMenu}
        aria-label={menuOpen ? "Lukk meny" : "Opne meny"}
        aria-expanded={menuOpen}
      >
        <div className="relative flex flex-col justify-center items-center">
          {menuOpen ? (
            <X
              className={cn(
                "h-[33px] w-[32px]",
                isDarkSection ? "text-white" : "text-black",
              )}
            />
          ) : (
            <Menu
              className={cn(
                "h-[33px] w-[32px] flex flex-col justify-center items-center",
                isDarkSection ? "text-white" : "text-black",
              )}
            />
          )}
        </div>
      </Button>

      <div
        className={cn(
          "fixed right-0 top-0 z-40 h-full w-full max-w-xs sm:max-w-sm transform bg-white shadow-xl transition-transform duration-300 ease-out",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="relative p-8 pt-24 h-full flex flex-col">
          <nav className="flex flex-col space-y-6 flex-grow overflow-y-auto pb-10">
            {[
              "Heim",
              "Tradisjon",
              "Garden",
              "Opplevingar",
              "Var-Tradisjon-Sider",
              "Var-Gravenstein-Sider",
              "Alle-Produkta",
              "Eplemost-Info",
              "Sider-Info",
              // "Inspirasjon", // Removed
              "Kontakt",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-").replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a")}`}
                className="group relative text-lg font-light transition-all duration-300 hover:text-amber-700 hover:translate-x-1.5 font-haboro-contrast"
                onClick={() => setMenuOpen(false)}
              >
                <span className="relative z-10">
                  {item.replace(/-/g, " ").replace("Info", "")}
                </span>
                <div className="absolute left-0 top-1/2 h-px w-0 bg-amber-700 transition-all duration-300 group-hover:w-6 transform -translate-y-1/2"></div>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <SplitScroll onSectionChange={handleSectionChange} />
    </main>
  );
}
