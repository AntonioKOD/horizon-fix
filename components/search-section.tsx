import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

interface SearchSectionProps {
  title: string
}

export default function SearchSection({ title }: SearchSectionProps) {
  return (
    <section className="py-12 bg-background">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-2xl font-bold text-center">{title}</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search for a service..." className="pl-9 w-full" />
            </div>
            <div className="relative flex-grow">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="text" placeholder="Your location" className="pl-9 w-full" />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

