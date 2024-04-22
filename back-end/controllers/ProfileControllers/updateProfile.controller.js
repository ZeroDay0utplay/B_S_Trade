const updateService = require("../../services/UserServices/update.service");



async function updateProfile(req, res, next){
    try {
        const pool = req.pool;
        const update = req.body;
        const user_id = req.params.user_id;
        for (let prop in update){
            let value = update[prop];
            if (value != ''){
                await updateService.update(pool, prop, value, "user_id", user_id);
            }
        }
        res.status(200).json("Profile has been updated successfully");
    } catch (error) {
        res.status(500);
        next(error);
    }
}


module.exports = {updateProfile};