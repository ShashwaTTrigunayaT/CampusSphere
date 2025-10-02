const { showAllEvents } = require("../service/allEventsFetcher");
const EVENT = require("../models/event");
const express=require("express");

const router=express.Router();
router.get("/:type",showAllEvents);
router.get("/",async(req,res)=>{
    const hackathon=await EVENT.find({ type: "Hackathon" });
    const contests=await EVENT.find({ type: "Coding Competition" });
    const internship=await EVENT.find({ type: "Internship" });
    const fest=await EVENT.find({ type: "Fest" });
    try {
        
        return res.status(200).json({hackathon: hackathon.length, contests: contests.length, internship: internship.length, fest: fest.length});
    } catch (error) {
        console.error("Error fetching event counts:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    
        
});

module.exports = router;

