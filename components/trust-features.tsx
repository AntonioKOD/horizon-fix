import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"

interface Feature {
  title: string
  description: string
  icon: LucideIcon
}

interface TrustFeaturesProps {
  title: string
  features: Feature[]
  ctaText: string
  ctaLink: string
  imageSrc: string
  imageAlt: string
}

export default function TrustFeatures({ title, features, ctaText, ctaLink, imageSrc, imageAlt }: TrustFeaturesProps) {
  return (
    <section className="py-16 bg-accent">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{title}</h2>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  {<feature.icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />}
                  <div>
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Link href={ctaLink}>
                <Button variant="outline">{ctaText}</Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto lg:mx-0 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt={imageAlt}
                className="object-cover w-full aspect-video"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

