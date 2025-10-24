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
      <p><strong>${event.title}</strong> starts at ${new Date(event.eventDate).toLocaleString()}</p>
      <p>Check it out: <a href="${event.link}">Event Link</a></p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};


const showalerts = async (req, res) => {
  console.log("AlertsShow request received");
  const { userId } = req.params;
  const alerts = [];
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  const user = await USER.findOne({ email: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const alertsLength = user.alerts.length;

    if (alertsLength === 0) {
      return res.status(200).json({ message: "No alerts found", alerts: [] });
    }
    for (let i = 0; i < alertsLength; i++) {

      const eventId = user.alerts[i];

      const event = await EVENT.findById(eventId);

      if (event) {

        alerts[i] = event;

      }
    }
    return res.status(200).json({ message: "Alerts fetched successfully", alerts: alerts });
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
async function sendEmailAlerts(req, res) {
  const users = await USER.find({});
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    const alerts = user.alerts;

    for (let j = 0; j < alerts.length; j++) {
      const eventId = alerts[j];

      const event = await EVENT.findById(eventId);
      if (event) {
        const eventStart = new Date(event.eventDate);


        const now = new Date();
        const diffMs = eventStart - now; // difference in milliseconds

        const TWO_HOURS = 2 * 60 * 60 * 1000;

        if (diffMs > 0 && diffMs <= TWO_HOURS) {
          console.log(`Sending alert to ${user.email} for event ${event.title}`);
          await sendAlert(user.email, event);
        }
      }
    }
  }
}

module.exports = {
  showalerts,
  sendEmailAlerts,
};



