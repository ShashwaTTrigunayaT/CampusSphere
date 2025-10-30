const Event = require("../models/event");
const express = require("express");

async function showAllEvents(req, res) {
    
    const eventType = req.params.type;
    
    try {
        const events = await Event.find({ type: eventType });
       
        return res.json(events);
        
    } catch (error) {
        
        
        console.error("Error in showAllEvents:", error);
        
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    showAllEvents,
}