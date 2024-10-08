import prisma from "@/utility/prismaclient"
import { NextResponse } from "next/server"


export async function GET(req,res){
    const {searchParams} =  new URL(req.url)
    const pslug = searchParams.get('postslug') || ""
    try {
        const posts = await prisma.post.findMany({
            where : {
                slug : {
                    contains : pslug,
                    mode: 'insensitive'
                }
            }

        })
        console.log(posts)
        return NextResponse.json({result : posts})
    } catch (error) {
        console.log('there is error ');
        return NextResponse.json({result : 'no data error'})
    
        
    } 
    
}