const bcrypt = require("bcryptjs");
const findUserService = require("../services/findUser.service");



async function resetPWD(req, res, next){
    try {
        const email = req.body.email;
        const data  = findUserService.find(email);
        
    } catch (error) {
        
    }
}

module.exports = {resetPWD};