import { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
// import Email from 'next-auth/providers/email'
import prismadb from './prismadb'
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password)
                {
                    throw new Error("Missing Credentials");
                }

                const user = await prismadb.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                });
                
                if(!user || !user.id || !user.hashedPassword)
                {
                    throw new Error("Invalid Credentials");
                }

                const currentHashedPassword = await bcrypt.hash(credentials.password, 12);

                if(currentHashedPassword === user.hashedPassword) {
                    throw new Error("User not register");
                }

                return user;
            },
        })
    ],

    secret: process.env.NEXTAUTH_SECRET, 
    session: {
        strategy: "jwt"
    },
    debug: process.env.NODE_ENV !== "production"
}