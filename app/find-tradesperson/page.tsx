import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Star } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"

export default function FindTradesperson() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find a Tradesperson</h1>

      {/* Search and Filter Bar */}
      <div className="bg-card rounded-lg shadow-sm border p-4 mb-8">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search by trade or keyword" className="pl-10" />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Your location" className="pl-10" />
          </div>
          <Button size="lg" className="w-full md:w-auto">
            Search
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Filters Sidebar */}
        <div className="bg-card rounded-lg shadow-sm border p-6 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button variant="ghost" size="sm">
              Reset
            </Button>
          </div>

          <div className="space-y-6">
            {/* Trade Type */}
            <div>
              <h3 className="font-medium mb-3">Trade Type</h3>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select trade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="carpentry">Carpentry</SelectItem>
                  <SelectItem value="painting">Painting</SelectItem>
                  <SelectItem value="roofing">Roofing</SelectItem>
                  <SelectItem value="landscaping">Landscaping</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Distance */}
            <div>
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">Distance</h3>
                <span className="text-sm text-muted-foreground">25 miles</span>
              </div>
              <Slider defaultValue={[25]} max={50} step={1} />
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-medium mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`} className="flex items-center">
                      {Array(rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      {Array(5 - rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-muted-foreground" />
                        ))}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="font-medium mb-3">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="available-now" />
                  <Label htmlFor="available-now">Available Now</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="available-today" />
                  <Label htmlFor="available-today">Available Today</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="available-this-week" />
                  <Label htmlFor="available-this-week">Available This Week</Label>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div>
              <h3 className="font-medium mb-3">Trust Badges</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="top-rated" />
                  <Label htmlFor="top-rated">Top Rated</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="verified" />
                  <Label htmlFor="verified">Verified</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="eco-friendly" />
                  <Label htmlFor="eco-friendly">Eco-Friendly</Label>
                </div>
              </div>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">120 Results</h2>
              <p className="text-muted-foreground">Showing tradespeople near you</p>
            </div>
            <div className="flex items-center gap-4">
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                </SelectContent>
              </Select>

              <Tabs defaultValue="grid">
                <TabsList>
                  <TabsTrigger value="grid">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
                      <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" />
                      <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" />
                      <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" />
                    </svg>
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="18" height="2" rx="1" fill="currentColor" />
                      <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
                      <rect x="3" y="18" width="18" height="2" rx="1" fill="currentColor" />
                    </svg>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <Tabs>
          <TabsContent value="grid" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={`/placeholder.svg?height=200&width=400&text=Tradesperson ${i + 1}`}
                        alt={`Tradesperson ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">John Doe</h3>
                          <p className="text-muted-foreground">Plumber</p>
                        </div>
                        <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full">
                          <span className="text-sm font-medium">4.9</span>
                          <Star className="h-4 w-4 fill-primary" />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline">10+ Years</Badge>
                        <Badge variant="outline">Verified</Badge>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Available Now</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        Specializing in emergency repairs and bathroom renovations with 10+ years of experience.
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="font-medium">$85</span>
                          <span className="text-muted-foreground"> / hour</span>
                        </div>
                        <Button asChild>
                          <Link href={`/tradesperson/${i + 1}`}>View Profile</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="space-y-4">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-64 flex-shrink-0">
                        <Image
                          src={`/placeholder.svg?height=200&width=300&text=Tradesperson ${i + 1}`}
                          alt={`Tradesperson ${i + 1}`}
                          fill
                          className="object-cover"
                          width={300}
                          height={200}
                          
                        />
                      </div>
                      <CardContent className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold">John Doe</h3>
                            <p className="text-muted-foreground">Plumber</p>
                          </div>
                          <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full">
                            <span className="text-sm font-medium">4.9</span>
                            <Star className="h-4 w-4 fill-primary" />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline">10+ Years</Badge>
                          <Badge variant="outline">Verified</Badge>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Available Now</Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          Specializing in emergency repairs and bathroom renovations with 10+ years of experience.
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="font-medium">$85</span>
                            <span className="text-muted-foreground"> / hour</span>
                          </div>
                          <Button asChild>
                            <Link href={`/tradesperson/${i + 1}`}>View Profile</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-8">
            <Button variant="outline" className="mr-2">
              Previous
            </Button>
            <Button variant="outline" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" className="mx-2">
              2
            </Button>
            <Button variant="outline" className="mr-2">
              3
            </Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

