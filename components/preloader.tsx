"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(0.3);

  useEffect(() => {
    let currentProgress = 0;
    const totalDuration = 2500; // 2.5 seconds total
    const intervalTime = 50; // Update every 50ms
    const increment = 100 / (totalDuration / intervalTime); // Calculate increment to reach 100% in totalDuration

    const progressInterval = setInterval(() => {
      currentProgress += increment;

      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setLogoOpacity(1);
        clearInterval(progressInterval);

        // Call completion after a brief delay
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
        }, 300);
      } else {
        setProgress(currentProgress);
        setLogoOpacity(0.3 + (currentProgress / 100) * 0.7);
      }
    }, intervalTime);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f5f0] via-[#f5f1e8] to-[#f0ebe0]">
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
          className="h-full bg-amber-600 transition-all duration-75 ease-out"
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
