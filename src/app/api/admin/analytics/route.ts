import { getUserFromRequest, requireRole } from "@/libs/auth";
import dbConnect from "@/libs/dbConnect";
import Application from "@/models/Application";
import Job from "@/models/Job";
import User from "@/models/User";
import { lookup } from "dns";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const user = await getUserFromRequest(request as any);
        if(!requireRole(user, ['admin'])) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        const totalUsers = await User.countDocuments();
        const totalEmployers = await User.countDocuments({role: "employer"});
        const totalAdmins = await User.countDocuments({role: "admin"});
        const newUsers =  await User.countDocuments({createdAt: {$gte: last30Days}});

        const totalJobs = await Job.countDocuments();
        const newJobs = await Job.countDocuments({createdAt: {$gte: last30Days}});

        const totalApplications = await Application.countDocuments();

        const applicationStatusstats = await Application.aggregate([
            { $group: { _id: "$status", count: { $sum:1 }}} 
        ])

        const jobsPerEmployer = await Job.aggregate([
            {
                $group: {
                    _id: "$createdBy",
                    totalJobs: { $sum: 1 }
                }
            },
            {
                $lookup:{
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "employer"
                }
            },
            { $unwind: "employer" },
            {
                $project: {
                    _id: 0,
                    employerName: "$employer.name",
                    employerEmail: "$employer.email",
                    totalJobs: 1

                }
            }
        ]);
        return NextResponse.json(
            {
                message: "Analytics Feched Successfully",

                analytics:{
                    users:{
                        totalUsers,
                        totalEmployers,
                        totalAdmins,
                        newUsersLast30Days: newUsers
                    },
                    jobs:{
                        totalJobs,
                        newJobsLast30Days: newJobs
                    },
                    Applications:{
                        totalApplications,
                        statusBreakDown: applicationStatusstats
                    },
                    jobsPerEmployer
                }
            

    });
        
    } catch (error) {
        console.log("Admin Analytics Error: ", Error);
        return NextResponse.json(
            {message: "Something Went wrong while fetching analytics"},
            {status: 500}
        );
    }

}