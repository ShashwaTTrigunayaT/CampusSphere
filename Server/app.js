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

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.static(path.resolve("./public")))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use (checkForAuth("token"));
app.use("/user",userRoute);
app.use("/event",eventRoute);

const Port=process.env.PORT||8000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));



app.listen(Port,()=>console.log(`Server is started at Port:${Port}`))