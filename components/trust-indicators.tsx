import { Shield, Award, CheckCircle, Lock } from "lucide-react"

export default function TrustIndicators() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="bg-card p-6 rounded-lg text-center">
        <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Verified Professionals</h3>
        <p className="text-muted-foreground">
          Every tradesperson undergoes a thorough background check and license verification.
        </p>
      </div>

      <div className="bg-card p-6 rounded-lg text-center">
        <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Blockchain Transparency</h3>
        <p className="text-muted-foreground">
          Credentials and reviews are stored on blockchain for maximum transparency and trust.
        </p>
      </div>

      <div className="bg-card p-6 rounded-lg text-center">
        <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Satisfaction Guarantee</h3>
        <p className="text-muted-foreground">
          We stand behind the quality of our professionals with our satisfaction guarantee.
        </p>
      </div>

      <div className="bg-card p-6 rounded-lg text-center">
        <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
        <p className="text-muted-foreground">
          All transactions are protected with secure payment processing and escrow options.
        </p>
      </div>
    </div>
  )
}

