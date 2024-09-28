import { deleteImagesFromFirebase } from "@/lib/utils";
import { getAuthSession } from "@/utility/auth";
import prisma from "@/utility/prismaclient";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("no session");
  } else {
    try {
      const payload = await req.json();
      console.log(payload);
      const createpost = await prisma.post.create({
        data: {
          title: payload.title,
          des: payload.des,
          img: payload.img,
          slug: payload.slug,
          subDes : payload.subDes,
          imgUrls : payload.imgUrls,
          user: {
            connect: { email: session.user.email },
          },
          cat: {
            connect: {
              slug: payload.catSlug,
            },
          },
        },
      });
      return NextResponse.json({ result: "data created" });
    } catch (error) {
      console.log("some error while saving " + error);
      return NextResponse.json("Thre is an error");
    }
  }
}


export async function DELETE(req,res){
  try {
    const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
   const DeletePost = await prisma.post.delete({
    where : {
      slug : slug
    }
   })
   if(DeletePost){
   ( DeletePost.imgUrls.length > 0 ) && await deleteImagesFromFirebase(DeletePost.imgUrls)
     return NextResponse.json({result : 'successfully deleted'},{status : 200})
    }
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({result : 'Failed to Delete'}, {status : 400})
  }
}