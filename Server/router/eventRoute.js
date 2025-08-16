const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
router.get("#",showAllEvents);
router.get("#/:id",showEvent);
module.exports=router