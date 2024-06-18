require('dotenv').config() 
const express = require('express')
const cors = require('cors')
const router = require("./Routes/routes")
require('./Connection/connection')
const PORT = 3000;
const server = express();
server.use(cors());
server.use(express.json())
server.use(router)
server.listen(PORT,()=>{
    console.log("server is running waiting for responses !!!");
})
server.get('/',(request,response)=>{
    response.status(200).send('Server started');
})