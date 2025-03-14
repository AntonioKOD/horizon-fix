import { notFound } from "next/navigation"
import Tradesperson from "@/components/tradesperson"

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params
  const id = resolvedParams.id

  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/profile/${id}`)
    const { profile } = await res.json()

    return <Tradesperson profile={profile} />
  } catch (e) {
    console.error(e)
    return notFound()
  }
}


