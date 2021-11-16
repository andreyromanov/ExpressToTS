//const Router = require('express');
//const router = new Router();
import * as express from "express"
const router = express.Router();

const User = require('../models/User')
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')

router.post('/registration', async (req, res) => {
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJs.AES.encrypt(req.body.password, process.env.SECRET).toString(),
    });

    try {
        await newUser.save();
        res.json(newUser)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) res.status(400).json("Wrong credentials")

        const hashPass = CryptoJs.AES.decrypt(user.password, process.env.SECRET);
        const pass = hashPass.toString(CryptoJs.enc.Utf8)
        if(pass !== req.body.password) res.status(400).json("Wrong password")

        const accessToken = jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin
        },
        process.env.SECRET,
        {expiresIn : '2d'})

        const {password, ...others} = user._doc;

        res.json({...others, accessToken})
    } catch (e) {
        console.log(e);
        res.status(500).json(e)
    }
})

module.exports = router;