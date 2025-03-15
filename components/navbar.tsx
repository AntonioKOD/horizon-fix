"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Home, User, LogOut, ChevronDown, Bell } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const SearchParams = useSearchParams()
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const user = session?.user
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(SearchParams)
    params.set("q", searchQuery.toLowerCase())
    router.push(`/search/?${params.toString()}`) 
  }

  const navItems = [
    { href: "/post-job", label: "Post a Job" },
    { href: "/community", label: "Community" },
    { href: "/auth/signup-trade", label: "Join as an Expert" },
  ]

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U"
    return user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm"
          : "bg-background border-b",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HorizonFix</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm transition-colors",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/80 hover:bg-muted hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search bar for desktop */}
        <div className="hidden md:flex items-center max-w-xs w-full mx-4">
          <form onSubmit={handleSearch} className="relative w-full group">
            <Input
              type="search"
              placeholder="Search for services..."
              className="pr-10 transition-all border-muted bg-muted/50 focus:bg-background focus:border-primary/50 group-hover:border-primary/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full text-muted-foreground"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                      <AvatarFallback className="bg-primary/10 text-primary">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden lg:inline-block max-w-[100px] truncate">
                      {user.name || "User"}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">{user.email}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/tradesperson-profile/${user.id}`} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="px-4">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="px-4">
                  Sign up
                </Button>
              </Link>
            </div>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              {/* User info in mobile menu */}
              {user && (
                <div className="flex items-center gap-3 py-4 border-b mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                    <AvatarFallback className="bg-primary/10 text-primary">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{user.name || "User"}</p>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Search bar for mobile */}
              <div className="py-4">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="Search for services..."
                    className="pr-10 bg-muted/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full text-muted-foreground"
                  >
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </form>
              </div>

              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-3 py-2 rounded-md text-base transition-colors",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground/80 hover:bg-muted hover:text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {user ? (
                <div className="mt-6 space-y-2">
                  <Link href={`/tradesperson-profile/${user.id}`} onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                    onClick={() => {
                      signOut()
                      setIsOpen(false)
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-6">
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

