const express = require('express');
const router = express.Router();
const sendPWDController = require("../../controllers/UserControllers/sendMFP");



router.post("/", sendPWDController.send);




module.exports = router;