import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, MessageSquare, Calendar, BarChart, Settings, User, CreditCard, HelpCircle } from "lucide-react"

export default function DashboardNav() {
  return (
    <div className="bg-card rounded-lg shadow-sm border p-6 h-fit">
      <nav className="space-y-2">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/jobs">
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            My Jobs
          </Button>
        </Link>
        <Link href="/dashboard/messages">
          <Button variant="ghost" className="w-full justify-start">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
        </Link>
        <Link href="/dashboard/calendar">
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </Button>
        </Link>
        <Link href="/dashboard/analytics">
          <Button variant="ghost" className="w-full justify-start">
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </Link>
        <Link href="/dashboard/profile">
          <Button variant="ghost" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </Link>
        <Link href="/dashboard/payments">
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </Button>
        </Link>
        <Link href="/dashboard/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
        <Link href="/dashboard/help">
          <Button variant="ghost" className="w-full justify-start">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Button>
        </Link>
      </nav>
    </div>
  )
}

