const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");



router.post("/", userController.registerController);




module.exports = router;