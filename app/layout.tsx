import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="nn">
      <head>
        <link rel="icon" href="https://ulvik-frukt-cideri.iverfinne.no/favicon.ico" />
        <link rel="apple-touch-icon" href="https://ulvik-frukt-cideri.iverfinne.no/favicon.ico" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
