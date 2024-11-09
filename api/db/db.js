// db.js
const { Client } = require("pg");
const { loadEnv } = require("../config/config");

loadEnv();
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err.stack);
    process.exit(1);
  }
};

module.exports = { client, connectDB };
