const Router = require('express');
const router = new Router();
const userRouter = require('./user.router')
const authRouter = require('./auth.router')

router.use('/users', userRouter)
router.use('/auth', authRouter)

module.exports = router;