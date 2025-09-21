const axios = require("axios");
const EVENT = require("../models/event");
const parser = require("xml2js").parseStringPromise;
const util = require("util");
async function fetchDevFolioEvents() {
    const response = await axios.get("https://devpost.com/hackathons.rss");
    const feed = await parser(response.data);
    console.log(feed.rss.channel[0].item);
}
fetchDevFolioEvents();