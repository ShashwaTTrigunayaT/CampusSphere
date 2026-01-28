const cron = require("node-cron");
const fetchCodeforcesEvents = require("../service/codeforcesfetcher");
const fetchCodeChefEvents = require("../service/codecheffetcher");
const fetchAtCoderEvents = require("../service/atcoderFetcher");
const fetchHackerRankEvents = require("../service/hackerrankFetcher");
const fetchLeetcodeEvents = require("../service/leetcodefetcher");
const fetchDevFolioEvents = require("../service/devFolioFetcher");
const fetchUnstopEvents = require("../service/unstopFetcher");

const deleteOldEvents = require("../service/eventsManager");
const { sendEmailAlerts } = require("../service/alerts");


cron.schedule("*/5 * * * *", async () => {
    console.log(" Starting event fetch and cleanup cycle...");
    
   
    const results = await Promise.allSettled([
        fetchUnstopEvents(),
        fetchDevFolioEvents(),
        fetchCodeforcesEvents(),
        fetchCodeChefEvents(),
        fetchAtCoderEvents(),
        fetchHackerRankEvents(),
        fetchLeetcodeEvents()
    ]);

    // Log failures (using your original style)
    results.forEach((result, index) => {
        if (result.status === 'rejected') {
            const services = ['Unstop', 'DevFolio', 'Codeforces', 'CodeChef', 'AtCoder', 'HackerRank', 'Leetcode'];
            console.error(` Error in ${services[index]}:`, result.reason);
        }
    });

    console.log("📥 Fetching completed. Starting cleanup...");

    // 2. Delete wrong/old data immediately after fetching
    try {
        await deleteOldEvents();
        console.log(" Cleanup complete.");
    } catch (error) {
        console.error(" Error deleting old events:", error);
    }

    console.log(" Cycle finished.");
});

// --- SCHEDULE 2: Send Alerts (Runs every 30 minutes) ---
cron.schedule("*/30 * * * *", async () => {
    try {
        console.log("📧 Sending email alerts...");
        await sendEmailAlerts();
    } catch (error) {
        console.error(" Error sending email alerts:", error);
    }
});