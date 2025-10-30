const USER = require("../models/user");
const EVENT = require("../models/event");
const mongoose = require("mongoose");

const showBookmarks = async (req, res) => {
  const { userId } = req.params; 
  
  if (!userId) {
    return res.status(400).json({ message: "User ID (email) is required" });
  }

  try {
    const user = await USER.findOne({ email: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.bookmarks.length === 0) {
      return res.status(200).json({ message: "No bookmarks found", bookmarks: [] });
    }

    
    
    
    
    
    
    
    
    
    
    const bookmarked = await EVENT.find({
      _id: { $in: user.bookmarks },
    });
    

    return res
      .status(200)
      .json({ message: "Bookmarks fetched successfully", bookmarks: bookmarked });

  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  showBookmarks,
};