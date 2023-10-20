import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "@/styles/globals.css"

import { PropsWithChildren } from "react"
import { Providers } from "@/providers"

import { siteConfig } from "@/config/site"
import { absoluteUrl, cn } from "@/lib/utils"
import { TailwindIndicator } from "@/components/tailwind-indicator"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.description}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: "transparent",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${absoluteUrl("/og.png")}`],
    creator: "@iamshgulati",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(`${siteConfig.url}`),
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{siteConfig.name}</title>
      </head>
      <body className={cn(fontSans.variable, fontHeading.variable)}>
        <div id="skip-navigation" />
        <Providers>
          {children}
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
