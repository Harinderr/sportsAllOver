import { User } from "@/utility/schema/userdetailSchema";

import { NextResponse } from "next/server";
import prisma from "@/utility/prismaclient";
import bcrypt from 'bcryptjs'


const bcryptSalt = bcrypt.genSaltSync(10)



export async function GET(req,res){
    return NextResponse.json('hlo')
}
 export async function POST(req,res) {
    const payload = await req.json()
  
    const hashPass = bcrypt.hashSync(payload.password,bcryptSalt)
   
  try { 
    const existingEmail = await prisma.user.findUnique({
        where : {
            email : payload.email
        }
    })
    if (existingEmail){
        return NextResponse.json({user : null, message : 'user with email exists'},{status : 409})
    }
    const newUser = await prisma.user.create({
        data : {
            name :payload.username,
            email : payload.email,
            password : hashPass,
            role : 'user'
            
        }
    })
    const {password : newPass, ...rest} = newUser;
    return NextResponse.json({result :'user detail saved', data: rest})}
    catch (err) {
        console.log('there is an error'+ err);
    }
}