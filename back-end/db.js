const Pool = require("pg").Pool;
require("dotenv");
const env = process.env;


const pool = new Pool({
    user: env.DB_USER,
    password: env.DB_PWD,
    host: env.DB_HOST,
    port: env.DB_PORT
});

module.exports = pool;