const express = require("express");
const router = express.Router();
const updateProfileController = require("../controllers/ProfileControllers/updateProfile.controller");


let profileRoutes = (app) => {
    router.post("/profile/:id", updateProfileController.updateProfile);
    app.use(router);
}


module.exports = profileRoutes;