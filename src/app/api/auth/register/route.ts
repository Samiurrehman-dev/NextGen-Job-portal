import { NextResponse } from "next/server"
import dbConnect from "@/libs/dbConnect"
import User from "@/models/User"

import { hashPassword } from "@/libs/auth"

export async function POSt(request: Request){
    try {
        await dbConnect();

        const{name, email, password, role} = await request.json();
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {message: "User already exists"},
                {status: 400}
            )
        }
        const hashedPassword = await  hashPassword(password);

        const newUser = await User.create({
            name,
            email,
            hashPassword,
            role
        });

        return NextResponse.json(
            {
                message: "User Registered Successfully", user: newUser
            },
            {
                status: 201
            }
        );
        
    } catch (error: any) {
        console.log("Registration Error: ", error);
        NextResponse.json(
            {
                message: "something went wrong",
                status : 500
            }
        );
    }
}

