import { authoption } from "@/utility/auth";
import prisma from "@/utility/prismaclient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req,res) {
    const session = await getServerSession(authoption)
try {
    if(!session){
        return NextResponse.json({result : 'Not authorized'}, {status : 401})

    }
    else {
        const user = await prisma.user.findUnique({
            where : {
                email : session.user.email
            },
            include : {
            Bookmark : true
            }
        })
        if(user.Bookmark.length == 0) return NextResponse.json('no bookmarks') 
          

         const promiseArray =   user.Bookmark?.map( (i) => 
                 prisma.post.findUnique({
                    where : {
                        id : i.postId
                    }
                })
                 
            );
        const posts = await Promise.all(promiseArray)
        return NextResponse.json({result : posts}, {status : 200})
   
    }

    
} catch (error) {
    console.log(error)
    return NextResponse.json({result : 'request Failed'},{status  : 500})
}
}