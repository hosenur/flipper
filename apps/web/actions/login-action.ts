'use server';
import { lucia } from "@repo/auth";
import * as argon2 from "argon2";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import { prisma } from '@/lib/database';
import { insertUserSchema } from '@/lib/database/schema/user';
import { actionClient } from '../lib/safe-action';

export const login = actionClient
    .schema(insertUserSchema)
    .action(async ({ parsedInput: { username, password } }) => {
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            throw new Error("Invalid username or password");
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            throw new Error("Invalid username or password");
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        redirect('/dashboard');
    });