const { insert } = require("../../services/DB_Services/insert.service");

async function startIt(req, res, next){
    try {
        const user_id = req.user.userId;
        const stock_id = req.params.stock_id;
        const pool = req.pool;
        const insertStockID = await insert(pool, "stock_id", stock_id, 'starred_box');
        if (insertStockID == "Insertion ERROR") return res.status(500).json({message: insertStockID});
        const insertUserID = await insert(pool, "user_id", user_id, 'starred_box');
        if (insertUserID == "Insertion ERROR") return res.status(500).json({message: insertUserID});
    } catch (error) {
        res.status(500);
        next(error);
    }
}


module.exports = {startIt};