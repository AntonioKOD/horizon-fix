"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, MapPin, Filter, Star, Shield, Clock, Grid3X3, List } from "lucide-react"
import Image from "next/image"

export default function SearchPage() {
  const [view, setView] = useState("grid")
  const [distance, setDistance] = useState([10])
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [filtersVisible, setFiltersVisible] = useState(false)

  // Mock data for tradespeople
  const tradespeople = [
    {
      id: 1,
      name: "John Smith",
      trade: "Master Electrician",
      rating: 4.9,
      reviews: 128,
      verified: true,
      description:
        "Specializing in residential electrical work with over 15 years of experience. Licensed and insured.",
      tags: ["Electrical", "Smart Home", "Emergency"],
      image: "/placeholder.svg?height=300&width=500&text=John+Smith",
      available: "Today",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      trade: "Plumber",
      rating: 4.8,
      reviews: 94,
      verified: true,
      description: "Expert plumber specializing in repairs, installations, and emergency services. Available 24/7.",
      tags: ["Plumbing", "Emergency", "Bathroom"],
      image: "/placeholder.svg?height=300&width=500&text=Sarah+Johnson",
      available: "Tomorrow",
    },
    {
      id: 3,
      name: "Michael Brown",
      trade: "Carpenter",
      rating: 4.7,
      reviews: 76,
      verified: true,
      description: "Custom carpentry, furniture building, and home renovations. Quality craftsmanship guaranteed.",
      tags: ["Carpentry", "Renovations", "Custom"],
      image: "/placeholder.svg?height=300&width=500&text=Michael+Brown",
      available: "Next Week",
    },
    {
      id: 4,
      name: "Emily Davis",
      trade: "Painter",
      rating: 4.9,
      reviews: 112,
      verified: true,
      description: "Interior and exterior painting services. Eco-friendly options available.",
      tags: ["Painting", "Interior", "Eco-Friendly"],
      image: "/placeholder.svg?height=300&width=500&text=Emily+Davis",
      available: "This Week",
    },
    {
      id: 5,
      name: "David Wilson",
      trade: "HVAC Technician",
      rating: 4.6,
      reviews: 83,
      verified: true,
      description: "Heating, ventilation, and air conditioning services. Repairs and installations.",
      tags: ["HVAC", "Repairs", "Installation"],
      image: "/placeholder.svg?height=300&width=500&text=David+Wilson",
      available: "Today",
    },
    {
      id: 6,
      name: "Jennifer Martinez",
      trade: "Landscaper",
      rating: 4.8,
      reviews: 65,
      verified: true,
      description: "Professional landscaping services including design, maintenance, and installation.",
      tags: ["Landscaping", "Garden", "Outdoor"],
      image: "/placeholder.svg?height=300&width=500&text=Jennifer+Martinez",
      available: "This Week",
    },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Trusted Tradespeople</h1>
        <p className="text-muted-foreground">Search for verified professionals in your area</p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for a service or tradesperson..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative flex-grow">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Your location"
            className="pl-9"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <Button className="md:w-auto w-full">Search</Button>
        <Button variant="outline" className="md:w-auto w-full" onClick={() => setFiltersVisible(!filtersVisible)}>
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:block ${filtersVisible ? "block" : "hidden"}`}>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Trade Category</h3>
              <div className="space-y-2">
                {["Plumbing", "Electrical", "Carpentry", "Painting", "HVAC", "Landscaping"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category.toLowerCase()}`} />
                    <Label htmlFor={`category-${category.toLowerCase()}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Distance</h3>
              <div className="space-y-2">
                <Slider value={distance} onValueChange={setDistance} max={50} step={1} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0 miles</span>
                  <span>{distance[0]} miles</span>
                  <span>50 miles</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Availability</h3>
              <div className="space-y-2">
                {["Today", "This Week", "Next Week", "Flexible"].map((time) => (
                  <div key={time} className="flex items-center space-x-2">
                    <Checkbox id={`time-${time.toLowerCase().replace(" ", "-")}`} />
                    <Label htmlFor={`time-${time.toLowerCase().replace(" ", "-")}`}>{time}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Ratings</h3>
              <div className="space-y-2">
                {[4, 3, 2].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`} className="flex items-center">
                      {rating}+ <Star className="h-3 w-3 ml-1 fill-yellow-500 text-yellow-500" />
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Verification</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="blockchain-verified" />
                  <Label htmlFor="blockchain-verified" className="flex items-center">
                    Blockchain Verified <Shield className="h-3 w-3 ml-1 text-primary" />
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="top-rated" />
                  <Label htmlFor="top-rated">Top Rated</Label>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{tradespeople.length}</span> results
            </div>
            <div className="flex items-center gap-4">
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="distance">Nearest</SelectItem>
                  <SelectItem value="availability">Soonest Available</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-r-none ${view === "grid" ? "bg-muted" : ""}`}
                  onClick={() => setView("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-l-none ${view === "list" ? "bg-muted" : ""}`}
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tradespeople.map((person) => (
                <Card key={person.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video relative">
                    <Image
                      src={person.image || "/placeholder.svg"}
                      alt={person.name}
                      className="object-cover w-full h-full"
                        width={500}
                        height={300}
                        
                    />
                    <div className="absolute top-2 right-2">
                      {person.verified && (
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                          <Shield className="h-3 w-3 mr-1" /> Verified
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="outline" className="bg-background">
                        <Clock className="h-3 w-3 mr-1" /> {person.available}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold">{person.name}</h3>
                        <p className="text-sm text-muted-foreground">{person.trade}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm font-medium">{person.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">({person.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm line-clamp-2 mb-3">{person.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {person.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/profile/${person.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {tradespeople.map((person) => (
                <Card key={person.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 relative">
                      <Image
                        src={person.image || "/placeholder.svg"}
                        alt={person.name}
                        className="object-cover w-full h-full md:h-48"
                        width={500}
                        height={300}

                      />
                      <div className="absolute top-2 right-2">
                        {person.verified && (
                          <Badge variant="secondary" className="bg-primary text-primary-foreground">
                            <Shield className="h-3 w-3 mr-1" /> Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4 md:w-3/4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold">{person.name}</h3>
                            <p className="text-sm text-muted-foreground">{person.trade}</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 text-sm font-medium">{person.rating}</span>
                            <span className="text-xs text-muted-foreground ml-1">({person.reviews})</span>
                          </div>
                        </div>
                        <p className="text-sm mb-3">{person.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {person.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" /> {person.available}
                        </Badge>
                        <Link href={`/profile/${person.id}`}>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="mx-auto">
              Load More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

