const express = require("express");
const mongoose = require("mongoose");
const USER = require("../models/user");
const EVENT = require("../models/event");

const handleBookmarks = async (req, res) => {
  const { eventId, userId } = req.body; 

  if (!eventId || !userId) {
    return res.status(400).json({ message: "Event ID and User ID are required" });
  }

  try {
    const user = await USER.findOne({ email: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const isBookmarked = user.bookmarks.includes(eventId);
    let message = "";

    if (isBookmarked) {
      
      user.bookmarks.pull(eventId);
      message = "Bookmark removed successfully";
    } else {
      
      user.bookmarks.push(eventId);
      message = "Bookmark added successfully";
    }
    

    await user.save();
    return res.status(200).json({ message: message });

  } catch (err) {
    console.error("Error in handleBookmarks:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleAlerts = async (req, res) => {
  const { eventId, userId } = req.body; 

  if (!eventId || !userId) {
    return res.status(400).json({ message: "Event ID and User ID are required" });
  }

  try {
    const user = await USER.findOne({ email: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const isAlerted = user.alerts.includes(eventId);
    let message = "";

    if (isAlerted) {
      
      user.alerts.pull(eventId);
      message = "Alert removed successfully";
    } else {
      
      user.alerts.push(eventId);
      message = "Alert added successfully";
    }
    

    await user.save();
    return res.status(200).json({ message: message });

  } catch (err) {
    console.error("Error in handleAlerts:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

async function updatebookmarksandalerts(req, res) {
  try {
    const { userId } = req.body; 
    if (!userId) {
        return res.status(400).json({ message: "User ID (email) is required" });
    }

    const user = await USER.findOne({ email: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookmarks = user.bookmarks;
    const alerts = user.alerts;
    
    if (bookmarks.length === 0 && alerts.length === 0) {
        return res.status(200).json({ message: "No bookmarks or alerts to update." });
    }

    
    
    
    const allEventIds = [...new Set([...bookmarks, ...alerts])];

    
    const existingEvents = await EVENT.find({
      _id: { $in: allEventIds },
    }).select("_id"); 

    
    const existingEventIds = new Set(
      existingEvents.map(event => event._id.toString())
    );

    
    const updatedBookmarks = user.bookmarks.filter(id =>
      existingEventIds.has(id.toString())
    );
    const updatedAlerts = user.alerts.filter(id =>
      existingEventIds.has(id.toString())
    );
    
    
    user.bookmarks = updatedBookmarks;
    user.alerts = updatedAlerts;

    

    await user.save();
    return res.status(200).json({ message: "Bookmarks and alerts updated successfully" });

  } catch (error) {
    console.error("Error updating bookmarks and alerts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  handleBookmarks,
  handleAlerts,
  updatebookmarksandalerts,
};