import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface ServiceCategory {
  name: string
  icon: LucideIcon
  href: string
}

interface ServiceCategoriesProps {
  title: string
  categories: ServiceCategory[]
}

export default function ServiceCategories({ title, categories }: ServiceCategoriesProps) {
  return (
    <section className="py-12 bg-secondary">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link key={index} href={category.href}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {<category.icon className="h-10 w-10 mb-2 text-primary" />}
                  <h3 className="font-medium text-center">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

