import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ messageid?: string }> }
) {
  const { messageid } = await params;
  // function body
  if (!messageid) {
    return NextResponse.json(
      { success: false, message: "Invalid message ID" },
      { status: 400 }
    );
  }

  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return NextResponse.json(
      { success: false, message: "You must be signed in to delete messages." },
      { status: 401 }
    );
  }

  try {
    const objectId = new mongoose.Types.ObjectId(messageid);
    const updatedResult = await UserModel.findOneAndUpdate(
      { 'messages._id': messageid },
      { $pull: { messages: { _id: messageid } } },
      { new: true }
    );

   if (!updatedResult) {
      return NextResponse.json(
        { success: false, message: "Message not found" },
        { status: 404 }
      );
    }
    // Optionally, you can also return the updated messages array
    // const updatedMessages = updatedResult.messages;
    // return NextResponse.json(
    //   { success: true, messages: updatedMessages },
    //   { status: 200 }   
    // );

    return NextResponse.json(
      { success: true, message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting message" },
      { status: 500 }
    );
  }
}
