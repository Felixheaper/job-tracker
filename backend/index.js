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

const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

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




