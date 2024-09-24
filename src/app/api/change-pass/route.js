import prisma from "@/utility/prismaclient";
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';



export async function PATCH(req) {
    console.log(req.method)
  if (req.method !== "PATCH") {
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const { existingPass, newPass, confirmNewPass, email } = await req.json();

    // Check if new passwords match
    if (newPass !== confirmNewPass) {
      return NextResponse.json({ message: "New passwords do not match" }, { status: 400 });
    }

    // Fetch the user by email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the existing password matches
    const isPasswordValid = bcrypt.compareSync(existingPass, existingUser.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Incorrect existing password" }, { status: 401 });
    }

    // Generate salt and hash the new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPass, salt);

    // Update the password in the database
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Return success response if password is updated
    if(updatedUser) return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
    
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
