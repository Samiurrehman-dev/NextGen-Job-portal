import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import User from "@/models/User";
import { hashPassword } from "@/libs/auth";

export async function POST(req: Request) {
    try {
        await dbConnect();
        
        const { name, email, password, role } = await req.json();
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }
        
        // Hash password
        const hashedPassword = await hashPassword(password);
        
        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        
        return NextResponse.json(
            { 
                message: "User registered successfully",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            },
            { status: 201 }
        );
        
    } catch (error) {
        console.log("Register Error:", error);
        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}

