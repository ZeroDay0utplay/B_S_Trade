const bcrypt = require("bcryptjs");
const findUserService = require("../../services/UserServices/findUser.service");
const updateService = require("../../services/DB_Services/update.service");
const { getData } = require("../../services/DB_Services/getData.service");



async function resetPWD(req, res, next){
    try {
        const user_id = req.params.user_id;
        console.log(user_id);
        const pool = req.pool;  
        const data  = await findUserService.find(pool, "user_id", user_id);
        if (data == "User already exists"){
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const data = await getData(pool, "user_id", user_id);
            const reqPwdChange = data[0].req_pwd_change;
            if (reqPwdChange == true){
                await updateService.update(pool, "password", hashedPassword, "user_id", user_id);
                await updateService.update(pool, "req_pwd_change", "FALSE", "user_id", user_id);
                return res.status(200).json({message: 'Password has been successfully updated'});
            } 
            return res.status(403).json({message: 'Please click on the link that has been sent to your mail'});
        }
        return res.status(400).json({message: data});
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {resetPWD};