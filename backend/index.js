import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config({});

const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.use(cors({
    origin: ['http://localhost:5173', 'https://job-tracker-59i8.vercel.app'],
    credentials: true
  }));



const PORT=process.env.PORT || 3000;

//api
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
    res.send("Server is running!");
  });

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})




