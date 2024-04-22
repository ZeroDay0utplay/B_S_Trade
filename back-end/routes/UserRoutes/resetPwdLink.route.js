const express = require("express");
const router = express.Router();
const resetPwdLinkController = require("../../controllers/UserControllers/resetPwdLink.controller");


router.get("/:user_id/:token", resetPwdLinkController.check_clicked_link);


module.exports = router;