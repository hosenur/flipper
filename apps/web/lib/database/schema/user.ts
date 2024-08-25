import { userSchema } from '@repo/database/schemas'
import { z } from 'zod'
export const insertUserSchema = userSchema.omit({ id: true }).extend({
    password: z.string().min(8)
})