import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { notFound } from "next/navigation"
import { TradespersonProfileClient } from "@/components/tradesperson-profile/my-profile"

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params
  const id = resolvedParams.id

  if (!id) {
    return notFound()
  }
  const session = await getServerSession(authOptions)

  if (!session) {
    return notFound()
  }

  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/tradesperson-profile/${id}`, {
      cache: "no-store",
      headers: {
        Cookie: "",
      },
    })

    if (!res.ok) {
      console.error("API response not OK:", res.status, res.statusText)
      return notFound()
    }

    const data = await res.json()
    console.log("API response data:", data) // Log the entire response

    // Check if data has a profile property or if data itself is the profile
    const profile = data.profile || data

    if (!profile) {
      console.error("No profile data found in the response")
      return notFound()
    }

    return <TradespersonProfileClient profile={profile} />
  } catch (e) {
    console.error("Error fetching profile:", e)
    return notFound()
  }
}

