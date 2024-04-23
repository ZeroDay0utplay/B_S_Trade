const bcrypt = require("bcryptjs");
const findUserService = require("../../services/UserServices/findUser.service");
const updateService = require("../../services/DB_Services/update.service");
const { getData } = require("../../services/DB_Services/getData.service");



async function resetPWD(req, res, next){
    try {
        const email = req.body.email;
        const pool = req.pool;  
        const data  = await findUserService.find(pool, "email", email);
        if (data == "User already exists"){
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const data = await getData(pool, "email", email);
            const reqPwdChange = data[0].req_pwd_change;
            if (reqPwdChange == true){
                await updateService.update(pool, "passowrd", hashedPassword, "email", email);
                await updateService.update(pool, "req_pwd_change", "FALSE", "email", email);
                return res.status(200).json({message: 'Password has been successfully updated'});
            } 
            return res.status(200).json({message: 'Please click on the link that has been sent to your mail'});
        }
        return res.status(400).json({message: data});
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {resetPWD};