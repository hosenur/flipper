import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
console.log(process.env)
export const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

