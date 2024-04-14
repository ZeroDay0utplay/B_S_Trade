const QueryService = require("./query.service")


async function login(email, password, pool){
    try {
        const querySerice = new QueryService(pool);
        const result = await querySerice.query(`SELECT email, pwd FROM users WHERE email=${email} AND pwd=${password};`);
        if (result == "Query ERROR") return "user not found";
        return "user logged in successfully";
    } catch (error) {
        console.log(error);
        return "internal server error";
    }
}

module.exports = {login};