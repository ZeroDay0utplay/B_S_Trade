const QueryService = require("./query.service");


async function getData(pool, property, value, table='users'){
    try {
        const queryService = new QueryService(pool).psqlPool;
        const result = await queryService.query(`SELECT * FROM ${table} WHERE ${property} = '${value}';`);
        return await result.rows;
    } catch (error) {
        return "User search ERROR";
    }
}

module.exports = {getData};