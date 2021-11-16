require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/index')

app.use(express.json())
app.use('/api', router)

async function start(){
    try {
        mongoose.connect(process.env.DB_URL) 
        
        app.listen(process.env.PORT, () => {
            console.log('Running ' + process.env.PORT);
        })
    } catch (e) {
        console.log(e);
    }
}

start();