const db = require('../../db/conn');

const Casos = {
  getCasos: async (limit) => {
    try {
      const query = 'SELECT * FROM casos_dengue ORDER BY data_inicio DESC LIMIT $1';
      const result = await db.query(query, [limit]);
      return result.rows;
    } catch (error) {
      console.log(error)
    }
  },

  getAllCasos: async () => {
    try {
      const query = 'SELECT * FROM casos_dengue';
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  createNewCaso: async (nome, cpf) => {
    try {
      const query = 'INSERT INTO casos_dengue (semana_epidemiologica, data_inicio, casos, casos_estimados, nivel_alerta, rt, temp_media, umid_media, municipio_nome) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
      const values = [semana_epidemiologica, data_inicio, casos, casos_estimados, nivel_alerta, rt, temp_media, umid_media, municipio_nome];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Casos;