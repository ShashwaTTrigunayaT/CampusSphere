const express=require("express");
const mongoose=require("mongoose");
const cors = require("cors");
const userRoute=require("./router/userRoute")
const cookieParser=require("cookie-parser");
const fetchCodeforcesEvents=require("./service/codeforcesfetcher");
const eventRoute=require("./router/eventRoute");
const aiRoute=require("./router/aiRoute");
const path=require("path");

const { checkForAuth } = require("./middleware/auth");
require('dotenv').config();
require("./Cron/fetchEvents");

const app=express();

// === FIX 1: TRUST PROXY ===
// This MUST be near the top.
app.set('trust proxy', 1);

// === FIX 2: LOGGER ===
// This MUST be before CORS to catch the OPTIONS request.


// Define all the allowed Vercel frontend URLs
const ALLOWED_ORIGINS = [
    "https://campus-sphere-beta.vercel.app", 
    "https://campus-sphere-git-main-shashwattrigunayats-projects.vercel.app", 
    "https://campus-sphere-8y7dv9q4m-shashwattrigunayats-projects.vercel.app", 
    "http://localhost:5173", 
];

// === FIX 3: CORS MIDDLEWARE ===
app.use(cors({
    origin: ALLOWED_ORIGINS, 
    credentials: true,
    
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], 
}));

// === REST OF YOUR MIDDLEWARE ===
app.use(express.static(path.resolve("./public")))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// (Your duplicate logger was here, I removed it)

app.use(checkForAuth("token"));
app.use("/user",userRoute);
app.use("/event",eventRoute);
app.use("/ai", aiRoute);   

app.use('/api/match', require('./service/matchRoutes'));


const Port=process.env.PORT||5000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(Port,()=>console.log(`Server is started at Port:${Port}`))