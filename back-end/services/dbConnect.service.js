const { Pool } = require('pg');
const dbConfig = require('../configs/db.config');

const psqlClient = new Pool(dbConfig);
psqlClient.connect()
    .then(() => {
    console.log('Connected to the PostgreSQL database');
    })
    .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err);
    });

module.exports = {psqlClient};