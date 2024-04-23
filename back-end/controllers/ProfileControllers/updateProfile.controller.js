const updateService = require("../../services/DB_Services/update.service");
const uploadFile = require("../../middlewares/upload.middleware");



async function updateProfile(req, res, next){
    try {
        await uploadFile(req, res);
        const pool = req.pool;
        const user_id = req.params.user_id;
        const file = req.file;
        console.log(file);
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