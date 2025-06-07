// FILE: components/split-scroll.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShoppingBag,
  Instagram,
  Facebook,
  MapPin,
} from "lucide-react";
// Removed problematic import: import { AperitiffIcon, SkalldyrIcon, FiskIcon, FyldeIcon, FriskhetIcon, SodmeIcon, DrikkeIkon } from "@/components/icons"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import MapWidget from "@/components/map-widget";

import type { JSX } from "react";

// --- Placeholder Icon Components ---
// Replace these with your actual icon components and correct import path
const AperitiffIcon = () => <span className="mr-2">[AI]</span>;
const SkalldyrIcon = () => <span className="mr-2">[SI]</span>;
const FiskIcon = () => <span className="mr-2">[FI]</span>;
const FyldeIcon = () => <span className="mr-2">[FyI]</span>;
const FriskhetIcon = () => <span className="mr-2">[FrI]</span>;
const SodmeIcon = () => <span className="mr-2">[SoI]</span>;
const DrikkeIkon = () => <span className="mr-2">[DI]</span>; // Used as a fallback and for LystKjøttIcon
// --- End Placeholder Icon Components ---

interface SectionChangeData {
  activeSectionIndex: number;
  currentLabelColor: string | null;
  isDarkSection: boolean;
}

interface SplitScrollProps {
  onSectionChange: (data: SectionChangeData) => void;
  activeLabelColor?: string | null;
  isDarkSection?: boolean;
}

const TRADISJON_LABEL_COLOR = "#A42F2A";
const GRAVENSTEIN_LABEL_COLOR = "#B08D57";

// Section names for navigation tooltips
const sectionNames: Record<string, string> = {
  heim: "Heim",
  tradisjon: "Tradisjon",
  garden: "Garden",
  opplevingar: "Opplevingar",
  "var-tradisjon-sider": "Tradisjon Sider",
  "var-gravenstein-sider": "Gravenstein Sider",
  "alle-produkta": "Alle Produkta",
  kontakt: "Kontakt",
};

interface SectionContent {
  type: string;
  content?: any;
  alt?: string;
  parallax?: boolean;
  logoSrc?: string;
  subtitle?: string;
  description?: string;
  title?: string;
  cta?: string;
  animationDelay?: number;
  product?: any;
  items?: any[];
  contact?: any;
}

interface SectionDefinition {
  id: string;
  isDark?: boolean;
  labelColor?: string;
  left: SectionContent;
  right: SectionContent;
  fullWidthComponent?: () => JSX.Element;
}

const sections: SectionDefinition[] = [
  {
    id: "heim",
    left: {
      type: "image",
      content: "/images/hardanger-landscape.png",
      alt: "Hardanger med epleblom og fjord",
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
        "I over 200 år har familiar i Hardanger dyrka eple og laga sider. Me held fram denne stolte tradisjonen med respekt for naturen og dei gamle metodane, samstundes som me nyttar moderne teknikkar for å sikra høgste kvalitet.",
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
      type: "image",
      content:
        "https://cdn.builder.io/api/v1/image/assets%2F710ef2426b47492d85e479b0bfe5e2d6%2F7f6c49c773934a14bc479d23fcf44bb1",
      alt: "Gardbrukar blant epleblom",
      parallax: true,
    },
    right: {
      type: "content",
      title: "Garden Hakastad",
      subtitle: "Tradisjon og kvalitet",
      description:
        "Me dyrkar dei vanlege eplesortane som Gravenstein, Discovery, Aroma og James Grieve. Garden ligg sørvendt og solrikt, noko som gjev optimale vilkår for epleproduksjon i det unike klimaet i Hardanger.",
      cta: "Sjå eplesortane",
      animationDelay: 0.3,
    },
  },
  {
    id: "opplevingar",
    isDark: true,
    left: {
      type: "image",
      content:
        "https://cdn.builder.io/api/v1/image/assets%2F710ef2426b47492d85e479b0bfe5e2d6%2F2f46b68e69a24757bedbe3db5c8a9843",
      alt: "Besøkande i eplehagen",
      parallax: true,
    },
    right: {
      type: "content",
      title: "Opplevingar",
      subtitle: "Smak og opplev",
      description:
        "Kom og opplev Hardanger og smak på våre eksepsjonelle sider og eplemost. Me tilbyr omvising på garden og sidersmak i dei vakre omgjevnadene i Hardanger. Opplev tradisjonen og handverket bak kvar flaske.",
      cta: "Bestill omvising",
      animationDelay: 0.4,
    },
  },
  {
    id: "var-tradisjon-sider",
    isDark: true,
    labelColor: TRADISJON_LABEL_COLOR,
    left: {
      type: "single-product-showcase",
      product: {
        name: "Ulvik Frukt & Cideri Sider Frå Hardanger Tradisjon",
        category: "SIDER",
        bottleImage: "/images/tradisjon-large.png",
        origin: "Noreg, Vestland, Hardanger",
        description:
          "Saftig med god friskheit, fokusert preg av mogne eple, hint av grøne urter og krydder. Mjuk brus.",
        availability: "Kan bestillast til alle butikkar",
        storeLinkText: "Vis butikkar med varen på lager",
        delivery: "Post/Levering: Kan bestillast",
        foodPairingsAndTaste: [
          { icon: "AperitiffIcon", text: "APERITIFF" },
          { icon: "SkalldyrIcon", text: "SKALLDYR" },
          { icon: "FiskIcon", text: "FISK" },
          { icon: "FyldeIcon", text: "FYLDE" },
          { icon: "FriskhetIcon", text: "FRISKHEIT" },
          { icon: "SodmeIcon", text: "SØDME" },
        ],
      },
    },
    right: { type: "empty-pane-for-single-product" },
  },
  {
    id: "var-gravenstein-sider",
    isDark: true,
    labelColor: GRAVENSTEIN_LABEL_COLOR,
    left: {
      type: "single-product-showcase",
      product: {
        name: "Ulvik Sider frå Hardanger Gravenstein",
        category: "SIDER",
        bottleImage: "/images/gravenstein-large.png",
        origin: "Noreg, Vestland, Hardanger",
        description:
          "Fyldig, vinøs og god sødme. Svakt syrleg, lang ettersmak med smak av mandel.",
        availability: "Kan bestillast til alle butikkar",
        storeLinkText: "Vis butikkar med varen på lager",
        delivery: "Post/Levering: Kan bestillast",
        foodPairingsAndTaste: [
          { icon: "AperitiffIcon", text: "APERITIFF" },
          { icon: "FiskIcon", text: "FISK" },
          { icon: "LystKjøttIcon", text: "LYST KJØT" },
          { icon: "FyldeIcon", text: "FYLDE" },
          { icon: "FriskhetIcon", text: "FRISKHEIT" },
          { icon: "SodmeIcon", text: "SØDME" },
        ],
      },
    },
    right: { type: "empty-pane-for-single-product" },
  },
  {
    id: "alle-produkta",
    isDark: true,
    left: {
      type: "product-grid",
      items: [
        {
          type: "image",
          content: "/images/gravenstein-large.png",
          alt: "Gravenstein Sider",
          title: "Gravenstein",
          description: "Fyldig, vinøs og god sødme.",
          details: "8% alkohol • 9 g/l sukker",
        },
        {
          type: "image",
          content: "/images/tradisjon-large.png",
          alt: "Tradisjon Sider",
          title: "Tradisjon",
          description: "Saftig med god friskheit.",
          details: "8% alkohol • 13,2 g/l sukker",
        },
        {
          type: "image",
          content: "/images/stille-stunder.png",
          alt: "Stille Stunder",
          title: "Stille Stunder",
          description: "Konsentrert eple.",
          details: "8% alkohol • Under 3 g/l sukker",
        },
        {
          type: "image",
          content: "/images/hylleblomsider.png",
          alt: "Hylleblomsider",
          title: "Hylleblomsider",
          description: "Søtleg med god syrebalanse.",
          details: "7,5% alkohol • 36 g/l sukker",
        },
        {
          type: "image",
          content: "/images/svartsurbaer.png",
          alt: "Svartsurbær",
          title: "Svartsurbær",
          description: "Lang ettersmak av eple.",
          details: "8% alkohol • Under 3 g/l sukker",
        },
        {
          type: "image",
          content: "/images/cider-bottles-outdoor.png",
          alt: "Sider utandørs",
          title: "Eplemost",
          description: "Naturleg eplemost.",
          details: "Alkoholfri • Naturleg søt",
        },
      ],
    },
    right: {
      type: "content",
      title: "Heile Kolleksjonen",
      subtitle: "Seks unike sider",
      description:
        "Opplev heile spekteret av våre handverksider. Frå den klassiske Gravenstein til den innovative Svartsurbær - kvar flaske fortel si eiga historie om Hardanger sitt terroir og vår lidenskap for kvalitet.",
      animationDelay: 0.6,
    },
  },
  {
    id: "kontakt",
    isDark: false,
    left: { type: "map-widget" },
    right: {
      type: "content",
      title: "Velkomen til Hakastad",
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
];

const SingleProductShowcase = ({
  product,
  activeSection,
  sectionIndex,
  isDarkMode,
}: {
  product: any;
  activeSection: number;
  sectionIndex: number;
  isDarkMode: boolean;
}) => {
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-700";
  const headingColor = isDarkMode ? "text-white" : "text-black";
  const subHeadingColor = isDarkMode ? "text-amber-400" : "text-amber-600";
  const linkColor = isDarkMode
    ? "text-amber-300 hover:text-amber-200"
    : "text-amber-600 hover:text-amber-700";

  const renderIcon = (iconName: string | undefined) => {
    switch (iconName) {
      case "AperitiffIcon":
        return <AperitiffIcon />;
      case "SkalldyrIcon":
        return <SkalldyrIcon />;
      case "FiskIcon":
        return <FiskIcon />;
      case "LystKjøttIcon":
        return <DrikkeIkon />; // Placeholder for LystKjøttIcon
      case "FyldeIcon":
        return <FyldeIcon />;
      case "FriskhetIcon":
        return <FriskhetIcon />;
      case "SodmeIcon":
        return <SodmeIcon />;
      default:
        return <DrikkeIkon />;
    }
  };

  return (
    <div
      className={cn(
        "flex h-full w-full transition-opacity duration-1000 ease-out",
        activeSection === sectionIndex ? "opacity-100" : "opacity-0",
        isDarkMode ? "bg-black" : "bg-[#f8f5f0]",
        "max-[768px]:flex-col",
      )}
    >
      <div className="w-1/2 max-[768px]:w-full max-[768px]:h-1/2 flex items-center justify-center p-8 relative overflow-hidden">
        <Image
          src={
            product.bottleImage ||
            "/placeholder.svg?height=900&width=300&text=Bottle"
          }
          alt={product.name}
          width={285}
          height={855}
          className={cn(
            "object-contain transition-all duration-1000 ease-out drop-shadow-2xl",
            activeSection === sectionIndex
              ? "scale-100 translate-y-0 rotate-0"
              : "scale-75 translate-y-10 -rotate-10 translate-x-10",
          )}
        />
      </div>
      <div
        className={cn(
          "w-1/2 max-[768px]:w-full max-[768px]:h-auto flex items-center justify-center p-8 md:p-12",
          textColor,
        )}
      >
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl space-y-6">
          <p className={`text-sm uppercase tracking-wider ${subHeadingColor}`}>
            {product.category}
          </p>
          <h1 className={`text-3xl md:text-4xl font-light ${headingColor}`}>
            {product.name}
          </h1>
          <p className={`text-xs ${textColor}`}>{product.origin}</p>
          <p className="text-lg leading-relaxed">{product.description}</p>

          <div className="space-y-2 text-sm mt-4">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>
                {product.availability}.{" "}
                <a href="#" className={linkColor}>
                  {product.storeLinkText}
                </a>
              </span>
            </div>
            <div className="flex items-center">
              <ShoppingBag size={16} className="mr-2" />
              <span>{product.delivery}</span>
            </div>
          </div>
          <hr
            className={cn(
              "my-6",
              isDarkMode ? "border-gray-700" : "border-gray-300",
            )}
          />

          {product.foodPairingsAndTaste &&
            product.foodPairingsAndTaste.length > 0 && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {product.foodPairingsAndTaste.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center">
                    {renderIcon(item.icon)} <span>{item.text}</span>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

const VideoPlayer = ({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className="group relative h-full w-full overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={poster}
        muted={isMuted}
        loop
        playsInline
      >
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
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8 pl-1" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-full bg-white bg-opacity-80 text-amber-700 hover:bg-white hover:bg-opacity-100"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

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
  logoSrc: string;
  subtitle: string;
  description: string;
  cta: string;
  activeSection: number;
  sectionIndex: number;
  animationDelay: number;
  isDarkMode: boolean;
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 max-[375px]:p-4 text-left">
      <div
        className={cn(
          "transform transition-all duration-1200 ease-out",
          activeSection === sectionIndex
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0",
        )}
        style={{ transitionDelay: `${animationDelay * 1000}ms` }}
      >
        <div className="mb-8 animate-scaleIn">
          <Image
            src={logoSrc || "/placeholder.svg?height=120&width=320&text=Logo"}
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
  );
};

const ProductGrid = ({
  items,
  activeSection,
  sectionIndex,
}: {
  items: any[];
  activeSection: number;
  sectionIndex: number;
}) => {
  return (
    <div className="h-full w-full p-8 overflow-y-auto">
      <div className="grid grid-cols-2 gap-6 max-h-full">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "group relative flex flex-col items-center p-3 max-[375px]:p-2 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-500 border border-white border-opacity-10",
              activeSection === sectionIndex
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="relative h-40 w-28 mb-3">
              <Image
                src={
                  item.content ||
                  "/placeholder.svg?height=160&width=112&text=Product"
                }
                alt={item.alt}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h4 className="text-sm font-medium text-white mb-1 text-center">
              {item.title}
            </h4>
            <p className="text-xs text-gray-300 mb-2 text-center leading-tight">
              {item.description}
            </p>
            <p className="text-xs text-amber-400 font-medium mb-1">
              {item.details}
            </p>
            {item.pairing && (
              <p className="text-xs text-gray-400 text-center">
                {item.pairing}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SplitScroll({
  onSectionChange,
  activeLabelColor,
  isDarkSection,
}: SplitScrollProps) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentSectionData = sections[activeSectionIndex];
  const isCurrentSectionDark = !!currentSectionData?.isDark;

  const scrollToSection = useCallback(
    (index: number) => {
      if (isScrolling || index === activeSectionIndex) return;
      setIsScrolling(true);
      setTimeout(() => {
        const sectionElement = sectionRefs.current[index];
        if (sectionElement && containerRef.current) {
          containerRef.current.scrollTo({
            top: sectionElement.offsetTop,
            behavior: "smooth",
          });
          window.history.pushState(null, "", `#${sections[index].id}`);
        }
        setTimeout(() => {
          setIsScrolling(false);
        }, 1200);
      }, 300);
    },
    [activeSectionIndex, isScrolling],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (!container) return;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress);

      parallaxRefs.current.forEach((ref, parallaxElementIndex) => {
        if (ref) {
          const sectionIndexForParallax = Math.floor(parallaxElementIndex / 2);
          const currentSectionRef =
            sectionRefs.current[sectionIndexForParallax];
          const sectionTop = currentSectionRef?.offsetTop || 0;
          const offset = (scrollTop - sectionTop) * 0.3;
          ref.style.transform = `translateY(${offset}px)`;
        }
      });

      if (isScrolling) return;
      const viewportHeight = window.innerHeight;
      let newActiveSection = activeSectionIndex;

      for (let i = 0; i < sectionRefs.current.length; i++) {
        const section = sectionRefs.current[i];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (
            scrollTop >= sectionTop - viewportHeight * 0.5 &&
            scrollTop < sectionTop + sectionHeight - viewportHeight * 0.5
          ) {
            newActiveSection = i;
            break;
          }
          if (
            i === sectionRefs.current.length - 1 &&
            scrollTop + viewportHeight >= scrollHeight + viewportHeight - 10
          ) {
            newActiveSection = i;
          }
        }
      }
      if (newActiveSection !== activeSectionIndex) {
        setActiveSectionIndex(newActiveSection);
        if (!isScrolling)
          window.history.pushState(
            null,
            "",
            `#${sections[newActiveSection].id}`,
          );
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const index = sections.findIndex((section) => section.id === hash);
      if (index !== -1 && index !== activeSectionIndex)
        setTimeout(() => scrollToSection(index), 500);
    }
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeSectionIndex, isScrolling, scrollToSection]);

  useEffect(() => {
    const currentSection = sections[activeSectionIndex];
    if (currentSection) {
      onSectionChange({
        activeSectionIndex: activeSectionIndex,
        currentLabelColor: currentSection.labelColor || null,
        isDarkSection: !!currentSection.isDark,
      });
    }
  }, [activeSectionIndex, onSectionChange]);

  return (
    <>
      <div
        className="fixed left-0 top-0 z-40 h-1 bg-amber-700 transition-all duration-300"
        style={{ width: `${scrollProgress * 100}%` }}
      />
      <div
        ref={containerRef}
        className={cn(
          "h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth relative transition-colors duration-700",
          isCurrentSectionDark ? "bg-black" : "bg-[#f8f5f0]",
        )}
        style={{ scrollSnapType: "y mandatory" }}
      >
        <div className="fixed left-4 md:left-6 top-1/2 z-30 -translate-y-1/2 transform">
          <div className="flex flex-col space-y-3">
            {sections.map((section, index) => {
              const isActive = index === activeSectionIndex;
              const isPassed = index <= activeSectionIndex;
              const sectionName = sectionNames[section.id] || section.id;

              // Use same color logic as logo
              const dotColor = activeLabelColor
                ? activeLabelColor
                : isDarkSection
                  ? "#FFFFFF"
                  : "#000000";
              return (
                <div key={section.id} className="relative group">
                  <button
                    onClick={() => scrollToSection(index)}
                    aria-label={`Gå til seksjon ${sectionName}`}
                    className={cn(
                      "h-3 w-3 rounded-full transition-all duration-300 border-2",
                      "hover:scale-110",
                    )}
                    style={{
                      borderColor: dotColor,
                      backgroundColor: isPassed ? dotColor : "transparent",
                    }}
                  />

                  {/* Tooltip */}
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-40">
                    <div
                      className="px-2 py-1 text-xs font-medium rounded shadow-lg whitespace-nowrap"
                      style={{
                        backgroundColor: dotColor,
                        color: isDarkSection ? "#000000" : "#FFFFFF",
                      }}
                    >
                      {sectionName}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {sections.map((section, index) => {
          if (section.fullWidthComponent) {
            return (
              <div
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="h-auto min-h-screen w-full flex items-center justify-center"
                style={{ scrollSnapAlign: "start" }}
              >
                {section.fullWidthComponent()}
              </div>
            );
          }
          return (
            <div
              key={section.id}
              id={section.id}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className={cn(
                "flex h-screen w-full transition-all duration-1000 ease-in-out relative",
                "max-[375px]:flex-col max-[375px]:h-auto max-[375px]:min-h-screen",
                section.left.type === "single-product-showcase" ? "p-0" : "",
              )}
              style={{ scrollSnapAlign: "start" }}
            >
              {section.left.type === "single-product-showcase" ? (
                <SingleProductShowcase
                  product={section.left.product}
                  activeSection={activeSectionIndex}
                  sectionIndex={index}
                  isDarkMode={!!section.isDark}
                />
              ) : (
                <>
                  <div
                    className={cn(
                      "relative h-full w-1/2 overflow-hidden",
                      "max-[375px]:w-full max-[375px]:h-1/2",
                      "border-r",
                      section.isDark ? "border-gray-700" : "border-gray-200",
                      "max-[375px]:border-r-0 max-[375px]:border-b",
                    )}
                  >
                    {section.left.type === "image" && (
                      <div
                        ref={(el) => {
                          if (section.left.parallax) {
                            parallaxRefs.current[index * 2] = el;
                          }
                        }}
                        className="relative h-full w-full will-change-transform"
                      >
                        <Image
                          src={
                            section.left.content ||
                            "/placeholder.svg?height=800&width=600&text=Image"
                          }
                          alt={section.left.alt || "Section image"}
                          fill
                          priority={index < 2}
                          className={cn(
                            "object-cover transition-transform duration-1000 ease-out",
                            activeSectionIndex === index
                              ? "scale-100"
                              : "scale-105",
                          )}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-black/20 opacity-20" />
                      </div>
                    )}
                    {section.left.type === "content" && (
                      <div className="flex h-full w-full flex-col items-center justify-center p-6 max-[375px]:p-4 text-right">
                        <div
                          className={cn(
                            "transform transition-all duration-1000",
                            activeSectionIndex === index
                              ? "translate-y-0 opacity-100"
                              : "translate-y-8 opacity-0",
                          )}
                          style={{
                            transitionDelay: `${(section.left.animationDelay || 0) * 1000}ms`,
                          }}
                        >
                          <h3
                            className={cn(
                              "mb-2 text-sm font-light uppercase tracking-widest animate-fadeIn transition-colors duration-500",
                              section.isDark
                                ? "text-amber-400"
                                : "text-amber-700",
                            )}
                          >
                            {section.left.subtitle}
                          </h3>
                          <h2
                            className={cn(
                              "mb-6 text-4xl font-light animate-slideInUp transition-colors duration-500",
                              section.isDark ? "text-white" : "text-gray-900",
                            )}
                          >
                            {section.left.title}
                          </h2>
                          <p
                            className={cn(
                              "mb-8 max-w-md animate-slideInUp transition-colors duration-500",
                              section.isDark
                                ? "text-gray-300"
                                : "text-gray-600",
                            )}
                          >
                            {section.left.description}
                          </p>
                          <Button
                            variant="outline"
                            className={cn(
                              "border-amber-700 text-amber-700 transition-all duration-300 hover:scale-105 hover:text-white hover:shadow-lg animate-slideInUp",
                              section.isDark
                                ? "hover:bg-amber-500 border-amber-500 text-amber-500"
                                : "hover:bg-amber-700",
                            )}
                          >
                            {section.left.cta}
                          </Button>
                        </div>
                      </div>
                    )}
                    {section.left.type === "product-grid" && (
                      <ProductGrid
                        items={section.left.items || []}
                        activeSection={activeSectionIndex}
                        sectionIndex={index}
                      />
                    )}
                    {section.left.type === "map-widget" && <MapWidget />}
                  </div>
                  <div
                    className={cn(
                      "relative h-full w-1/2 overflow-hidden flex flex-col",
                      "max-[375px]:w-full max-[375px]:h-1/2",
                    )}
                  >
                    {section.right.type === "image" && (
                      <div
                        ref={(el) => {
                          if (section.right.parallax) {
                            parallaxRefs.current[index * 2 + 1] = el;
                          }
                        }}
                        className="relative h-full w-full will-change-transform"
                      >
                        <Image
                          src={
                            section.right.content ||
                            "/placeholder.svg?height=800&width=600&text=Image"
                          }
                          alt={section.right.alt || "Section image"}
                          fill
                          priority={index < 2}
                          className={cn(
                            "object-cover transition-transform duration-1000 ease-out",
                            activeSectionIndex === index
                              ? "scale-100"
                              : "scale-105",
                          )}
                        />
                        <div className="absolute inset-0 h-full bg-gradient-to-l from-transparent via-black/5 to-black/20 opacity-20" />
                      </div>
                    )}
                    {section.right.type === "content" && (
                      <div className="flex h-full w-full flex-col items-center justify-center p-6 max-[375px]:p-4 text-left flex-grow">
                        <div
                          className={cn(
                            "transform transition-all duration-1000",
                            activeSectionIndex === index
                              ? "translate-y-0 opacity-100"
                              : "translate-y-8 opacity-0",
                          )}
                          style={{
                            transitionDelay: `${(section.right.animationDelay || 0) * 1000}ms`,
                          }}
                        >
                          <h3
                            className={cn(
                              "mb-2 text-sm font-light uppercase tracking-widest animate-fadeIn transition-colors duration-500",
                              section.isDark
                                ? "text-amber-400"
                                : "text-amber-700",
                            )}
                          >
                            {section.right.subtitle}
                          </h3>
                          <h2
                            className={cn(
                              "mb-6 text-4xl font-light animate-slideInUp transition-colors duration-500",
                              section.isDark ? "text-white" : "text-gray-900",
                            )}
                          >
                            {section.right.title}
                          </h2>
                          <p
                            className={cn(
                              "mb-8 max-w-md animate-slideInUp transition-colors duration-500",
                              section.isDark
                                ? "text-gray-300"
                                : "text-gray-600",
                            )}
                          >
                            {section.right.description}
                          </p>
                          {section.right.contact && (
                            <div
                              className={cn(
                                "mb-8 space-y-2 animate-slideInUp",
                                section.isDark
                                  ? "text-gray-400"
                                  : "text-gray-600",
                              )}
                            >
                              <p
                                className={cn(
                                  "font-medium",
                                  section.isDark
                                    ? "text-gray-200"
                                    : "text-gray-800",
                                )}
                              >
                                {section.right.contact.name}
                              </p>
                              <p className="transition-colors duration-300 hover:text-amber-700">
                                {section.right.contact.address}
                              </p>
                              <p className="transition-colors duration-300 hover:text-amber-700">
                                {section.right.contact.phone}
                              </p>
                              <p className="transition-colors duration-300 hover:text-amber-700">
                                {section.right.contact.email}
                              </p>
                              <p
                                className={cn(
                                  "text-sm",
                                  section.isDark
                                    ? "text-gray-500"
                                    : "text-gray-500",
                                )}
                              >
                                {section.right.contact.org}
                              </p>
                            </div>
                          )}
                          {section.right.cta && (
                            <Button
                              variant="outline"
                              className={cn(
                                "border-amber-700 text-amber-700 transition-all duration-300 hover:scale-105 hover:text-white hover:shadow-lg animate-slideInUp",
                                section.isDark
                                  ? "hover:bg-amber-500 border-amber-500 text-amber-500"
                                  : "hover:bg-amber-700",
                              )}
                            >
                              {section.right.cta}
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                    {section.right.type === "logo-content" && (
                      <div className="flex h-full w-full flex-col items-center justify-center p-6 max-[375px]:p-4 text-left flex-grow">
                        <LogoContent
                          logoSrc={section.right.logoSrc || ""}
                          subtitle={section.right.subtitle || ""}
                          description={section.right.description || ""}
                          cta={section.right.cta || ""}
                          activeSection={activeSectionIndex}
                          sectionIndex={index}
                          animationDelay={section.right.animationDelay || 0}
                          isDarkMode={!!section.isDark}
                        />
                      </div>
                    )}
                    {section.id === "kontakt" && (
                      <div className="mt-auto pb-8 md:pb-12 flex justify-center space-x-6 animate-fadeIn">
                        <a
                          href="https://www.instagram.com/ulvikfruktogcideri/?hl=en"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ulvik Frukt & Cideri Instagram"
                          className={cn(
                            "transition-colors",
                            section.isDark
                              ? "text-gray-400 hover:text-amber-400"
                              : "text-gray-600 hover:text-amber-700",
                          )}
                        >
                          <Instagram size={28} />
                        </a>
                        <a
                          href="https://www.facebook.com/UlvikFruktogCideri/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ulvik Frukt & Cideri Facebook"
                          className={cn(
                            "transition-colors",
                            section.isDark
                              ? "text-gray-400 hover:text-amber-400"
                              : "text-gray-600 hover:text-amber-700",
                          )}
                        >
                          <Facebook size={28} />
                        </a>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
