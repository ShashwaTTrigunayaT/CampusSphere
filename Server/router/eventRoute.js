const { showAllEvents } = require("../service/allEventsFetcher");
const EVENT = require("../models/event");
const express = require("express");

const router = express.Router();


router.get("/:type", showAllEvents);


router.get("/", async (req, res) => {
  try {
    
    
    
    

    
    
    

    
    const [hackathonCount, contestCount, internshipCount, festCount] =
      await Promise.all([
        EVENT.countDocuments({ type: "Hackathon" }),
        EVENT.countDocuments({ type: "Coding Competition" }),
        EVENT.countDocuments({ type: "Internship" }),
        EVENT.countDocuments({ type: "Fest" }),
      ]);

    return res.status(200).json({
      hackathon: hackathonCount,
      contests: contestCount,
      internship: internshipCount,
      fest: festCount,
    });

  } catch (error) {
    console.error("Error fetching event counts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/eventDetails/:id", async (req, res) => {
  
  const { id } = req.params;

  try {
    const event = await EVENT.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });

    }
    
    return res.status(200).json( event );
  } catch (error) {
    console.error("Error fetching event:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;