// FILE: app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter, Spectral } from "next/font/google"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
})

export const metadata: Metadata = {
  title: "Ulvik Frukt & Cideri - Sider frå Hardanger",
  description:
    "Familiebedrift på garden Hakastad i Ulvik. Me produserer handverkssider og eplemost av høgste kvalitet frå tradisjonelle eplesortane i Hardanger.",
  keywords: "sider, cideri, Hardanger, Ulvik, eple, handverk, tradisjon, Gravenstein, familiebedrift",
  authors: [{ name: "Ulvik Frukt & Cideri" }],
  creator: "Ulvik Frukt & Cideri",
  publisher: "Ulvik Frukt & Cideri",
  openGraph: {
    title: "Ulvik Frukt & Cideri - Sider frå Hardanger",
    description: "Familiebedrift på garden Hakastad i Ulvik. Handverkssider og eplemost av høgste kvalitet.",
    url: "https://ulvik-frukt-cideri.no",
    siteName: "Ulvik Frukt & Cideri",
    locale: "nn_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ulvik Frukt & Cideri - Sider frå Hardanger",
    description: "Familiebedrift på garden Hakastad i Ulvik. Handverkssider og eplemost av høgste kvalitet.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nn" className={`${inter.variable} ${spectral.variable}`}>
      {/* Ensure no leading/trailing whitespace directly inside <head> */}
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* The theme-color was previously #581C87 (brandPurple), but brandAccentRed is #A14224.
            Let's use brandAccentRed if that's the primary accent now, or a neutral if preferred.
            For consistency with the Opplevingar section, using brandAccentRed:
        */}
        <meta name="theme-color" content="#A14224" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} bg-brandBeige antialiased`}>{children}</body>
    </html>
  )
}