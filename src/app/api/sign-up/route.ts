import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {

   await dbConnect()

   try {
     const {username,email,password} = await request.json()
     const existingVerifiedUser = await UserModel.findOne({
        username:username,
        isVerified:true
     })

     if(existingVerifiedUser){
        return Response.json(
            {
                success:false,
                message:"User already exists"
            },
            {
                status:400
            }
        )
     }

     const existingUserByEmail = await UserModel.findOne({email})
     const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
     if(existingUserByEmail){
        if(existingUserByEmail.isVerified){
            return Response.json(
                {
                    success:false,
                    message:"User already exists"
                },
                {
                    status:400
                }
            )
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            existingUserByEmail.password = hashedPassword
            existingUserByEmail.verifyCode = verifyCode
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600 * 1000)
            await existingUserByEmail.save()
            
        }

     }else{
        const hashedPassword = await bcrypt.hash(password,10)
        const verifyCodeExpiry = new Date()
        verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1)
        
        const newUser = new UserModel({
            username,
            email,
            password:hashedPassword,
            verifyCode,
            verifyCodeExpiry,
            isVerified:false,
            isAcceptingMessage:true,
            messages:[]
        })
        await newUser.save()

        

     }

    //send verification email
    const emailResponse = await sendVerificationEmail(email,verifyCode,username)

    if(!emailResponse.success){
        return Response.json(
            {
                success:false,
                message:emailResponse.message
            },
            {
                status:500
            }
        )
    }
    
    return Response.json(
        {
            success:true,
            message:"User registered successfully. Please verify your email"
        },
        {
            status:200
        }
    )

   } catch (error) {
    console.error("Error signing up",error);
    return Response.json(
        {
            success:false,
            message:"Error registering User"
        },
        {
            status:500
        }
    )
   }
}