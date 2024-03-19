import { User } from "@/utility/schema/userdetailSchema";
import { connectToDB } from "@/utility/DatabaseConnection";
import { NextResponse } from "next/server";



connectToDB()

export async function GET(req,res){
    return NextResponse.json('hlo')
}
 export async function POST(req,res) {
    const payload = await req.json()
   const user = new User({
    username : payload.username,
    password : payload.password
   }).save()
    return NextResponse.json({result :'user detail found'})
}