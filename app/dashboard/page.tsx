"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Star,
  Clock,
  CalendarIcon,
  MessageSquare,
  CheckCircle,
  FileText,
  BarChart3,
  Settings,
  User,
  LogOut,
} from "lucide-react"

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [messageOpen, setMessageOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  // Mock data for jobs
  const jobs = [
    {
      id: 1,
      title: "Fix leaking bathroom sink",
      tradesperson: "Sarah Johnson",
      trade: "Plumber",
      status: "scheduled",
      date: "Tomorrow, 10:00 AM",
      location: "Home",
      price: "$120",
      image: "/placeholder.svg?height=50&width=50&text=SJ",
    },
    {
      id: 2,
      title: "Kitchen lighting installation",
      tradesperson: "John Smith",
      trade: "Electrician",
      status: "in-progress",
      date: "In progress",
      location: "Home",
      price: "$350",
      image: "/placeholder.svg?height=50&width=50&text=JS",
    },
    {
      id: 3,
      title: "Backyard landscaping",
      tradesperson: "Jennifer Martinez",
      trade: "Landscaper",
      status: "completed",
      date: "Completed on May 15",
      location: "Home",
      price: "$850",
      image: "/placeholder.svg?height=50&width=50&text=JM",
    },
    {
      id: 4,
      title: "Living room painting",
      tradesperson: "Emily Davis",
      trade: "Painter",
      status: "completed",
      date: "Completed on May 10",
      location: "Home",
      price: "$600",
      image: "/placeholder.svg?height=50&width=50&text=ED",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Scheduled
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  interface Job {
    id: number;
    title: string;
    tradesperson: string;
    trade: string;
    status: string;
    date: string;
    location: string;
    price: string;
    image: string;
  }

  const handleMessageClick = (job: Job) => {
    setSelectedJob(job)
    setMessageOpen(true)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects and tradespeople</p>
        </div>
        <Button>Post a New Job</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="/placeholder.svg?height=80&width=80&text=User" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">Jane Doe</h2>
              <p className="text-sm text-muted-foreground">Member since 2023</p>
            </div>
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Jobs
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Calendar
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Reports
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </nav>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <span className="text-muted-foreground text-sm">Active Jobs</span>
                  <span className="text-3xl font-bold">2</span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>Last updated: Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <span className="text-muted-foreground text-sm">Completed Jobs</span>
                  <span className="text-3xl font-bold">8</span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    <span>All time</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <span className="text-muted-foreground text-sm">Saved Tradespeople</span>
                  <span className="text-3xl font-bold">5</span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="mr-1 h-4 w-4" />
                    <span>Avg. Rating: 4.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jobs Tabs */}
          <Tabs defaultValue="active">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Jobs</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All Jobs</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-6 space-y-4">
              {jobs
                .filter((job) => job.status !== "completed")
                .map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <CardContent className="p-6 flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src={job.image} alt={job.tradesperson} />
                              <AvatarFallback>
                                {job.tradesperson
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold">{job.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {job.tradesperson} • {job.trade}
                              </p>
                              <div className="flex items-center mt-1">
                                <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                <span className="text-sm text-muted-foreground">{job.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            {getStatusBadge(job.status)}
                            <span className="mt-1 font-medium">{job.price}</span>
                          </div>
                        </div>
                        {job.status === "in-progress" && (
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </div>
                        )}
                      </CardContent>
                      <div className="flex sm:flex-col justify-end gap-2 p-4 bg-muted/20 border-l">
                        <Button variant="outline" size="sm" className="w-full" onClick={() => handleMessageClick(job)}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </TabsContent>
            <TabsContent value="completed" className="mt-6 space-y-4">
              {jobs
                .filter((job) => job.status === "completed")
                .map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <CardContent className="p-6 flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src={job.image} alt={job.tradesperson} />
                              <AvatarFallback>
                                {job.tradesperson
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold">{job.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {job.tradesperson} • {job.trade}
                              </p>
                              <div className="flex items-center mt-1">
                                <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                <span className="text-sm text-muted-foreground">{job.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            {getStatusBadge(job.status)}
                            <span className="mt-1 font-medium">{job.price}</span>
                          </div>
                        </div>
                      </CardContent>
                      <div className="flex sm:flex-col justify-end gap-2 p-4 bg-muted/20 border-l">
                        <Button variant="outline" size="sm" className="w-full">
                          <Star className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </TabsContent>
            <TabsContent value="all" className="mt-6 space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <CardContent className="p-6 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={job.image} alt={job.tradesperson} />
                            <AvatarFallback>
                              {job.tradesperson
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {job.tradesperson} • {job.trade}
                            </p>
                            <div className="flex items-center mt-1">
                              <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                              <span className="text-sm text-muted-foreground">{job.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          {getStatusBadge(job.status)}
                          <span className="mt-1 font-medium">{job.price}</span>
                        </div>
                      </div>
                      {job.status === "in-progress" && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                    <div className="flex sm:flex-col justify-end gap-2 p-4 bg-muted/20 border-l">
                      {job.status !== "completed" ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => handleMessageClick(job)}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <FileText className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="outline" size="sm" className="w-full">
                            <Star className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <FileText className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Calendar and Messages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>View and manage your scheduled jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Stay in touch with your tradespeople</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={job.image} alt={job.tradesperson} />
                        <AvatarFallback>
                          {job.tradesperson
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">{job.tradesperson}</p>
                          <span className="text-xs text-muted-foreground">2h ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          I&apos;ll be arriving at 10 AM tomorrow for the {job.title.toLowerCase()} job.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Messages
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Message Dialog */}
      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Message {selectedJob?.tradesperson}</DialogTitle>
            <DialogDescription>Regarding: {selectedJob?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="max-h-[300px] overflow-y-auto space-y-4 border rounded-md p-4">
              <div className="flex items-start gap-3">
                <Avatar className="mt-1">
                  <AvatarImage src={selectedJob?.image} alt={selectedJob?.tradesperson} />
                  <AvatarFallback>
                    {selectedJob?.tradesperson
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">
                    Hello! I&apos;m scheduled to work on your {selectedJob?.title.toLowerCase()} job. Is there anything
                    specific you&apos;d like me to know before I arrive?
                  </p>
                  <span className="text-xs text-muted-foreground mt-1 block">Yesterday, 4:30 PM</span>
                </div>
              </div>
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">
                    Hi! Yes, please make sure to bring all necessary tools. The issue is with the main bathroom sink.
                  </p>
                  <span className="text-xs text-primary-foreground/70 mt-1 block">Yesterday, 5:15 PM</span>
                </div>
                <Avatar className="mt-1">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-start gap-3">
                <Avatar className="mt-1">
                  <AvatarImage src={selectedJob?.image} alt={selectedJob?.tradesperson} />
                  <AvatarFallback>
                    {selectedJob?.tradesperson
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Perfect! I&apos;ll bring everything needed. See you tomorrow at 10 AM.</p>
                  <span className="text-xs text-muted-foreground mt-1 block">Yesterday, 5:20 PM</span>
                </div>
              </div>
            </div>
            <Textarea placeholder="Type your message here..." rows={3} />
          </div>
          <DialogFooter>
            <Button type="submit">Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

