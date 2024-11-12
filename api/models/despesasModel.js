const { client } = require("../db/db");

const findAll = async () => {
  try {
    const { rows } = await client.query("SELECT * FROM despesas ORDER BY id");
    return rows;
  } catch (err) {
    console.error("Erro ao executar consulta:", err.stack);
  }
};
const findById = async (id) => {
  try {
    const { rows } = await client.query(
      "SELECT * FROM despesas WHERE id = $1",
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error("Erro ao executar consulta:", err.stack);
  }
};
const create = async (product) => {
  try {
    const { date, description, amount } = product;
    const { rows } = await client.query(
      "INSERT INTO despesas (date, description, amount) VALUES ($1, $2, $3) RETURNING *",
      [date, description, amount]
    );
    return rows[0];
  } catch (err) {
    console.error("Erro ao executar consulta:", err.stack);
  }
};
const update = async (id, product) => {
  try {
    const { date, description, amount } = product;
    const { rows } = await client.query(
      "UPDATE despesas SET date = $1, description = $2, amount = $3 WHERE id = $4 RETURNING *",
      [date, description, amount, id]
    );
    return rows[0];
  } catch (err) {
    console.error("Erro ao executar consulta:", err.stack);
  }
};
const remove = async (id) => {
  try {
    const { rows } = await client.query("DELETE FROM despesas WHERE id = $1", [
      id,
    ]);
    return rows[0];
  } catch (err) {
    console.error("Erro ao executar consulta:", err.stack);
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
