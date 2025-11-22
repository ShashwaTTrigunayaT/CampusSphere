const axios = require("axios");
const EVENT = require("../models/event");
const util = require("util");

async function fetchLeetcodeEvents() {
  const username = process.env.CLISTBY_USERNAME ;
  const apiKey = process.env.CLISTBY_API ;

  try {
    const response = await axios.get('https://clist.by/api/v2/contest/', {
      headers: {
        'Authorization': `ApiKey ${username}:${apiKey}`
      },
      params: {
        resource: 'leetcode.com',
        start__gt: new Date().toISOString(), 
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
            logoURL: 'https://leetcode.com/static/images/LeetCode-logo.png',
            bannerURL: 'https://leetcode.com/static/images/LeetCode_banner.png',

           eventDate: new Date(events[i].start + 'Z'),
            registrationDeadline: new Date(events[i].start + 'Z'),
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
