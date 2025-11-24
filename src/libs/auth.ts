import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {NextRequest} from "next/server";
import User from "../models/User";
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || "sami1234";

export async function hashPassword(password: string){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);

}

// compare Password

export async function comparePassword(password: string, hashed:string){
    return await bcrypt.compare(password, hashed);
}

// generate jwt token

export function generateToken(user: any){
    return jwt.sign({
        id: user._id,
        role: user.role,
        email: user.email
    },
    JWT_SECRET,
    {expiresIn: "7d"}
);
}

// verify jwt token

export function verifyToken(token: string){
    try {
        return jwt.verify(token, JWT_SECRET)
        
    } catch (error) {
        return null;
    }
    
}


export async function getUserFromRequest(req: NextRequest){
    const token = req.cookies.get("token")?.value;
    if(!token){
        return null
    }
    const decoded: any = verifyToken(token);
    if(!decoded){
        return null
    }
    const user = await User.findById(decoded.id).select("-password");
    return user;
}

export function requireRole(user: any, allowedRoles: string[]){
    if(!user){
        return null
    }
    return allowedRoles.includes(user.role);
}