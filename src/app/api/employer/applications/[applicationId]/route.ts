import { getUserFromRequest, requireRole } from "@/libs/auth";
import dbConnect from "@/libs/dbConnect";
import Application from "@/models/Application";
import { NextResponse } from "next/server";

export async function PUT(req: Request, {params}: any){

    try {
        await dbConnect();
        const user = getUserFromRequest(req as any);

        if(!user || !requireRole(user, ["employer"])){
            return NextResponse.json(
                {message: "Unauthorized"},
                {status: 401}
            );
        }

        const {applicationId} = params;

        const {status} = await req.json();

        const allowedstatues = ["submitted", "shortlisted", "rejected"];
        if(!allowedstatues.includes(status)){
            return NextResponse.json(
                {message: "invalid Status Value"},
                {status: 400}
            )
        }
        const application = await Application.findById(applicationId);
        if(!application){
            return NextResponse.json(
                {message: "Application not found"},
                {status: 404}
            );
        }
        application.status = status;
        await application.save();
        return NextResponse.json(
            {message: "Application status updated successfully", application},
            {status: 200}
        );
        
    } catch (error) {
        console.error("Error updating application status:", error);
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        );
        
    }
}