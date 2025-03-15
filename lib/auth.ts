/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {SessionStrategy} from 'next-auth'
import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        {
            id: "credentials",
            name: "Credentials",
            type: "credentials",
            credentials: {
                identifier: {label: "Username or Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials){
                if(credentials?.identifier === "admin" && credentials?.password === "admin"){
                    throw new Error("Email and password are required")

                }
                const user = await prisma.client.findFirst({
                    where: {
                        OR: [
                            {email: credentials?.identifier},
                            {name: credentials?.identifier}
                        ]
                    }
                })
                if(!user) throw new Error("No user found")
                if(!user.emailVerified) throw new Error("Email not verified")
                if(!credentials?.password || !bcrypt.compare(credentials.password, user.password)) throw new Error("Password is incorrect")
                const isPasswordValid = bcrypt.compare(credentials?.password, user.password)
                if(!isPasswordValid) throw new Error("Password is incorrect")
                return {id: user.id, name: user.name ?? "", email: user.email ?? ""}
            }
        },
        {
            id: "tradesperson",
            name: "Tradesperson",
            type: "credentials",
            credentials: {
                identifier: {label: "Username or Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials){
                if(credentials?.identifier === "admin" && credentials?.password === "admin"){
                    throw new Error("Email and password are required")

                }
                const tradesperson = await prisma.tradesperson.findFirst({
                    where: {
                        OR: [
                            {email: credentials?.identifier},
                            {name: credentials?.identifier}
                        ]
                    }
                })
                if(!tradesperson) throw new Error("No tradesperson found")
                if(!tradesperson.emailVerified) throw new Error("Email not verified")
                if(!credentials?.password || !bcrypt.compareSync(credentials.password, tradesperson.password)) throw new Error("Password is incorrect")
                const isPasswordValid = bcrypt.compareSync(credentials?.password, tradesperson.password)
                
                if(!isPasswordValid) throw new Error("Password is incorrect")
                return {id: tradesperson.id, name: tradesperson.name ?? "", email: tradesperson.email ?? ""}
            }
        }
    ],
    session: {
        strategy: "jwt" as SessionStrategy,

    },
    callbacks: {
        async session({session, token} : {session: any, token: any}){
            if(token){
                session.user = token.user
            }
            return session
        },
        async jwt({token, user}){
            if(user){
                token.user = {id: user.id, email: user.email, name: user.name}
            }
            return token
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}