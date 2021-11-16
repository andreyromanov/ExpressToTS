require('dotenv').config();
//const express = require('express');
import * as express from "express"
//const mongoose = require('mongoose');
import * as mongoose from "mongoose"
const app = express();
const router = require('./routes/index')
//import * as router from "./routes/index";

app.use(express.json())
app.use('/api', router)

const PORT : string | number = process.env.PORT

async function start(){
    try {
        mongoose.connect(process.env.DB_URL) 
        
        app.listen(PORT, () => {
            console.log('Running ' + PORT);
        })
    } catch (e) {
        console.log(e);
    }
}

start();