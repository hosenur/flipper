import { getUserAuth } from "@repo/auth";
import { prisma } from "@repo/database";

export async function GET(req: Request, { params }: { params: { flagId: string } }) {
    console.log(req)
    const { session } = await getUserAuth();
    if (!session) {
        throw new Error('Unauthorized')
    }
    const flag = await prisma.flag.findFirst({
        where: {
            id: params.flagId,
        }
    })
    return new Response(JSON.stringify(flag))
}

export async function POST(req: Request, { params }: { params: { flagId: string } }) {
    console.log(req)
    const flag = await prisma.flag.update({
        where: {
            id: params.flagId,
        },
        data: {
            invocation: {
                increment: 1
            }
        }
    })
    return new Response(JSON.stringify(flag))
}