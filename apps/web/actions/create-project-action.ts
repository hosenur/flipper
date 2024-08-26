'use server'

import { prisma } from '@repo/database'
import { insertProjectParams, insertProjectSchema } from '@/lib/database/schema/project'
import { actionClient } from '@/lib/safe-action'

export const createProject = actionClient
    .schema(insertProjectParams)
    .action(async ({ parsedInput: { name, description } }) => {
        const newProject = insertProjectSchema.parse({ name, description, userId:"" })
        const project = await prisma.project.create({
            data: {
                name,
                userId: "",
                description
            }
        })
    })