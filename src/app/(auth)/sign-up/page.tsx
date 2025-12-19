'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"

import { Input } from "@/components/ui/input"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';


const page = () => {
    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const debounced = useDebounceCallback(setUsername, 500);
    const router = useRouter();

    // zod implementation
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    })

    useEffect(() => {
        const checkUniqueUsername = async () => {
            if (username) {
                setIsCheckingUsername(true);
                setUsernameMessage('');

                try {
                    const response = await axios.get(`/api/check-username-unique?username=${username}`)

                    // check response from axios
                    setUsernameMessage(response.data.message)
                    console.log("Axios response: ", response);
                    setIsCheckingUsername(false);
                    console.log("THIS IS USER: ",usernameMessage)

                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>
                    setUsernameMessage(axiosError.response?.data.message ?? "Error checking username");
                    setIsCheckingUsername(false);
                }
            }
        }
        checkUniqueUsername();
    }, [username])

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true);
        try {
            // console.log data from react-hook-form
            data.username.toLowerCase();
            console.log("This is Data", data)
            const response = await axios.post<ApiResponse>('/api/sign-up', data);
            toast.success("Success", {
                description: response.data.message,
            })
            router.replace(`/verify/${username}`)

        } catch (error) {
            console.log("Error in signing up user", error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast.error("Signup failed", {
                description: errorMessage,
            })
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex item-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md h-1/2 p-8 m-10 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">
                        Join Mystery Message
                    </h1>
                    <p className="mb-4">Sign up to start your anonymous adventure !</p>
                </div>

                <form id="form-mm-sign-up" onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6">

                    <FieldGroup>

                        <Controller
                            name="username"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e)
                                            debounced(e.target.value.toLowerCase())
                                        }}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Please enter your username"
                                        autoComplete="off"
                                    />
                                    {
                                        isCheckingUsername ? <Loader2 className="animate-spin"/> 
                                        : (<p className={`text-sm ${usernameMessage === 'Username available.' ? 'text-gray-600' : 'text-red-500'}`}>{usernameMessage}</p>)
                                    }
                                </Field>
                            )}
                        />

                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Please enter your email"
                                        autoComplete="on"
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Please enter your password"
                                        autoComplete="off"
                                    />
                                    {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                                </Field>
                            )}
                        />

                        <Field orientation="horizontal">
                            <Button disabled={isSubmitting} type="button" variant="outline" onClick={() => { form.reset(); setUsernameMessage("")}}>
                                Reset
                            </Button>
                            <Button disabled={isSubmitting} type="submit" form="form-mm-sign-up">
                                {
                                    isSubmitting ? (
                                        <>
                                        <Loader2 className="animate-spin h-4 w-4 mr-2"/>
                                        </>
                                    ) : ('Sign Up')
                                    
                                }
                            </Button>
                        </Field>

                    </FieldGroup>

                    <div>
                        <p>Already a member?{' '}
                            <Link href={"/sign-in"}
                            className="text-blue-600 hover:text-blue-800"
                            >Sign in</Link>
                        </p>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default page