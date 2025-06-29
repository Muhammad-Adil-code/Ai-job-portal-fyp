import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import cloudinary from "./utils/cloudinary.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Test Cloudinary connection
app.get("/api/v1/test-cloudinary", async (req, res) => {
    try {
        const result = await cloudinary.api.ping();
        res.json({ message: "Cloudinary connected successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Cloudinary connection failed", error: error.message });
    }
});

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})