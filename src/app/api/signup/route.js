import { User } from "@/utility/schema/userdetailSchema";

import { NextResponse } from "next/server";
import prisma from "@/utility/prismaclient";
import bcrypt from 'bcryptjs'
import Joi from "joi";


const bcryptSalt = bcrypt.genSaltSync(10)

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });

export async function GET(req,res){
    return NextResponse.json('hlo')
}
 export async function POST(req,res) {
    const payload = await req.json()
    // const result = schema.validate(payload)
//     // Check for validation errors
// if (result.error) {
//     console.error('Validation error:', result.error.details[0].message);
//   } else {
//     console.log('Data is valid:', result.value);
//   }
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
            password : hashPass
            
        }
    })
    const {password : newPass, ...rest} = newUser;
    return NextResponse.json({result :'user detail saved', data: rest})}
    catch (err) {
        console.log('there is an error'+ err);
    }
}