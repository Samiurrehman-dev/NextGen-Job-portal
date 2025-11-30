import dbConnect from "@/libs/dbConnect";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { getUserFromRequest, requireRole } from "@/libs/auth";

export async function DELETE(req: Request, { params }: any) {
    try {
        await dbConnect();
        const currentuser = await getUserFromRequest(req as any);
        if (!currentuser) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        if (!requireRole(currentuser, ["admin"])) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }
        const { userId } = params;
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        await User.findByIdAndDelete(userId);
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });

    }


}