const express = require('express');
const exphbs = require('express-handlebars')
require('dotenv').config();

const casosdb = require('./models/casos')
const conn = require('./db/conn')

// Rotas
const casos = require('./src/casos');
const sist = require('./src/sistema')

const app = express();
const PORT = process.env.PORT || 8000;

// HANDLEBARS INICIALIZAÇÃO
app.engine("handlebars",exphbs.engine())
app.set("view engine","handlebars")

// inicialização de interfaces básicas
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/analise', (req,res) => {
  res.render('analise', {analise: true});
})

// Rota de teste db:
app.get('/dbtest', (req,res) => {
  conn.sync()
    .then(() => res.json('Tabelas sincronizadas'))
    .catch(err => res.json('Erro ao sincronizar:', err));
})

// Rotas principais
app.use('/casos', casos);
app.use('/sistema', sist)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});