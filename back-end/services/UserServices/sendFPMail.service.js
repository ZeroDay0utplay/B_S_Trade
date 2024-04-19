const sendMailService = require("../sendMail.service");
const QueryService = require("./query.service");


async function send_mail(email, full_name){
    const querySerice = new QueryService(pool).psqlPool;
    const res = await querySerice.query(`SELECT id FROM users WHERE email = '${email}';`);
    const id = res.rows[0].id;
    let setToken = generateAccessToken(crypto.randomBytes(16).toString("hex"), 1);
    if (setToken) {
        sendMailService.sendMail({
        from: process.env.EMAIL,
        to: `${email}`,
        subject: "Account Verification Link",
        text: `Hello, ${full_name} Please reset your password by clicking this link :
                http://${process.env.IP}:${process.env.PORT}/users/reset-pwd/${id}/${setToken} `,
        })
        return "Password link has been sent successfully";
    }
    return "Password link could not be sent";
}


module.exports = {send_mail};