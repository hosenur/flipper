import * as z from "zod"

export const kVSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
})
