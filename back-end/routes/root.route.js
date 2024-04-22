const express = require('express');
const { getController } = require('../controllers/root.controller');
const router = express.Router();


const rootRoute = (app) => {
    router.get('/:id', getController);
    app.use(router);
}


module.exports = rootRoute;