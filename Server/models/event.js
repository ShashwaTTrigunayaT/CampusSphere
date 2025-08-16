const mongoose=require("mongoose");
const eventSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
        enum: ['Hackathon', 'Coding Competition', 'Internship', "Fest"],

    },
    link:{
        type:String,
        required:true,

    },
    eventDate:{
        type:Date,
        required:true,
    },
     
    tags: {
     type: [String],
     default: []
     },

    college:{
        type:String,
        

    },
    teamSize:{
        type:String,
        

    },
    stipend:{
        type:String,
        

    },
    prizes:{
        type:String,
        

    },
    platform:{
        type:String,
        required:true,

    },
    
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

    

},{timestamps:true})

const Event=mongoose.model("Event",eventSchema);
module.exports=Event;