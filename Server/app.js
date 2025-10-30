const express=require("express");
const mongoose=require("mongoose");
const cors = require("cors");
const userRoute=require("./router/userRoute")
const cookieParser=require("cookie-parser");
const fetchCodeforcesEvents=require("./service/codeforcesfetcher");
const eventRoute=require("./router/eventRoute");
const path=require("path");

const { checkForAuth } = require("./middleware/auth");
require('dotenv').config();
require("./Cron/fetchEvents");


const app=express();

// Define all the allowed Vercel frontend URLs (CRITICAL FIX)
const ALLOWED_ORIGINS = [
    "https://campus-sphere-beta.vercel.app", // The main public domain
    "https://campus-sphere-git-main-shashwattrigunayats-projects.vercel.app", // The Git main branch deployment
    "https://campus-sphere-8y7dv9q4m-shashwattrigunayats-projects.vercel.app", // Specific deployment hash (safe to include)
    "http://localhost:5000", // Optional: For local development testing
];

app.use(cors({
    origin: ALLOWED_ORIGINS, // <-- Uses the array of allowed domains
    credentials: true,
    // Add all necessary HTTP methods
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));

app.use(express.static(path.resolve("./public")))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    // Log 1: The first point where the request hits your Express app
    console.log(`[REQUEST RECEIVED] Method: ${req.method}, Path: ${req.path}, Time: ${new Date().toISOString()}`);
    next();
});
app.set('trust proxy', 1);
app.use(checkForAuth("token"));
app.use("/user",userRoute);
app.use("/event",eventRoute);

// Use a default port of 5000 (standard for MERN backend)
const Port=process.env.PORT||5000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(Port,()=>console.log(`Server is started at Port:${Port}`))