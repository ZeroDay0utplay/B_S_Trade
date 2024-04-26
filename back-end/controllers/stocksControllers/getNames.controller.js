const QueryService = require("../../services/DB_Services/query.service");
const { convert } = require("../../services/StockServices/fromJson2Array.service");


async function getStockNames(req, res, next){
    try {
        const pool = req.pool;
        const queryService = new QueryService(pool).psqlPool;
        const result = await queryService.query(`SELECT stock_name FROM stocks;`);
        const data = result.rows;
        if (data) return res.status(200).json({message: convert(data)});
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {getStockNames};