const verifMailSenderService = require("../../services/UserServices/sendFPMail.service");



async function send(req, res, next){
    try {
        const email = req.body.email;
        const pool = req.pool;
        let verifRESP = await verifMailSenderService.send_mail(pool, email);
        let statusCode = (verifRESP == "Password link has been sent successfully") ? 200: 400;
        res.status(statusCode).json({message: verifRESP});
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {send};