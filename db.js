const {Pool} = require('pg');

const dotenv = require('dotenv');
dotenv.config();

const devConfig = {
    connectionString: `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
}    
const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig: devConfig)

pool.on('error', (err, client) => {
    console.error('Error:', err);
});

module.exports = pool;
