const express = require('express');
const router = express.Router();
const resendMailController = require("../../controllers/UserControllers/resendMail.controller");



router.post("/", resendMailController.resend);




module.exports = router;