'use client'
import { Droplet, Plug, Hammer, Paintbrush, Wrench, Zap, Search, Star, Shield, PenToolIcon as Tool } from "lucide-react"
import HeroSection from "@/components/hero-section"
import SearchSection from "@/components/search-section"
import ServiceCategories from "@/components/service-categories"
import HowItWorks from "@/components/how-it-works"
import TrustFeatures from "@/components/trust-features"
import FeaturedTradespeople from "@/components/featured-tradespeople"
import CTASection from "@/components/cta-section"

export default function Home() {
  // Service categories data
  const serviceCategories = [
    { name: "Plumbing", icon: Droplet, href: "/search?category=plumbing" },
    { name: "Electrical", icon: Plug, href: "/search?category=electrical" },
    { name: "Carpentry", icon: Hammer, href: "/search?category=carpentry" },
    { name: "Painting", icon: Paintbrush, href: "/search?category=painting" },
    { name: "Renovations", icon: Wrench, href: "/search?category=renovations" },
    { name: "Emergency", icon: Zap, href: "/search?category=emergency" },
  ]

  // How it works steps
  const howItWorksSteps = [
    {
      title: "Post Your Job",
      description: "Describe what you need done, add photos, and set your budget and timeline.",
      icon: Search,
    },
    {
      title: "Get Matched",
      description: "Receive quotes from verified tradespeople with blockchain-backed credentials.",
      icon: Star,
    },
    {
      title: "Secure Payment",
      description: "Pay through our secure escrow system only when you're satisfied with the work.",
      icon: Shield,
    },
  ]

  // Trust features
  const trustFeatures = [
    {
      title: "Blockchain Verification",
      description:
        "All tradespeople's credentials and reviews are stored on blockchain for maximum transparency and trust.",
      icon: Shield,
    },
    {
      title: "Verified Reviews",
      description: "Every review is from a verified customer who completed a job through our platform.",
      icon: Star,
    },
    {
      title: "Quality Craftsmanship",
      description: "Our network includes only skilled professionals with proven track records of excellence.",
      icon: Tool,
    },
  ]

  // Featured tradespeople
  const featuredTradespeople = [
    {
      id: 1,
      name: "John Smith",
      profession: "Master Electrician",
      rating: 4.9,
      reviews: 128,
      description:
        "Specializing in residential electrical work with over 15 years of experience. Licensed and insured.",
      tags: ["Electrical", "Smart Home", "Emergency"],
      imageSrc: "/placeholder.svg?height=300&width=500&text=Tradesperson+1",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      profession: "Plumber",
      rating: 4.8,
      reviews: 94,
      description: "Expert plumber specializing in repairs, installations, and emergency services. Available 24/7.",
      tags: ["Plumbing", "Emergency", "Bathroom"],
      imageSrc: "/placeholder.svg?height=300&width=500&text=Tradesperson+2",
    },
    {
      id: 3,
      name: "Michael Brown",
      profession: "Carpenter",
      rating: 4.7,
      reviews: 76,
      description: "Custom carpentry, furniture building, and home renovations. Quality craftsmanship guaranteed.",
      tags: ["Carpentry", "Renovations", "Custom"],
      imageSrc: "/placeholder.svg?height=300&width=500&text=Tradesperson+3",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Find Trusted Tradespeople for Your Home"
        description="Connect with verified professionals for all your home improvement and repair needs, backed by blockchain verification and community trust."
        primaryButtonText="Post a Job"
        primaryButtonLink="/post-job"
        secondaryButtonText="Find a Tradesperson"
        secondaryButtonLink="/search"
        imageSrc="/placeholder.svg?height=600&width=800"
        imageAlt="Happy homeowner with tradesperson"
      />

      {/* Search Section */}
      <SearchSection title="What service do you need?" />

      {/* Popular Categories */}
      <ServiceCategories title="Popular Services" categories={serviceCategories} />

      {/* How It Works */}
      <HowItWorks title="How HorizonFix Works" steps={howItWorksSteps} />

      {/* Trust Indicators */}
      <TrustFeatures
        title="Why Choose HorizonFix?"
        features={trustFeatures}
        ctaText="Learn More About Our Trust System"
        ctaLink="/about"
        imageSrc="/placeholder.svg?height=600&width=800"
        imageAlt="Blockchain verification illustration"
      />

      {/* Featured Tradespeople */}
      <FeaturedTradespeople
        title="Featured Tradespeople"
        tradespeople={featuredTradespeople}
        viewAllText="View All Tradespeople"
        viewAllLink="/search"
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Get Started?"
        description="Join thousands of homeowners who have found reliable tradespeople through HorizonFix. Post a job today and get matched with verified professionals in your area."
        primaryButtonText="Post a Job"
        primaryButtonLink="/post-job"
        secondaryButtonText="Sign Up Now"
        secondaryButtonLink="/signup"
      />
    </div>
  )
}

