const axios = require("axios");
const EVENT = require("../models/event");
const util = require("util");

async function fetchLeetcodeEvents() {
  const username = 'ShashwatTTrigunayat';
  const apiKey = 'a18d0b0ae34ae2dfe9041f1d438ad93d62f8750b';

  try {
    const response = await axios.get('https://clist.by/api/v2/contest/', {
      headers: {
        'Authorization': `ApiKey ${username}:${apiKey}`
      },
      params: {
        resource: 'leetcode.com',
        start__gt: new Date().toISOString(), // only upcoming contests
        order_by: 'start'
      }
    });

    const events = response.data.objects;
    const eventLength = events.length;

    for (let i = 0; i < eventLength; i++) {
        
      await EVENT.findOneAndUpdate(
        { externalId: events[i].id },
        {
          $set: {
            title: events[i].event,
            platform: 'LeetCode',
            type: "Coding Competition",
            link: events[i].href,
            eventDate: new Date(events[i].start),
            registrationDeadline: new Date(events[i].start),
            duration: `${Math.floor(events[i].duration / 3600)}h ${Math.floor((events[i].duration % 3600) / 60)}m`,
          }
        },
        { upsert: true, new: true }
      );
    }

    console.log(`Fetched and saved ${eventLength} LeetCode contests!`);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
}



module.exports =  fetchLeetcodeEvents ;
