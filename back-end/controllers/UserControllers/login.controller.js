const loginService = require("../../services/UserServices/login.service");
const {generateAccessToken} = require("../../middlewares/auth.middleware");


async function login(req, res, next){
    try {
        const email = req.body.email;
        const password = req.body.password;
        const pool = req.pool;
        const loginResult = await loginService.login(email, password, pool);
        const user_id = loginResult[1];
        const result = loginResult[0];
        let statusCode = 200;
        let repsonseMSG = {message: result};
        switch (result) {
            case "You have been logged in successfully":
                // send jwt
                const token = generateAccessToken(user_id.toString(), 90);
                repsonseMSG["auth_token"] = token;
                break;
            case "Invalid password":
                statusCode = 401;
                break;
            case "Verify your account":
                statusCode = 406;
                break;
            case "user not found":
                statusCode = 404;
                break;
            default:
                statusCode = 500;
                break;
        }
        res.status(statusCode).json(repsonseMSG);
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {login}