const jwt = require("jsonwebtoken");



async function check(token){
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err !== null && err.name === 'TokenExpiredError'){
            return true;
        }
        return false;
    });
}

async function getId(token){
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded.userId;
}

module.exports = {check, getId};