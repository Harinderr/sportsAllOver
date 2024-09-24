import { getAuthSession } from "@/utility/auth";
import prisma from "@/utility/prismaclient";
import { connect } from "mongoose";
import { NextResponse } from "next/server";
import { comment } from "postcss";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const commentId = searchParams.get('cmtId');

        if (!commentId) {
            return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
        }

        const allReplies = await prisma.replies.findMany({
            where: {
                commentId: commentId
            },
            include: {
                user: true
            }
        });

        const data = allReplies.map((item) => ({
            name: item.user.name,
            createdAt: item.createdAt,
            des: item.des,
            commentId: item.commentId,
            id: item.id,
            image :item.user.image
        }));

        console.log(data);
        return NextResponse.json({ result: data });

    } catch (error) {
        console.error('Error loading replies:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(req,res) {
const session = await getAuthSession()
const {searchParams} = new URL(req.url)
const slug = searchParams.get('slug')
const commentId = searchParams.get('cmtId')
if(!session) {
    throw new Error('no Session')
}

try {
    const payload = await req.json()
   
    const newReply  = await prisma.replies.create({
        data : {
            des : payload,
            user : { connect : {email : session.user.email} },
            post : { connect : {slug : slug}},
            comment : { connect : { id : commentId }}
        }
     })
     if(newReply){
       
        

         return NextResponse.json({result:'comment send', status : 200})
     }
    

     
    
} catch (error) {
    console.log('some error occurred',error)
    return NextResponse.json({result : 'error occurred'})
}

}