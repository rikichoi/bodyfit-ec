import prisma from "./prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import { Adapter } from "next-auth/adapters"
import Google from "next-auth/providers/google"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        session({ session, user }) {
          session.user.role = user.role;
          return session;
        },
      },

    // callbacks: {
    //     session({ session, user }) {
    //         session.user.id = user.id
    //         session.user.role = user.role
    //         return session;
    //     }
    // }
}