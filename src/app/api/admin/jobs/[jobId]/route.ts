import dbConnect from "@/libs/dbConnect";
import Job from "@/models/Job";
import { NextResponse } from "next/server";
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
        const { jobId } = params;
        const job = await Job.findById(jobId);
        if (!job) {
            return NextResponse.json({ message: "Job not found" }, { status: 404 });
        }
        await Job.findByIdAndDelete(jobId);
        return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting job:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        
    }

}