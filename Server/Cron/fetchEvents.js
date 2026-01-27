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

// --- SCHEDULE 1: Fetch Events (Runs every hour at minute 0) ---
// Changed from */50 to 0 * * * * for consistency.
cron.schedule("0 * * * *", async () => {
    console.log("🔄 Starting event fetch cycle...");

    // Using Promise.allSettled allows all fetchers to attempt execution
    // even if one of them fails.
    const results = await Promise.allSettled([
        fetchUnstopEvents(),
        fetchDevFolioEvents(),
        fetchCodeforcesEvents(),
        fetchCodeChefEvents(),
        fetchAtCoderEvents(),
        fetchHackerRankEvents(),
        fetchLeetcodeEvents()
    ]);

    // Optional: Log failures for debugging
    results.forEach((result, index) => {
        if (result.status === 'rejected') {
            const services = ['Unstop', 'DevFolio', 'Codeforces', 'CodeChef', 'AtCoder', 'HackerRank', 'Leetcode'];
            console.error(` Error in ${services[index]}:`, result.reason);
        }
    });

    console.log("✅ Fetch cycle completed.");
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

// --- SCHEDULE 3: Cleanup (Runs once a day at midnight) ---
// Cleaning up every hour is usually unnecessary and adds database load.
// "0 0 * * *" runs at 00:00 every day.
cron.schedule("0 0 * * *", async () => {
    try {
        console.log("🧹 Cleaning up old events...");
        await deleteOldEvents();
        console.log("✅ Cleanup complete.");
    } catch (error) {
        console.error(" Error deleting old events:", error);
    }
});