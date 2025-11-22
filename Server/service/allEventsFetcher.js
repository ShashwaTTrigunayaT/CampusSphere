const Event = require("../models/event");



async function showAllEvents(req, res) {
    try {
        const eventType = req.params.type;
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;
        
        
        const search = req.query.search || "";

        
        let query = {
            type: eventType,
        };

        
        if (search) {
            query.$or = [
                
                { title: { $regex: search, $options: "i" } },
                
                { tags: { $in: [new RegExp(search, "i")] } },
                
                { location: { $regex: search, $options: "i" } },
                
                { organization: { $regex: search, $options: "i" } },
                
                { platform: { $regex: search, $options: "i" } }
            ];
        }

        console.log(`Fetching ${eventType} | Page: ${page} | Search: "${search}"`);

        
        const [events, totalEvents] = await Promise.all([
            Event.find(query)
                .sort({ eventDate: 1 }) 
                .skip(skip)
                .limit(limit),
            
            Event.countDocuments(query)
        ]);

        return res.status(200).json({
            data: events,
            currentPage: page,
            totalPages: Math.ceil(totalEvents / limit),
            totalEvents: totalEvents
        });

    } catch (error) {
        console.error("Error in showAllEvents:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {
    showAllEvents,
}