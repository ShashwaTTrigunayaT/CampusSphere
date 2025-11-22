const axios = require("axios");
const EVENT = require("../models/event"); 

async function fetchDevFolioEvents() {
  console.log("[FETCHER] Starting DevFolio hackathon fetch...");
  try {
  
    const response = await axios.get("https://api.devfolio.co/api/hackathons?filter=all&page=1");
    const events = response.data.result;

    if (!events || events.length === 0) {
      console.log("[FETCHER] No hackathons found from DevFolio.");
      return;
    }

    
    const operations = events.map(hackathon => {
      
      
      
      const link = hackathon.hackathon_setting?.site || `https://${hackathon.slug}.devfolio.co/`;
      
     
      const tags = hackathon.themes ? hackathon.themes.map(theme => theme.name) : [];

      
      return EVENT.findOneAndUpdate(
        { externalId: hackathon.uuid },
        {
          $set: {
            title: hackathon.name,
            platform: "DevFolio",
            type: "Hackathon",
             
            link: link,
            eventDate: new Date(hackathon.starts_at), 
            registrationDeadline: new Date(hackathon.hackathon_setting.reg_ends_at),
            duration: `${Math.ceil((new Date(hackathon.ends_at) - new Date(hackathon.starts_at)) / (1000 * 60 * 60 * 24))} days`,
            location: hackathon.location,
            bannerURL: hackathon.cover_img,
            mode: hackathon.is_online ? "Online" : "Offline",
            tags: tags, 
            logoURL: hackathon.hackathon_setting.logo,
            
          }
        },
        { upsert: true } 
      );
    });

    
    await Promise.all(operations);

    

  } catch (error) {
    throw new Error(`[FETCHER] Error fetching DevFolio hackathons: ${error.message || error}`);
  }
}

module.exports = fetchDevFolioEvents;