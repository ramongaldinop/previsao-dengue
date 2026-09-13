const express = require('express');
const exphbs = require('express-handlebars')
const session = require('express-session')

// módulos estáticos:
require('dotenv').config();
require('./src/hbrsHelper')

const app = express();
const PORT = process.env.PORT || 8000;

// HANDLEBARS INICIALIZAÇÃO
app.engine("handlebars",exphbs.engine())
app.set("view engine","handlebars")

// inicialização de interfaces básicas
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: 'aquelela',
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 60000
    }
}))

app.get('/', (req, res) => {
  if (req.session.auth === true) {
    console.log(req.session.auth)
    res.render('home');
  } else {
    console.log(req.session.auth)
    res.render('home', {unauthorized: true})
  }
});

// Rotas
const casos = require('./src/casos');
const login = require('./src/login');

app.use('/casos', casos);
app.use('/login', login);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});