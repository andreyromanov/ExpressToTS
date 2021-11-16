"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
//const express = require('express');
const express = require("express");
//const mongoose = require('mongoose');
const mongoose = require("mongoose");
const app = express();
const router = require('./routes/index');
//import * as router from "./routes/index";
app.use(express.json());
app.use('/api', router);
const PORT = process.env.PORT;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            mongoose.connect(process.env.DB_URL);
            app.listen(PORT, () => {
                console.log('Running ' + PORT);
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
start();
