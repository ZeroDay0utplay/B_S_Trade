const bcrypt = require("bcryptjs");
const findUserService = require("../../services/UserServices/findUser.service");
const QueryService = require("../../services/UserServices/query.service");
const updateService = require("../../services/UserServices/update.service")



async function resetPWD(req, res, next){
    try {
        const email = req.body.email;
        const pool = req.pool;  
        const data  = await findUserService.find(pool, "email", email);
        if (data == "User already exists"){
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const querySerice = new QueryService(pool).psqlPool;
            const query = await querySerice.query(`SELECT req_pwd_change FROM users WHERE email = '${email}';`);
            const reqPwdChange = query.rows[0].req_pwd_change;
            if (reqPwdChange){
                await updateService.update(pool, "passowrd", hashedPassword, "email", email);
                await updateService.update(pool, "req_pwd_change", "FALSE", "email", email);
                return res.status(200).json('Password has been successfully updated');
            } 
            return res.status(200).json('Please click on the link that has been sent to your mail');
        }
        return res.status(400).json(data);
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {resetPWD};