import dbConnect from "@/libs/dbConnect";
import { NextResponse } from "next/server";
import Job from "@/models/Job";
import { getUserFromRequest } from "@/libs/auth";

export async function Get(req: Request){
    try {
        await dbConnect();
        const user: any = await getUserFromRequest(req as any);
        if(!user){
            return NextResponse.json(
                {message: "UnAuthorized"},
                {status: 401}
            )
        }
        if(user.role!="employer"){
            return NextResponse.json(
                {message: "Only Exmployers can access this"},
                {status: 403}
            )
        }

        const jobs = await Job.find({createdBy: user._id});
        return NextResponse.json(
            {message: "Employer Jobs Fetched Successfully ",
                jobs
            },
            {status: 200},

        )

        
    } catch (error) {

        console.log("Employers JOb error: ", error);
        return NextResponse.json(
            {message: "Server Error"},
            {status: 500}
        );
        
    }

}   