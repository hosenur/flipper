'use server'

import { insertProjectParams, insertProjectSchema } from '@/lib/database/schema/project'
import { authActionClient } from '@/lib/safe-action'
import { prisma } from '@repo/database'

export const createProject = authActionClient
    .schema(insertProjectParams)
    .action(async ({ parsedInput: { name, description }, ctx }) => {
        console.log("here is the context", ctx)
        const newProject = insertProjectSchema.parse({ name, description, userId: ctx.session.user.id })
        const project = await prisma.project.create({
            data: newProject,
        })
        return { project: project }
    })