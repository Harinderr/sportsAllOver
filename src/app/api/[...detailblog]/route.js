import { Content } from "@/utility/schema/blogSchema";
import { NextResponse } from "next/server";





export async function GET(req,res) {
    let id = res.params.detailblog[0]
    const detaildata = await Content.findById(id) 
    return NextResponse.json({result:detaildata})
}