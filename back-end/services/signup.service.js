const QueryService = require("./query.service");
const bcrypt = require("bcryptjs");
const validator = require("validator");

async function register(email, password, full_name, job, pool){
    try {
        if (!(validator.isEmail(email)))
            return "Invalid email address";
        const querySerice = new QueryService(pool).psqlPool;
        const result = await querySerice.query(`SELECT * FROM users WHERE email = '${email}';`);
        const data = result.rows;
        if (data.length > 0) return "User already exists";
        else{
            const hashedPassword = bcrypt.hashSync(password, 10);
            await querySerice.query(`INSERT INTO users (email, password, full_name, job) VALUES ('${email}', '${hashedPassword}', '${full_name}', '${job}');`);
            return "user added succesfully";
        }   
    } catch (error) {
        return "Query ERROR";
    }

}

module.exports = {register};