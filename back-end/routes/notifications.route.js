const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/auth.middleware");
const { getNotifications } = require("../controllers/NotificatonsControllers/getNotif.controller");


let notifsRoute = (app) => {
    router.get("/notifs", authorization, getNotifications);
    app.use(router);
}


module.exports = notifsRoute;