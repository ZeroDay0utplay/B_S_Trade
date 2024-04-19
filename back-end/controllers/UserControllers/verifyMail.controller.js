const QueryService = require("../../services/UserServices/query.service");
const checkTokenService = require("../../services/UserServices/checkToken.service");


async function verifyController(req, res, next){
    try {
        const token = (req.params.token).toString();
        const id = req.params.id;
        const pool = req.pool;
        let expiredToken = checkTokenService.check(token);

        if (expiredToken === true)
            return res.status(403).json('Your verification link may have expired. Please click on resend for verify your Email.');
    
        const querySerice = new QueryService(pool).psqlPool;
        const result = await querySerice.query(`SELECT * FROM users WHERE id = '${id}';`);
        const user = result.rows;
        if (user.length == 0) {
            return res.status(401).json("We were unable to find a user for this verification. Please SignUp!");

        } else if (user.is_verified) {
            return res.status(200).json("User has been already verified. Please Login");

        } else {
            await querySerice.query(`UPDATE users SET is_verified = TRUE WHERE id = '${id}';`);
            return res.status(200).json("Your account has been successfully verified");
        }
        
    } catch (err) {
        return res.status(500).json("Internal Server Error");
    }
}

module.exports = {verifyController};
