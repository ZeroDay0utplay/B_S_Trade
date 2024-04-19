const sendMailService = require("./sendMail.service");
const QueryService = require("./query.service");
const {generateAccessToken} = require("../../middlewares/auth.middleware");
const crypto = require("crypto");

async function send_mail(email, full_name, pool){
    try {
        const querySerice = new QueryService(pool).psqlPool;
        const res = await querySerice.query(`SELECT id FROM users WHERE email = '${email}';`);
        const id = res.rows[0].id;
        let setToken = generateAccessToken(crypto.randomBytes(16).toString("hex"), 1);
        if (setToken) {
            sendMailService.sendMail({
            from: process.env.EMAIL,
            to: `${email}`,
            subject: "Account Verification Link",
            text: `Hello, ${full_name} Please verify your email by clicking this link :
                    http://${process.env.IP}:${process.env.PORT}/users/verify-email/${id}/${setToken} `,
            })
            return "Verification mail has been sent successfully";
        }
    } catch (error) {
        return "Verification mail could not be sent";
    }
    
}


module.exports = {send_mail};