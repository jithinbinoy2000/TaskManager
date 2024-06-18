const mongoose = require('mongoose')
const task = require('../Model/taskmodel')
const connectionString= process.env.connectionString;
mongoose.connect(connectionString).then(()=>{
    console.log('Connection with mongodb is established');
}).catch((err)=>{
console.log(err);
})