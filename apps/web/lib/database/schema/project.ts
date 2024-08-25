import { timestamps } from '@/lib/utils'
import { projectSchema } from '@repo/database/schemas'
const baseSchema = projectSchema.omit(timestamps)
export const insertProjectSchema = baseSchema.omit({ id: true })
export const insertProjectParams = baseSchema.omit({ id: true, userId: true })