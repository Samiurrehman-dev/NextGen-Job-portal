import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { getUserFromRequest } from "@/libs/auth";


export async function Get(req: Request){

    try {
        await dbConnect();

        const user = await getUserFromRequest(req as any);

        if(!user){
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            )
        }
        return NextResponse.json(
            {message: "User Feched"},
            {status: 200}
        );
        
    } catch (error) {
        console.log("Me api Error", error);
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        );
    }
}