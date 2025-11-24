import mongoose from "mongoose";
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI || "";

export default async function dbConnect() {
    console.log("MONGODB_URI:", MONGODB_URI);
    if(!MONGODB_URI){
        throw new Error("Please define the MONGODB_URI environment variable inside .env file");
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection
    }
    await mongoose.connect(MONGODB_URI).then(()=>{
        console.log("MongoDB connected successfully");
    })
    return mongoose.connection;
}

