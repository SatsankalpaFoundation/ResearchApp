import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import connect from "@/lib/db";


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
                        }
                            throw new Error("Email or Password is not correct");
                    // biome-ignore lint/style/noUselessElse: <explanation>
                    } else {
                        console.log("User not found");
                    }
                } catch (error) {
                    console.log(error);
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
                await connect();
                const UserModel = mongoose.models.users || mongoose.model('users', new mongoose.Schema({}, { strict: false }), 'users');
                const user = await UserModel.findOne({ email: profile.email });
                if (user) {
                    return user;
                }
                    return {};

            }
            
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    ...user,
                    id: user.id,
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.user._doc._id            };
            return session;
        },
    }
    
});
