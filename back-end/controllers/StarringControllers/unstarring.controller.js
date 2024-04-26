const { deleteFromDB } = require("../../services/DB_Services/delete.service");

async function unStartIt(req, res, next){
    try {
        const user_id = req.user.userId;
        const stock_id = req.params.stock_id;
        const pool = req.pool;
        const deleteStockID = await deleteFromDB(pool, "stock_id", stock_id, 'starred_box');
        if (deleteStockID == "Deletion ERROR") return res.status(500).json({message: deleteStockID});
        const deleteUserID = await deleteFromDB(pool, "user_id", user_id, 'starred_box');
        if (deleteUserID == "Deletion ERROR") return res.status(500).json({message: deleteUserID});
    } catch (error) {
        res.status(500);
        next(error);
    }
}


module.exports = {unStartIt};