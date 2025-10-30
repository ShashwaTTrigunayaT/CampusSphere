const cron=require("node-cron");
const fetchCodeforcesEvents = require("../service/codeforcesfetcher");
const fetchCodeChefEvents = require("../service/codecheffetcher");
const fetchAtCoderEvents = require("../service/atcoderFetcher");
const fetchHackerRankEvents=require("../service/hackerrankFetcher");
const fetchLeetcodeEvents=require("../service/leetcodefetcher");
const deleteOldEvents = require("../service/eventsManager");
const {sendEmailAlerts} = require("../service/alerts")

cron.schedule("*/60 * * * *", async () => { 

  console.log("Fetching Codeforces events...");
  
   try {
    
    await fetchCodeforcesEvents();
    await fetchCodeChefEvents();
    await fetchAtCoderEvents();
    await fetchHackerRankEvents();
    await fetchLeetcodeEvents();
    await deleteOldEvents();
    console.log(` Events fetched successfully at ${new Date()}`);
    console.log("Old events deleted successfully.");
   } catch (error) {
    console.log(" Error fetching events:", error);
    
   }
  
});
cron.schedule("*/30 * * * *",async ()=>{
  try {
    console.log("Sending email alerts to users...");
    await sendEmailAlerts();
    
  } catch (error) {
    console.log("Error sending email alerts:", error);
  }
})