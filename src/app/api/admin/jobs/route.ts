import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import Job from "@/models/Job";
import { getUserFromRequest, requireRole } from "@/libs/auth";
export async function GET(req: Request) {
    try {
        await dbConnect();
        const currentuser = await getUserFromRequest(req as any);
        if (!currentuser) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        if (!requireRole(currentuser, ["admin"])) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }
        const jobs = await Job.find().populate("createdBy", "name email role");
        if (!jobs) {
            return NextResponse.json({ message: "No jobs found" }, { status: 404 });
        }
        return NextResponse.json(jobs, { status: 200 });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}