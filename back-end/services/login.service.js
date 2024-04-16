const QueryService = require("./query.service")


async function login(email, password, pool){
    try {
        const querySerice = new QueryService(pool).psqlPool;
        const result = await querySerice.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`);
        const data = result.rows;
        console.log(data);
        if (data.length > 0) return "user logged in successfully";
        return "user not found";
    } catch (error) {
        return "Query ERROR";
    }
}

module.exports = {login};