const bcrypt = require("bcryptjs");
const findUserService = require("./findUser.service");
const QueryService = require("./query.service");

async function register(email, password, full_name, job, pool, table='users'){
    try {
        const data = await findUserService.find(pool, "email", email);
        if (data == "User not found"){
            const hashedPassword = bcrypt.hashSync(password, 10);
            const queryService = new QueryService(pool).psqlPool;
            await queryService.query(`INSERT INTO ${table} (email, password, full_name, job) VALUES ('${email}', '${hashedPassword}', '${full_name}', '${job}');`);
            return "user added succesfully";
        }
        return data;  
    } catch (error) {
        return "Register ERROR";
    }

}

module.exports = {register};