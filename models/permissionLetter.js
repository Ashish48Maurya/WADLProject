const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    permitted: {
        type: Boolean,
        default: false
    }
});

const permissionSchema = new Schema({
    eventType: {
        type: String,
        required: true,
    },
    eventName:{
        type:String,
        required:true,
    },
    url:{
        type:String
    },
    teamSize:{
        type:String,
        required:true,
    },
    noOfTeams:{
        type:Number,
        required:true,
    },
    outSiders:{
        type:String,
        required:true,
    },
    startTime:{
        type:Date,
        required:true,
    },
    endTime:{
        type:Date,
        required:true,
    },
    isAllDay:{
        type:Boolean,
    },
    supervisor:{
        type:String,
        required:true,
    },
    permissionFrom:[emailSchema]
});

const Permission = mongoose.model("permission", permissionSchema);
module.exports = Permission;