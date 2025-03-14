import {NextResponse} from 'next/server'

import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request){
    const url = new URL(req.url)
    const token = url.searchParams.get("token")
    
    if(!token){
        return NextResponse.json(new Error("Invalid token"))
    }

    try{
        const user = await prisma.client.findFirst({
            where: {
                emailVerificationToken: token
            }
        })

        if(!user){
            return NextResponse.json(new Error("Invalid token"))
        }

        await prisma.client.update({
            where: {
                id: user.id
            },
            data: {
                emailVerified: true,
                emailVerificationToken: null
            }
        })

        return NextResponse.redirect(new URL("/login", req.url));
    }catch(error){
        console.error("Error verifying email:", error)
        return NextResponse.json({message: "An error occurred"})
    }

}