const express = require("express");
const router = express.Router();
const updateProfileController = require("../controllers/ProfileControllers/updateProfile.controller");
const { authorization } = require("../middlewares/auth.middleware");


let profileRoutes = (app) => {
    router.put("/profile", updateProfileController.updateProfile);
    app.use(router);
}


module.exports = profileRoutes;