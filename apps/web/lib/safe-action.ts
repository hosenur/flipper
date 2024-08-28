import { createSafeActionClient } from "next-safe-action";
import { getUserAuth } from "@repo/auth"
export const actionClient = createSafeActionClient();
export const authActionClient = actionClient.use(async ({ next }) => {
    const { session } = await getUserAuth();
    if (!session) {
        throw new Error('Unauthorized')
    }
    return next()
})