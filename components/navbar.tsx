"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Home } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react"
import {signOut} from 'next-auth/react'


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const { data: session } = useSession()

  const user = session?.user


  const isActive = (path: string) => {
    return pathname === path ? "text-primary font-medium" : "text-foreground/80 hover:text-primary"
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
    // You could redirect to a search results page with the query
    // router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const navItems = [
    // Removed "Home" link from navigation
    // Removed "Find Tradespeople" as it's replaced with search bar
    { href: "/post-job", label: "Post a Job" },
    { href: "/community", label: "Community" },
    { href: "/auth/signup-trade", label: "Join as an Expert" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HorizonFix</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`text-sm ${isActive(item.href)}`}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search bar for desktop */}
        <div className="hidden md:flex items-center max-w-xs w-full mx-4">
          <form onSubmit={handleSearch} className="relative w-full">
            <Input
              type="search"
              placeholder="Search for services..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              
              <div>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  Logout
                </Button>
                <Link href={`/tradesperson-profile/${user.id}`}>
                  <Button variant="ghost" size="sm">
                    Profile
                  </Button>
                </Link>
                </div>
              
            ) : (
              <div>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign up</Button>
              </Link>
              </div>
            )}
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              {/* Search bar for mobile */}
              <div className="pt-6 pb-4">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="Search for services..."
                    className="pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </form>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

