import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({
            message: "User not authenticated!",
            success: false
        }, { status: 401 })
    }

    const user: User = session.user as User;
    const userId = user._id;
    const { acceptMessage } = await request.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                isAcceptingMessage: acceptMessage
            }, { new: true });

        if (!updatedUser) {
            return Response.json({
                message: "Failed to toggle user status to accept messages: ",
                success: false
            }, { status: 401 })
        }

        return Response.json({
            message: "Message acceptance status toggled successfully!",
            success: true,
            updatedUser
        }, { status: 200 })

    } catch (error) {
        console.error("Failed to toggle user status to accept messages: ", error);
        return Response.json({
            message: "Failed to toggle user status to accept messages: ",
            success: false
        }, { status: 500 })
    }
}


export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "User not authenticated!"
        }, { status: 401 })
    }

    const user: User = session.user as User;
    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId);

        if (!foundUser) {
            return Response.json(
                {
                    success: false,
                    message: "User not found!"
                }, { status: 404 }
            )
        }

        return Response.json(
            {
                success: true,
                message: "User found!",
                isAcceptingMessages: foundUser.isAcceptingMessage,
            }, { status: 200 }
        )

    } catch (error) {
        console.error("Failed to get user status to accept messages: ", error);
        return Response.json({
            message: "Failed to get user status to accept messages: ",
            success: false
        }, { status: 500 })
    }

}