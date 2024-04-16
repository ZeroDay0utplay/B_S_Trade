const loginService = require("../services/login.service");


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
                res.status.status(404).json(result);
                break;
            default:
                res.status.status(500).json(result);
                break;
        }
    } catch (error) {
        res.status(500);
        next(error);
    }
}


async function registerController(req, res, next){
    try {
        const email = req.body.email;
        const password = req.body.password;
        const full_name = req.body.full_name;
        const job = req.body.job;

    } catch (error) {
        
    }
}


module.exports = {loginController};