import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import User from "@/models/User";
import { comparePassword, generateToken } from "@/libs/auth";

export async function POST(request: Request){
    try {
        await dbConnect();

        const {email, password} = await request.json();

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json(
                {message: "invalid email or password"},
                {status: 400}
                
            );
        }

        const isMatch = await comparePassword(password, user.password);

        if(!isMatch){
            return NextResponse.json(
                {message: "invalid email or password"},
                {status: 400}
            )
        }

        const token =  generateToken(user);

        const response = NextResponse.json(
            {
                message: "User Login Successfully"
            },
            {
                status: 200
            }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,

        });

        return response;


        
    } catch (error: any) {
        console.log("Login Error", error);
        return NextResponse.json(
            {
                message: "something went wrong"
            },
            {status: 200}
        );
        
    }
}