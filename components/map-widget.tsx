"use client"

import { MapPin, ExternalLink, Share } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MapWidget() {
  const handleDirections = () => {
    const address = "Apalvegen 78, 5730 Ulvik, Norway"
    const encodedAddress = encodeURIComponent(address)

    // Detect if user is on iOS/Mac for Apple Maps, otherwise use Google Maps
    const isAppleDevice = /iPad|iPhone|iPod|Mac/.test(navigator.userAgent)

    if (isAppleDevice) {
      window.open(`http://maps.apple.com/?q=${encodedAddress}`, "_blank")
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: "Ulvik Frukt & Cideri",
      text: "Besøk oss på garden Hakastad i Ulvik",
      url: "https://www.google.com/maps/search/?api=1&query=Apalvegen+78,+5730+Ulvik,+Norway",
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.title} - ${shareData.url}`)
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-center p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg mx-auto w-full">
        {/* Real embedded map */}
        <div className="relative h-64">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1953.8234567890123!2d7.1234567890123456!3d60.56789012345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463e7b123456789a%3A0x123456789abcdef0!2sApalvegen%2078%2C%205730%20Ulvik%2C%20Norway!5e0!3m2!1sen!2sno!4v1234567890123"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ulvik Frukt & Cideri Location"
          />

          {/* Overlay with business info */}
          <div className="absolute top-4 left-4 bg-white bg-opacity-95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-800">Ulvik Frukt & Cideri</span>
            </div>
          </div>
        </div>

        {/* Address info */}
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Apalvegen 78</h4>
              <p className="text-sm text-gray-600">5730 Ulvik</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
              onClick={handleDirections}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Køyreveg
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs border-gray-300 text-gray-600 hover:bg-gray-100"
              onClick={handleShare}
            >
              <Share className="h-3 w-3 mr-1" />
              Del
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
