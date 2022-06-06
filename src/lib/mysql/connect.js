const mysql2 = require('mysql2');
const pool  = mysql2.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  port            : '3306',
  user            : 'root',
  password        : '814595325',
  database        : 'monitor-dev',
});

module.exports = pool;