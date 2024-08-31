'use client'
import { createProjectAction } from '@/actions/create-project-action'
import { insertProjectParams } from '@/lib/database/schema/project'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form'
import { Input } from '@repo/ui/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/components/ui/sheet'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


export default function CreateProjectSheet() {
  const [open, setOpen] = useState<boolean>(false)
  const form = useForm<z.infer<typeof insertProjectParams>>({
    resolver: zodResolver(insertProjectParams),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof insertProjectParams>) => {
    const res = await createProjectAction({ name: data.name, description: data.description })
    if (res?.data?.success) {
      setOpen(false)
      toast.success('Project created successfully')
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>CREATE PROJECT</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Project</SheetTitle>
          <SheetDescription>
            Enter the required details to create a new project.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Project Name" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Project Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit">Create Project</Button>

            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
