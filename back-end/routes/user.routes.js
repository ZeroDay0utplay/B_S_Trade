const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserControllers/user.controller");
const resendMailController = require("../controllers/UserControllers/resendMail.controller");
const resetPwdLinkController = require("../controllers/UserControllers/resetPwdLink.controller");
const sendMFPController = require("../controllers/UserControllers/sendMFP");
const verifyMailController = require("../controllers/UserControllers/verifyMail.controller");
const sendPWDController = require("../controllers/UserControllers/resetPWD.controller");



let userRoutes = (app) => {
  router.post("/login", userController.loginController);
  router.post("/register", userController.registerController);
  router.post("/resend", resendMailController.resend);
  router.post("/reset", sendPWDController.resetPWD);
  router.get("/users/reset-pwd", resetPwdLinkController.check_clicked_link);
  router.post("/sendMFP", sendMFPController.send);
  router.get("/users/verify-email/:user_id/:token", verifyMailController.verifyController);
  app.use(router);
};

module.exports = userRoutes;
