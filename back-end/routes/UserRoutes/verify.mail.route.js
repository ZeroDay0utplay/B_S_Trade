const express = require('express');
const router = express.Router();
const verifyMailController = require("../../controllers/UserControllers/verifyMail.controller");



router.get("/:user_id/:token", verifyMailController.verifyController);


module.exports = router;