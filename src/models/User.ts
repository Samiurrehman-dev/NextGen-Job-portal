import mongoose, {Schema, Document} from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'jobseeker' | 'employer' | 'admin';
    skills: string[];
    resume: string;
    experience: number; // in years
    companyName?: string; // for employers
    companyWebsite?: string; // for employers
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, enum: ["jobseeker", "employer", "admin"]},
        skills: {type: [String], default:[]},
        resume: {type: String},
        experience: {type: Number, default: 0},
        companyName: {type: String},
        companyWebsite: {type: String}


    }
    , {timestamps: true}
)

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema)