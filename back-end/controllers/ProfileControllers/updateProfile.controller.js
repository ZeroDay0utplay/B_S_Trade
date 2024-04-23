const updateService = require("../../services/DB_Services/update.service");
const uploadFile = require("../../middlewares/upload.middleware");



async function updateProfile(req, res, next){
    try {
        await uploadFile(req, res);
        const pool = req.pool;
        const user_id = req.params.user_id;
        console.log(user_id);
        const file = req.file;
        const update = req.body;
        for (let prop in update){
            let value = update[prop];
            console.log(prop);
            console.log(value);
            if (value != ''){
                const queryResult = await updateService.update(pool, prop, value, "user_id", user_id);
                console.log(queryResult);
            }
        }
        res.status(200).json({message: "Profile has been updated successfully"});
    } catch (error) {
        res.status(500);
        next(error);
    }
}


module.exports = {updateProfile};