const EVENT = require("../models/event");
async function deleteOldEvents() {
    const today = new Date();
    
    try {
        console.log("Deleting Old events....");
        await EVENT.deleteMany({ registrationDeadline: { $lt: today } });
    } catch (error) {
        console.error("Error deleting old events:", error);
    }
}
module.exports = deleteOldEvents;

   