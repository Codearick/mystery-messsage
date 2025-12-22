'use client'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useParams, useRouter } from 'next/navigation'
import { toast } from "sonner"
import * as z from "zod"
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { verifySchema } from '@/schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'



export default function page() {
  const router = useRouter();
  const param = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),

  })

  const onSubmit: SubmitHandler<z.infer<typeof verifySchema>> = async (data: z.infer<typeof verifySchema>) => {

    const payload = {
      username: param.username,
      code: data.code
    }

    // console.log("PAYLOAD: ", payload)
    try {

      const response = await axios.post<ApiResponse>('/api/verify-code', payload);
      console.log("RESPONSE: ", response)

      toast.success("Success", {
                description: response?.data.message,
      })

      // router.replace('/')

    } catch (error) {
      // console.log("Error in verifying user (CLIENT): ", error);

      const axiosError = error as AxiosError<ApiResponse>;
      console.log("AXIOSError: ", axiosError.response?.data)
      let errorMessage = axiosError.response?.data.message;

      console.log("ERROR MESSAGE: ", errorMessage)
      toast.error("Failed", {
        description: errorMessage
      })
    }

  }


  return (
    <div className='flex items-center justify-center min-h-screen bg-black '>
      <div className='text-white'>
        <form id="form-mm-verify" onSubmit={form.handleSubmit(onSubmit)}>

          <Controller
            name='code'
            control={form.control}
            render={({field, fieldState}) => (
              <InputOTP
                {...field}
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                className=" "
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>

              </InputOTP>
            )}
          />

          <Field className='m-7 cursor-pointer' orientation="horizontal">
            <Button className='bg-gray-500 ml-14 cursor-pointer' type="submit" form="form-mm-verify">
              Submit
            </Button>
          </Field>

        </form>
      </div>
    </div>
  )
}
