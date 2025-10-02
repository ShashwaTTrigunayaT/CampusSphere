const express=require("express");
const mongoose=require("mongoose");
const USER=require("../models/user");
const EVENT=require("../models/event");
const handleBookmarks = async (req, res) => {
    console.log("Bookmarks request received");
    const { eventId, userId } = req.body;
    console.log({ eventId, userId });
    if (!eventId || !userId) {
        return res.status(400).json({ message: "Event ID and User ID are required" });
    }
    try {
        const user = await USER.findOne({ email: userId });
        const event = await EVENT.findOne({ _id: eventId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        const checkBookmark = user.bookmarks.includes(eventId);
        if (checkBookmark) {
            return res.status(400).json({ message: "Event already bookmarked" });
        }
        if (user && event) {
            if (!user.bookmarks.includes(eventId)) {
                user.bookmarks.push(eventId);
            }
        }
        
        await user.save();
        return res.status(200).json({message:"Bookmarks  updated successfully"});
    }
    catch(err){
        
        if(err.code===11000){
            return res.status(400).json({message:"Event already bookmarked"});
        }
        else{
            return res.status(500).json({message:"Internal server error"}); 
        }
    }
}
const handleAlerts = async (req, res) => {
    
    const { eventId, userId } = req.body;
    
    if (!eventId || !userId) {
        return res.status(400).json({ message: "Event ID and User ID are required" });
    }
    try {
        const user = await USER.findOne({ email: userId });
        const event = await EVENT.findOne({ _id: eventId });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        const checkAlert = user.alerts.includes(eventId);
        if (checkAlert) {
            return res.status(400).json({ message: "Event already in alerts" });
        }
        if (user && event) {
            if (!user.alerts.includes(eventId)) {
                user.alerts.push(eventId);
            }
        }
        await user.save();
        return res.status(200).json({message:"alerts updated successfully"});
    }
    catch(err){
        
        if(err.code===11000){
            return res.status(400).json({message:"Event already in alerts"});
        }
        else{
            return res.status(500).json({message:"Internal server error"}); 
        }
    }
}
module.exports={handleBookmarks,handleAlerts};