import { time } from "console";
import mongoose, {Schema, Document} from "mongoose"

export interface  IJob extends Document{
    title: string;
    description: string;
    company: string;
    salary: string;
    location: string;
    experience: number;
    skillsRequired: string[];
    jobType: "full-time" | "part-time" | "internship" | "remote";
    createdBy: mongoose.Types.ObjectId;
    status: "open" | "closed";
    createdAt: Date;

}
const jobSchema: Schema = new Schema({
    title:{type: String, required: true},
    description: {type: String, required: true},
    company: {type: String, required: true},
    location: {type: String, required: true},
    salary: {type: String, required: true},
    experience: {type: Number, default: 0},
    skillsRequired: {type: [String], default: []},
    jobType: {
        type: String,
        enum: ["full-time", "part-time", "internship", "remote"],
        default: "full-time"
    },
    createdBy: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    status:{
        type: String,
        enum: ["open", "closed"],
        default: "open"
    },


}, { timestamps: true })

export default mongoose.models.Job || mongoose.model<IJob>("Job", jobSchema);