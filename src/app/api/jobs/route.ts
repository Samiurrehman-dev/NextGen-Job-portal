import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import Job from "@/models/Job";
import { getUserFromRequest, requireRole } from "@/libs/auth";

export async function POSt(req: Request){
    try {
        await dbConnect();

        const user = await getUserFromRequest(req as any);
        if(!user){
            return NextResponse.json(
                {message: "UnAuthorized"},
                {status: 401}
            )
        }

        if(!requireRole(user, ["employee", "admin"])){
            return NextResponse.json(
                {message: "Access denied"},
                {status: 403}

            );
        }

        const body = await req.json();
        const newJob = await Job.create({
            ...body,
            createdBy: user._id
        });

        
    } catch (error) {
        console.log("Job create error", error)
        NextResponse.json(
            {message: "Server Error"},
            {status: 500}
        )
        
    }
 }
 export async function Get(){
    try {
        await dbConnect();
        const jobs = await Job.find().populate("createdBy", "name email")
        return NextResponse.json({jobs}, {status: 200})
        
    } catch (error) {
        console.log("Get Jobs Error: ", error);
        return NextResponse.json(
            {messsage: "Server Error"},
            {status: 500}
        );
    }
 }