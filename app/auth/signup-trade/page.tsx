'use client'
import {Button} from "@/components/ui/button"
import Link from 'next/link'
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {useRouter} from 'next/navigation'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'


const schema = z.object({
    email: z.string().email().toLowerCase().transform((val) => val.trim()),
    password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .transform((value) => value.trim()),
    name: z.string().min(2).transform((val) => val.trim()),
    businessName: z.string().min(2).transform((val) => val.trim()),
    businessAddress: z.string().min(2).transform((val) => val.trim()),
    businessType: z.string().min(2).transform((val) => val.trim()),
    businessWebsite: z.string().url().transform((val) => val.trim()),
    phone: z.string().min(2).transform((val) => val.trim()),
    description: z.string().min(2).transform((val) => val.trim()),
})


export default function SignupForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            businessName: "",
            businessAddress: "",
            businessType: "",
            businessWebsite: "",
            phone: "",
            description: ""
        }
    })
    const handleSignup = async (values: z.infer<typeof schema>) => {
        const res = await fetch("/api/auth/signup-trade", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });
        if(res.ok){
            router.push("/verify-notice")
        }else{
            console.error("Error signing up:", res)
        }

    }
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='max-w-md w-full p-4 bg-white shadow rounded-md'>
        <h1 className='text-2xl font-bold mb-6 text-gray-800'>Sign Up</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignup)} className='space-y-4'>
                <FormField control={form.control} name='name'
                render={({field})=> (
                    <FormItem>
                        <FormLabel className='text-gray-700'>Username</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Username' />
                        </FormControl>
                        <FormMessage {...field} />
                    </FormItem>
                )}
                />
                <FormField control={form.control} name='email'
                render={({field})=> (
                    <FormItem>
                        <FormLabel className='text-gray-700'>Email</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Email' />
                            
                        </FormControl>
                        <FormMessage {...field} />
                    </FormItem>
                )}
                />
                <FormField control={form.control} name='password'
                render={({field})=> (
                    <FormItem>
                        <FormLabel className='text-gray-700'>Password</FormLabel>
                        <FormControl>
                            <Input {...field} type='password' placeholder='Password' />
                            
                        </FormControl>
                        <FormMessage {...field} />
                    </FormItem>
                )}
                />
                <FormField control={form.control} name='businessName'
                render={({field})=> (
                    <FormItem>
                        <FormLabel className='text-gray-700'>Business Name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Business Name' />
                        </FormControl>
                        <FormMessage {...field} />
                    </FormItem>
                )}
                />
                <FormField control={form.control} name='businessAddress'
                render={({field})=> (
                    <FormItem>
                        <FormLabel className='text-gray-700'>Business Address</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Business Address' />
                        </FormControl>
                        <FormMessage {...field} />
                    </FormItem>
                )}
                />
                <FormField control={form.control} name='businessType'
                render={({field})=> (
                    <FormItem>
                        <FormLabel className='text-gray-700'>Business Type {`(e.g. Plumbing)`}</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Business Type' />
                        </FormControl>
                        <FormMessage {...field} />
                    </FormItem>
                )}
                />
                <FormField control={form.control} name='businessWebsite'
                render={({field})=> (
                    <FormItem>
                        <FormLabel className='text-gray-700'>Business Website</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Business Website' />
                        </FormControl>
                        <FormMessage {...field} />
                    </FormItem>
                )}
                />
                <FormField control={form.control} name='phone'
                render={({field})=> (
                    <FormItem>
                        <FormLabel className='text-gray-700'>Phone</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Phone' />
                        </FormControl>
                        <FormMessage {...field} />
                    </FormItem>
                )}
                />
                <FormField control={form.control} name='description'
                render={({field})=> (
                    <FormItem>
                        <FormLabel className='text-gray-700'>Description</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Description' />
                        </FormControl>
                        <FormMessage {...field} />
                    </FormItem>
                )}
                />
                <FormDescription className='text-gray-500 text-sm'>Already have an account? <Link href='/auth/login-trade' className='text-blue-600 font-bold'>Login</Link></FormDescription>
                <Button type='submit' className='w-full'>Sign Up</Button>
            </form>
        </Form>
        </div>
    </div>
    )
}