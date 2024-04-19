const QueryService = require("./query.service");


async function find(pool, property, value){
    try {
        const queryService = new QueryService(pool).psqlPool;
        const result = await queryService.query(`SELECT * FROM users WHERE ${property} = '${value}';`);
        const user = result.rows;
        if (user.length > 0) return "User already exists";
        return "User not found";
    } catch (error) {
        return "User search ERROR";
    }
}

module.exports = {find};