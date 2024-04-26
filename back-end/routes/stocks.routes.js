const express = require('express');
const { authorization } = require('../middlewares/auth.middleware');
const { startIt } = require('../controllers/StarringControllers/starring.controller');
const { unStartIt } = require('../controllers/StarringControllers/unstarring.controller');
const { getStockNames } = require('../controllers/stocksControllers/getNames.controller');
const router = express.Router();


const stocksRoute = (app) => {
    router.delete('/stocks/unstar_stock/:stock_id', authorization, unStartIt);
    router.post('/stocks/star_stock/:stock_id', authorization, startIt);
    router.get("/stocks", getStockNames);
    app.use(router);
}


module.exports = stocksRoute;