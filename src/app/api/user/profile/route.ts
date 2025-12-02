import dbConnect from "@/libs/dbConnect";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { getUserFromRequest } from "@/libs/auth";
export async function GET(request: Request) {
    try {
        await dbConnect();
        const user = await getUserFromRequest(request as any);
        if (!user) {
            return NextResponse.json(
                { message: "UnAuthorized" },
                { status: 401 }
            );
        }
        const userProfile = await User.findById(user._id).select("-password");
        return NextResponse.json({
            message: "User Profile fetched successfully",
            user: userProfile,} 
         );



    }
    catch (error) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}
export async function PATCH(request: Request) {
    try {
        await dbConnect();
        const user = await getUserFromRequest(request as any);
        if (!user) {
            return NextResponse.json(
                { message: "UnAuthorized" },
                { status: 401 }
            );
        }
        const { name, email, skills, bio, role } = await request.json();
        const updatedProfile = await User.findByIdAndUpdate(
            user._id,
            { name, email, skills, bio, role },
            { new: true }
        ).select("-password");
        return NextResponse.json({
            message: "User Profile updated successfully",
            user: updatedProfile,
        });
        
    } catch (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
        
    }

}