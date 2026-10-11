const { Pool } = require('pg');

// Configurações do banco de dados

if (process.env.HOST) {
  const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.HOST,
    database: process.env.PG_DATABASE,
    password: 'admin',
    port: process.env.PG_PORT,
  });
} else {
  const pool = new Pool({
    connectionString: process.env.DB_CONN_STRING
  })
}

module.exports = pool;