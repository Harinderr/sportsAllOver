import { authoption } from "@/utility/auth"
import prisma from "@/utility/prismaclient"
import { connect } from "mongoose"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export async function GET(req,res){
    const session = await getServerSession(authoption)
    if (!session) {
        return NextResponse.json({result : 'no session'},{status : 401})
      }
    else {
       
        const bookmarks = await prisma.bookmark.findMany({
            where : {
                userEmail : session.user.email
            }
        })
        return NextResponse.json({result : bookmarks})
    }
}

export async function POST(req) {
    try {
        const payload = await req.json()
        const newBookmark = await prisma.bookmark.create({
            data : {
                postId : payload.val,
                user : {
                    connect : { email : payload.email}
                }
            }
        })
        return NextResponse.json({result : newBookmark},{status:200})
    } catch (error) {
       
        return NextResponse.json('error 500')
    }
}

export async function DELETE(req,res) {
    try {
        const payload = await req.json()
        const deleteBookmark = await prisma.bookmark.delete({
            where : {
                postId : payload.val
            }
        })
        return NextResponse.json('unsaved')
        
    } catch (error) {
        
        return NextResponse.json('error while unsaving')
    }
}