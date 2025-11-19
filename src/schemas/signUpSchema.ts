import {z} from "zod";

export const usernameValidation = z.string().min(3, "Username must be atleast 3 chars")
                                            .max(20, "Username length should be 20!")
                                            .regex(/^(?!.*\.\.)(?!\.)(?!.*\.$)[a-z0-9._]/
, "Invalid username")

export const signUpSchema = z.object({
    usrname: usernameValidation,
    email: z.string().email({message:"Invalid email address!"}),
    password: z.string().min(7, "Password must be atleast 7 chars!")
})