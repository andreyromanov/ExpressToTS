"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const mongoose = require('mongoose');
const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ]
}, {
    timestamps: true
});
module.exports = mongoose.model('Cart', CartSchema);
