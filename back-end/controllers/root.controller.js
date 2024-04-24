const { check } = require("../services/UserServices/checkToken.service");


async function getController(req, res, next){
    try {
        
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
}

module.exports = {getController};