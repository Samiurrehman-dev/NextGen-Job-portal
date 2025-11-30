import dbConnect from "@/libs/dbConnect";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { getUserFromRequest, requireRole } from "@/libs/auth";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const user = await getUserFromRequest(req as any);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!requireRole(user, ["admin"])) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const users = await User.find().select("-password");
    return NextResponse.json({ message: "Users fetched successfully", users }, { status: 200 });
    

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    
  }
}
