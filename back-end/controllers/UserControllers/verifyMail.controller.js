const { getData } = require("../../services/DB_Services/getData.service");
const { update } = require("../../services/DB_Services/update.service");
const { check } = require("../../services/UserServices/JWT.service");


async function verifyController(req, res, next){
    try {
        const token = (req.params.token).toString();
        const user_id = req.params.user_id;
        const pool = req.pool;
        let expiredToken = check(token);

        if (expiredToken === true)
            return res.status(403).json({message: 'Your verification link may have expired. Please click on resend for verify your Email.'});
    
        const user = await getData(pool, "user_id", user_id);
        if (user.length == 0) {
            return res.status(401).json({message: "We were unable to find a user for this verification. Please SignUp!"});

        } else if (user.is_verified) {
            return res.status(200).json({message: "User has been already verified. Please Login"});

        } else {
            await update(pool, "is_verified", "TRUE", "user_id", user_id);
            return res.status(200).json({message: "Your account has been successfully verified"});
        }
        
    } catch (err) {
        res.status(500);
        next(err);
    }
}

module.exports = {verifyController};
