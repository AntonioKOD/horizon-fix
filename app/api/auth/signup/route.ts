import {NextResponse} from 'next/server'
import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt"
import { sendVerificationEmail } from '@/utils/resend'


const prisma = new PrismaClient()

export async function POST(req: Request){
    if(req.method === "POST"){
        const {email, password, name} = await req.json()

        const existingUser = await prisma.client.findFirst({
            where: {
                email
            }
        })
        if(existingUser){
            return NextResponse.json({ error: "User already exists"}
            )
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const emailVerificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const user = await prisma.client.create({
            data: {
                email,
                password: hashedPassword,
                name,
                emailVerificationToken,
                emailVerified: false
            }
        })
        await sendVerificationEmail(email, emailVerificationToken)

        return NextResponse.json({user})
    } else {
        return NextResponse.error();
    }
}