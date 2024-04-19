const QueryService = require("./query.service");
const bcrypt = require("bcryptjs");


async function login(email, password, pool){
    try {
        const querySerice = new QueryService(pool).psqlPool;
        const result = await querySerice.query(`SELECT * FROM users WHERE email = '${email}';`);
        const user = result.rows;
        const id = user[0].id;
        if (user.length > 0){
            const userPassword = user[0].password;
            const isMatch = bcrypt.compareSync(password, userPassword);
            if (!isMatch) {
                return ["Invalid password", id];
            }
            if (!(user.is_verified)) return ["Verify your account", id];
            return ["user logged in successfully", id];
        }
        return ["user not found", id];
    } catch (error) {
        return "Login ERROR";
    }
}

module.exports = {login};