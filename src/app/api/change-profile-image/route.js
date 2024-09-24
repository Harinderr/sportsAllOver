import prisma from "@/utility/prismaclient"
import { NextResponse } from "next/server"

export async function PATCH(req,res) {
    try {
    const {url,email} = await req.json()
    const imgChange = await prisma.user.update({
        where : {
            email : email
        },
        data : {
            image : url
        }
    })
  if (imgChange) return NextResponse.json({result: 'image updated success'}, {status:200})
    
} catch (error) {
    NextResponse.json({result:'unable to change image'},{status :500})
}
}