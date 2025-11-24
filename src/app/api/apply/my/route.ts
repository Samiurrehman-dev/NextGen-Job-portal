import dbConnect from "@/libs/dbConnect";
import {NextResponse} from "next/server";
import Application from "@/models/Application";
import { getUserFromRequest } from "@/libs/auth";


export async function Get(req: Request){

    try {
        await dbConnect();
        const user = await getUserFromRequest(req as any);
        if(!user){
            return NextResponse.json(
                {message: "UnAuthorized"},
                {status: 401}
            )
        }

        const applications = await Application.find({applicant: user._id})
        .populate("job")
        .sort({createdAt: -1});

        return NextResponse.json({applications}, {status: 200})

        
    } catch (error) {
        console.log("Get My Applications Error: ", error);
        return NextResponse.json(
            {message: "Server Error"},
            {status: 500}
        )
        
    }
}