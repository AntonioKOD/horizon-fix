"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Clock } from "lucide-react"

export default function BookingModal() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeSlot, setTimeSlot] = useState<string>("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Book Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
          <DialogDescription>Select a date and time that works for you.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </div>
          <div className="grid gap-2">
            <Label>Available Time Slots</Label>
            <RadioGroup value={timeSlot} onValueChange={setTimeSlot} className="grid grid-cols-3 gap-2">
              {["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"].map((time) => (
                <div key={time} className="flex items-center space-x-2">
                  <RadioGroupItem value={time} id={time} className="sr-only" />
                  <Label
                    htmlFor={time}
                    className={`flex items-center justify-center rounded-md border p-2 text-sm cursor-pointer hover:bg-accent ${
                      timeSlot === time ? "bg-primary text-primary-foreground hover:bg-primary" : ""
                    }`}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {time}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Special Instructions (Optional)</Label>
            <Textarea id="notes" placeholder="Add any details or special requests..." />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

