import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/route";
import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    if (!session || !user) {
        return Response.json(
            {
                message:
                    "You must be signed in to accept messages, ie not authenticated request",
                success: false,
            },
            { status: 401 }
        );
    }

    const userId = user._id;
    const { acceptMessages } = await request.json();
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessages },
            { new: true }
        );
        if (!updatedUser) {
            return Response.json(
                {
                    message: "failed to update user status to accept messages",
                    success: false,

                },
                { status: 500 }
            );
        }
        return Response.json(
            {
                message: "user status to accept messages updated successfully",
                success: true,
                updatedUser,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log("failed to update user status to accept messages", error);
        return Response.json(
            {
                message: "failed to update user status to accept messages",
                success: false,
            },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    if (!session || !user) {
        return Response.json(
            {
                message:
                    "You must be signed in to accept messages, ie not authenticated request",
                success: false,
            },
            { status: 401 }
        );
    }

    try {
        const userId = user._id;
        const foundUser = await UserModel.findById(userId);
        if (!foundUser) {
            return Response.json(
                {
                    message: "failed to fetch or found the  user status to accept messages",
                    success: false,

                },
                { status: 500 }
            );
        }
        return Response.json(
            {
                message: "user status to accept messages fetched successfully",
                success: true,
                isAcceptingMessage: foundUser.isAcceptingMessage,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log("failed to fetch or found the  user status to accept messages", error);
        return Response.json(
            {
                message: "failed to fetch or found the  user status to accept messages",
                success: false,
            },
            { status: 500 }
        );
    }
}

