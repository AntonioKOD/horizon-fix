import {NextResponse} from 'next/server'
import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt"
import { sendVerificationEmail } from '@/utils/trades'


const prisma = new PrismaClient()

export async function POST(req: Request){
    if(req.method === "POST"){
        const {email, password, name, businessAddress, businessName, businessType, businessWebsite, phone, description} = await req.json()

        const existingUser = await prisma.tradesperson.findFirst({
            where: {
                email
            }
        })
        if(existingUser){
            return NextResponse.json({ error: "User already exists"}
            )
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const emailVerificationToken = Math.random().toString(36).substring(7)
        const user = await prisma.tradesperson.create({
            data: {
                email,
                password: hashedPassword,
                name,
                emailVerificationToken,
                emailVerified: false,
                businessAddress,
                businessName,
                businessType,
                businessWebsite,
                phone,
                description
            }
        })
        await sendVerificationEmail(email, emailVerificationToken)

        return NextResponse.json({user})
    }else {
        return NextResponse.error();

    }
}