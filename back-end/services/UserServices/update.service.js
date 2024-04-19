const QueryService = require("./query.service");


async function update(pool, property2change, value2change, property, value){
    try {
        const queryService = new QueryService(pool).psqlPool;
        await queryService.query(`UPDATE users SET ${property2change} = '${value2change}' WHERE ${property} = '${value}';`);
        return "Updated successfully";
    } catch (error) {
        return "Update ERROR";
    }
}

module.exports = {update};