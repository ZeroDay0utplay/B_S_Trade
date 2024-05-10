const verifMailSenderService = require("../../services/UserServices/sendFPMail.service");
const findUserService = require("../../services/UserServices/findUser.service");
const {getData} = require("../../services/DB_Services/getData.service");


async function send(req, res, next){
    try {
        const email = req.body.email;
        const pool = req.pool;
        const data  = await findUserService.find(pool, "email", email);
        if (data != "User already exists")
            res.status(404).json({message: data});
        let verifRESP = await verifMailSenderService.send_mail(pool, email);
        let statusCode = (verifRESP == "Password link has been sent successfully") ? 200: 400;
        const responseObj = {message: verifRESP};
        if (statusCode===200){
            const data = await getData(pool, "email", email);
            responseObj["user_id"] = data[0].user_id;
        }
        res.status(statusCode).json(responseObj);
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {send};