'use server';
import { lucia } from "@repo/auth";
import * as argon2 from "argon2";
import { generateId } from "lucia";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import { prisma } from '@/lib/database';
import { insertUserSchema } from '@/lib/database/schema/user';
import { actionClient } from '../lib/safe-action';

export const register = actionClient
    .schema(insertUserSchema)
    .action(async ({ parsedInput: { username, password } }) => {
        // Check if username already exists
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });
        if (existingUser) {
            throw new Error("Username already exists");
        }



        const hashedPassword = await argon2.hash(password);
        const userID = generateId(15);

        try {
            await prisma.user.create({
                data: {
                    id: userID,
                    username,
                    password: hashedPassword,
                }
            });
        } catch (error) {
            throw new Error("Failed to create user");
        }

        let session;
        try {
            session = await lucia.createSession(userID, {});
        } catch (error) {
            throw new Error("Failed to create session");
        }

        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        redirect('/dashboard');
    });