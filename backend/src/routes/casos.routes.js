const express = require('express');
const router = express.Router();

// Dado fake, só pra testar a rota enquanto o banco não existe
const casosFake = [
  {
    semana_epidemiologica: 202352,
    data_inicio: "2023-12-24",
    casos: 942,
    casos_estimados: 942.0,
    nivel_alerta: 2,
    rt: 1.0456612,
    temp_media: 23.4,
    umid_media: 75.5,
    municipio_nome: "São Paulo"
  },
  {
    semana_epidemiologica: 202351,
    data_inicio: "2023-12-17",
    casos: 815,
    casos_estimados: 815.0,
    nivel_alerta: 2,
    rt: 0.8945785,
    temp_media: 22.8,
    umid_media: 81.9,
    municipio_nome: "São Paulo"
  }
];

// GET /casos - lista todos os casos
router.get('/', (req, res) => {
  res.json(casosFake);
});

// GET /casos/:semana - busca um caso específico pela semana epidemiológica
router.get('/:semana', (req, res) => {
  const caso = casosFake.find(c => c.semana_epidemiologica === parseInt(req.params.semana));
  if (!caso) {
    return res.status(404).json({ erro: "Semana não encontrada" });
  }
  res.json(caso);
});

module.exports = router;