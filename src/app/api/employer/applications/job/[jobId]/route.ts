import { getUserFromRequest, requireRole } from "@/libs/auth";
import dbConnect from "@/libs/dbConnect";
import Application from "@/models/Application";
import Job from "@/models/Job";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any){

        try {
            await dbConnect();
             const jobid = context.params.jobId;
             const user =await  getUserFromRequest(req as any);
             if(!user){
                return NextResponse.json(
                    {message: "UnAuthorized"},
                    {status: 401}
                )
             }
             if(!requireRole(user, ["Employer"])){
                return NextResponse.json(
                    {message: "Access Denied, Employer access only"},
                    {status: 403}
                )
             }
             const job  = await Job.findById(jobid);
             if(!job){
                return NextResponse.json(
                    {message: "Job not found"},
                    {status: 404}
                )
             }
             if(job.createdBy.toString() !== user._id.toString()){
                return NextResponse.json(
                    {message: "You are not authorized to view applications of this jobs"},
                    {status: 403}
                )
             }

             const application = await Application.find({job: jobid}).populate(
                "applicant",
                "name email"
             )

             return NextResponse.json(
                {message: "successfull",
                    application
                },
                {status: 200}
             )


            
        } catch (error) {
            console.log("Error occurs while fetching applications", error);
            return NextResponse.json(
                {message: "server error"},
                {status : 500}
            )
            
        }
}
