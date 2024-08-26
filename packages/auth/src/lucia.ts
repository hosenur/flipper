import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "@repo/database";
import { Lucia } from "lucia";
const adapter = new PrismaAdapter(prisma.session, prisma.user);
export const lucia = new Lucia(adapter);