const findUserService = require("../../services/UserServices/findUser.service");
const checkTokenService = require("../../services/UserServices/checkToken.service");
const updateService = require("../../services/UserServices/update.service")


async function check_clicked_link (req, res, next) {
    try {
      const token = (req.params.token).toString();
      const pool = req.pool;

      let expiredToken = checkTokenService.check(token);

      if (expiredToken === true) 
        return res.status(403).json('Your verification link may have expired');
      
      const id = req.params.id;
      const user = await findUserService.find(pool, "id", id);
      if (user == "User not found") 
        return res.status(401).json("We were unable to find a user for this verification. Please SignUp!");
      const x = await updateService.update(pool, "req_pwd_change", "TRUE", "id", id);
      console.log(x);
      return res.status(200).json("Now go back to the app and change your password");
    }catch (err) {
        res.status(500)
        next(err);
    }
}
module.exports = {check_clicked_link};