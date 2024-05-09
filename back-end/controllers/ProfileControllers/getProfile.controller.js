const { getData } = require("../../services/DB_Services/getData.service");

async function getProfile(req, res, next){
    try {
        const pool = req.pool;
        const user_id = req.user.userId;
        const users = await getData(pool, "user_id", user_id, "users");
        let user = users[0];
        if (!user)
            res.status(404).json({message: "User not found"});
        delete user.password;
        delete user.req_pwd_change;
        delete user.is_verified;
        delete user.user_id;
        res.status(200).json({message: user});
    } catch (error) {
        res.status(500);
    }
}

module.exports = {getProfile};