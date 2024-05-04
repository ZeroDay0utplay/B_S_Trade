const { getData } = require("../DB_Services/getData.service");
const bcrypt = require("bcryptjs");


async function login(email, password, pool){
    try {
        const users = await getData(pool, "email", email, "users");
        if (users.length === 0){
            return ["user not found", user_id];
        }
        const user = users[0];
        const user_id = user.user_id;
        const userPassword = user.password;
        const isMatch = bcrypt.compareSync(password, userPassword);
        if (!isMatch) {
            return ["Invalid password", user_id];
        }
        if (!(user.is_verified)) return ["Verify your account", user_id];
        return ["You have been logged in successfully", user_id];
        
    } catch (error) {
        return "Login ERROR";
    }
}

module.exports = {login};