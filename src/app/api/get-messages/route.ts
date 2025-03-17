import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/route";
import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import mongoose from "mongoose";



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

    const userId = new mongoose.Types.ObjectId(user.id);
    try {
        const user = await UserModel.aggregate([
            {
                $match: { id: userId }
            },
            {
                $unwind: "$messages"
            },
            {
                $sort: { "messages.createdAt": -1 } // Sort messages in descending order by createdAt
            },
            {
                $group: { _id: "$_id", messages: { $push: "$messages" } }
            }
        ])

        if (!user || user.length === 0) {
            return Response.json(
                {
                    message:
                        "No messages found and user not found",
                    success: false,
                },
                { status: 401 }
            );
        }

        return Response.json(
            {
                message:
                    "Messages found",
                success: true,
                messages: user[0].messages,
            },
            { status: 200 }
        )
    } catch (error) {
        console.log("Error fetching messages", error);
        return Response.json(
            {
                message:
                    "Error fetching messages",
                success: false,
            },
            { status: 500 }

        );
    }
}