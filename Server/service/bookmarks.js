const USER=require("../models/user");
const EVENT=require("../models/event");
const mongoose=require("mongoose");
const showBookmarks=async(req,res)=>{
    console.log("BookmarksShow request received");
    const {userId} = req.params;
    const bookmarked=[];
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    const user = await USER.findOne({ email: userId });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    try {
        const bookmarkslength = user.bookmarks.length;
        
        if (bookmarkslength === 0) {
            return res.status(200).json({ message: "No bookmarks found", bookmarks: [] });
        }
        for (let i = 0; i < bookmarkslength; i++) {

            const eventId = user.bookmarks[i];
            
            
          const event = await EVENT.findById(eventId);
           
           
            if (event) {
                bookmarked[i] = event;
                
            }
        }
        return res.status(200).json({ message: "Bookmarks fetched successfully", bookmarks: bookmarked });
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports={showBookmarks};