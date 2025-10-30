const express = require("express");
const mongoose = require("mongoose");
const USER = require("../models/user");
const EVENT = require("../models/event");
const { handleUserSignin, handleUserSignup } = require("../service/auth");
const { handleBookmarks } = require("../service/handleBookmarksandAlerts");
const { handleAlerts } = require("../service/handleBookmarksandAlerts");
const { updatebookmarksandalerts } = require("../service/handleBookmarksandAlerts");
const { showBookmarks } = require("../service/bookmarks");
const { showalerts } = require("../service/alerts");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

const router = express.Router();
router.post("/signin", handleUserSignin);
router.post("/signup", handleUserSignup);
router.post("/bookmarks", handleBookmarks);
router.post("/alerts", handleAlerts);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "profile-images", 
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};


router.post(
  "/update-credentials",
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const { email } = req.body;
      const user = await USER.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let newProfileImageURL = null;

      
      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer);
        newProfileImageURL = result.secure_url;
      }

      
      const {
        username,
        institution,
        aboutSelf, 
        githubURL, 
        linkedinURL, 
        projects,
        skills,
      } = req.body;

      
      if (username) user.username = username;
      if (institution) user.institution = institution;
      if (aboutSelf) user.aboutSelf = aboutSelf;
      if (githubURL) user.githubURL = githubURL;
      if (linkedinURL) user.linkedinURL = linkedinURL;
      if (projects) user.projects = projects;
      if (skills) user.skills = skills;
      if (newProfileImageURL) {
        user.profileImageURL = newProfileImageURL;
      }
      

      await user.save();

      
      return res.status(200).json({
        message: "Profile updated successfully",
        profileImageURL: newProfileImageURL || user.profileImageURL,
      });
      

    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/update-profile/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    

    return res.status(200).json({
      success: true,
      data: {
        username: user.username,
        institution: user.institution,
        aboutSelf: user.aboutSelf,
        githubURL: user.githubURL,
        skills: user.skills,
        projects: user.projects,
        profileImageURL: user.profileImageURL,
        linkedinURL: user.linkedinURL,
        eventData: { alerts: user.alerts, bookmarks: user.bookmarks },
      },
    });
  } catch (error) {
    console.Error("Update error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/updatebookmarksandalerts", updatebookmarksandalerts);
router.get("/showBookmarks/:userId", showBookmarks);
router.get("/showAlerts/:userId", showalerts);

module.exports = router;