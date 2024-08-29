'use server'

import { insertProjectParams, insertProjectSchema } from '@/lib/database/schema/project'
import { authActionClient } from '@/lib/safe-action'
import { prisma } from '@repo/database'
import { revalidatePath } from 'next/cache'

export const createProject = authActionClient
    .schema(insertProjectParams)
    .action(async ({ parsedInput: { name, description }, ctx }) => {
        console.log("here is the context", ctx)
        const newProject = insertProjectSchema.parse({ name, description, userId: ctx.session.user.id })
        const project = await prisma.project.create({
            data: newProject,
        })
        revalidatePath('/projects')
        return { success: true, data: project }
    })