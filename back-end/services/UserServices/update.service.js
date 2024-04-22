const QueryService = require("./query.service");


async function update(pool, property2change, value2change, conditionProperty, ConditionValue, table='users'){
    try {
        const queryService = new QueryService(pool).psqlPool;
        await queryService.query(`UPDATE ${table} SET ${property2change} = '${value2change}' WHERE ${conditionProperty} = '${ConditionValue}';`);
        return "Updated successfully";
    } catch (error) {
        return "Update ERROR";
    }
}

module.exports = {update};