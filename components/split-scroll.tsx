"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import MapWidget from "@/components/map-widget"

// First, let's reduce the number of sections by removing empty placeholders
// We'll keep only the essential sections with actual content

// Replace the sections array with this simplified version:

const sections = [
  {
    id: "heim",
    left: {
      type: "image",
      content: "/images/hardanger-landscape.png",
      alt: "Hardanger med epleblom",
      parallax: true,
    },
    right: {
      type: "logo-content",
      logoSrc: "/images/logo-type-dark.svg",
      subtitle: "Sider frå Hardanger",
      description:
        "Ulvik Frukt & Cideri er ei familiebedrift på garden Hakastad. Garden ligg sørvendt og solrikt midt i fruktbygda Ulvik i Hardanger. Målet vårt er å utvikla ei bedrift som er tufta på kvalitet, kultur og kompetanse.",
      cta: "Les meir om oss",
      animationDelay: 0.2,
    },
  },
  {
    id: "tradisjon",
    left: {
      type: "content",
      title: "Vår Tradisjon",
      subtitle: "Generasjonar med handverk",
      description:
        "I over 200 år har familier i Hardanger dyrka eple og laga sider. Me held fram denne stolte tradisjonen med respekt for naturen og dei gamle metodane, samtidig som me nyttar moderne teknikkar for å sikra høgste kvalitet.",
      cta: "Opplev tradisjonen",
      animationDelay: 0.3,
    },
    right: {
      type: "image",
      content: "/images/bee-on-apple-blossom.png",
      alt: "Bie på epleblom",
      parallax: true,
    },
  },
  {
    id: "garden",
    left: {
      type: "content",
      title: "Garden Hakastad",
      subtitle: "Tradisjon og kvalitet",
      description:
        "Me dyrkar dei vanlege eplesortane som Gravenstein, Discovery, Aroma og James Grieve. Garden ligg sørvendt og solrikt, noko som gjev optimale vilkår for epleproduксjon i det unike klimaet i Hardanger.",
      cta: "Sjå eplesortane",
      animationDelay: 0.3,
    },
    right: {
      type: "image",
      content: "/images/red-apple.png",
      alt: "Friskt eple frå Hardanger",
      parallax: true,
    },
  },
  {
    id: "produkta",
    left: {
      type: "product-showcase",
      items: [
        {
          type: "image",
          content: "/images/cider-bottle-yellow.png",
          alt: "Sider frå Hardanger Gravenstein",
          title: "Gravenstein",
          description: "Fyldig, vinøs og god sødme. Svakt syrleg, lang ettersmak med smak av mandel.",
          details: "8% alkohol • 9 g/l sukker • Passar til fisk og ljost kjøt",
        },
        {
          type: "image",
          content: "/images/cider-bottle-red.png",
          alt: "Sider frå Hardanger Tradisjon",
          title: "Tradisjon",
          description: "Saftig med god friskheit, fokusert preg av mogne eple, hint av grøne urter og krydder.",
          details: "8% alkohol • 13,2 g/l sukker • Passar til aperitiff og skalldyr",
        },
      ],
    },
    right: {
      type: "content",
      title: "Våre Signatursider",
      subtitle: "Frå eple til sider",
      description:
        "Me produserer sider og eplemost av høgste kvalitet. Kvar eplesort har sin eigen smak etter kva sukker-, syre- og ev tannininnnhald den har. Dette gjer at du på Hakastad kan få oppleva mange smakar etter kva du er ute etter.",
      cta: "Sjå alle produkta",
      animationDelay: 0.3,
    },
  },
  {
    id: "opplevingar",
    left: {
      type: "grid",
      items: [
        {
          type: "image",
          content: "/images/wine-tasting.png",
          alt: "Sidersmak i Hardanger",
        },
        {
          type: "image",
          content: "/images/hardanger-landscape.png",
          alt: "Epleblom i Hardanger",
        },
        {
          type: "image",
          content: "/images/apple-products.png",
          alt: "Siderproduksjon",
        },
        {
          type: "image",
          content: "/images/red-apple.png",
          alt: "Eplehaustinga",
        },
      ],
    },
    right: {
      type: "content",
      title: "Opplevingar",
      subtitle: "Smak og opplev",
      description:
        "Kom og opplev Hardanger og smak på våre eksepsjonelle sider og eplemost. Me tilbyr omvising på garden og sidersmak i dei vakre omgivnadene i Hardanger. Opplev tradisjonen og handverket bak kvar flaske.",
      cta: "Bestill omvising",
      animationDelay: 0.4,
    },
  },
  {
    id: "alle-produkta",
    left: {
      type: "product-grid",
      items: [
        {
          type: "image",
          content: "/images/gravenstein.png",
          alt: "Gravenstein Sider",
          title: "Gravenstein",
          description: "Fyldig, vinøs og god sødme. Svakt syrleg, lang ettersmak med smak av mandel.",
          details: "8% alkohol • 9 g/l sukker",
          pairing: "Aperitiff, fisk, ljost kjøt",
        },
        {
          type: "image",
          content: "/images/tradisjon.png",
          alt: "Tradisjon Sider",
          title: "Tradisjon",
          description: "Saftig med god friskheit, fokusert preg av mogne eple, hint av grøne urter og krydder.",
          details: "8% alkohol • 13,2 g/l sukker",
          pairing: "Aperitiff, skalldyr, fisk",
        },
        {
          type: "image",
          content: "/images/stille-stunder.png",
          alt: "Stille Stunder",
          title: "Stille Stunder",
          description: "Konsentrert eple.",
          details: "8% alkohol • Under 3 g/l sukker",
          pairing: "Aperitiff, skalldyr, fisk",
        },
        {
          type: "image",
          content: "/images/hylleblomsider.png",
          alt: "Hylleblomsider",
          title: "Hylleblomsider",
          description: "Søtleg med god syrebalanse.",
          details: "7,5% alkohol • 36 g/l sukker",
          pairing: "Aperitiff, ost, dessert",
        },
        {
          type: "image",
          content: "/images/svartsurbaer.png",
          alt: "Svartsurbær",
          title: "Svartsurbær",
          description: "Lang ettersmak av eple og litt tannin.",
          details: "8% alkohol • Under 3 g/l sukker",
          pairing: "Aperitiff, ljost kjøt, grønsaker",
        },
        {
          type: "image",
          content: "/images/kvitanesen.png",
          alt: "Kvitanesen Poesider",
          title: "Kvitanesen",
          description: "Lang fruktig eplesmak med god syrebalanse.",
          details: "7,5% alkohol • 20 g/l sukker",
          pairing: "Aperitiff, skalldyr, fisk",
        },
        {
          type: "image",
          content: "/images/kvennadokkje.png",
          alt: "Kvemmadokkje Rosésider",
          title: "Kvemmadokkje",
          description: "Frisk eplesmak med innslag av raude bær.",
          details: "6,5% alkohol • 25 g/l sukker",
          pairing: "Aperitiff, fisk, ljost kjøt",
        },
      ],
    },
    right: {
      type: "content",
      title: "Heile Kolleksjonen",
      subtitle: "Sju unike sider",
      description:
        "Opplev heile spekteret av våre handverksider. Frå den klassiske Gravenstein til den innovative Svartsurbær - kvar flaske fortel si eiga historie om Hardanger sitt terroir og vår lidenskap for kvalitet.",
      animationDelay: 0.6,
    },
  },
  {
    id: "kontakt",
    left: {
      type: "map-widget",
    },
    right: {
      type: "content",
      title: "Velkommen til Hakastad",
      description:
        "Me tek gjerne imot besøk på garden. Opplev den vakre naturen i Hardanger og smak på våre handverksprodukt. Kontakt oss for omvising eller for å bestilla produkta våre.",
      contact: {
        name: "Asbjørn Børsheim",
        address: "Apalvegen 78, 5730 Ulvik",
        phone: "+47 91 10 22 15",
        email: "asbjorn.borsheim@ulvik.org",
        org: "Org. 983 035 256",
      },
      cta: "Send melding",
      animationDelay: 0.6,
    },
  },
]

// Premium Products Components
const PremiumProductsLeft = ({
  items,
  activeSection,
  sectionIndex,
}: { items: any[]; activeSection: number; sectionIndex: number }) => {
  return (
    <div className="flex h-full w-full flex-col justify-start items-start p-12 max-[375px]:p-6 space-y-8 max-[375px]:space-y-4">
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "group relative flex flex-col items-center p-6 bg-[#1a2639] bg-opacity-80 backdrop-blur-sm rounded-lg border border-[#2a3649] transition-all duration-700 w-full max-w-xs",
            activeSection === sectionIndex ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
          )}
          style={{ transitionDelay: `${i * 200}ms` }}
        >
          <div className="relative h-32 w-24 mb-4">
            <Image
              src={item.content || "/placeholder.svg"}
              alt={item.alt}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105 filter brightness-110"
            />
          </div>
          <h4 className="text-lg font-medium text-white mb-2 text-center">{item.title}</h4>
          <p className="text-sm text-gray-300 text-center">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

const PremiumProductsRight = ({
  items,
  activeSection,
  sectionIndex,
}: { items: any[]; activeSection: number; sectionIndex: number }) => {
  return (
    <div className="flex h-full w-full flex-col justify-start items-end p-12 max-[375px]:p-6 space-y-8 max-[375px]:space-y-4">
      <div className="mb-8 text-center w-full">
        <Image
          src="/images/ulvik-logo.svg"
          alt="Ulvik Logo"
          width={80}
          height={27}
          className="mx-auto filter invert brightness-0 contrast-100 transition-all duration-500 hover:scale-105 md:w-[120px] md:h-[40px]"
        />
      </div>
      <div className="w-full flex flex-col space-y-8">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "group relative flex flex-col items-center p-6 bg-[#1a2639] bg-opacity-80 backdrop-blur-sm rounded-lg border border-[#2a3649] transition-all duration-700 w-full max-w-xs ml-auto",
              activeSection === sectionIndex ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0",
            )}
            style={{ transitionDelay: `${(i + 2) * 200}ms` }}
          >
            <div className="relative h-32 w-24 mb-4">
              <Image
                src={item.content || "/placeholder.svg"}
                alt={item.alt}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105 filter brightness-110"
              />
            </div>
            <h4 className="text-lg font-medium text-white mb-2 text-center">{item.title}</h4>
            <p className="text-sm text-gray-300 text-center">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Video Player Component
const VideoPlayer = ({ src, poster, alt }: { src: string; poster: string; alt: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div
      className="group relative h-full w-full overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video ref={videoRef} className="h-full w-full object-cover" poster={poster} muted={isMuted} loop playsInline>
        <source src={src} type="video/mp4" />
      </video>

      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300",
          showControls || !isPlaying ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="lg"
            className="h-16 w-16 rounded-full bg-white bg-opacity-80 text-amber-700 hover:bg-white hover:bg-opacity-100"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 pl-1" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-full bg-white bg-opacity-80 text-amber-700 hover:bg-white hover:bg-opacity-100"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Logo Content Component
const LogoContent = ({
  logoSrc,
  subtitle,
  description,
  cta,
  activeSection,
  sectionIndex,
  animationDelay,
  isDarkMode,
}: {
  logoSrc: string
  subtitle: string
  description: string
  cta: string
  activeSection: number
  sectionIndex: number
  animationDelay: number
  isDarkMode: boolean
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 max-[375px]:p-4 text-left">
      <div
        className={cn(
          "transform transition-all duration-1200 ease-out",
          activeSection === sectionIndex ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
        )}
        style={{ transitionDelay: `${animationDelay * 1000}ms` }}
      >
        <div className="mb-8 animate-scaleIn">
          <Image
            src={logoSrc || "/placeholder.svg"}
            alt="Ulvik Frukt & Cideri"
            width={320}
            height={120}
            className="h-auto w-auto transition-all duration-300 hover:scale-102"
          />
        </div>
        <h3
          className={cn(
            "mb-6 text-sm font-light uppercase tracking-widest animate-fadeIn transition-colors duration-500",
            isDarkMode ? "text-amber-400" : "text-amber-700",
          )}
        >
          {subtitle}
        </h3>
        <p
          className={cn(
            "mb-8 max-w-lg text-lg leading-relaxed animate-slideInUp transition-colors duration-500",
            isDarkMode ? "text-gray-300" : "text-gray-600",
          )}
        >
          {description}
        </p>
        <Button
          variant="outline"
          className="border-amber-700 text-amber-700 transition-all duration-300 hover:scale-105 hover:bg-amber-700 hover:text-white hover:shadow-lg animate-slideInUp"
        >
          {cta}
        </Button>
      </div>
    </div>
  )
}

// Product Showcase Component
const ProductShowcase = ({
  items,
  activeSection,
  sectionIndex,
  isDarkMode,
}: { items: any[]; activeSection: number; sectionIndex: number; isDarkMode: boolean }) => {
  const ciderItems = items.slice(0, 2)

  return (
    <div className="flex h-full w-full flex-col justify-center p-12 space-y-12">
      {ciderItems.map((item, i) => (
        <div
          key={i}
          className={cn(
            "group relative flex items-center space-x-8 transform transition-all duration-700",
            activeSection === sectionIndex ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
          )}
          style={{ transitionDelay: `${i * 300}ms` }}
        >
          <div className="relative h-56 w-40 flex-shrink-0">
            <Image
              src={item.content || "/placeholder.svg"}
              alt={item.alt}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
              style={{ objectPosition: "center" }}
            />
          </div>
          <div className="flex-1">
            <h3
              className={cn(
                "text-2xl font-light mb-3 transition-colors duration-500",
                isDarkMode ? "text-white" : "text-gray-800",
              )}
            >
              {item.title}
            </h3>
            <p
              className={cn(
                "text-base mb-3 leading-relaxed transition-colors duration-500",
                isDarkMode ? "text-gray-300" : "text-gray-600",
              )}
            >
              {item.description}
            </p>
            {item.details && (
              <p
                className={cn(
                  "text-sm font-medium transition-colors duration-500",
                  isDarkMode ? "text-amber-400" : "text-amber-700",
                )}
              >
                {item.details}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// Product Grid Component
const ProductGrid = ({
  items,
  activeSection,
  sectionIndex,
}: { items: any[]; activeSection: number; sectionIndex: number }) => {
  return (
    <div className="h-full w-full p-8 overflow-y-auto">
      <div className="grid grid-cols-2 gap-6 max-h-full">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "group relative flex flex-col items-center p-3 max-[375px]:p-2 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-500 border border-white border-opacity-10",
              activeSection === sectionIndex ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="relative h-40 w-28 mb-3">
              <Image
                src={item.content || "/placeholder.svg"}
                alt={item.alt}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h4 className="text-sm font-medium text-white mb-1 text-center">{item.title}</h4>
            <p className="text-xs text-gray-300 mb-2 text-center leading-tight">{item.description}</p>
            <p className="text-xs text-amber-400 font-medium mb-1">{item.details}</p>
            {item.pairing && <p className="text-xs text-gray-400 text-center">{item.pairing}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SplitScroll({ onSectionChange }: { onSectionChange: (section: number) => void }) {
  const [activeSection, setActiveSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([])

  const scrollToSection = useCallback(
    (index: number) => {
      if (isScrolling || index === activeSection) return

      setIsLoading(true)
      setIsScrolling(true)

      setTimeout(() => {
        setActiveSection(index)

        const sectionElement = sectionRefs.current[index]
        if (sectionElement && containerRef.current) {
          containerRef.current.scrollTo({
            top: sectionElement.offsetTop,
            behavior: "smooth",
          })

          window.history.pushState(null, "", `#${sections[index].id}`)

          setTimeout(() => {
            setIsScrolling(false)
            setIsLoading(false)
          }, 1200)
        }
      }, 300)
    },
    [activeSection, isScrolling],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Replace the useEffect that handles scroll and dark mode with this updated version:
    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      const progress = scrollTop / scrollHeight

      setScrollProgress(progress)

      parallaxRefs.current.forEach((ref, index) => {
        if (ref) {
          const sectionTop = sectionRefs.current[index]?.offsetTop || 0
          const offset = (scrollTop - sectionTop) * 0.3
          ref.style.transform = `translateY(${offset}px)`
        }
      })

      if (isScrolling) return

      const viewportHeight = window.innerHeight
      let newActiveSection = 0

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollTop >= sectionTop - viewportHeight / 3 && scrollTop < sectionBottom - viewportHeight / 3) {
            newActiveSection = index
          }
        }
      })

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection)
        window.history.pushState(null, "", `#${sections[newActiveSection].id}`)
      }

      // Dark mode logic - for "Opplevingar" and "Alle produkta" sections
      // We want dark mode for sections 4 (Opplevingar) and 5 (Alle produkta)
      // And light mode for all other sections
      const darkSectionStartIndex = 4 // Opplevingar
      const darkSectionEndIndex = 5 // Alle produkta

      // Check if we're in or approaching a dark section
      if (newActiveSection >= darkSectionStartIndex && newActiveSection <= darkSectionEndIndex) {
        setIsDarkMode(true)
      } else if (newActiveSection === darkSectionEndIndex + 1) {
        // If we're in the contact section (after dark sections), check if we're closer to the top
        // of the contact section (still dark) or further down (transition to light)
        const contactSection = sectionRefs.current[darkSectionEndIndex + 1]
        if (contactSection) {
          const contactSectionTop = contactSection.offsetTop
          const distanceFromTop = scrollTop - contactSectionTop

          // If we're in the first 30% of the contact section, still show dark mode
          if (distanceFromTop < viewportHeight * 0.3) {
            setIsDarkMode(true)
          } else {
            setIsDarkMode(false)
          }
        }
      } else {
        setIsDarkMode(false)
      }
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [activeSection, isScrolling])

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash) {
      const index = sections.findIndex((section) => section.id === hash)
      if (index !== -1) {
        setTimeout(() => {
          scrollToSection(index)
        }, 500)
      }
    }
  }, [scrollToSection])

  const handleScrollDown = () => {
    const nextSection = activeSection < sections.length - 1 ? activeSection + 1 : 0
    scrollToSection(nextSection)
  }

  // Notify parent of section changes
  useEffect(() => {
    onSectionChange(activeSection)
  }, [activeSection, onSectionChange])

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-700 border-t-transparent"></div>
            <p className="text-white">Lastar...</p>
          </div>
        </div>
      )}

      <div
        className="fixed left-0 top-0 z-40 h-1 bg-amber-700 transition-all duration-300"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Replace the container div with this updated version: */}
      <div
        ref={containerRef}
        className={cn(
          "h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth relative transition-colors duration-700",
          isDarkMode ? "bg-black" : "bg-[#f8f5f0]",
        )}
        style={{ scrollSnapType: "y mandatory" }}
      >
        {/* Replace the progress indicator with this simplified version: */}
        <div className="absolute right-8 top-1/2 z-30 -translate-y-1/2 transform">
          <div className="flex flex-col space-y-4">
            {sections.map((_, index) => {
              const isActive = index <= activeSection
              return (
                <div key={index} className="relative">
                  <svg width="16" height="16" className="transform transition-all duration-500">
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      fill="none"
                      stroke={isDarkMode ? "#4b5563" : "#d1d5db"}
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="1.5"
                      strokeDasharray={`${2 * Math.PI * 6}`}
                      strokeDashoffset={`${2 * Math.PI * 6 * (1 - (isActive ? 1 : 0))}`}
                      className="transition-all duration-700 ease-out"
                      transform="rotate(-90 8 8)"
                    />
                  </svg>
                </div>
              )
            })}
          </div>
        </div>

        {sections.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={cn(
              "flex h-screen w-full transition-all duration-1000 ease-in-out relative",
              "max-[375px]:flex-col max-[375px]:min-h-screen max-[375px]:h-auto",
            )}
            style={{ scrollSnapAlign: "start" }}
          >
            {/* Venstre side */}
            <div className="relative h-full w-1/2 max-[375px]:w-full max-[375px]:h-screen overflow-hidden border-r border-gray-200 max-[375px]:border-r-0 max-[375px]:border-b">
              {section.left.type === "image" && (
                <div
                  ref={(el) => (section.left.parallax ? (parallaxRefs.current[index * 2] = el) : null)}
                  className="relative h-full w-full will-change-transform"
                >
                  <Image
                    src={section.left.content || "/placeholder.svg"}
                    alt={section.left.alt || ""}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-1000 ease-out",
                      activeSection === index ? "scale-100" : "scale-105",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black to-transparent opacity-20" />
                </div>
              )}

              {section.left.type === "content" && (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 max-[375px]:p-4 text-right">
                  <div
                    className={cn(
                      "transform transition-all duration-1000",
                      activeSection === index ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                    )}
                    style={{ transitionDelay: `${(section.left.animationDelay || 0) * 1000}ms` }}
                  >
                    <h3
                      className={cn(
                        "mb-2 text-sm font-light uppercase tracking-widest animate-fadeIn transition-colors duration-500",
                        isDarkMode ? "text-amber-400" : "text-amber-700",
                      )}
                    >
                      {section.left.subtitle}
                    </h3>
                    <h2
                      className={cn(
                        "mb-6 text-4xl font-light animate-slideInUp transition-colors duration-500",
                        isDarkMode ? "text-white" : "text-gray-900",
                      )}
                    >
                      {section.left.title}
                    </h2>
                    <p
                      className={cn(
                        "mb-8 max-w-md animate-slideInUp transition-colors duration-500",
                        isDarkMode ? "text-gray-300" : "text-gray-600",
                      )}
                    >
                      {section.left.description}
                    </p>
                    <Button
                      variant="outline"
                      className="border-amber-700 text-amber-700 transition-all duration-300 hover:scale-105 hover:bg-amber-700 hover:text-white hover:shadow-lg animate-slideInUp"
                    >
                      {section.left.cta}
                    </Button>
                  </div>
                </div>
              )}

              {section.left.type === "product-showcase" && (
                <ProductShowcase
                  items={section.left.items}
                  activeSection={activeSection}
                  sectionIndex={index}
                  isDarkMode={isDarkMode}
                />
              )}

              {section.left.type === "product-grid" && (
                <ProductGrid items={section.left.items} activeSection={activeSection} sectionIndex={index} />
              )}

              {section.left.type === "map-widget" && <MapWidget />}

              {section.left.type === "premium-products-left" && (
                <PremiumProductsLeft items={section.left.items} activeSection={activeSection} sectionIndex={index} />
              )}

              {section.left.type === "grid" && (
                <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1">
                  {section.left.items.map((item, i) => (
                    <div
                      key={i}
                      className={cn(
                        "relative overflow-hidden transform transition-all duration-700",
                        activeSection === index
                          ? "translate-y-0 opacity-100 scale-100"
                          : "translate-y-4 opacity-0 scale-95",
                      )}
                      style={{ transitionDelay: `${i * 150}ms` }}
                    >
                      {item.type === "image" && (
                        <div className="group relative h-full w-full">
                          <Image
                            src={item.content || "/placeholder.svg"}
                            alt={item.alt || ""}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
                        </div>
                      )}
                      {item.type === "video" && (
                        <VideoPlayer
                          src={item.content || "/placeholder.svg"}
                          poster={item.content || "/placeholder.svg"}
                          alt={item.alt || ""}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Høgre side */}
            <div className="relative h-full w-1/2 max-[375px]:w-full max-[375px]:h-screen overflow-hidden">
              {section.right.type === "image" && (
                <div
                  ref={(el) => (section.right.parallax ? (parallaxRefs.current[index * 2 + 1] = el) : null)}
                  className="relative h-full w-full will-change-transform"
                >
                  <Image
                    src={section.right.content || "/placeholder.svg"}
                    alt={section.right.alt || ""}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-1000 ease-out",
                      activeSection === index ? "scale-100" : "scale-105",
                    )}
                  />
                  <div className="absolute inset-0 h-screen bg-gradient-to-l from-transparent to-black to-transparent opacity-20" />
                </div>
              )}

              {section.right.type === "content" && (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 max-[375px]:p-4 text-left">
                  <div
                    className={cn(
                      "transform transition-all duration-1000",
                      activeSection === index ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                    )}
                    style={{ transitionDelay: `${(section.right.animationDelay || 0) * 1000}ms` }}
                  >
                    <h3
                      className={cn(
                        "mb-2 text-sm font-light uppercase tracking-widest animate-fadeIn transition-colors duration-500",
                        isDarkMode ? "text-amber-400" : "text-amber-700",
                      )}
                    >
                      {section.right.subtitle}
                    </h3>
                    <h2
                      className={cn(
                        "mb-6 text-4xl font-light animate-slideInUp transition-colors duration-500",
                        isDarkMode ? "text-white" : "text-gray-900",
                      )}
                    >
                      {section.right.title}
                    </h2>
                    <p
                      className={cn(
                        "mb-8 max-w-md animate-slideInUp transition-colors duration-500",
                        isDarkMode ? "text-gray-300" : "text-gray-600",
                      )}
                    >
                      {section.right.description}
                    </p>
                    {section.right.contact && (
                      <div className="mb-8 space-y-2 text-gray-600 animate-slideInUp">
                        <p className="font-medium text-gray-800">{section.right.contact.name}</p>
                        <p className="transition-colors duration-300 hover:text-amber-700">
                          {section.right.contact.address}
                        </p>
                        <p className="transition-colors duration-300 hover:text-amber-700">
                          {section.right.contact.phone}
                        </p>
                        <p className="transition-colors duration-300 hover:text-amber-700">
                          {section.right.contact.email}
                        </p>
                        <p className="text-sm text-gray-500">{section.right.contact.org}</p>
                      </div>
                    )}
                    {section.right.cta && (
                      <Button
                        variant="outline"
                        className="border-amber-700 text-amber-700 transition-all duration-300 hover:scale-105 hover:bg-amber-700 hover:text-white hover:shadow-lg animate-slideInUp"
                      >
                        {section.right.cta}
                      </Button>
                    )}
                  </div>
                </div>
              )}
              {section.right.type === "logo-content" && (
                <LogoContent
                  logoSrc={section.right.logoSrc}
                  subtitle={section.right.subtitle}
                  description={section.right.description}
                  cta={section.right.cta}
                  activeSection={activeSection}
                  sectionIndex={index}
                  animationDelay={section.right.animationDelay || 0}
                  isDarkMode={isDarkMode}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
