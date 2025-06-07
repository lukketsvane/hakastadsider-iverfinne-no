"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(0.3);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const increment = Math.random() * 4 + 2; // Slightly faster increment
        const newProgress = prevProgress + increment;

        // Update logo opacity based on progress
        setLogoOpacity(0.3 + (newProgress / 100) * 0.7);

        if (newProgress >= 100) {
          setIsComplete(true);
          return 100;
        }

        return newProgress;
      });
    }, 40); // Slightly faster interval

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  // Handle completion
  useEffect(() => {
    if (isComplete) {
      const completionTimer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 500); // Small delay after reaching 100%

      return () => clearTimeout(completionTimer);
    }
  }, [isComplete, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f5f0] via-[#f5f1e8] to-[#f0ebe0] transition-opacity duration-500 ${isComplete ? "opacity-0" : "opacity-100"}`}
    >
      {/* Logo with dynamic opacity */}
      <div className="relative mb-16">
        <Image
          src="/images/ulvik-logo.svg"
          alt="Ulvik Frukt & Cideri"
          width={200}
          height={70}
          className="relative h-auto w-auto transition-opacity duration-300"
          style={{ opacity: logoOpacity }}
        />
      </div>

      {/* Progress indicator */}
      <div className="w-64 h-1 bg-black bg-opacity-10 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-600 transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress text */}
      <div className="mt-4 text-sm font-light text-gray-600">
        {Math.round(progress)}%
      </div>
    </div>
  );
}
