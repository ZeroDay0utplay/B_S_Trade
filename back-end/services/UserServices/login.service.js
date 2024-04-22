const QueryService = require("./query.service");
const bcrypt = require("bcryptjs");


async function login(email, password, pool, table='users'){
    try {
        const querySerice = new QueryService(pool).psqlPool;
        const result = await querySerice.query(`SELECT * FROM ${table} WHERE email = '${email}';`);
        const user = result.rows;
        const user_id = user[0].user_id;
        if (user.length > 0){
            const userPassword = user[0].password;
            const isMatch = bcrypt.compareSync(password, userPassword);
            if (!isMatch) {
                return ["Invalid password", user_id];
            }
            if (!(user.is_verified)) return ["Verify your account", user_id];
            return ["user logged in successfully", user_id];
        }
        return ["user not found", user_id];
    } catch (error) {
        return "Login ERROR";
    }
}

module.exports = {login};