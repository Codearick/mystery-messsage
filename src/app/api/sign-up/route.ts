import { SendVerificationEmail } from "@/helpers/SendVerficationEmail";
import { ApiError } from "@/helpers/ApiError";
import { generateOTP } from "@/helpers/generateOTP";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json()

        if([username, email, password].some(field => field?.trim() === "")){
            throw new ApiError(400, "All fields are required");
        }

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "User already exists."
                },
                {
                    status: 401
                }
            )
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        const OTP = generateOTP();

        if (existingUserByEmail) {
            if(existingUserByEmail.isVerified){
                return Response.json(
                {
                    success: false,
                    message: "User already exists with this email."
                },
                { status: 409 })
            } else{

                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = OTP;
                existingUserByEmail.verifyCodeExpiry=  new Date(Date.now() + 3600000);
                await existingUserByEmail.save();

            }

        } else {

            const hashedPassword = await bcrypt.hash(password, 10);

            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 7); // setting expiry code

            const newUser = new UserModel({
                username: username.toLowerCase(),
                email,
                password: hashedPassword,
                verifyCode: OTP,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save();
        }

        // Send Verification email
        const emailResponse = await SendVerificationEmail(email, username, OTP);

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message
                },
                { status: 500 })
        }
        
        return Response.json(
            {
                success: true,
                message: "User Registered successfully, Please verify your email"
            },
            { status: 201 }
        )


    } catch (error) {
        console.error("Register Garna Garo vo mula: ", error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 400
            }
        );
    }
}