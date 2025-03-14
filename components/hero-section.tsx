import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HeroSectionProps {
  title: string
  description: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  imageSrc: string
  imageAlt: string
}

export default function HeroSection({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  imageSrc,
  imageAlt,
}: HeroSectionProps) {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-accent to-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{title}</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">{description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={primaryButtonLink}>
                <Button size="lg" className="w-full sm:w-auto">
                  {primaryButtonText}
                </Button>
              </Link>
              <Link href={secondaryButtonLink}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {secondaryButtonText}
                </Button>
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

