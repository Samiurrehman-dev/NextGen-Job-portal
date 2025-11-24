import { NextResponse } from "next/server";

export async function POST(){
    try {
        const response = NextResponse.json(
            {message: "Logout Successfully"},
            {status: 200}
        );

        response.cookies.set("token", "", {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
            path: "/"
        });
;
        return response;
        
    } catch (error) {
        console.log("Logout Error: ", error);
        return NextResponse.json(
            {message: "something went wrong"},
            {status: 400}
        );
        
    }
}