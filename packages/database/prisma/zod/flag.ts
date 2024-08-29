import * as z from "zod"
import { CompleteProject, relatedProjectSchema } from "./index"

export const flagSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  name: z.string(),
  description: z.string(),
  invocation: z.number().int(),
  value: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteFlag extends z.infer<typeof flagSchema> {
  project: CompleteProject
}

/**
 * relatedFlagSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFlagSchema: z.ZodSchema<CompleteFlag> = z.lazy(() => flagSchema.extend({
  project: relatedProjectSchema,
}))
