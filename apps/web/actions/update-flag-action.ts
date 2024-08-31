'use server'
import { updateFlagParams } from '@/lib/database/schema/flag'
import { authActionClient } from '@/lib/safe-action'
import { prisma } from '@repo/database'
import { revalidatePath } from 'next/cache'
export const updateFlagAction = authActionClient
    .schema(updateFlagParams)
    .action(async ({ parsedInput: { id, value } }) => {
        //update the flag value
        const flag = await prisma.flag.update({
            where: { id },
            data: { value: !value },
            include: { project: true },
        })
        revalidatePath(`/dashboard/project/${flag.projectId}`)
        return { success: true, data: flag }
    })