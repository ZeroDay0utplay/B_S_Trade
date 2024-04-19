const sendMailService = require("../services/sendMail.service");


async function send_mail(email, full_name, id, setToken){
    if (setToken) {
        sendMailService.sendMail({
        from: process.env.EMAIL,
        to: `${email}`,
        subject: "Account Verification Link",
        text: `Hello, ${full_name} Please verify your email by clicking this link :
                http://${process.env.IP}:${process.env.PORT}/users/verify-email/${id}/${setToken} `,
        })
        return 201;
    }
    return 400;
}


module.exports = {send_mail};