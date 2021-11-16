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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
//const Router = require('express');
//const router = new Router();
const express = require("express");
const router = express.Router();
const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
router.post('/registration', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET).toString(),
    });
    try {
        yield newUser.save();
        res.json(newUser);
    }
    catch (e) {
        res.status(500).json(e);
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username: req.body.username });
        if (!user)
            res.status(400).json("Wrong credentials");
        const hashPass = CryptoJs.AES.decrypt(user.password, process.env.SECRET);
        const pass = hashPass.toString(CryptoJs.enc.Utf8);
        if (pass !== req.body.password)
            res.status(400).json("Wrong password");
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.SECRET, { expiresIn: '2d' });
        const _a = user._doc, { password } = _a, others = __rest(_a, ["password"]);
        res.json(Object.assign(Object.assign({}, others), { accessToken }));
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}));
module.exports = router;
