const axios = require("axios");
const EVENT = require("../models/event");
async function fetchCodeforcesEvents() {
    let cnt = 0;
    const response = await axios.get("https://codeforces.com/api/contest.list?gym=false");
    const eventLength = response.data.result.length;
    for (let i = 0; i < eventLength; i++) {
        if(response.data.result[i].phase === "FINISHED"){
            const event = await EVENT.findOne({ externalId: response.data.result[i].id });
            if (event) {
                await EVENT.findOneAndDelete({ externalId: response.data.result[i].id });
            }
        }

        if (response.data.result[i].phase === "BEFORE") {
            cnt++;
            await EVENT.findOneAndUpdate({
                externalId: response.data.result[i].id
            }, {
                $set: {
                    title: response.data.result[i].name,


                    platform: "Codeforces",
                    type: "Coding Competition",
                    link: "https://codeforces.com/contest/" + response.data.result[i].id,
                    eventDate: new Date(response.data.result[i].startTimeSeconds * 1000),
                    registrationDeadline: new Date(response.data.result[i].startTimeSeconds * 1000),
                    duration: `${Math.floor(response.data.result[i].durationSeconds / 3600)}h ${Math.floor((response.data.result[i].durationSeconds % 3600) / 60)}m`,
                }
            }, { upsert: true, new: true });
        }
    }
    console.log(`Codeforces events updated: ${cnt} `);
}


module.exports = fetchCodeforcesEvents;
