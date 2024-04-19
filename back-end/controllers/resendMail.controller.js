const sendMailService = require("../services/mailSender.service");



async function resend(req, res, next){
    try {
        const email = req.body.email;
        sendMailService.send_mail(email, full_name);
    } catch (error) {
        
    }
}

module.exports = {resend};