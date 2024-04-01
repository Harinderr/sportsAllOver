
import prisma from "@/utility/prismaclient"
import { NextResponse } from "next/server"

export const GET = async (req,res) => {
 
     try{
        const topThreePosts = await prisma.post.findMany({
            take: 3, // Take the top three posts
            orderBy: {
              views: 'desc' // Order by views in descending order
            }
          });
    return NextResponse.json({result : topThreePosts})
}
    catch(err){
        console.log('there is an error' + err)
        return NextResponse.json({result:'thre is error'})
    }
   
}




