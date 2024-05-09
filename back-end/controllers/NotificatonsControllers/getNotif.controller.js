const { getData } = require("../../services/DB_Services/getData.service");

async function getNotifications(req, res, next){
    try {
        const pool = req.pool;
        const user_id = req.user.userId;
        const starred_box = await getData(pool, "user_id", user_id, "starred_box");
        if (!starred_box)
            res.status(404).json({message: "User not found"});
        let notifications = [];
        for (let star of starred_box){
            const stock_id = star.stock_id;
            const notification = await getData(pool, "stock_id", stock_id, "notifs");
            notifications.push(notification[0].msg);
        }
        res.status(200).json({message: notifications});
    } catch (error) {
        res.status(500);
    }
}

module.exports = {getNotifications};