const { getData } = require("../DB_Services/getData.service");


async function find(pool, property, value){
    try {
        const result = await getData(pool, property, value, 'users');
        const user = result.rows;
        if (user.length > 0) return "User already exists";
        return "User not found";
    } catch (error) {
        return "User search ERROR";
    }
}

module.exports = {find};