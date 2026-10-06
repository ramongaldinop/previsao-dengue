const { Pool } = require('pg');

// Configurações do banco de dados
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.HOST,
  database: process.env.PG_DATABASE,
  password: 'admin',
  port: process.env.PG_PORT,
});

module.exports = pool;