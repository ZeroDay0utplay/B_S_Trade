const sendMailService = require("../UserServices/sendMail.service");
const QueryService = require("../DB_Services/query.service");
const {generateAccessToken} = require("../../middlewares/auth.middleware");
const crypto = require("crypto");
const { getData } = require("../DB_Services/getData.service");


async function send_mail(pool, email){
    const result = await getData(pool, "email", email, "users");
    const user_id = result[0].user_id;
    const full_name = result[0].full_name;
    let setToken = generateAccessToken(crypto.randomBytes(16).toString("hex"), 1);
    if (setToken) {
        sendMailService.sendMail({
        from: process.env.EMAIL,
        to: `${email}`,
        subject: "Password Reset Link",
        text: `Hello, ${full_name} Please reset your password by clicking this link :
                http://${process.env.IP}:${process.env.PORT}/users/reset-pwd/${user_id}/${setToken} `,
        })
        return "Password link has been sent successfully";
    }
    return "Password link could not be sent";
}


module.exports = {send_mail};