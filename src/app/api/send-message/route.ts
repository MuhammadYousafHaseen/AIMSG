// import UserModel from "@/model/user.model";
// import dbConnect from "@/lib/dbConnect";
// import { Message } from "@/model/user.model";


// export async function POST(request: Request) {
//     await dbConnect();
//     const { username, content } = await request.json();

//     try {
//         const user = await UserModel.findOne({ username });
//         if (!user) return Response.json({ success: false, message: "User not found" }, { status: 404 });
//         //is accepting messages
//         if (!user.isAcceptingMessage) {
//             return Response.json({ success: false, message: "User is not accepting messages" }, { status: 404 });
//         }
//         const newMessage = { content, createdAt: new Date() };
//         user.messages.push(newMessage as Message);
//         await user.save();
//         return Response.json({ success: true, message: "Message sent successfully" }, { status: 200 });
//     } catch (error) {
//         console.log("An Unexpected Error in sending message: ", error);
//         return Response.json({ success: false, message: "Error sending message" }, { status: 500 });
//     }

// }

import { NextResponse } from "next/server";
import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/user.model";


export async function POST(request: Request) {
    await dbConnect(); // Ensure database connection

    try {
        const { username, content } = await request.json();
        if (!username || !content) {
            return NextResponse.json({ success: false, message: "Missing username or content" }, { status: 400 });
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Check if the user accepts messages
        if (!user.isAcceptingMessage) {
            return NextResponse.json({ success: false, message: "User is not accepting messages" }, { status: 403 });
        }

        // Push new message
        const newMessage = { content, createdAt: new Date() };
        user.messages.push(newMessage as Message);
        await user.save();

        return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 });

    } catch (error) {
        console.error("An Unexpected Error in sending message: ", error);
        return NextResponse.json({ success: false, message: "Error sending message" }, { status: 500 });
    }
}
