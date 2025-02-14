const findUserService = require("../../services/UserServices/findUser.service");
const updateService = require("../../services/DB_Services/update.service");
const { check } = require("../../services/UserServices/JWT.service");


async function check_clicked_link (req, res, next) {
    try {
      const token = (req.params.token).toString();
      const pool = req.pool;

      let expiredToken = check(token);

      if (expiredToken === true) 
        return res.status(403).json({message: 'Your verification link may have expired'});
      
      const user_id = req.params.user_id;
      const user = await findUserService.find(pool, "user_id", user_id);
      if (user == "User not found") 
        return res.status(401).json({message: "We were unable to find a user for this verification. Please SignUp!"});
      const x = await updateService.update(pool, "req_pwd_change", "TRUE", "user_id", user_id);
      return res.status(200).json({message: "Now go back to the app and change your password"});
    }catch (err) {
        res.status(500)
        next(err);
    }
}
module.exports = {check_clicked_link};