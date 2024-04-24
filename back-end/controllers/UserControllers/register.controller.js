const registerService = require("../../services/UserServices/signup.service");
const sendVerifMailService = require("../../services/UserServices/verifMailSender.service");


async function register(req, res, next){
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
        res.status(statusCode).json({message: registerResult});
    } catch (error) {
        res.status(500);
        next(error);
    }
}


module.exports = { register };