import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import connect from "@/lib/db";

const users = [
    {
      name: "Eshwar Balaji Yogesh",
      email: "eshwarbalajiyogesh@gmail.com",
      password: "password"
    },
    {
       name: "Eshwar Balaji Yogesh",

      email: "alex@email.com",
      password: "password"
    },
    {
        name: "Eshwar Balaji Yogesh",

      email: "bob@email.com",
      password: "password"
    }
  ]
  
const getUserByEmail = (email) => {
    const found = users.find(user => user.email === email);
    return found;
  }

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
      strategy: 'jwt',
    },
    pages: {
      signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (credentials === null) return null;
                
                try {
                    const user = getUserByEmail(credentials?.email);
                    console.log(user);
                    if (user) {
                        const isMatch = user?.password === credentials.password;

                        if (isMatch) {
                            return user;
                        // biome-ignore lint/style/noUselessElse: <explanation>
                        } else {
                            throw new Error("Email or Password is not correct");
                        }
                    // biome-ignore lint/style/noUselessElse: <explanation>
                    } else {
                        throw new Error("User not found");
                    }
                } catch (error) {
                    throw new Error(error);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
            async profile(profile) {
                console.log(profile)
                const user = getUserByEmail(profile.email)
                if (user) {
                    return user;
                }
                    return {};

            }
            
        }),
    ],
    
});
