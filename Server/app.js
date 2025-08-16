const express=require("express");
const mongoose=require("mongoose");
const cors = require("cors");
const userRoute=require("./router/userRoute")
const cookieParser=require("cookie-parser");



const path=require("path");

const { checkForAuth } = require("./middleware/auth");
require('dotenv').config();
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
app.use("/user",userRoute)
const Port=process.env.PORT||8000;
mongoose.connect(process.env.MONGO_URL).then(console.log(`MongoDB Connected to Server at Port:${Port}`))



app.listen(Port,()=>console.log(`Server is started at Port:${Port}`))