import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CTASectionProps {
  title: string
  description: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
}

export default function CTASection({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: CTASectionProps) {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/90">{description}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href={primaryButtonLink}>
            <Button size="lg" variant="secondary">
              {primaryButtonText}
            </Button>
          </Link>
          <Link href={secondaryButtonLink}>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
            >
              {secondaryButtonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

