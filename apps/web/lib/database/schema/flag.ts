import { timestamps } from '@/lib/utils'
import { flagSchema } from '@repo/database/schemas'
export const baseFlagSchema = flagSchema.omit(timestamps)
export const insertFlagSchema = baseFlagSchema.omit({ id: true, invocation: true })
export const insertFlagParams = baseFlagSchema.omit({ id: true, invocation: true })