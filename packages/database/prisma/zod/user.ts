import * as z from "zod"
import { CompleteSession, relatedSessionSchema, CompleteProject, relatedProjectSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  sessions: CompleteSession[]
  Project: CompleteProject[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  sessions: relatedSessionSchema.array(),
  Project: relatedProjectSchema.array(),
}))
