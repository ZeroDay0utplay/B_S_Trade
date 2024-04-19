const verifMailSenderService = require("../../services/verifMailSender.service");



async function send(req, res, next){
    try {
        const email = req.body.email;
        let verifRESP = await verifMailSenderService.send_mail(email, full_name);
        let statusCode = (verifRESP == "Password link has been sent successfully") ? 200: 400;
        res.status(statusCode).json(verifRESP);
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {send};