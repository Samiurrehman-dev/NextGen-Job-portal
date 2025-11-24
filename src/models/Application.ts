import mongoose, {Schema, Document} from "mongoose"

export interface IApplication extends Document{
    job : mongoose.Types.ObjectId;
    applicant: mongoose.Types.ObjectId;
    resumeUrl: string;
    status: "submitted" |  "shortlisted" | "rejected"; 
    createdAt: Date
}

const applicationSchema: Schema = new Schema({
    job:{
        type: mongoose.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicant:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true

    },
    resumeUrl:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["submitted", "shortlisted", "rejected"],
        required: "submitted"
    }

}, {timestamps: true})

export default mongoose.models.application || mongoose.model<IApplication>("Application",applicationSchema);