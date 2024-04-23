const verifMailSenderService = require("../../services/UserServices/verifMailSender.service");



async function resend(req, res, next){
    try {
        const email = req.body.email;
        let verifRESP = await verifMailSenderService.send_mail(email);
        let statusCode = (verifRESP == "Verification mail has been sent successfully") ? 200: 400;
        res.status(statusCode).json({message: verifRESP});
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {resend};