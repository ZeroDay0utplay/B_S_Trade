const express = require('express');
const router = express.Router();
const resetPWDController = require("../controllers/resetPWD.controller");



router.post("/", resetPWDController.resetPWD);


module.exports = router;