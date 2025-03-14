import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Star } from "lucide-react"
import Image from "next/image"

interface Tradesperson {
  id: number
  name: string
  profession: string
  rating: number
  reviews: number
  description: string
  tags: string[]
  imageSrc: string
}

interface FeaturedTradespeopleProps {
  title: string
  tradespeople: Tradesperson[]
  viewAllText: string
  viewAllLink: string
}

export default function FeaturedTradespeople({
  title,
  tradespeople,
  viewAllText,
  viewAllLink,
}: FeaturedTradespeopleProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tradespeople.map((person) => (
            <Card key={person.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <Image
                  src={person.imageSrc || "/placeholder.svg"}
                  alt={person.name}
                  className="object-cover w-full h-full"
                    width={800}
                    height={600}
                    
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    <Shield className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{person.name}</h3>
                    <p className="text-muted-foreground">{person.profession}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{person.rating}</span>
                    <span className="text-muted-foreground ml-1">({person.reviews})</span>
                  </div>
                </div>
                <p className="line-clamp-2 mb-4">{person.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {person.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link href={`/profile/${person.id}`}>
                  <Button className="w-full">View Profile</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href={viewAllLink}>
            <Button variant="outline">{viewAllText}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

