import prisma from "@/utility/prismaclient"
import { NextResponse } from "next/server"

export const GET = async () => {
    const categories = await prisma.category.findMany()
    return NextResponse.json({result :categories})
}


