import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  company: { 
    type: String, 
    required: true
 },
  role: { 
    type: String, 
    required: true }
    ,
  status: {
    type: String,
    enum: ["Applied", "Interview", "Offer", "Rejected"],
    default: "Applied",
  },
  appliedDate: { 
    type: Date, 
    required: true 
  },
  link: {
     type: String 
    },
},{timestamps:true});

export default mongoose.model("JobApplication", jobApplicationSchema);
