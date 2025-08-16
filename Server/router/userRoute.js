const express=require("express");
const mongoose=require("mongoose");
const{handleUserSignin,handleUserSignup}=require("../service/auth");
const router=express.Router();
router.post("/signin",handleUserSignin);
router.post("/signup",handleUserSignup);
module.exports=router;
