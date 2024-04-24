const express = require('express');
const { getController } = require('../controllers/root.controller');
const { authorization } = require('../middlewares/auth.middleware');
const router = express.Router();


const rootRoute = (app) => {
    router.get('/', authorization, getController);
    app.use(router);
}


module.exports = rootRoute;