const Event = require("../models/event");
const express = require("express");
async function showAllEvents(req, res) {
    console.log("Fetching all events...");
    const eventType = req.params.type;
    
    try {
        const events = await Event.find({ type: eventType });
       
        return res.json(events);
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }


}

module.exports = {
    showAllEvents,
}