const express = require("express");
const router = express.Router();
const sendPWDController = require("../../controllers/UserControllers/resetPWD.controller");



router.post("/", sendPWDController.resetPWD);


module.exports = router;