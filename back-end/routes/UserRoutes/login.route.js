const express = require('express');
const router = express.Router();
const userController = require("../../controllers/UserControllers/user.controller");



router.post("/", userController.loginController);




module.exports = router;