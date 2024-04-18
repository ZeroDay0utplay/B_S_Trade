const jwt = require("jsonwebtoken");
const QueryService = require("../services/query.service");


async function verifyController(req, res, next){
    try {
        const token = (req.params.token).toString();
        const id = req.params.id;
        const pool = req.pool;
        let expiredToken = false;

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err !== null && err.name === 'TokenExpiredError'){
                expiredToken = true;
                res.status(403).json('Your verification link may have expired. Please click on resend for verify your Email.');
            }
        });

        if (expiredToken === true) return;
    
        const querySerice = new QueryService(pool).psqlPool;
        const result = await querySerice.query(`SELECT * FROM users WHERE id = '${id}';`);
        const user = result.rows;
        if (user.length == 0) {
            res.status(401).json("We were unable to find a user for this verification. Please SignUp!");

        } else if (user.is_verified) {
            res.status(200).json("User has been already verified. Please Login");

        } else {
            await querySerice.query(`UPDATE users SET is_verified = TRUE WHERE id = '${id}';`);
            return res.status(200).json("Your account has been successfully verified");
        }
        
    } catch (err) {
        return res.status(500).json("Internal Server Error");
    }
}

module.exports = {verifyController};
