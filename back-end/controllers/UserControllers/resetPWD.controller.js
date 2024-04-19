const bcrypt = require("bcryptjs");
const findUserService = require("../../services/UserServices/findUser.service");
const QueryService = require("../../services/UserServices/query.service");



async function resetPWD(req, res, next){
    try {
        const email = req.body.email;
        const pool = req.body.pool;
        const data  = findUserService.find(email, pool);
        if (data == "User already exists"){
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const querySerice = new QueryService(pool).psqlPool;
            await querySerice.query(`UPDATE users SET password = ${hashedPassword} WHERE email = ${email};`);
            
        }
        return data;
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {resetPWD};