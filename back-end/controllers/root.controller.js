const { getData } = require("../services/UserServices/getData.service");


async function getController(req, res, next){
    try {
        const id = req.params.id;
        const pool = req.pool;
        const data = await getData(pool, "user_id", id);
        console.log(data);
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
}

module.exports = {getController};