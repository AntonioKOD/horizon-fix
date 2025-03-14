'use server'
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();


export async function getServices(){
    const services = await prisma.service.findMany();
    return services
}

export async function getQualifications(id: string){
    const qualifications = await prisma.qualification.findMany(
        {
            where: {
                tradespersonId: id
            }
        }
    );
    return qualifications
}


export async function addService(name: string, id: string){
    const tradepersonService = await prisma.tradespersonService.create({
        data: {
            tradespersonId: id,
            serviceId: name
        }
    })
    return tradepersonService
}

export async function addQualification(name: string, id: string){
    const tradespersonQualification = await prisma.tradesperson.update({
        where: {
            id: id
        },
        data: {
            qualifications: {
                connect: {
                    id: name
                }
            }
        }
    })
    return tradespersonQualification
}


export async function updateProfile(formData: FormData, id:string): Promise<void> {
    const name = formData.get("name") as string;
    const businessAddress = formData.get("businessAddress") as string;
    const businessName = formData.get("businessName") as string;
    const businessType = formData.get("businessType") as string;
    const businessWebsite = formData.get("businessWebsite") as string;
    const phone = formData.get("phone") as string;
    const description = formData.get("description") as string;

    await prisma.tradesperson.update({
        where: {
            id
        },
        data: {
            name,
            businessAddress,
            businessName,
            businessType,
            businessWebsite,
            phone,
            description
        }
    })
    revalidatePath(`/tradesperson-profile/${id}`)
    

}

export async function searchTradespeople(search: string){
    const tradespeople = await prisma.tradesperson.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: search
                    }
                },
                {
                    businessName: {
                        contains: search
                    }
                }
            ]
        }
    })
    return tradespeople
}