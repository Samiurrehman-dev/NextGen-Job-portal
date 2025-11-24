import dbConnect from "@/libs/dbConnect";
import { NextResponse } from "next/server";
import Application from "@/models/Application";
import Job from "@/models/Job";
import { getUserFromRequest } from "@/libs/auth";

export async function POST(req: Request) {
    try {


        await dbConnect();
        const user = await getUserFromRequest(req as any)
        if (!user) {
            return NextResponse.json(
                { message: "UnAuthorized" },
                { status: 401 }
            );
        }
        if (user.role !== "Jobseeker") {
            return NextResponse.json(
                { message: "Only Job seeker can apply" },
                { status: 403 }
            )
        }
        const { jobId, resumeUrl } = await req.json();
        const job = await Job.findById(jobId);
        if (!job) {
            return NextResponse.json(
                { message: "Job not found" },
                { status: 404 }
            )
        }
        const AlreadyAppied = await Application.findOne(
            {
                job: jobId,
                applicant: user._id,
            }
        )
        if (AlreadyAppied) {
            return NextResponse.json(
                { message: "You already applied to this job" },
                { status: 400 }
            )

        }
        const application = await Application.create({
            job: jobId,
            applicant: user._id,
            resumeUrl,
        })
        return NextResponse.json(
            { message: "Application Submitted Successfully", application },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )

    }
}