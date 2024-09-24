import prisma from "@/utility/prismaclient";
import { Content } from "@/utility/schema/blogSchema";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utility/auth";

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);

  const postSlug = searchParams.get("slug");

  try {
    const comments = await prisma.comment.findMany({
      where: { ...(postSlug && { postSlug }) },
      include: {
        user: true,
      },
    });
    
    const data = comments.map((item) => ({
      name: item.user.name,
      createdAt: item.createdAt,
      des: item.des,
     id: item.id,
     image : item.user.image
  }));
console.log(data)
 
  return NextResponse.json({ result: data });

  
  } catch (error) {
    console.log("there is an error");
    return NextResponse.json({ result: "there is an error" });
  }
}

export async function POST(req, res) {
  const session = (await getAuthSession()) || true;
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!session) {
    throw new Error("no session");
  } else {
    try {
      const payload = await req.json();
      const { comment } = payload;
      // console.log(comment + " " + session.user.email)

      const commentData = await prisma.comment.create({
        data: {
          des: comment,
          user: { connect: { email: session.user.email } },
          post: { connect: { slug: slug } },
        },
      });
      console.log("data saved");
      return NextResponse.json({ result: "data created", data: commentData });
    } catch (error) {
      console.log("some error while saving" + error);
      return NextResponse.json("Thre is an error");
    }
  }
}
