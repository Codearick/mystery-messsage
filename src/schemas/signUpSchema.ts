import { z } from "zod";


const usernameRegex = /^(?!.*\.\.)(?!\.)(?!.*\.$)[a-z0-9._]+$/i;
const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

export const usernameValidation = z.string().min(3, "Username must be atleast 3 chars.").refine((value) => usernameRegex.test(value), { error: "Enter a valid username." })


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address!" }),
    password: z.string().min(7, "Password must be atleast 7 chars.")
})