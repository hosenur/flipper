'use client'
import { loginAction } from '@/actions/login-action'
import { insertUserSchema } from '@/lib/database/schema/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form'
import { Input } from '@repo/ui/components/ui/input'
import { } from '@repo/ui/components/ui/sonner'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'


export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof insertUserSchema>>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof insertUserSchema>) => {
    setIsLoading(true)
    const res = await loginAction({ username: data.username, password: data.password })
    if (!res?.data?.success) {
      setIsLoading(false)
      return toast.error(res?.data?.message)
    }
    setIsLoading(false)
    toast.success('Login successful')
    return router.replace('/dashboard/projects')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full'>
          {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
          Log In
        </Button>
      </form>
    </Form>
  )
}
