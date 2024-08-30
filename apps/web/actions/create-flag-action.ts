'use server'

import { insertFlagParams, insertFlagSchema } from '@/lib/database/schema/flag'
import { authActionClient } from '@/lib/safe-action'
import { prisma } from '@repo/database'
import { revalidatePath } from 'next/cache'

export const createFlagAction = authActionClient
    .schema(insertFlagParams)
    .action(async ({ parsedInput: { name, description, value, projectId }, ctx }) => {
        const newFlag = insertFlagSchema.parse({ name, description, value, projectId })
        const flag = await prisma.flag.create({
            data: newFlag,
        })
        revalidatePath(`/dashboard/project/${flag.projectId}`)
        return { success: true, data: flag }
    })