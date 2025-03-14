"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Shield,
  Star,
  MapPin,
  MessageSquare,
  Phone,
  Mail,
  CheckCircle,
  ChevronLeft,
  Award,
  Briefcase,
  Heart,
  Share2,
  Clock,
  FileText,
  Info,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TradespersonProps {
  profile: {
    id: string
    name: string
    email: string
    phone: string
    businessName: string
    businessAddress: string
    qualifications: string[]
    tradespersonServices: string[]
    tradespersonBadges: string[]
    bids: string[]
    assignedJobs: string[]
    businessWebsite: string
  }
}

export default function Tradesperson({ profile }: TradespersonProps) {
  // State management
  const [activeTab, setActiveTab] = useState("overview")
  const [messageOpen, setMessageOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Calculate a mock rating based on the profile id for demo purposes
  const mockRating = 4.8
  const mockReviews = 56
  const memberSince = new Date().getFullYear() - Math.floor(Math.random() * 5) - 1

  function formatPhoneNumber(phoneNumber: string) {
    // Remove all non-digit characters
    const cleaned = ("" + phoneNumber).replace(/\D/g, "")

    // Check if the cleaned number has the correct length (10 digits for US numbers)
    if (cleaned.length !== 10) {
      return "Invalid phone number"
    }

    // Format the phone number
    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "+1 ($1) $2-$3")
    return formatted
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-6" onClick={() => window.history.back()}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Search
      </Button>

      {/* Hero Section */}
      <div className="grid gap-8 md:grid-cols-[1fr_2fr] mb-8">
        <div className="space-y-6">
          {/* Profile Image and Basic Info */}
          <Card className="overflow-hidden">
            <div className="relative">
              <div className="relative h-64 w-full">
                <Image
                  src={`/placeholder.svg?height=400&width=400&text=${profile.name.split(" ").join("+")}`}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                <Shield className="h-3 w-3 mr-1" /> Verified
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-xl text-muted-foreground">{profile.businessName}</p>

                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 font-medium">{mockRating}</span>
                  <span className="text-muted-foreground ml-1">({mockReviews} reviews)</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {profile.tradespersonBadges?.map((badge, index) => (
                    <Badge key={index} variant="outline">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button size="lg" onClick={() => setBookingOpen(true)} className="col-span-2">
              Book Now
            </Button>
            <Button variant="outline" onClick={() => setQuoteOpen(true)}>
              Request Quote
            </Button>
            <Button variant="outline" onClick={() => setMessageOpen(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button variant="ghost" className={isSaved ? "text-red-500" : ""} onClick={() => setIsSaved(!isSaved)}>
              <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button variant="ghost">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Contact Information Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{formatPhoneNumber(profile.phone)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{profile.businessAddress}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Business Website</p>
                  <Link href={profile.businessWebsite || "#"} className="font-medium hover:underline">
                    {profile.businessName}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{profile.assignedJobs?.length || 0}</p>
                  <p className="text-xs text-muted-foreground">Completed Jobs</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{memberSince}</p>
                  <p className="text-xs text-muted-foreground">Member Since</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{mockRating}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="jobs">Recent Jobs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {profile.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-muted-foreground">
                      {profile.name} is a professional tradesperson and home services
                      specialist with extensive experience in the field. Based in{" "}
                      {profile.businessAddress?.split(",")[0] || "the local area"}, they provide high-quality services
                      to residential and commercial clients.
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-bold mb-4">Services Offered</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {profile.tradespersonServices?.map((service, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-primary mr-2" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-bold mb-4">Qualifications</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {profile.qualifications?.map((qualification, index) => (
                        <li key={index} className="flex items-center">
                          <Award className="h-5 w-5 text-primary mr-2" />
                          <span>{qualification}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-bold mb-4">Service Area</h3>
                    <div className="rounded-lg overflow-hidden h-64 bg-muted">
                      <Image
                        src="/placeholder.svg?height=300&width=600&text=Map"
                        alt="Service area map"
                        width={600}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-muted-foreground mt-2">
                      Serving {profile.businessAddress?.split(",")[0] || "the local area"} and surrounding areas.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.tradespersonServices?.map((service, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{service}</h3>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium mb-2">Custom Services Available</p>
                        <p className="text-sm text-muted-foreground">
                          Don&apos;t see what you need? Contact {profile.name} to discuss your specific requirements.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button onClick={() => setQuoteOpen(true)}>Request a Quote</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qualifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Qualifications & Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {profile.qualifications?.map((qualification, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border">
                        <Award className="h-8 w-8 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-base">{qualification}</h3>
                          <Badge variant="outline" className="mt-2">
                            Verified
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium mb-2">Blockchain Verified Credentials</p>
                        <p className="text-sm text-muted-foreground">
                          All qualifications and certifications are verified and stored on blockchain for maximum
                          transparency and trust.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.assignedJobs?.length > 0 ? (
                      profile.assignedJobs.map((job, index) => (
                        <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">Job #{job}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {
                                    [
                                      "Electrical Installation",
                                      "Home Repair",
                                      "Emergency Service",
                                      "Maintenance",
                                      "Consultation",
                                    ][index % 5]
                                  }
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Completed
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium mb-1">No Jobs Yet</h3>
                        <p className="text-muted-foreground">This tradesperson hasn&apos;t completed any jobs yet.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Message Dialog */}
      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Message {profile.name}</DialogTitle>
            <DialogDescription>Send a message to inquire about services or ask questions.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="e.g., Question about services" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here..." rows={5} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-info">Your Contact Information</Label>
              <Input id="contact-info" placeholder="Phone or email" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quote Request Dialog */}
      <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request a Quote</DialogTitle>
            <DialogDescription>Provide details about your project for an accurate quote.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="service-type">Service Type</Label>
              <select
                id="service-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a service</option>
                {profile.tradespersonServices?.map((service, index) => (
                  <option key={index} value={service.toLowerCase().replace(/\s+/g, "-")}>
                    {service}
                  </option>
                ))}
                <option value="other">Other (please specify)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description</Label>
              <Textarea id="project-description" placeholder="Please describe your project in detail..." rows={5} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Preferred Timeline</Label>
              <select
                id="timeline"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a timeline</option>
                <option value="asap">As soon as possible</option>
                <option value="1-week">Within 1 week</option>
                <option value="2-weeks">Within 2 weeks</option>
                <option value="1-month">Within 1 month</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range (Optional)</Label>
              <Input id="budget" placeholder="e.g., $500-$1000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-info">Your Contact Information</Label>
              <Input id="contact-info" placeholder="Phone or email" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book an Appointment</DialogTitle>
            <DialogDescription>Select a date and time that works for you.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Select a Date</Label>
              <div className="border rounded-md p-4 text-center">
                <Clock className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Calendar booking will be available soon. Please use the message or quote request options.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-type-booking">Service Type</Label>
              <select
                id="service-type-booking"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a service</option>
                {profile.tradespersonServices?.map((service, index) => (
                  <option key={index} value={service.toLowerCase().replace(/\s+/g, "-")}>
                    {service}
                  </option>
                ))}
                <option value="other">Other (please specify)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-notes">Additional Notes</Label>
              <Textarea id="booking-notes" placeholder="Any specific details or requirements..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-contact">Your Contact Information</Label>
              <Input id="booking-contact" placeholder="Phone or email" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Request Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

