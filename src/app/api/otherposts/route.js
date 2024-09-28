import { NextResponse } from "next/server"

export async function POST(req,res) {
    try {
        const payload = await req.json()
        console.log(payload)
        const newPost = await prisma.post.create({
            
        })
       return  NextResponse.json('data got')
    } catch (error) {
        console.error(error)
        return NextResponse.json('conn refused')
    }
}