// import { getServerSession } from "next-auth";
// import authOptions from "../auth/[...nextauth]/route";
// import UserModel from "@/model/user.model";
// import dbConnect from "@/lib/dbConnect";
// import { User } from "next-auth";

// export async function POST(request: Request) {
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

//     const userId = user._id;
//     const { acceptMessages } = await request.json();
//     try {
//         const updatedUser = await UserModel.findByIdAndUpdate(
//             userId,
//             { isAcceptingMessage: acceptMessages },
//             { new: true }
//         );
//         if (!updatedUser) {
//             return Response.json(
//                 {
//                     message: "failed to update user status to accept messages",
//                     success: false,

//                 },
//                 { status: 500 }
//             );
//         }
//         return Response.json(
//             {
//                 message: "user status to accept messages updated successfully",
//                 success: true,
//                 updatedUser,
//             },
//             {
//                 status: 200,
//             }
//         );
//     } catch (error) {
//         console.log("failed to update user status to accept messages", error);
//         return Response.json(
//             {
//                 message: "failed to update user status to accept messages",
//                 success: false,
//             },
//             { status: 500 }
//         );
//     }
// }

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

//     try {
//         const userId = user._id;
//         const foundUser = await UserModel.findById(userId);
//         if (!foundUser) {
//             return Response.json(
//                 {
//                     message: "failed to fetch or found the  user status to accept messages",
//                     success: false,

//                 },
//                 { status: 500 }
//             );
//         }
//         return Response.json(
//             {
//                 message: "user status to accept messages fetched successfully",
//                 success: true,
//                 isAcceptingMessage: foundUser.isAcceptingMessage,
//             },
//             {
//                 status: 200,
//             }
//         );
//     } catch (error) {
//         console.log("failed to fetch or found the  user status to accept messages", error);
//         return Response.json(
//             {
//                 message: "failed to fetch or found the  user status to accept messages",
//                 success: false,
//             },
//             { status: 500 }
//         );
//     }
// }
// improved code after revison 
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


// ✅ **GET: Fetch Accepting Message Status**
export async function GET(request: Request) {
    const auth = await getAuthenticatedUser(request);
    if (auth.error) {
        return Response.json({ message: auth.error, success: false }, { status: auth.status });
    }

    try {
        const foundUser = await UserModel.findById(auth.user._id, "isAcceptingMessage"); // ✅ Fetch only required field
        if (!foundUser) {
            return Response.json({ message: "User not found.", success: false }, { status: 404 });
        }

        return Response.json({ message: "Message settings fetched successfully.", success: true, isAcceptingMessage: foundUser.isAcceptingMessage }, { status: 200 });

    } catch (error) {
        console.error("Error fetching message settings:", error);
        return Response.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}

