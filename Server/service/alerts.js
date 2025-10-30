const USER = require("../models/user");
const EVENT = require("../models/event");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendAlert = async (toEmail, event) => {
  const mailOptions = {
    from: '"CampusSphere" <campusshere@gmail.com>', 
    to: toEmail,
    subject: `Event Alert: ${event.title} starts soon!`,
    html: `
      <h3>Your Event Alert</h3>
      <p><strong>${event.title}</strong> starts at ${new Date(
      event.eventDate
    ).toLocaleString()}</p>
      <p>Check it out: <a href="${event.link}">Event Link</a></p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

const showalerts = async (req, res) => {
  const { userId } = req.params; 
  
  if (!userId) {
    return res.status(400).json({ message: "User ID (email) is required" });
  }

  try {
    const user = await USER.findOne({ email: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.alerts.length === 0) {
      return res.status(200).json({ message: "No alerts found", alerts: [] });
    }

    
    const alerts = await EVENT.find({
      _id: { $in: user.alerts },
    });
    

    return res
      .status(200)
      .json({ message: "Alerts fetched successfully", alerts: alerts });
      
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


async function sendEmailAlerts() {
  const now = new Date();
  const twoHourFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  try {
    
    const upcomingEvents = await EVENT.find({
      eventDate: { $gte: now, $lte: twoHourFromNow },
    });

    if (upcomingEvents.length === 0) {
      
      return;
    }
    
    
    const eventIds = upcomingEvents.map(event => event._id);

    
    const usersToAlert = await USER.find({
      alerts: { $in: eventIds },
    }).select("email alerts"); 

    
    const eventMap = new Map(upcomingEvents.map(event => [event._id.toString(), event]));

    
    for (const user of usersToAlert) {
      for (const eventId of user.alerts) {
        
        const event = eventMap.get(eventId.toString());
        
        
        if (event) {
          
          sendAlert(user.email, event);
          
          
          
          
        }
      }
    }
  } catch (error) {
    console.error("Error in sendEmailAlerts job:", error);
  }
};

module.exports = { showalerts, sendEmailAlerts };