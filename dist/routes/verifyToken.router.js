const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader)
        res.status(401).json('Not authenticated');
    jwt.verify(authHeader, process.env.SECRET, (err, user) => {
        if (err)
            res.status(403).json('Invalid token');
        req.user = user;
        next();
    });
};
const verifyTokenAndAuth = (req, res, next) => {
    if (req.user.id === req.params.id && req.user.isAdmin) { }
};
module.exports = { verifyToken };
