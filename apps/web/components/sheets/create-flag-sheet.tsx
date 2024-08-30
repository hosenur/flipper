'use client'
import { createFlagAction } from '@/actions/create-flag-action'
import { insertFlagParams } from '@/lib/database/schema/flag'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form'
import { Input } from '@repo/ui/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/components/ui/sheet'
import { Switch } from "@repo/ui/components/ui/switch"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


export default function CreateFlagSheet({ projectId }: { projectId: string }) {
    const [open, setOpen] = useState<boolean>(false)
    const form = useForm<z.infer<typeof insertFlagParams>>({
        resolver: zodResolver(insertFlagParams),
        defaultValues: {
            name: '',
            description: '',
            projectId: projectId,
            value: false,
        },
    })

    const onSubmit = async (data: z.infer<typeof insertFlagParams>) => {
        const res = await createFlagAction({
            name: data.name.replaceAll(' ', '-'),
            description: data.description,
            value: data.value,
            projectId: projectId,
        })
        if (res?.data?.success) {
            setOpen(false)
            toast.success('Flag created successfully')
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>CREATE FLAG</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>New Project</SheetTitle>
                    <SheetDescription>
                        Enter the required details to create a new project.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Flag Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="EXAMPLE: SHOW-ADS" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Flag Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="EXAMPLE: Show ads on the homepage" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-end justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>ENABLE FLAG</FormLabel>
                                        <FormDescription>
                                            SET THE FLAG VALUE FOR ALL USERS
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <SheetFooter>
                            <Button type="submit">Create FLAG</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
