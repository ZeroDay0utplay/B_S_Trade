const bcrypt = require("bcryptjs");
const findUserService = require("../../services/UserServices/findUser.service");
const QueryService = require("../../services/UserServices/query.service");



async function resetPWD(req, res, next){
    try {
        const email = req.body.email;
        const pool = req.body.pool;
        const data  = await findUserService.find(pool, "email", email);
        if (data == "User already exists"){
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const querySerice = new QueryService(pool).psqlPool;
            await querySerice.query(`UPDATE users SET password = ${hashedPassword} WHERE email = ${email};`);
            res.status(200).json('Password has been successfully updated');
        }
        return res.status(400).json(data);
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {resetPWD};