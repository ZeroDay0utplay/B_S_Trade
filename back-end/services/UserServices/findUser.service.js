const QueryService = require("./query.service");
const validator = require("validator")



async function find(email, pool){
    try {
        if (!(validator.isEmail(email)))
            return "Invalid email address";
        const queryService = new QueryService(pool).psqlPool;
        const result = await queryService.query(`SELECT * FROM users WHERE email = '${email}';`);
        const user = result.rows;
        if (user.length > 0) return "User already exists";
        return "User not found";
    } catch (error) {
        return "User search ERROR";
    }
}

module.exports = {find};