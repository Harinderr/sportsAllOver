import { getAuthSession } from "@/utility/auth";
import prisma from "@/utility/prismaclient";
import { connect } from "mongoose";
import { NextResponse } from "next/server";
import { comment } from "postcss";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("cmtId");
    const type = searchParams.get('type')
    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }  
     let allReplies;
    
    if (type == 'replies') {
       allReplies = await prisma.replies.findMany({
        where: {
          parentReplyId : commentId,
        },
        include: {
          user : true,
         
        },
      });
      console.log(allReplies)
    } else {
       allReplies = await prisma.replies.findMany({
        where: {
          commentId : commentId,
        },
        include: {
          user : true,
         
        },
      });
    }
 

    const data = allReplies.map((item) => ({
      name: item.user.name,
      createdAt: item.createdAt,
      des: item.des,
      commentId: item.commentId,
      id: item.id,
      image: item.user.image,
    }));

   
    return NextResponse.json({ result: data });
  } catch (error) {
    console.error("Error loading replies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req, res) {
  const session = await getAuthSession();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const commentId = searchParams.get("cmtId");
  const replyId = searchParams.get("replyId");
  console.log({'this is comment Id' :commentId}, { 'this is reply id' : replyId})
  if (!session) {
    throw new Error("no Session");
  }

  try {
    const payload = await req.json();
console.log('this is payload',payload)
    let newReply;
    if (replyId) {

    console.log('reply trigered')
      newReply = await prisma.replies.create({
        data: {
          des: payload,
          user: { connect: { email: session.user.email } },
          post: { connect: { slug: slug } },
          parentReply: { connect: { id: replyId } },
        },
      });
    } else if (commentId) {
      console.log('commt  trigered')
      newReply = await prisma.replies.create({
        data: {
          des: payload,
          user: { connect: { email: session.user.email } },
          post: { connect: { slug: slug } },
          comment: { connect: { id: commentId } },
        },
      });
    }

    if (newReply) {
      return NextResponse.json({ result: "comment send", status: 200 });
    }
  } catch (error) {
    console.log("some error occurred", error);
    return NextResponse.json({ result: "error occurred" });
  }
}
