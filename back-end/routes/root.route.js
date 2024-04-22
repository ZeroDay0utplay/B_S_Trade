const express = require('express');
const { getController } = require('../controllers/root.controller');
const router = express.Router();



router.get(':id', getController);


module.exports = router;