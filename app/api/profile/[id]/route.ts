import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(req: Request){
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    const profile = await prisma.tradesperson.findUnique({
        where: {
            id: id,
        },
    });

    if (!profile) {
        return new Response(JSON.stringify({ error: 'Profile not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({profile}), {status: 200})
}