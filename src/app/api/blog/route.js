import prisma from "@/utility/prismaclient";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const cat = searchParams.get("cat") || "";

  let num = parseInt(page, 10);

  const pagenumber = num || 1;

  const NO_OF_POST = 4;
  
  const query = {
    skip: NO_OF_POST * (pagenumber - 1),
    take: NO_OF_POST,
    where: {
      ...(cat && { catSlug: cat }),
    },
  };
  try {
    const count = await prisma.post.count({ where: query.where });
    const posts = await prisma.post.findMany(query);
    return NextResponse.json({ result: posts, count: count });
  } catch (err) {
    console.log("there is an error" + err);
    return NextResponse.json({ result: "thre is error" });
  }
};
