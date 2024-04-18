const loginService = require("../services/login.service");
const registerService = require("../services/signup.service");
const {generateAccessToken} = require("../middlewares/auth.middleware");
const sendMailService = require("../services/sendMail.service");
const crypto = require("crypto");
const QueryService = require("../services/query.service");


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
                statusCode = 201;
                let setToken = generateAccessToken(crypto.randomBytes(16).toString("hex"), 1);
                const querySerice = new QueryService(pool).psqlPool;
                const res = await querySerice.query(`SELECT id FROM users WHERE email = '${email}';`);
                const id = res.rows[0].id;
                if (setToken) {
                    sendMailService.sendMail({
                    from: process.env.EMAIL,
                    to: `${email}`,
                    subject: "Account Verification Link",
                    text: `Hello, ${full_name} Please verify your email by clicking this link :
                            http://${process.env.IP}:${process.env.PORT}/users/verify-email/${id}/${setToken} `,
                    })
        
                } else {
                    statusCode = 400;
                }
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