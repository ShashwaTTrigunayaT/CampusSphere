const axios = require("axios");
const EVENT = require("../models/event");
const util = require("util");

async function fetchHackerRankEvents() {
  const username = process.env.CLISTBY_USERNAME;
  const apiKey = process.env.CLISTBY_API;

 
  try {
    const response = await axios.get("https://clist.by/api/v2/contest/", {
      headers: {
        Authorization: `ApiKey ${username}:${apiKey}`,
      },
      params: {
        resource: "hackerrank.com",
        start__gt: new Date().toISOString(), 
        order_by: "start",
      },
    });

    const events = response.data.objects;
    const eventLength = events.length;

    for (let i = 0; i < eventLength; i++) {
      await EVENT.findOneAndUpdate(
        { externalId: events[i].id },
        {
          $set: {
            title: events[i].event,
            platform: "HackerRank",
            type: "Coding Competition",
            link: events[i].href,
            logoURL: "https://hrcdn.net/fcore/assets/brand/hackerrank-logo-4b6c7f5d5f.svg",
            bannerURL: "https://hrcdn.net/fcore/assets/brand/hackerrank-banner-1a3b3f4f6e.png",
            eventDate: new Date(events[i].start + "Z"),
            registrationDeadline: new Date(events[i].start + "Z"),
            duration: `${Math.floor(
              events[i].duration / 3600
            )}h ${Math.floor((events[i].duration % 3600) / 60)}m`,
          },
        },
        { upsert: true }
      );
    }
  } catch (error) {
    
    console.error("Error fetching HackerRank events:", error.message || error);
  }
  
}

module.exports = fetchHackerRankEvents;