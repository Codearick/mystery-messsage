import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { ApiError } from "@/helpers/ApiError";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "JohnDoe@email.com" },
                password: { label: "Password", type: "text", placeholder: "Password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();

                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    });

                    if (!user) {
                        throw new ApiError(401, "User doesn't exist with this email!");
                    } else if (!user.isVerified) {
                        throw new ApiError(402, "Please verify your account first!");
                    } else {

                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                        if (isPasswordCorrect) {
                            return user;
                        } else {
                            throw new ApiError(403, "Invalid password!");
                        }
                    }





                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user}) {
            if(user){
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username
            }
            return token
        },
        async session({ session, token }) {
            if(token){
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
            }
            return session
        }
    },
    pages: {
        signIn: 'sign-In'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.SECRET_AUTH_KEY,
}