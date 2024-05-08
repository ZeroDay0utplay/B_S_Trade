const { getData } = require("../../services/DB_Services/getData.service");

async function getProfile(req, res, next){
    try {
        const pool = req.pool;
        const user_id = req.user.userId;
        const names = await getData(pool, "user_id", user_id, "users", "full_name");
        const name = names[0];
        if (!name)
            res.status(404).json({message: "User not found"});
        res.status(200).json({name: name});
    } catch (error) {
        res.status(500);
    }
}

module.exports = {getProfile};