const express = require("express");
const router = express.Router();
const updateProfileController = require("../../controllers/ProfileControllers/updateProfile.controller");



router.post("/:id", updateProfileController.updateProfile);



module.exports = router;