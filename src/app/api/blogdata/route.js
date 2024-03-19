import { NextResponse } from "next/server"
import { connectToDB } from "@/utility/DatabaseConnection";
import { Content } from "@/utility/schema/blogSchema";
connectToDB()
export async function GET(req,res) {

    const blogs = await Content.find({})
    
  return  NextResponse.json({result:blogs})
}
export async function POST(req,res) {
   const payload = await req.json()
   const {title, content} = payload;
   const blog = new Content({
    title : title,
    content : content
   }).save()
    return NextResponse.json({result:'data published'})
}