import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
console.log(process.env)
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

export { prisma };