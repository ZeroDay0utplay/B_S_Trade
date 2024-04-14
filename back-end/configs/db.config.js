require("dotenv");

// const db = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 5432
// };

const db = {
    user: "postgres",
    password: "zdo4tw",
    host: "localhost",
    port: 5432
}


module.exports = db;