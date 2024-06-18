
const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        require:true,
        unique:true
    },
    description:{
        type:String,
    }
}
,{timestamps:true})
const taskmanger =  mongoose.model('taskmanger',taskSchema);
module.exports = taskmanger;