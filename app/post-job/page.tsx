"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, MapPin, Clock, DollarSign, Check } from "lucide-react"

export default function PostJob() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    location: string;
    timing: string;
    budget: string;
    photos: File[];
  }>({
    title: "",
    description: "",
    category: "",
    location: "",
    timing: "",
    budget: "",
    photos: [],
  })

  const handleNext = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit form data
    console.log(formData)
    setStep(4) // Move to confirmation step
  }

  return (
    <div className="container max-w-3xl py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Post a Job</h1>
        <p className="text-muted-foreground">Tell us what you need done and get quotes from qualified tradespeople.</p>
      </div>

      {/* Progress Indicator */}
      <div className="relative mb-12 flex justify-between">
        <div className="progress-line"></div>
        <div className={`progress-line ${step >= 2 ? "progress-line-active" : ""}`} style={{ width: "33%" }}></div>
        <div className={`progress-line ${step >= 3 ? "progress-line-active" : ""}`} style={{ width: "66%" }}></div>
        <div className={`progress-line ${step >= 4 ? "progress-line-active" : ""}`} style={{ width: "100%" }}></div>

        <div className={`progress-step ${step >= 1 ? "progress-step-active" : ""}`}>
          {step > 1 ? <Check className="h-5 w-5" /> : "1"}
        </div>
        <div className={`progress-step ${step >= 2 ? "progress-step-active" : ""}`}>
          {step > 2 ? <Check className="h-5 w-5" /> : "2"}
        </div>
        <div className={`progress-step ${step >= 3 ? "progress-step-active" : ""}`}>
          {step > 3 ? <Check className="h-5 w-5" /> : "3"}
        </div>
        <div className={`progress-step ${step >= 4 ? "progress-step-active" : ""}`}>
          {step === 4 ? <Check className="h-5 w-5" /> : "4"}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Job Details"}
            {step === 2 && "Location & Timing"}
            {step === 3 && "Budget & Preferences"}
            {step === 4 && "Job Posted Successfully"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Tell us about the job you need done"}
            {step === 2 && "Where and when do you need this done?"}
            {step === 3 && "Set your budget and preferences"}
            {step === 4 && "Your job has been posted to our network of trusted tradespeople"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Fix leaking bathroom sink"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="carpentry">Carpentry</SelectItem>
                      <SelectItem value="painting">Painting</SelectItem>
                      <SelectItem value="renovations">Renovations</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the job in detail. Include any specific requirements or concerns."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Photos (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop photos here or click to upload</p>
                    <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, GIF (Max 5MB each)</p>
                    <Input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) {
                          setFormData({ ...formData, photos: Array.from(e.target.files) })
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Enter your address"
                      className="pl-9"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Checkbox id="use-current-location" />
                    <label
                      htmlFor="use-current-location"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Use my current location
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>When do you need this done?</Label>
                  <RadioGroup
                    value={formData.timing}
                    onValueChange={(value) => setFormData({ ...formData, timing: value })}
                    className="space-y-3"
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="urgent" id="urgent" />
                      <Label htmlFor="urgent" className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-destructive" />
                        As soon as possible (Emergency)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="within-week" id="within-week" />
                      <Label htmlFor="within-week">Within a week</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="within-month" id="within-month" />
                      <Label htmlFor="within-month">Within a month</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="flexible" id="flexible" />
                      <Label htmlFor="flexible">I&apos;m flexible</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>What&apos;s your budget? (Optional)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="Enter your budget"
                      className="pl-9"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Leave blank if you&aspos;re not sure or want to receive quotes
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Preferences</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified-only" />
                      <label
                        htmlFor="verified-only"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Only show blockchain-verified tradespeople
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="top-rated" />
                      <label
                        htmlFor="top-rated"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Only show tradespeople with 4+ star ratings
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="eco-friendly" />
                      <label
                        htmlFor="eco-friendly"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Prefer eco-friendly services
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Your job has been posted!</h3>
                  <p className="text-muted-foreground">
                    We&apos;ve notified qualified tradespeople in your area. You should start receiving quotes soon.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Job Summary</h4>
                  <div className="text-sm text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title:</span>
                      <span className="font-medium">{formData.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{formData.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{formData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timing:</span>
                      <span className="font-medium">{formData.timing}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
                    Go to Dashboard
                  </Button>
                  <Button onClick={() => (window.location.href = "/")}>Back to Home</Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        {step < 4 && (
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <div></div>
            )}
            {step < 3 ? (
              <Button onClick={handleNext}>Continue</Button>
            ) : (
              <Button type="submit" onClick={handleSubmit}>
                Post Job
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

