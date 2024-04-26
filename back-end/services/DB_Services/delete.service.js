const QueryService = require("./query.service");


async function deleteFromDB(pool, property, value, table='users'){
    try {
        const queryService = new QueryService(pool).psqlPool;
        const result = await queryService.query(`DELETE FROM ${table} WHERE ${property} = '${value}';`);
        return await result.rows;
    } catch (error) {
        return "Deletion ERROR";
    }
}

module.exports = {deleteFromDB};