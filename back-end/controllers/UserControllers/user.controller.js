const loginService = require("../../services/UserServices/login.service");
const registerService = require("../../services/UserServices/signup.service");
const {generateAccessToken} = require("../../middlewares/auth.middleware");
const crypto = require("crypto");
const QueryService = require("../../services/UserServices/query.service");
const sendVerifMailService = require("../../services/UserServices/verifMailSender.service");


async function loginController(req, res, next){
    try {
        const email = req.body.email;
        const password = req.body.password;
        const pool = req.pool;
        const loginResult = await loginService.login(email, password, pool);
        const id = loginResult[1];
        const result = loginResult[0];
        switch (result) {
            case "user logged in successfully":
                // Auth
                const token = generateAccessToken(id.toString(), 90);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({ auth_token: token, result: result });
                break;
            case "Invalid password":
                res.status(401).json(result);
                break;
            case "Verify your account":
                res.status(401).json(result);
            case "Verify your account":
                res.status(401).json(result);
            case "user not found":
                res.status(404).json(result);
                break;
            default:
                res.status(500).json(result);
                break;
        }
    } catch (error) {
        res.status(500);
        next(error);
    }
}


async function registerController(req, res, next){
    try {
        const pool = req.pool;
        const email = req.body.email;
        const password = req.body.password;
        const full_name = req.body.full_name;
        const job = req.body.job;
        const registerResult = await registerService.register(email, password, full_name, job, pool);
        let statusCode = 200;
        switch (registerResult) {
            case "Invalid email address":
                statusCode = 408;
                break;
            case "User already exists":
                statusCode = 411;
            case "user added succesfully":
                let sendResponse = await sendVerifMailService.send_mail(email, full_name, pool);
                statusCode = (sendResponse == "Verification mail has been sent successfully") ? 200: 400;
            default:
                statusCode = 500;
                break;
        }
        res.status(statusCode).json(registerResult);
    } catch (error) {
        res.status(500);
        next(error);
    }
}


module.exports = {
    loginController,
    registerController
};