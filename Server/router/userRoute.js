const express = require("express");
const mongoose = require("mongoose");
const USER = require("../models/user");
const EVENT = require("../models/event");
const { handleUserSignin, handleUserSignup } = require("../service/auth");
const { handleBookmarks } = require("../service/handleBookmarksandAlerts");
const { handleAlerts } = require("../service/handleBookmarksandAlerts");
const { updatebookmarksandalerts } = require("../service/handleBookmarksandAlerts");
const { showBookmarks } = require("../service/bookmarks");
const  {showalerts}  = require("../service/alerts");

const router = express.Router();
router.post("/signin", handleUserSignin);
router.post("/signup", handleUserSignup);
router.post("/bookmarks", handleBookmarks);
router.post("/alerts", handleAlerts);
router.post("/update-credentials", async (req, res) => {
    console.log("Update credentials request received");
    try {

        const { email, username, institution, aboutMe, githubLink, linkedinLink } = req.body;
        

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Find the user by email
        const user = await USER.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update username if provided
        const newUsername = req.body.username;
        const newInstitution = req.body.institution;

        // Check if username is already taken by another user
        if (newUsername) {
            console.log("New username:", newUsername);
            const existingUser = await USER.findOne({ username: newUsername });
            if (existingUser && existingUser.email !== email) {
                return res.status(400).json({ message: "Username already taken" });
            }
            user.username = newUsername;
            console.log("Updated username:", user.username); // only assign if valid
        }

        // Update institution if provided
        if (newInstitution) {
            user.institution = newInstitution;
        }
        if (aboutMe) {
            user.aboutSelf = aboutMe;
        }
        if (githubLink) {
            user.githubURL = githubLink;
        }
        if (linkedinLink) {
            user.linkedinURL = linkedinLink;
        }

        // Save updated data
        await user.save();

        return res.status(200).json({ message: "Credentials updated successfully" });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/update-profile/:email", async (req, res) => {
    console.log("Update profile request received");
    const { email } = req.params;
    
    try {
        const user = await USER.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        return res.status(200).json({ success:true,
            data: {username: user.username, institution: user.institution, aboutSelf: user.aboutSelf, githubURL: user.githubURL, linkedinURL: user.linkedinURL,eventData:{alerts: user.alerts, bookmarks: user.bookmarks}} });
        
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
router.post("/updatebookmarksandalerts", updatebookmarksandalerts);
router.get("/showBookmarks/:userId",showBookmarks);
router.get("/showAlerts/:userId",showalerts);


module.exports = router;
