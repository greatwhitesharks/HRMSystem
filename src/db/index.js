const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hrm_db',
  waitForConnections: true,
  connectionLimit: 10,
});

pool.execute(`SET FOREIGN_KEY_CHECKS=0;`);
module.exports = pool;
