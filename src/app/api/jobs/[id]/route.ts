import dbConnect from "@/libs/dbConnect";
import Job from "@/models/Job";
import { NextResponse } from "next/server";
import { getUserFromRequest, requireRole } from "@/libs/auth";
import { moveMessagePortToContext } from "worker_threads";


export async function Get(req: Request, { params }: { params: { id: string } }) {
    try {
        dbConnect();
        const job = await Job.findById(params.id).populate("createdBy", "name email")

        if (!job) {
            return NextResponse.json(
                { message: "Job not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(job,
            {
                status: 200
            }
        )

    } catch (error) {
        console.log("Getting job Error", error);
        return NextResponse.json(
            { message: "Error fetching Job" },
            { status: 500 }
        )
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {


        await dbConnect();
        const user = await getUserFromRequest(req as any);
        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        if (!requireRole(user, ["employer", "admin"])) {
            return NextResponse.json(
                { message: "Not allowed " },
                { status: 403 }
            )
        }

        const body = await req.json()
        const job = await Job.findById(params.id);
        if (!job) {
            return NextResponse.json(
                { message: "Job not found" },
                { status: 404 }
            )
        }

        if (user.role !== "admin" && job.createdBy.toString() !== user._id.toString()) {
            return NextResponse.json(
                { message: "You are not allowed to update this job" },
                { status: 403 }
            )
        }

        const updatedJob = await Job.findByIdAndUpdate(params.id, body, {
            new: true,
        });

        return NextResponse.json(
            {message: "Job Updated Successfully", job: updatedJob},
            {status: 200}
        )


    } catch (error) {

        return NextResponse.json(
            {message: "Error Updatin Job"},
            {status: 500}

        )
    }
}
export async function Delete(req: Request, {params}: {params: {id: string}}){

    try {
       await dbConnect();
       const user =   await getUserFromRequest(req as any);
       if(!user){
            return NextResponse.json(
                {message: "Unauthorized"},
                {status: 404}
            )
       }
        if(!requireRole(user, ["employer","admin"])){
            return NextResponse.json(
                {message: "Not Allowed to Delete"},
                {status: 403}
            )
        }

        const job = await Job.findById(params.id);
        if(!job){
            NextResponse.json(
                {message: "job not found"},
                {status: 404}
            )
        }
        if(user.role !== "admin" && job.createdBy.toString() !== user._id.toString()){
            return NextResponse.json(
                {message: "You are not allowed to delete this job"},
                {status: 403}
            );
        }
        await Job.findByIdAndDelete(params.id);
        return NextResponse.json(
            {messge: "Job Deleted Successfully"},
            {status: 200}
        );
        
    } catch (error) {
        NextResponse.json(
            {message: "Error Deleting job"},
            {status: 500}
        )
        
    }
}
