import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import z from "zod";
import {usernameValidation} from "@/schemas/signUpSchema"

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){

    console.log("Check the method", request.method);

    if(request.method !== 'GET'){
        return Response.json(
                {
                    success: false,
                    message: "Accepting Get Request only"
                },
                { status: 404 }
        )
    }

    await dbConnect();

    // localhost:3000/api/cuu?username=Rohan?phone=iphone
    try {
        const {searchParams} = new URL(request.url);
        const queryParam = {
            username: searchParams.get('username')
        }

        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam);
        // console.log("Her bhai result: ", result); 

        if(!result.success){
            const usernameError = result.error.format().username?._errors || []
            return Response.json(
                {
                    success: false,
                    message: usernameError.length > 0 ? usernameError.join(', ') : "Invalid query parameter"
                },
                { status: 404 }
            )
        }

        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({username, isVerified: true});

        if(existingVerifiedUser){
            return Response.json(
                {
                    success: false, 
                    messsage: "Username already taken"
                }, { status: 400 }
            )
        } else {
             return Response.json(
                {
                    success: true, 
                    messsage: "Username available"
                }, { status: 200 }
            )
        }

    } catch (error) {
        console.error("Error checking username: ", error);
        return Response.json(
        {
            message: "Error checking username",
            success: false
        },
        {
            status: 500
        }
    )
    }
}