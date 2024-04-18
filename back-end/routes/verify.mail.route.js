const express = require('express');
const router = express.Router();
const verifyMailController = require("../controllers/verify.mail.controller");



router.get("/:id/:token", verifyMailController.verifyController);


module.exports = router;