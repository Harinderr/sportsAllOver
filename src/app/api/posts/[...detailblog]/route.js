import prisma from "@/utility/prismaclient";
import { Content } from "@/utility/schema/blogSchema";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utility/auth";





export async function GET(req,res) {
   const {searchParams} = new URL(req.url)
  
   const postSlug = searchParams.get('slug')
    let id = res.params.detailblog[0]

  try {
   const updateviews = await prisma.post.update({
    where : {
      slug : postSlug 
    },
    data : {
      views : { increment : 1}
    }
   })
    const singlePost = await prisma.post.findUnique({
    
        where : { slug : postSlug },
        include : {
          user : true
        }
        
    })
    return NextResponse.json({result: singlePost})
    
  } catch (error) {
    console.log('there is an error' + error)
    return NextResponse.json({result :"there is an error"})
  }
}


