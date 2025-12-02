import dbConnect from "@/libs/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/libs/cloudinary"
import { getUserFromRequest } from "@/libs/auth";

export async function POST(request: Request) {
    try {
        dbConnect();

        const currentUser = await getUserFromRequest(request as any);
        if (!currentUser) {
            return NextResponse.json(
                { message: "UnAuthorized" },
                { status: 401 }
            )
        }

        const formData = await request.formData();
        const file = formData.get("resume") as File;

        if (!file) {
            return NextResponse.json(
                { message: "No file uploaded" },
                { status: 400 }
            );
        }

        try {
            const resumeUrl = await uploadToCloudinary(file, "resumes");
            currentUser.resume = resumeUrl;
            await currentUser.save();
            return NextResponse.json({
                message: "Resume uploaded successfully",
                resumeUrl
            });

        } catch (error) {
            console.error("Resume Upload Error:", error);

            // User-friendly error message
            return NextResponse.json(
                { message: "Failed to upload resume. Please try again later." },
                { status: 500 }
            );

        }




    } catch (error) {
        console.error("Upload Resume Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );

    }
}