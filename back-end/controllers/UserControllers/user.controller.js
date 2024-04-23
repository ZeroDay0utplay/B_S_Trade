const loginService = require("../../services/UserServices/login.service");
const registerService = require("../../services/UserServices/signup.service");
const {generateAccessToken} = require("../../middlewares/auth.middleware");
const sendVerifMailService = require("../../services/UserServices/verifMailSender.service");


async function loginController(req, res, next){
    try {
        const email = req.body.email;
        const password = req.body.password;
        const pool = req.pool;
        const loginResult = await loginService.login(email, password, pool);
        const user_id = loginResult[1];
        const result = loginResult[0];
        let statusCode = 200;
        switch (result) {
            case "user logged in successfully":
                // send jwt
                const token = generateAccessToken(user_id.toString(), 90);
                res.cookie('auth_token', token, { httpOnly: true });
                break;
            case "Invalid password":
                statusCode = 401;
                break;
            case "Verify your account":
                statusCode = 401;
            case "user not found":
                statusCode = 404;
                break;
            default:
                statusCode = 500;
                break;
        }
        res.status(statusCode).json({message: result});
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
                let sendResponse = await sendVerifMailService.send_mail(email, pool);
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