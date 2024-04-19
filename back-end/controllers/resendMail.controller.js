const verifMailSenderService = require("../services/verifMailSender.service");



async function resend(req, res, next){
    try {
        const email = req.body.email;
        let verifRESP = verifMailSenderService.send_mail(email, full_name);
        let statusCode = (verifRESP == "Verification mail has been sent successfully") ? 200: 400;
        res.status(statusCode).json(verifRESP);
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {resend};