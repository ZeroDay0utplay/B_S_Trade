const bcrypt = require("bcryptjs");
const findUserService = require("./findUser.service")

async function register(email, password, full_name, job, pool){
    try {
        const data = findUserService.find();
        if (data == "User not found"){
            const hashedPassword = bcrypt.hashSync(password, 10);
            await querySerice.query(`INSERT INTO users (email, password, full_name, job) VALUES ('${email}', '${hashedPassword}', '${full_name}', '${job}');`);
            return "user added succesfully";
        }
        return data;  
    } catch (error) {
        return "Register ERROR";
    }

}

module.exports = {register};