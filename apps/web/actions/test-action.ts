'use server'
import { authActionClient } from '@/lib/safe-action'
export const testAction = authActionClient
    .action(async () => {
        console.log('test')
    })