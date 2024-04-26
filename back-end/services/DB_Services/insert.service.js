const QueryService = require("./query.service");


async function insert(pool, property2change, value2change, table='users'){
    try {
        const queryService = new QueryService(pool).psqlPool;
        await queryService.query(`INSERT INTO ${table} (${property2change}) VALUES ('${value2change}');`);
        return "Inserted successfully";
    } catch (error) {
        return "Insertion ERROR";
    }
}

module.exports = {insert};