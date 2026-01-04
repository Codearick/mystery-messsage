'use client'

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form"
import { useDebounceCallback } from 'usehooks-ts';
import { signInSchema } from '@/schemas/signInSchema';
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const page = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: '',
            password: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setIsSubmitting(true);

        const result = await signIn('credentials', {
            identifier: data.identifier,
            password: data.password,
            redirect: false
        })

        if (result?.error) {
            if (result?.error == "CredentialsSignIn") {
                toast.error("Incorrect username or password", {
                    description: result?.error,
                })
            } else{
                toast.error("Error", {
                    description: result?.error,
                })
            }
            setIsSubmitting(false);
        }
        if (result?.url) {
            router.replace('/dashboard')
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md h-1/2 p-8 m-10 space-y-8 bg-gray-100 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">
                        Mystery Message
                    </h1>
                    <p className="mb-4">Sign in to start your anonymous adventure !</p>
                </div>

                <form id="form-mm-sign-up" onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6">

                    <FieldGroup>

                        <Controller
                            name="identifier"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Username / Email</FieldLabel>
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e)
                                        }}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your Username/Email"
                                        autoComplete="off"
                                    />
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
                            <Button disabled={isSubmitting} type="button" variant="outline" onClick={() => { form.reset(); }}>
                                Reset
                            </Button>
                            <Button disabled={isSubmitting} type="submit" form="form-mm-sign-up">
                                {
                                    isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                        </>
                                    ) : ('Sign In')

                                }
                            </Button>
                        </Field>

                    </FieldGroup>

                    <div>
                        <p>New member?{' '}
                            <Link href={"/sign-up"}
                                className="text-blue-600 hover:text-blue-800"
                            >Sign up</Link>
                        </p>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default page