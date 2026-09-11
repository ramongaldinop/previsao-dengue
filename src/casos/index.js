const express = require('express');
const router = express.Router();
const casos = require('../../models/casos')

// Dado fake, só pra testar a rota enquanto o banco não existe
const casosFake = [
  {
    "semana_epidemiologica": 202352,
    "data_inicio": "2023-12-24",
    "casos": 942,
    "casos_estimados": 942.0,
    "nivel_alerta": 2,
    "rt": 1.0456612,
    "temp_media": 23.4,
    "umid_media": 75.5,
    "municipio_nome": "São Paulo"
  },
  {
    "semana_epidemiologica": 202351,
    "data_inicio": "2023-12-17",
    "casos": 815,
    "casos_estimados": 815.0,
    "nivel_alerta": 2,
    "rt": 0.8945785,
    "temp_media": 22.8,
    "umid_media": 81.9,
    "municipio_nome": "São Paulo"
  }
];

// GET /casos - lista todos os casos
router.get('/', (req, res) => {
  res.render('casos', {casosFake});
});

router.get('/novo', (req,res)=> {
  res.render('registrarsemana')
})

router.post('/novo', async (req, res) => {
  let municipio_nome = req.body.municipio_nome
  let semana_epidemiologica = req.body.semana_epidemiologica
  let num_casos = req.body.casos
  let casos_estimados = req.body.casos_estimados
  let nivel_alerta = req.body.nivel_alerta
  let rt = req.body.rt
  let temp_media = req.body.temp_media
  let umid_media = req.body.umid_media
  let data_inicio = req.body.data_inicio

  try {
    await casos.create({
      municipio_nome, semana_epidemiologica, num_casos,
      casos_estimados, nivel_alerta, rt, temp_media, umid_media, data_inicio
    })
    return res.json('Adicionado com sucesso!')
  } catch (error) {
    console.log(error)
  }
})

// GET /casos/:semana - busca um caso específico pela semana epidemiológica
// router.get('/:semana', (req, res) => {
//   const caso = casosFake.find(c => c.semana_epidemiologica === parseInt(req.params.semana));
//   if (!caso) {
//     return res.status(404).json({ erro: "Semana não encontrada" });
//   }
//   res.json(caso);
// });

module.exports = router;