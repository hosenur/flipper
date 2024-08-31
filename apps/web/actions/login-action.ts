'use server';
import { lucia } from "@repo/auth";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";

import { insertUserSchema } from '@/lib/database/schema/user';
import { prisma } from '@repo/database';
import { actionClient } from '../lib/safe-action';

export const loginAction = actionClient
    .schema(insertUserSchema)
    .action(async ({ parsedInput: { username, password } }) => {
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return {
                success: false,
                message: "Invalid username or password"
            }
        }

        const isPasswordValid = await verify(user.password, password);

        if (!isPasswordValid) {
            return {
                success: false,
                message: "Invalid username or password"
            }
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );
        return {
            success: true,
            message: "Login successful"
        }
    });