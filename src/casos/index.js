const express = require('express');
const router = express.Router();
const casos = require('../../models/casos')

const { isAuthenticated } = require('../../middlewares/auth');

// GET /casos - lista todos os casos
router.get('/', isAuthenticated, async (req, res) => {
  let list_casos = await casos.findAll({raw: true})
  
  res.render('casos', {list_casos});
});

router.get('/lista', isAuthenticated, async (req,res) => {
  const list_casos = await casos.findAll({raw: true})
  res.json(list_casos)
})

router.get('/analise', (req,res) => {
  res.render('analise', {analise: true});
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