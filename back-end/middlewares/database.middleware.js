const { Pool } = require('pg');
const dbConfig = require('../configs/db.config');

const pool = new Pool(dbConfig);

async function connectToDatabase(req, res, next) {
    try {
        const client = await pool.connect();
        req.pool = client;
        next();
    } catch (error) {
        console.error('Error connecting to database:', error);
        next(error); // Pass the error to the error handler middleware
    }
}

module.exports = connectToDatabase;
