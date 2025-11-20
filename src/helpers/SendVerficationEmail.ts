import { resend } from "@/lib/resend";
import VerificationEmailTemplate from "../../emails/VerificationEmailTemplate";
import { ApiResponse } from "@/types/ApiResponse";

export async function SendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Hello world',
            react: VerificationEmailTemplate({
                username: username, otp: verifyCode}),
                });

            return { success: true, message: "Verfication email sent successfully!" }

        } catch (emailError) {
            console.log("Error sending verification email", emailError);
            return { success: false, message: "Failed to send verfication email!" }
        }
    }

    