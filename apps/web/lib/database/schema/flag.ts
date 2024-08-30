import { timestamps } from '@/lib/utils'
import { flagSchema } from '@repo/database/schemas'
const baseSchema = flagSchema.omit(timestamps)
export const insertFlagSchema = baseSchema.omit({ id: true, invocation: true })
export const insertFlagParams = baseSchema.omit({ id: true, invocation: true })