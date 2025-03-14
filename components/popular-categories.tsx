import { Wrench, Zap, Hammer, PaintBucket, Ruler, Droplet, Leaf, Truck } from "lucide-react"
import Link from "next/link"

export default function PopularCategories() {
  const categories = [
    { name: "Plumbing", icon: <Droplet className="h-6 w-6" />, href: "/find-tradesperson?trade=plumbing" },
    { name: "Electrical", icon: <Zap className="h-6 w-6" />, href: "/find-tradesperson?trade=electrical" },
    { name: "Carpentry", icon: <Hammer className="h-6 w-6" />, href: "/find-tradesperson?trade=carpentry" },
    { name: "Painting", icon: <PaintBucket className="h-6 w-6" />, href: "/find-tradesperson?trade=painting" },
    { name: "Renovations", icon: <Ruler className="h-6 w-6" />, href: "/find-tradesperson?trade=renovations" },
    {
      name: "Appliance Repair",
      icon: <Wrench className="h-6 w-6" />,
      href: "/find-tradesperson?trade=appliance-repair",
    },
    { name: "Landscaping", icon: <Leaf className="h-6 w-6" />, href: "/find-tradesperson?trade=landscaping" },
    { name: "Moving", icon: <Truck className="h-6 w-6" />, href: "/find-tradesperson?trade=moving" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <Link
          key={index}
          href={category.href}
          className="bg-card hover:bg-accent transition-colors duration-200 rounded-lg p-6 text-center border"
        >
          <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            {category.icon}
          </div>
          <h3 className="font-medium">{category.name}</h3>
        </Link>
      ))}
    </div>
  )
}

