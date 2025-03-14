"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? "text-primary font-medium" : "text-foreground/80 hover:text-primary"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HorizonFix</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={`text-sm ${isActive("/")}`}>
              Home
            </Link>
            <Link href="/search" className={`text-sm ${isActive("/search")}`}>
              Find Tradespeople
            </Link>
            <Link href="/post-job" className={`text-sm ${isActive("/post-job")}`}>
              Post a Job
            </Link>
            <Link href="/community" className={`text-sm ${isActive("/community")}`}>
              Community
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/search" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Find Tradespeople
                </Link>
                <Link href="/post-job" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Post a Job
                </Link>
                <Link href="/community" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Community
                </Link>
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

