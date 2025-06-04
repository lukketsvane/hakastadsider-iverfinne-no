"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [logoOpacity, setLogoOpacity] = useState(0.3)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const increment = Math.random() * 3 + 1
        const newProgress = prevProgress + increment

        // Update logo opacity based on progress
        setLogoOpacity(0.3 + (newProgress / 100) * 0.7)

        return newProgress > 100 ? 100 : newProgress
      })
    }, 50)

    return () => {
      clearInterval(progressInterval)
    }
  }, [])

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

      {/* Progress bar with properly aligned circles */}
      <div className="relative w-80">
        <div className="h-1 w-full rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Properly aligned circles */}
        <div className="absolute -top-1.5 left-0 h-4 w-4 rounded-full bg-amber-600 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-white"></div>
        </div>
        <div
          className="absolute -top-1.5 h-4 w-4 rounded-full bg-amber-600 transition-all duration-300 flex items-center justify-center"
          style={{ left: `calc(${progress}% - 8px)` }}
        >
          <div className="h-2 w-2 rounded-full bg-white"></div>
        </div>
        <div className="absolute -top-1.5 right-0 h-4 w-4 rounded-full bg-gray-300 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  )
}
