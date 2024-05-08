const { getData } = require("../services/DB_Services/getData.service");

async function getController(req, res, next){
    try {
        const user_id = req.user.userId;
        const pool = req.pool;
        const data = await getData(pool, "user_id", user_id, "users", "profile_pic");
        const photo = data[0].profile_pic;
        res.status(200).json({profile_photo: photo, user_id: user_id});
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
}

module.exports = {getController};