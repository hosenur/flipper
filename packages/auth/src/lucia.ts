import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@repo/database";
import { Lucia } from "lucia";
const prisma = new PrismaClient();
const adapter = new PrismaAdapter(prisma.session, prisma.user);
export const lucia = new Lucia(adapter);