"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  MapPin,
  Phone,
  Mail,
  Award,
  Briefcase,
  Shield,
  Save,
  Edit,
  Loader2,
  CheckCircle,
  Star,
} from "lucide-react"
import Image from "next/image"

// Import the server action for updating the profile
import { updateProfile } from "@/actions"

// Create a client component that receives the profile data as a prop
interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessAddress: string;
  description: string;
  businessType: string;
  businessWebsite: string;
  profileImageUrl: string;
  qualifications: { name: string; description?: string }[];
  tradespersonServices: { name: string; category?: string }[];
  tradespersonBadges: { name: string }[];
  reviews: { reviewerName: string; rating: number; comment: string }[];
  bids: { id: string; amount: number; status: string }[];
  assignedJobs: { jobId: string; jobTitle: string; jobStatus: string }[];
  averageRating: number;
  reviewCount: number;
}

export function TradespersonProfileClient({ profile: initialProfile }: { profile: Profile }) {
  const router = useRouter()
  const [loading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Log the received profile data to debug
  console.log("TradespersonProfileClient received profile:", initialProfile)

  // Initialize state with the received profile data
  const [profile, setProfile] = useState(
    initialProfile || {
      id: "",
      name: "",
      email: "",
      phone: "",
      businessName: "",
      businessAddress: "",
      description: "",
      businessType: "",
      businessWebsite: "",
      profileImageUrl: "",
      qualifications: [],
      tradespersonServices: [],
      tradespersonBadges: [],
      reviews: [],
      bids: [],
      assignedJobs: [],
      averageRating: 0,
      reviewCount: 0,
    },
  )
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

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)

      // Create FormData for the update
      const formData = new FormData()
      formData.append("name", profile.name)
      formData.append("phone", profile.phone || "")
      formData.append("businessName", profile.businessName || "")
      formData.append("businessAddress", profile.businessAddress || "")
      formData.append("businessType", profile.businessType || "")
      formData.append("businessWebsite", profile.businessWebsite || "")
      formData.append("description", profile.description || "")

      // Call the server action to update the profile
      await updateProfile(formData, profile.id)

      // Show success message
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)

      // Exit edit mode
      setEditMode(false)
    } catch (error) {
      console.error("Error saving profile:", error)
      setError("Failed to save profile. Please try again later.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-12">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => router.push("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div>
          {editMode ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditMode(false)} disabled={saving}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges} disabled={saving} type="submit" form="profile-form">
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Button onClick={() => setEditMode(true)}>
              <Edit className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
          )}
        </div>
      </div>

      {saveSuccess && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
          <AlertDescription className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" /> Your profile has been updated successfully.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Image */}
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-background">
                  <Image
                    src={
                      profile.profileImageUrl ||
                      `/placeholder.svg?height=200&width=200&text=${profile.name.split(" ").join("+") || "User"}`
                    }
                    alt={profile.name || "User"}
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold">{profile.name || "User Name"}</h2>
              <p className="text-muted-foreground">{profile.businessName || "Business Name"}</p>

              {profile.averageRating > 0 && (
                <div className="flex items-center mt-2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1 fill-current" /> {profile.averageRating.toFixed(1)} (
                    {profile.reviewCount})
                  </Badge>
                </div>
              )}

              <div className="w-full mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{profile.email || "Not provided"}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{formatPhoneNumber(profile.phone) || "Not provided"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Business Type:</span>
                  <span>{profile.businessType || "Not specified"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
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
                  <p className="font-medium">{formatPhoneNumber(profile.phone) || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{profile.email || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{profile.businessAddress || "Not provided"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="personal">
                <User className="h-4 w-4 mr-2" /> Personal
              </TabsTrigger>
              <TabsTrigger value="qualifications">
                <Award className="h-4 w-4 mr-2" /> Qualifications
              </TabsTrigger>
              <TabsTrigger value="services">
                <Briefcase className="h-4 w-4 mr-2" /> Services
              </TabsTrigger>
              <TabsTrigger value="badges">
                <Shield className="h-4 w-4 mr-2" /> Badges
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" /> Personal & Business Information
                  </CardTitle>
                  <CardDescription>Manage your personal details and business information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form id="profile-form" onSubmit={handleSaveChanges}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">Personal Information</h3>

                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          {editMode ? (
                            <Input
                              id="name"
                              name="name"
                              value={profile.name}
                              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                              required
                            />
                          ) : (
                            <p className="text-muted-foreground">{profile.name || "Not provided"}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <p className="text-muted-foreground">{profile.email || "Not provided"}</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          {editMode ? (
                            <Input
                              id="phone"
                              name="phone"
                              value={profile.phone || ""}
                              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            />
                          ) : (
                            <p className="text-muted-foreground">{profile.phone || "Not provided"}</p>
                          )}
                        </div>
                      </div>

                      {/* Business Information */}
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">Business Information</h3>

                        <div className="space-y-2">
                          <Label htmlFor="businessName">Business Name</Label>
                          {editMode ? (
                            <Input
                              id="businessName"
                              name="businessName"
                              value={profile.businessName || ""}
                              onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                            />
                          ) : (
                            <p className="text-muted-foreground">{profile.businessName || "Not provided"}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="businessType">Business Type</Label>
                          {editMode ? (
                            <Input
                              id="businessType"
                              name="businessType"
                              value={profile.businessType || ""}
                              onChange={(e) => setProfile({ ...profile, businessType: e.target.value })}
                            />
                          ) : (
                            <p className="text-muted-foreground">{profile.businessType || "Not provided"}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="businessAddress">Business Address</Label>
                          {editMode ? (
                            <Textarea
                              id="businessAddress"
                              name="businessAddress"
                              value={profile.businessAddress || ""}
                              onChange={(e) => setProfile({ ...profile, businessAddress: e.target.value })}
                              rows={2}
                            />
                          ) : (
                            <p className="text-muted-foreground">{profile.businessAddress || "Not provided"}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="businessWebsite">Business Website</Label>
                          {editMode ? (
                            <Input
                              id="businessWebsite"
                              name="businessWebsite"
                              value={profile.businessWebsite || ""}
                              onChange={(e) => setProfile({ ...profile, businessWebsite: e.target.value })}
                            />
                          ) : (
                            <p className="text-muted-foreground">{profile.businessWebsite || "Not provided"}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Business Description */}
                    <div className="space-y-2 pt-4 border-t mt-6">
                      <Label htmlFor="description">Business Description</Label>
                      {editMode ? (
                        <Textarea
                          id="description"
                          name="description"
                          value={profile.description || ""}
                          onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                          rows={4}
                        />
                      ) : (
                        <p className="text-muted-foreground">{profile.description || "No description provided."}</p>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tabs content... */}
            <TabsContent value="qualifications">
              <Card>
                <CardHeader>
                  <CardTitle>Qualifications</CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.qualifications && profile.qualifications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profile.qualifications.map((qualification: { name: string; description?: string }, index: number) => (
                        <div key={index} className="p-4 border rounded-md">
                          <h3 className="font-medium">{qualification.name}</h3>
                          {qualification.description && (
                            <p className="text-sm text-muted-foreground">{qualification.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No qualifications added yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Services</CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.tradespersonServices && profile.tradespersonServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profile.tradespersonServices.map((service: { name: string; category?: string }, index: number) => (
                        <div key={index} className="p-4 border rounded-md">
                          <h3 className="font-medium">{typeof service === 'string' ? service : service.name}</h3>
                          {service.category && <p className="text-sm text-muted-foreground">{service.category}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No services added yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges">
              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.tradespersonBadges && profile.tradespersonBadges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profile.tradespersonBadges.map((badge: { name: string }, index: number) => (
                        <div key={index} className="p-4 border rounded-md">
                          <h3 className="font-medium">{typeof badge === 'string' ? badge : badge.name}</h3>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No badges earned yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

