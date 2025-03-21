// import { getServerSession } from "next-auth";
// import authOptions from "../auth/[...nextauth]/route";
// import UserModel from "@/model/user.model";
// import dbConnect from "@/lib/dbConnect";
// import { User } from "next-auth";
// import mongoose from "mongoose";



// export async function GET(request: Request) {
//     await dbConnect();
//     const session = await getServerSession(authOptions);
//     const user = session?.user as User;

//     if (!session || !user) {
//         return Response.json(
//             {
//                 message:
//                     "You must be signed in to accept messages, ie not authenticated request",
//                 success: false,
//             },
//             { status: 401 }
//         );
//     }

//     const userId = new mongoose.Types.ObjectId(user.id);
//     try {
//         const user = await UserModel.aggregate([
//             {
//                 $match: { _id: userId }
//             },
//             {
//                 $unwind: "$messages"
//             },
//             {
//                 $sort: { "messages.createdAt": -1 } // Sort messages in descending order by createdAt
//             },
//             {
//                 $group: { _id: "$_id", messages: { $push: "$messages" } }
//             }
//         ])

//         if (!user || user.length === 0) {
//             return Response.json(
//                 {
//                     message:
//                         "No messages found and user not found",
//                     success: false,
//                 },
//                 { status: 401 }
//             );
//         }

//         return Response.json(
//             {
//                 message:
//                     "Messages found",
//                 success: true,
//                 messages: user[0].messages,
//             },
//             { status: 200 }
//         )
//     } catch (error) {
//         console.log("Error fetching messages", error);
//         return Response.json(
//             {
//                 message:
//                     "Error fetching messages",
//                 success: false,
//             },
//             { status: 500 }

//         );
//     }
// }

import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/route";
import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { message: "You must be signed in to view messages.", success: false },
            { status: 401 }
        );
    }

    try {
        // Convert user ID to MongoDB ObjectId
        const userId = new mongoose.Types.ObjectId(session.user._id);

        // Fetch user and messages
        const user = await UserModel.findOne({ _id: userId }, { messages: 1 })
            .sort({ "messages.createdAt": -1 }) // Sort messages in descending order
            .lean();

        if (!user || user.messages.length === 0) {
            return NextResponse.json(
                { message: "No messages found.", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Messages retrieved successfully.", success: true, messages: user.messages },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
            { message: "Error fetching messages.", success: false },
            { status: 500 }
        );
    }
}
