import type { LucideIcon } from "lucide-react"

interface Step {
  title: string
  description: string
  icon: LucideIcon
}

interface HowItWorksProps {
  title: string
  steps: Step[]
}

export default function HowItWorks({ title, steps }: HowItWorksProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                {<step.icon className="h-8 w-8 text-primary" />}
              </div>
              <h3 className="text-xl font-bold mb-2">{`${index + 1}. ${step.title}`}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

