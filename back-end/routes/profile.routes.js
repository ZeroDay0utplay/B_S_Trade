const express = require("express");
const router = express.Router();
const updateProfileController = require("../controllers/ProfileControllers/updateProfile.controller");
const { authorization } = require("../middlewares/auth.middleware");
const { getProfile } = require("../controllers/ProfileControllers/getProfile.controller");


let profileRoutes = (app) => {
    router.get("/profile/:id", authorization, getProfile);
    router.put("/profile/:id", updateProfileController.updateProfile);
    app.use(router);
}


module.exports = profileRoutes;