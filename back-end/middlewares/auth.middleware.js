const jwt = require("jsonwebtoken");
const { log } = require("util");


function generateAccessToken(userId, duration) {
    const payload = {
        userId: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * duration), // number of minutes
    };

    return jwt.sign(payload, process.env.TOKEN_SECRET);
}


function authorization(req, res, next) {
    const token = req.cookies.auth_token;
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json('Access token has expired');
            } else {
                return res.status(403).json('Access token is invalid');
            }
        }
        req.user = user;
        next();
    });
}

module.exports = {
    generateAccessToken,
    authorization
}