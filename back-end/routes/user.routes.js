const express = require("express");
const router = express.Router();

const registerController = require("../controllers/UserControllers/register.controller");
const loginController = require("../controllers/UserControllers/login.controller");
const resendMailController = require("../controllers/UserControllers/resendMail.controller");
const resetPwdLinkController = require("../controllers/UserControllers/resetPwdLink.controller");
const sendMFPController = require("../controllers/UserControllers/sendMFP");
const verifyMailController = require("../controllers/UserControllers/verifyMail.controller");
const sendPWDController = require("../controllers/UserControllers/resetPWD.controller");
const logoutController = require("../controllers/UserControllers/logout.controller");



let userRoutes = (app) => {
  router.post("/login", loginController.login);
  router.post("/register", registerController.register);
  router.post("/resend", resendMailController.resend);
  router.post("/reset", sendPWDController.resetPWD);
  router.get("/users/reset-pwd/:user_id/:token", resetPwdLinkController.check_clicked_link);
  router.post("/sendMFP", sendMFPController.send);
  router.get("/users/verify-email/:user_id/:token", verifyMailController.verifyController);
  router.get("/logout", logoutController.logout);
  app.use(router);
};

module.exports = userRoutes;
