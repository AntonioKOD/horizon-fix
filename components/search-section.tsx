import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { searchTradespeople } from "@/actions"
import { useState } from "react"



interface SearchSectionProps {
  title: string
}

export default function SearchSection({ title }: SearchSectionProps) {
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  

    

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await searchTradespeople(search)
    setLoading(false)
    
  }

  if(loading){
    return (
      <div>Loading....</div>
    )
  }

  return (
    <section className="py-12 bg-background">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-2xl font-bold text-center">{title}</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="search" placeholder="Search for a service..." className="pl-9 w-full" onChange={(e)=> setSearch(e.target.value)} />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Search
              </Button>
            </form>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

