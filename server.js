const express = require('express');
const exphbs = require('express-handlebars')
require('dotenv').config();

const casos = require('./src/casos');
const conn = require('./db/conn')

const app = express();
const PORT = process.env.PORT || 3000;

// HANDLEBARS INICIALIZAÇÃO
app.engine("handlebars",exphbs.engine())
app.set("view engine","handlebars")

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Rota de teste rápido
app.get('/', (req, res) => {
  res.render('home');
});

// Rotas principais
app.use('/casos', casos);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});