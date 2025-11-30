import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import User from "@/models/User";
import { getUserFromRequest, requireRole } from "@/libs/auth";

export async function PUT(req: Request, { params }: any) {

    try {
        dbConnect();
        const currentuser = await getUserFromRequest(req as any);
        if (!currentuser) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        if (!requireRole(currentuser, ["admin"])) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }
        const { userId } = params;
        const {role} = await req.json();
        const validRoles = ["admin", "employer", "applicant"];
        if (!validRoles.includes(role)) {
            return NextResponse.json({ message: "Invalid role specified" }, { status: 400 });
        }
        await User.findByIdAndUpdate(userId, { role }, { new: true });

        return NextResponse.json({ message: "Role updated successfully" }, { status: 200 });
        
    } catch (error) {
        console.error("Error updating user role:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        
    }
}