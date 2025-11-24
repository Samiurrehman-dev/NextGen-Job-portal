import { getUserFromRequest, requireRole } from "@/libs/auth";
import dbConnect from "@/libs/dbConnect";
import Application from "@/models/Application";
import Job from "@/models/Job";
import { NextResponse } from "next/server";

export async function Get(req: Request, {params}: any){
    try {
        
        await dbConnect();
        const user = await getUserFromRequest(req as any);
        if(!user){
            return NextResponse.json(
                {message: "Unauthorized"},
                {status: 401}
            )
        }
        if(!requireRole(user, ["employer"])){
            return NextResponse.json(
                {message: "You are not allowed to see this"},
                {status: 403}
            )
        }
        const jobid = params.jobId;
        const job = await Job.findById(jobid);
        if(!job){
            return NextResponse.json(
                {message: "job not found"},
                {status:404}
            )
        }
        if(job.createdBy.toString() !== user._id.toString()){
            return NextResponse.json(
                {message: "You are not Owner of this job"},
                {status: 403}
            )
        }
        const applications = await Application.find({job: jobid})
        .populate("user", "name email role")
        .sort({createdat: -1});

        NextResponse.json(
            {message: "User who applied for this job",
                count: applications.length,
                applications
            },
            {status: 200}
        )

    } catch (error) {
        console.log("Errors get user applied", error);
        return NextResponse.json(
            {message: "Server Error"},
            {status: 500}
        );
        
    }
}