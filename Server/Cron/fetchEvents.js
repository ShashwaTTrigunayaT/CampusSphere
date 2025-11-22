const cron=require("node-cron");
const fetchCodeforcesEvents = require("../service/codeforcesfetcher");
const fetchCodeChefEvents = require("../service/codecheffetcher");
const fetchAtCoderEvents = require("../service/atcoderFetcher");
const fetchHackerRankEvents=require("../service/hackerrankFetcher");
const fetchLeetcodeEvents=require("../service/leetcodefetcher");
const deleteOldEvents = require("../service/eventsManager");
const {sendEmailAlerts} = require("../service/alerts");
const fetchDevFolioEvents = require("../service/devFolioFetcher");
const fetchUnstopEvents = require("../service/unstopFetcher");

cron.schedule("* * * * *", async () => { 

  
  
   try {
    
    await fetchCodeforcesEvents();
    await fetchCodeChefEvents();
    await fetchAtCoderEvents();
    await fetchHackerRankEvents();
    await fetchLeetcodeEvents();
    
    
    await fetchDevFolioEvents();
    await fetchUnstopEvents();
    await deleteOldEvents();
    
   } catch (error) {
    console.log(" Error fetching events:", error);
    
   }
  
});
cron.schedule("*/30 * * * *",async ()=>{
  try {
    console.log("Sending email alerts...");
    await sendEmailAlerts();
    
  } catch (error) {
    console.log("Error sending email alerts:", error);
  }
})
