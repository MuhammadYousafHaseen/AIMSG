import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/route";
import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";

// Helper function to get authenticated user
async function getAuthenticatedUser(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    if (!session || !user) {
        return { error: "Unauthorized request. Please sign in.", status: 401 };
    }

    return { user };
}

// ✅ **POST: Toggle Accepting Messages**
export async function POST(request: Request) {
    const auth = await getAuthenticatedUser(request);
    if (auth.error) {
        return Response.json({ message: auth.error, success: false }, { status: auth.status });
    }

    try {
        const { acceptMessages } = await request.json();
        const updatedUser = await UserModel.findByIdAndUpdate(
            auth.user._id,
            { isAcceptingMessage: acceptMessages },
            { new: true, select: "isAcceptingMessage" } // ✅ Fetch only needed fields
        );

        if (!updatedUser) {
            return Response.json({ message: "Failed to update message settings.", success: false }, { status: 500 });
        }

        return Response.json({ message: "Message settings updated successfully.", success: true, isAcceptingMessage: updatedUser.isAcceptingMessage }, { status: 200 });

    } catch (error) {
        console.error("Error updating message settings:", error);
        return Response.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}
