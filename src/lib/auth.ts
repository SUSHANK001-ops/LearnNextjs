import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import connectDB from "./db";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'email', type: "email" },
                password: { label: 'password', type: "password" }
            },
            async authorize(credentials) {
                const email = credentials?.email
                const password = credentials?.password
                if (!email || !password) {
                    throw new Error("Email or password not found!!")
                }
                await connectDB()
                const user = await User.findOne({ email })
                if (!user) {
                    throw new Error("User Does not exist!!")
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error("Invalid credintails!!")
                }
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                }
            },
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if(session.user){
                session.user.id = token.id as string;
                session.user.name = token.name ;
                session.user.email = token.email ;
                session.user.image = token.image as string;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days

    },
    pages: {
            signIn: "/auth/signup",
            error:'/signin'
    },
    secret: process.env.NEXT_AUTH_SECRET
}

export default authOptions;
