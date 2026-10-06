const db = require('../../db/conn');

const Casos = {
  getAllCasos: async () => {
    try {
      const query = 'SELECT * FROM casos';
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  createNewCaso: async (nome, cpf) => {
    try {
      const query = 'INSERT INTO Cliente (nome, cpf) VALUES ($1, $2) RETURNING *';
      const values = [nome, cpf];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Casos;