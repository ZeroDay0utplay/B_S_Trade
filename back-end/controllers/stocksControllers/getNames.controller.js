const QueryService = require("../../services/DB_Services/query.service");


async function getStockNames(req, res, next){
    try {
        const pool = req.pool;
        const queryService = new QueryService(pool).psqlPool;
        const result = await queryService.query(`SELECT * FROM stocks;`);
        const data = result.rows;
        if (data) return res.status(200).json(data);
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {getStockNames};