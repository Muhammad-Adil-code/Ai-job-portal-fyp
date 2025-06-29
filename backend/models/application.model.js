import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    },
    // Prediction input fields
    age: { type: Number },
    gender: { type: String },
    stream: { type: String },
    internships: { type: Number },
    cgpa: { type: Number },
    backlogs: { type: String },
    // Prediction result
    prediction: {
        probability: { type: Number },
        confidence: { type: Number }
    }
},{timestamps:true});
export const Application  = mongoose.model("Application", applicationSchema);