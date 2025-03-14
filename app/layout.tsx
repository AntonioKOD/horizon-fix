import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SessionProviderWrapper from "@/components/SessionProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HorizonFix - Find Trusted Tradespeople",
  description: "Connect with verified tradespeople for your home improvement and repair needs",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <SessionProviderWrapper>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          
        </SessionProviderWrapper>
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

