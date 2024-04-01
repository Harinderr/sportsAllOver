import { getAuthSession } from "@/utility/auth"
import prisma from "@/utility/prismaclient"
import { NextResponse } from "next/server"



export async function POST(req,res) {
    const session = await getAuthSession()
    if(!session) {
      throw new Error('no session')
    }
    else  { 
      try {
        const payload = await req.json()
        console.log(payload)
    const createpost  = await prisma.post.create({
        data : {
            title : payload.title,
            des : payload.des,
            img : payload.img,
           slug : payload.slug,
           
            user : {
             connect : {  email : session.user.email}
            },
            cat : {
                connect : {
                    slug : payload.catSlug
                }

            }
        }
    })
    return NextResponse.json({result:'data found'})
     
      }
      
      catch (error) {
        console.log('some error while saving ' + error)
      return NextResponse.json('Thre is an error')
      }
     
    }
      
    }
  