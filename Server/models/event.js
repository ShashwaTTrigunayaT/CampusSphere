const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
    externalId: {
        type: String,
        required:true,
        unique:true,
        
    },
    
    title: {
        type: String,
        required: true,
    },
    

    description: {
        type: String,
        required: true,
        default: "No Description",
    },
    type: {
        type: String,
        required: true,
        enum: ['Hackathon', 'Coding Competition', 'Internship', "Fest"],

    },
    link: {
        type: String,
        required: true,

    },
    eventDate: { type: mongoose.Schema.Types.Mixed,
        required: true
     },

    tags: {
        type: [String],
        default: []
    },

    college: {
        type: String,


    },
    bannerURL: { type: String },
    logoURL: { type: String },
    status: {
        type: String,
        enum: ["Upcoming", "Ongoing", "Expired"],
        default: "Upcoming"
    }
    ,
    teamSize: {
        min: { type: Number },
        max: { type: Number }
    },

    registrationDeadline:
    {
        type  : Date
    },
    location: {
        type: String,
    },
    stipend: {
        type: String,


    },
    duration: {
        type: String,
    },
    prizes: {
        type: String,


    },
    platform: {
        type: String,
        required: true,

    },
    organization: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
    mode: {
        type: String,
        enum: ["Online", "Offline"],
        required: true,
        default: "Online"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }




}, { timestamps: true })

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
module.exports = Event;
