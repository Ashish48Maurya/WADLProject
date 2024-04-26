const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    Subject: {
        type: String,
        required: true,
    },
    StartTime:{
        type:Date,
        required:true,
    },
    EndTime:{
        type:Date,
        required:true,
    },
    IsAllDay:{
        type:Boolean,
    }
});

const Event = mongoose.model("event", eventSchema);
module.exports = Event;