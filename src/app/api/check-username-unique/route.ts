import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import {z} from "zod";
import {usernameValidation} from "@/schemas/signUpSchema";


const UsernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request: Request) {

    await dbConnect()

    try {
        const {searchParams} = new URL(request.url);
        const QueryParam = {
            username: searchParams.get("username"),
        }
        //validation with zode
        const result = UsernameQuerySchema.safeParse(QueryParam);
        console.log(result)
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json(
                {
                    success:false,
                    message: usernameErrors?.length > 0 ? usernameErrors.join(", "): "Invalid Username query Paramaters",
                },
                {
                    status:400
                }
            )
        }

        const {username} = result.data;
        
        const existingVerifiedUser = await UserModel.findOne({username, isVerified:true});
        if(existingVerifiedUser){
            return Response.json(
                {
                    success:false,
                    message:"Username already exists"
                },
                {
                    status:400
                }
            )
        }

        return Response.json({
            success:true,
            message:"Username is available"
        },
         {
        status:200
        }
      )


        
    } catch (error) {
        
        console.error("Error checking Username",error)
        return Response.json(
            {
                success:false,
                message:"Error checking Username"
            },
            {
                status:500
            }
        )
    }
}