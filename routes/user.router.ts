//const Router = require('express');
import * as express from "express"
const router = express.Router();

const { verifyToken } = require('./verifyToken.router');
//const router = new Router();

router.get('/', async (req, res) => {
    res.json({a:1})
})

router.put('/:id', verifyToken, async (req, res) => {
    
    res.json(req.body)
})

module.exports = router;